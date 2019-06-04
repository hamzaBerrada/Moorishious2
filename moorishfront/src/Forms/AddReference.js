import React, { Component } from 'react';
import './AddReference.css';
import axios from "axios";

class AddReference extends Component {
    constructor(props) {
        super(props);

        this.character = {
            ref:'',
            name: '',
            price: '',
            gender:'MEN',
            category:[],
            subCategory:[],
            desc:'',
            file: null,

            error: '',
            msg: ''
        };

        this.state = {character : this.character, characters: []};
    }

    componentWillMount() {
        axios.get(`http://localhost:8080/categoryReference`)
            .then(res => {
                const character = {...this.state.character};
                character.category = res.data;
                this.setState({character: character})})
            .catch((error)=>{
                console.log(error);
            });
    }

    handleCategory = event => {
       this.handleChange(event);
       const cat = ""+event.target.value;
       console.log(cat);
        axios.post(`http://localhost:8080/subCategory`, cat)
            .then(res => {
                console.log("hhhhhh", res)
                const character = {...this.state.character};
                character.subCategory = res.data;
                this.setState({character: character})})
            .catch((error)=>{
                console.log(error);
            });
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    };

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    submitForm = (event) => {
        event.preventDefault();


        //////////////////////Upload///////////////////////////
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        // event.preventDefault();
        this.setState({error: '', msg: ''});
        if(!this.state.file) {
            this.setState({error: 'Please upload a file.'})
            return;
        }
        if(this.state.file.size >= 2000000) {
            this.setState({error: 'File size exceeds limit of 2MB.'})
            return
        }

        let data = new FormData();

        data.append('file', this.state.file);
        //data.append('name', this.state.file.name);
        axios.post(`http://localhost:8080/uploadFile`, data, config)
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        ////////////////////////////////////////////////////////

        const reference = {
            ref : this.state.ref,
            name : this.state.name,
            price : this.state.price,
            gender: this.state.gender,
            category:this.state.category,
            subCategory:this.state.subCategory,
            desc:this.state.desc
        }
        axios.post(`http://localhost:8080/addReference`, reference)
            .then(res => {
                this.props.handleSubmit(reference);
            })

        this.setState(this.character);
    }

    render() {
        const { ref, name, price, gender, category, subCategory, desc } = this.state;

        return (
            <form>
                <label>Reference</label>
                <input
                    type="text"
                    name="ref"
                    value={ref}
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
                    placeholder="EURO"
                    onChange={this.handleChange}/>
                <label>Gender</label>
                <label className="radio">
                <input
                    type="radio"
                    name="gender"
                    value="MEN"
                    checked={gender === 'MEN'}
                    onChange={this.handleChange}/>
                    MEN</label>
                <label className="radio">
                <input
                    type="radio"
                    name="gender"
                    value="WOMEN"
                    onChange={this.handleChange}/>
                    WOMEN</label>
                <label>Category</label>
                <select name="category" value={category} onChange={this.handleCategory} multiple={true}>
                    {this.state.character.category.map(field => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>
                <label>Subcategory</label>
                <select name="subCategory" value={subCategory} onChange={this.handleChange} multiple={false}>
                    {this.state.character.subCategory.map(field => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>
                <label>Description</label>
                <textarea
                    name="desc"
                    value={desc}
                    onChange={this.handleChange}/>
                <label>Principal Image</label>
                <div className="App-intro">
                    <h4 style={{color: 'red'}}>{this.state.error}</h4>
                    <h4 style={{color: 'green'}}>{this.state.msg}</h4>
                    <input onChange={this.onFileChange} multiple type="file"/>
                </div>

                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm} />
            </form>
        );
    }

}

export default AddReference;
