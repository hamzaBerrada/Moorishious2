import React, {Component} from 'react';
import '../CSS/ListReference.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from "axios";

class ListReference extends Component {

    constructor(props) {
        super(props);
        this.removeRow = this.removeRow.bind(this);
        this.state = {
            columnDefs: [{
                headerName: "Reference", field: "ref", width: 120
            }, {
                headerName: "Name", field: "name", width: 120, editable: true
            }, {
                headerName: "Price", field: "price", width: 120, editable: true
            },
                {
                    headerName: "Gender", field: "gender", width: 120, editable: true
                }, {
                    headerName: "Category", field: "category", width: 120, editable: true
                }, {
                    headerName: "SubCategory", field: "subCategory", width: 120, editable: true
                }, {
                    headerName: "Description", field: "desc", width: 120, editable: true
                }, {
                    headerName: "View",
                    field: "id",
                    colId: "view",
                    cellRendererFramework: (params) => {
                        return <button className="DeleteButton" onClick={e => this.removeRow(e, params)}> Delete </button>
                    }
                }]
        }
    }

    removeRow(e, rowObject) {
        let rowData = this.state.rowData;
        let removedObject = rowObject.data;
        axios.delete(`/products/${removedObject.ref}`)
            .then(_ => {
                rowData = rowData.filter(current => current.ref !== rowObject.data.ref)
                this.updateState('rowData', rowData)
            })
    }


    componentDidMount() {
        this.fetchCharacterData()
    }

    fetchCharacterData() {
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.get(`/listReference`, config)
            .then(res => {
                this.updateState('rowData', res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateState(key, value) {
        this.setState(prevState => {
            let newState = {...prevState}
            newState[key] = value
            return newState
        })
    }

    changeList = row => {
        const reference = row.data;
        const url = '/addReference';
        if(reference) {
            axios.post(url, reference)
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }
    }


    render() {

        return (
            <>

                <div style={{height: '700px', width: '100%'}} className="ag-theme-balham">
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData || []}
                        enableFilter={true}
                        pagination={true}
                        onCellValueChanged={this.changeList}
                    >
                    </AgGridReact>
                </div>

            </>
        );
    }
}

export default ListReference;



