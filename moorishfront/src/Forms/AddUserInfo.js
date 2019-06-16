import React, { Component } from 'react';
import './AddUserInfo.css';
import axios from "axios";

class addUserInfo extends Component{

    constructor(props){
        super(props);
        this.infos = {
            firstName : '',
            lastName : '',
            email : '',
            address : '',
            code : '',
            city : '',
            country : [],
            phone : ''
            }
        ;
        this.state = {infos : this.infos}
    }

    componentWillMount(){
        axios.get(`https://restcountries.eu/rest/v2/all`)
            .then(res => {
                const infos = {...this.state.infos};
                infos.country = res.data;
                console.log(infos.country.map(f=>(f.name)))
                this.setState({infos: infos})})
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

    submitForm(){
        const infos = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email,
            address : this.state.address,
            code : this.state.code,
            city : this.state.city,
            country : this.state.country,
            phone : this.state.phone
        };
        axios.post(`/addUser`, infos)
            .then(res => {
                this.props.handleSubmit(infos);
            });

        this.setState(this.infos);
    }

    render(){
        const {firstName,lastName,email,address,code,city,country,phone} = this.state;
        const infos = {...this.state.infos};
        return(
            <form>
                <label>Nom : </label>
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                />
                <label>Prenom : </label>
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                />
                <label>Email : </label>
                <input
                    type="text"
                    name="email"
                    value={email}
                />
                <label>Pays</label>
                <select name="Pays" value={country} onChange={this.handleChange} multiple={false}>
                    {infos.country.map(field => (

                        <option key={field.name} value={field.name}>
                            {field.name}
                        </option>
                    ))}
                </select>
                <label>ville : </label>
                <input
                    type="text"
                    name="city"
                    value={city}
                />
                <label>adresse : </label>
                <input
                    type="text"
                    name="address"
                    value={address}
                />
                <label>code postal : </label>
                <input
                    type="text"
                    name="code"
                    value={code}
                />
                <label>tel : </label>
                <input
                    type="text"
                    name="phone"
                    value={phone}
                />

                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm} />
            </form>
        )
    }
}

export default addUserInfo;