import React, { Component } from "react";
import MaterialTable from "material-table";




class slayerediting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }




    // columns = ["id", "SPT", "N Value", "Sampling Depth", "Thickness", "Classification", "Group Symbol", "Layer", "Gamma", "Water Percentage", "cValue", "phi value", "GI", "Elasticity", "nu"];
    //                  "id",
    //                   "SPT",
    //                       "Nvalue",
    //                              "samplingDepth",
    //                         "thickness",
    //                              "classification",
    //                            "groupSymbol",
    //                     "layer",
    //                     "gamma",
    //                                "waterPercentage",
    //                      "cValue",
    //                        "phiValue",
    //                  "GI",
    //                          "Elasticity",
    //                  "nu",



    componentDidMount() {
        fetch("/data")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const columns = [
            {
                title: 'id',
                field: 'id',
            },
            {
                title: 'SPT',
                field: 'SPT',
            },
            {
                title: 'N Value',
                field: 'Nvalue',
            },
            {
                title: 'Layer',
                field: 'layer'
            },
            {
                title: 'Sampling Depth',
                field: 'samplingDepth',
            },
            {
                title: 'Thickness',
                field: 'thickness',
            },
            {
                title: 'Classification',
                field: 'classification',
            },
            {
                title: 'Group Symbol',
                field: 'groupSymbol',
            },
            {
                title: 'Layer',
                field: 'layer',
            },
            {
                title: 'Gamma',
                field: 'gamma',
            },
            {
                title: 'Water Percentage',
                field: 'waterPercentage',
            },
            {
                title: 'cValue',
                field: 'cValue',
            },
            {
                title: 'phiValue',
                field: 'phiValue',
            },
            {
                title: 'GI',
                field: 'GI',
            },
            {
                title: 'Elasticity',
                field: 'Elasticity',
            },
            {
                title: 'nu',
                field: 'nu',
            }
        ]

        const data = this.state.items;

        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {/* <table className="table table-bordered table-hover table-responsive">
                        <thead className="thead-dark">
                            <tr>
                                <th scope='col'> id </th>
                                <th scope='col'> SPT </th>
                                <th scope='col'> N Value </th>
                                <th scope='col'> Sampling Depth </th>
                                <th scope='col'> Thickness </th>
                                <th scope='col'> Classification </th>
                                <th scope='col'>Group Symbol </th>
                                <th scope='col'>Layer </th>
                                <th scope='col'>Gamma </th>
                                <th scope='col'>Water Percentage </th>
                                <th scope='col'>cValue </th>
                                <th scope='col'>phiValue </th>
                                <th scope='col'>GI </th>
                                <th scope='col'>Elasticity </th>
                                <th scope='col'>nu </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(item => (
                                    <tr>
                                        <th className="table-primary" scope='row'>{item.id}</th>
                                        <td className="table-light">{item.SPT}</td>
                                        <td className="table-light">{item.Nvalue}</td>
                                        <td className="table-light">{item.samplingDepth}</td>
                                        <td className="table-light">{item.thickness}</td>
                                        <td className="table-light">{item.classification}</td>
                                        <td className="table-light">{item.groupSymbol}</td>
                                        <td className="table-light">{item.layer}</td>
                                        <td className="table-light">{item.gamma}</td>
                                        <td className="table-light">{item.waterPercentage}</td>
                                        <td className="table-light">{item.cValue}</td>
                                        <td className="table-light">{item.phiValue}</td>
                                        <td className="table-light">{item.GI}</td>
                                        <td className="table-light">{item.Elasticity}</td>
                                        <td className="table-light">{item.nu}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                        </table> */}
                    <MaterialTable title="Data" data={data}
                        columns={columns}
                        options={{
                            search: true,
                            paging: false,
                            filtering: true,
                            exportButton: true
                        }}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        setData([...data, newData]);

                                        resolve();
                                    }, 1000)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setData([...dataUpdate]);

                                        resolve();
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        setData([...dataDelete]);

                                        resolve()
                                    }, 1000)
                                }),
                        }} />
                </div>
            );
        }
    }
}

export default slayerediting;