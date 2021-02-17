import React from "react";
import MaterialTable from "material-table";
import cookie from "react-cookies";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import Preview from '@material-ui/icons/DesktopWindows';
//import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
//import ChevronLeft from '@material-ui/icons/ChevronLeft';
//import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
//import FilterList from '@material-ui/icons/FilterList';
//import FirstPage from '@material-ui/icons/FirstPage';
//import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
//import Search from '@material-ui/icons/Search';
//import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Preview: forwardRef((props, ref) => <Preview {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const table_options = {
        search: false,
        paging: false,
        filtering: false,
        exportButton: false
};

const columns = [
            {
              title: '<depth',
              field: 'depth',
              initialEditValue: '1.',
              type: 'numeric'
            },{
              title: 'GI',
              field: 'GI',
              initialEditValue: 'SW'
            },{
              title: 'SPT_N',
              field: 'SPT_N',
              initialEditValue: '10',
              type: 'numeric'
            },{
              title: 'cohesion',
              field: 'cohesion',
              type: 'numeric'
            },{
              title: 'phi',
              field: 'phi',
              type: 'numeric'
            },{
              title: 'gamma',
              field: 'gamma',
              type: 'numeric'
            },{
              title: 'N60',
              field: 'N60',
              type: 'numeric'
            },{
              title: 'elasticity',
              field: 'elasticity',
              type: 'numeric'
            },{
              title: 'nu',
              field: 'nu',
              type: 'numeric'
            },{
              title: 'surcharge',
              field: 'surcharge',
              type: 'numeric'
            },{
              title: 'packing_case',
              field: 'packing_case',
              type: 'numeric'
            }
];

class slayerediting extends React.Component {
  constructor(props){
    super(props);
    //Check sheet if already created?
    if(!props.sheet)
      props.setSheet({attributes:{}, values: []});
    this.state = {data: {}, preview: false};
  };

  render(){
    var data = [];
    if(this.props.sheet)
        data=this.props.sheet.values;
    if(this.state.preview){
      return(
        <div>
          <MaterialTable
          title="SPT Table"
          columns={columns}
          data={this.state.data}
          icons={tableIcons}
          options={{
            ...table_options, exportButton: true
          }}//show export in preview only
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: 'Edit',
              isFreeAction: true,
              onClick: () => {
                this.setState({preview: false});
              }
            }
          ]} 
          />
        </div>
      )
    }
    return(
      <>
        <MaterialTable
          title="SPT Table"
          columns={columns}
          data={data}
          icons={tableIcons}
          options={table_options}
          actions={[
              {
                icon: tableIcons.Preview,
                tooltip: 'Preview',
                isFreeAction: true,
                onClick: () => {
                  const request = new Request(
                    "./get_preview",
                    {headers: {
                      'X-CSRFToken': cookie.load("csrftoken"),
                      "Content-Type": "application/json"
                        }}
                  );
                  fetch(request, {
                    method: 'post',
                    mode: 'same-origin',
                    body: JSON.stringify({values: data})
                  })
                  .then(response => response.json())
                  .then(data => this.setState({data: data.values, preview: true}));
                }
              }
          ]}
          editable={{
            onRowAdd: newData => 
              new Promise((resolve, reject) => {
                setImmediate(()=>{//@TODO: check using timeout as in eg if
                  // there will be any difference
                  this.props.setSheet({
                    ...this.props.sheet,
                    values: [...this.props.sheet.values, newData]
                  });
                  resolve();
                });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setImmediate(()=>{
                  const dataUpdate = [...this.props.sheet.values];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  this.props.setSheet({
                    ...this.props.sheet,
                    values: dataUpdate
                    });
                  resolve();
                  });
                }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setImmediate(() => {
                  const dataDelete = [...this.props.sheet.values];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  this.props.setSheet({
                    ...this.props.sheet,
                    values: dataDelete
                    });
                resolve();
              })
            }),
          }}
        />
      </>
    )
  }
}

import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    sheet: state.state.sheet,
  };
};

import actionCreater from '../redux/actionCreators';
const mapDispatchToProps = dispatch => ({
  setSheet: (d) => dispatch(actionCreater.setState('sheet',d)),
})

export default connect(mapStateToProps, mapDispatchToProps)(slayerediting);
