import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
    constructor(props) {
        super(props);

        this.character = {
            reference:'',
            name: '',
            price: '',
            gender:'',
            category:'',
            subcategory:'',
            description:''
        };

        this.state = this.character;
    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name] : value
        });
    };

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.character);
    }

    render() {
        const { reference, name, price, gender, category,subcategory,description } = this.state;

        return (
            <form>
                <label>Reference</label>
                <input
                    type="text"
                    name="reference"
                    value={reference}
                    onChange={this.handleChange} />
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}/>
                <label>Price</label>
                <input
                    type="text"
                    name="price"
                    value={price}
                    onChange={this.handleChange}/>
                <label>Gender</label>
                <input
                    type="text"
                    name="gender"
                    value={gender}
                    onChange={this.handleChange}/>
                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={this.handleChange}/>
                <label>Subcategory</label>
                <input
                    type="text"
                    name="subcategory"
                    value={subcategory}
                    onChange={this.handleChange}/>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.handleChange}/>

                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm} />
            </form>
        );
    }

}

export default Form;
