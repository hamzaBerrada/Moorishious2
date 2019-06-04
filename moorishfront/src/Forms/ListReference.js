import React, { Component } from 'react';
import './ListReference.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Reference</th>
            <th>Name</th>
            <th>Price</th>
            <th>Gender</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Description</th>
        </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tbody>
            <tr key={index}>
                <td>{row.ref}</td>
                <td>{row.name}</td>
                <td>{row.price}</td>
                <td>{row.gender}</td>
                <td>{row.category}</td>
                <td>{row.subCategory}</td>
                <td>{row.desc}</td>
                <td><button onClick={() => props.removeCharacter(row)}>Delete</button></td>
            </tr>
            </tbody>
        );
    });

    return <tbody>{rows}</tbody>;
}


class ListReference extends Component {
    constructor(props){
        super(props);
        this.removeRow=this.removeRow.bind(this);
        this.state = {
            columnDefs: [{
                headerName: "Reference", field: "ref", width: 120
            }, {
                headerName: "Name", field: "name", width: 120
            }, {
                headerName: "Price", field: "price", width: 120
            }, {
                headerName: "Gender", field: "gender", width: 120
            }, {
                headerName: "Category", field: "category", width: 120
            }, {
                headerName: "SubCategory", field: "subCategory", width: 120
            }, {
                headerName: "Description", field: "desc", width: 120
            }, {
                    headerName: "View",
                    field: "id",
                    colId: "view",
                    cellRendererFramework: function(params) {
                        return <button> Delete </button>
                    }
            }]
        }

    }

    removeRow(e, row){
        console.log("hamiddddd", row);
        this.props.removeCharacter(row);
    }

    render() {
        const { characterData, removeCharacter } = this.props;

        return (
            <>
            <table>
                <TableHeader />
                <TableBody
                    characterData={characterData}
                    removeCharacter={removeCharacter}
                />
            </table>



            <div style={{ height: '150px', width: '100%' }} className="ag-theme-balham">
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={characterData}
                    cellClicked={this.removeRow}
                >


                </AgGridReact>
            </div>

            </>
        );
    }
}

export default ListReference;



