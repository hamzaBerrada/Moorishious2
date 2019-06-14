import React, { Component } from 'react';
import './AddReference.css';
import axios from "axios";

class AddSale extends Component {
    constructor(props) {
        super(props);

        this.sale = {
            idSale:'',
            saleDate: '',
            deliveryDate: '',
            deliveryStatus:'Not delivered',
            client:'',
            listProducts:[],
            totalAmount:'',
        };

        this.state = {sale : this.sale};
    }

    componentWillMount() {
        axios.get(`/listProducts`)
            .then(res => {
                const sale = {...this.state.sale};
                sale.listProducts = res.data;
                this.setState({sale: sale})})
            .catch((error)=>{
                console.log(error);
            });
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    };

    submitForm = (event) => {
        event.preventDefault();

        const sale = {
            idSale : this.state.idSale,
            saleDate : this.state.saleDate,
            deliveryDate : this.state.deliveryDate,
            deliveryStatus: this.state.deliveryStatus,
            client:this.state.client,
            listProducts:this.state.listProducts,
            totalAmount:this.state.totalAmount
        }
        axios.post(`/addSale`, sale)
            .then(res => {
                this.props.handleSubmit(sale);
            })

        this.setState(this.sale);
    }

    render() {
        const { idSale, saleDate, deliveryDate, deliveryStatus, client, listProducts, totalAmount } = this.state;

        return (
            <form>
                <label>Id Sale</label>
                <input
                    type="text"
                    name="idSale"
                    value={idSale}
                    onChange={this.handleChange} />
                <label>Sale Date</label>
                <input
                    type="text"
                    name="saleDate"
                    value={saleDate}
                    onChange={this.handleChange}/>
                <label>Delivery Date</label>
                <input
                    type="text"
                    name="deliveryDate"
                    value={deliveryDate}
                    onChange={this.handleChange}/>
                <label>Delivery Status</label>
                <label className="radio">
                    <input
                        type="radio"
                        name="deliveryStatus"
                        value="Not delivered"
                        checked={deliveryStatus === 'Not delivered'}
                        onChange={this.handleChange}/>
                    Not delivered</label>
                <label className="radio">
                    <input
                        type="radio"
                        name="deliveryStatus"
                        value="Sent"
                        onChange={this.handleChange}/>
                    Sent</label>
                <label className="radio">
                    <input
                        type="radio"
                        name="deliveryStatus"
                        value="Delivered"
                        onChange={this.handleChange}/>
                    Delivered</label>
                <label>Client</label>
                <input
                    type="text"
                    name="client"
                    value={client}
                    onChange={this.handleChange}/>
                <label>List of products</label>
                <select name="listProducts" value={listProducts} onChange={this.handleCategory} multiple={true}>
                    {this.state.sale.listProducts.map(field => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>

                <label>Total amount</label>
                <input
                    type="text"
                    name="totalAmount"
                    value={totalAmount}
                    onChange={this.handleChange}/>
                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm} />
            </form>
        );
    }

}

export default AddSale;
