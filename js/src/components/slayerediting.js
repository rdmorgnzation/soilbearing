import React from "react";
import MaterialTable from "material-table";
import cookie from "react-cookies";

const options = {
        search: false,
        paging: false,
        filtering: false,
        exportButton: true
};

const columns = [
            {
                title: '<depth',
                field: 'depth',
                initialEditValue: '0.',
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
    };

    render(){
        var data = [];
        if(this.props.sheet)
            data=this.props.sheet.values;
        return(
            <div>
                <MaterialTable
                    title="SPT Table"
                    columns={columns}
                    data={data}
                    options={options}
                    editable={{
                            onRowAdd: newData => 
                                new Promise((resolve, reject) => {
                                    setImmediate(()=>{
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
            </div>
        )
    }
}

import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    sheet: state.state.sheet,
  };
};

import actionCreater from '../redux/actionCreators.jsx';
const mapDispatchToProps = dispatch => ({
  setSheet: (d) => dispatch(actionCreater.setState('sheet',d)),
})

export default connect(mapStateToProps, mapDispatchToProps)(slayerediting);
