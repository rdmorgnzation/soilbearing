import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Preview from '@material-ui/icons/DesktopWindows';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Edit from '@material-ui/icons/Edit';
import cookie from "react-cookies";

import FilteredEdit from './FilteredEdit';

const columns = [
            {
              name: '<depth',
              key: 'depth',
              initialEditValue: 1.,
              frozen: true,
              type: 'numeric',
            },{
              name: 'GI',
              key: 'GI',
              initialEditValue: 'SW',
            },{
              name: 'SPT_N',
              key: 'SPT_N',
              initialEditValue: 4,
              type: 'numeric',
            },{
              name: 'cohesion',
              key: 'cu',
              type: 'numeric',
			  initialEditValue: 4.5,
            },{
              name: 'qu',
              key: 'qu',
              type: 'numeric',
			  initialEditValue: 95,
            },{
              name: 'φ',
              key: 'phi',
              type: 'numeric',
			  initialEditValue: 32,
            },{
              name: 'γ',
              key: 'gamma',
              type: 'numeric',
			  initialEditValue: 1.824,
            },{
              name: 'N60',
              key: 'N60',
              type: 'numeric',
            },{
              name: 'Elasticity',
              key: 'elasticity',
              type: 'numeric',
            },{
              name: 'ν',
              key: 'nu',
              type: 'numeric',
            },{
              name: 'w%',
              key: 'water_per',
              type: 'numeric',
			  initialEditValue: 0.1749,
			},{
              name: 'G',
              key: 'G',
              type: 'numeric',
			  initialEditValue: 2.511,
			},{
              name: 'FC',
              key: 'FC',
              type: 'numeric',
			  initialEditValue: 53,
			},
];

const all_columns = [
			...columns,
            {
              name: 'Packing Case',
              key: 'packing_case',
              type: 'numeric',
            },{
              name: 'Vertical Effective Stress',
              key: 'vertical_effective_stress',
              type: 'numeric',
            },{
              name: 'Total Effective Stress',
              key: 'total_effective_stress',
              type: 'numeric',
            },{
              name: 'γ_sat',
              key: 'sat_unit_weight',
              type: 'numeric',
            },{
              name: 'thickness',
              key: 'thickness',
              type: 'numeric',
            },
];

class slayerediting extends React.Component {
  constructor(props){
    super(props);
    //Check sheet if already created?
    if(!props.sheet)
      props.setSheet({attributes:{}, values: []});
    this.state = {data: {}, preview: false};
  };
  
  onDeleteRow(){
    if(this.state.selectedRow!=undefined){
      let id = this.state.selectedRow;
      const dataDelete = [...this.props.sheet.values];
      dataDelete.splice(id, 1);
      this.props.setSheet({
        ...this.props.sheet,
        values: dataDelete
      });
    }else{
      _SB.toast.info("No row selected");
    }
  }
    
  onAddRow() {
    let newData = {};
    for (let i in columns){
      if (columns[i].initialEditValue)
        newData[columns[i].key]=columns[i].initialEditValue;
    }
    const rowAdd = [...this.props.sheet.values];
    let pos = this.state.selectedRow+1;
    if (!pos)
      pos = this.props.sheet.values.length;
    rowAdd.splice(pos,0,newData);
    this.props.setSheet({
      ...this.props.sheet,
      values: rowAdd,
    }); 
  }
  
  onSelectionChange(rowIdx){
    this.setState({selectedRow: rowIdx});
  }
  
  onPreview(){
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
      body: JSON.stringify({values: this.props.sheet.values})
    })
    .then(response => response.json())
    .then(data => this.setState({data: data.values, preview: true}))
    .catch(error => _SB.toast.error(error.message));
  }
    
  onRowsChange(datas, pos){
    this.props.setSheet({
                    ...this.props.sheet,
                    values: datas
                    });
  }
    
  render() {
    let cols,displayData;
    if(this.state.preview){
      cols=all_columns.map(d=>{d.editor=undefined;return d;});
      displayData=this.state.data;
    }else{
      cols=columns.map(d=>{d.editor=FilteredEdit;return d;});
      displayData=[];
      if(this.props.sheet)
        displayData=this.props.sheet.values;
    }
    
    return (
      <Paper>
        <Box display="flex" style={{justifyContent: 'space-between'}}>
        <Typography variant="h5" component="h2">
          SPT Table
        </Typography>
        <Toolbar>
          {this.state.preview?
            <Tooltip title="Edit">
              <IconButton component="span">
                <Edit onClick={()=>{this.setState({preview: false});}}/>
              </IconButton>
            </Tooltip>
          :
            <>
              <Tooltip title="Preview">
                <IconButton component="span">
                  <Preview onClick={this.onPreview.bind(this)}/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Add row">
                <IconButton component="span">
                  <AddBox onClick={this.onAddRow.bind(this)}/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete row">
                <IconButton component="span">
                  <DeleteOutline onClick={this.onDeleteRow.bind(this)}/>
                </IconButton>
              </Tooltip>
            </>
          }
        </Toolbar>
        </Box>
        <Box style={{color:"black"}}>
        <ReactDataGrid
          columns={cols}
          rows={displayData}
          onRowsChange={this.onRowsChange.bind(this)}
          onRowClick={this.onSelectionChange.bind(this)}
        />
        </Box>
      </Paper>
    );
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
