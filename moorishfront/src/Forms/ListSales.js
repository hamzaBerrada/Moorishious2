import React, { Component } from 'react';
import '../CSS/ListReference.css';

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
        this.state = {
            columnDefs: [{
                headerName: "Reference", field: "Reference"
            }, {
                headerName: "Name", field: "Name"
            }, {
                headerName: "Price", field: "Price"
            }, {
                headerName: "Gender", field: "Gender"
            }, {
                headerName: "Category", field: "Category"
            }, {
                headerName: "SubCategory", field: "SubCategory"
            }, {
                headerName: "Description", field: "Description"
            }],
        }
    }

    render() {
        const { characterData, removeCharacter } = this.props;

        return (
            <table>
                <TableHeader />
                <TableBody
                    characterData={characterData}
                    removeCharacter={removeCharacter}
                />
            </table>
        );
    }
}

export default ListReference;



