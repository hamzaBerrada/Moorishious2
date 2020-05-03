import React, { Component } from 'react';
import '../CSS/Form.css';
import {Link} from "react-router-dom";
import axios from "axios";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.user = {
            firstName: '', lastName: '',
            country: '', city: '',
            address: '', postalCode: '',
            phone: ''
        }
        this.state = {user: this.user, isHidden: 'true'}

        const jsonToken = localStorage.getItem('userInfo');
        const token = JSON.parse(jsonToken);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${token}`
        }
        axios.get(`/getUser`, { headers: headers})
            .then(res => {
                if((res.data) === null || (res.data) === "" || (res.data) === undefined) return;
                else this.setState({user: res.data});
                console.log(res.data)
            }).catch((error) => {
            console.log("could not get user");
        });
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        const {firstName, lastName, country, city, address, postalCode, phone} = this.state;
        const userForm = {
            firstName: firstName || this.state.user.firstName,
            lastName: lastName || this.state.user.lastName,
            country: country || this.state.user.country,
            city: city || this.state.user.city,
            address: address || this.state.user.address,
            postalCode: postalCode || this.state.user.postalCode,
            phone: phone || this.state.user.phone
        }

        const jsonToken = localStorage.getItem('userInfo');
        const token = JSON.parse(jsonToken);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${token}`
        }
        axios.post(`/completeRegister`, userForm, { headers: headers})
            .then(res => {
                console.log("registration completed",res.data);
                this.setState({isHidden: true})
            })
            .catch((error) => {
                this.setState({isHidden: false})
                console.log("could not complete registration");
            });
    }

    render() {
        const {firstName, lastName, country, city, address, postalCode, phone} = this.state.user;
        const isHidden = this.state.isHidden;

        return (
            <>
                <p>You can edit your profile information : </p>
                <form>
                    <label>First name : </label>
                    <input
                        type="text"
                        name="firstName"
                        defaultValue={firstName}
                        onChange={this.handleChange}
                    />
                    <label>Last name : </label>
                    <input
                        type="text"
                        name="lastName"
                        defaultValue={lastName}
                        onChange={this.handleChange}
                    />
                    <label>Country : </label>
                    <input
                        type="text"
                        name="country"
                        defaultValue={country}
                        onChange={this.handleChange}
                    />
                    <label>City : </label>
                    <input
                        type="text"
                        name="city"
                        defaultValue={city}
                        onChange={this.handleChange}
                    />
                    <label>Address : </label>
                    <input
                        type="text"
                        name="address"
                        defaultValue={address}
                        onChange={this.handleChange}
                    />
                    <label>Postal code : </label>
                    <input
                        type="text"
                        name="postalCode"
                        defaultValue={postalCode}
                        onChange={this.handleChange}
                    />
                    <label>Phone Number: </label>
                    <input
                        type="text"
                        name="phone"
                        defaultValue={phone}
                        onChange={this.handleChange}
                    />
                    <p hidden={isHidden} className="IsHiddenText">incorrect data</p>
                    <Link className="active cool"  to="/" >
                        <input
                            className="ButtonSubmit"
                            type="button"
                            value="Finish"
                            onClick={this.submitForm}/>
                    </Link>
                </form>
            </>
        );
    }

}

export default UserProfile;
