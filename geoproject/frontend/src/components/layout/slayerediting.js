import React, { Component, useState } from "react";
import MaterialTable from "material-table";
import cookie from "react-cookies";



class slayerediting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            requiresloading: false,
        };
    }

    changerequireloading() {
        this.state.requiresloading = true;
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
        fetch("/dataq")
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

    componentDidUpdate() {
        fetch("/dataq")
            .then(res => res.json())
            .then(
                (result) => {
                    if (this.setState.items != result) {
                        this.setState({
                            isLoaded: true,
                            items: result
                        });
                    }
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
                editable: 'never'
            },
            {
                title: 'SPT',
                field: 'SPT',
                initialEditValue: 20
            },
            {
                title: 'N Value',
                field: 'Nvalue',
                initialEditValue: 20
            },
            {
                title: 'Sampling Depth',
                field: 'samplingDepth',
                initialEditValue: 1.5
            },
            {
                title: 'Thickness',
                field: 'thickness',
                initialEditValue: 2
            },
            {
                title: 'Classification',
                field: 'classification',
                initialEditValue: 'sand'
            },
            {
                title: 'Group Symbol',
                field: 'groupSymbol',
                initialEditValue: 'SW'
            },
            {
                title: 'Layer',
                field: 'layer',
                initialEditValue: 'top'
            },
            {
                title: 'Gamma',
                field: 'gamma',
                initialEditValue: 1.4
            },
            {
                title: 'Water Percentage',
                field: 'waterPercentage',
                initialEditValue: 30

            },
            {
                title: 'cValue',
                field: 'cValue',
                initialEditValue: 20
            },
            {
                title: 'phiValue',
                field: 'phiValue',
                initialEditValue: 30
            },
            {
                title: 'GI',
                field: 'GI',
                initialEditValue: 'S'
            },
            {
                title: 'Elasticity',
                field: 'Elasticity',
                initialEditValue: 200
            },
            {
                title: 'nu',
                field: 'nu',
                initialEditValue: 120
            }
        ]


        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
                <div>
                    <input
                        type="hidden"
                        value={cookie.load("csrftoken")}
                        name="csrfmiddlewaretoken"
                    />
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

                    <MaterialTable title="Data"
                        data={this.state.items}
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
                                        fetch("/datap/",
                                            {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify(newData),
                                            }

                                        );

                                        resolve();
                                    }, 1000)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        data.push([...dataUpdate]);

                                        resolve();
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        data.push([...dataDelete]);

                                        resolve()
                                    }, 1000)
                                }),
                        }} >

                    </MaterialTable>
                </div>
            );
        }
    }
}

export default slayerediting;