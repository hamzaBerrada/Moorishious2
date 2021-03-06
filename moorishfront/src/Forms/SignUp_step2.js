import React, {Component} from 'react';
import axios from "axios";
import '../CSS/SignUp.css';
import {Link} from "react-router-dom";

class SignUp_step2 extends Component {

    constructor(props) {
        super(props);
        this.user = {
            firstName: '', lastName: '',
            country: '', city: '',
            address: '', postalCode: '',
            phone: ''
        }
        this.state = {user: this.user, isHidden: 'true'}
    }

    componentWillMount() {
        console.log("Component will mount");
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        const {firstName, lastName, country, city, address, postalCode, phone} = this.state; //oe3im3io2r3o2
        const userForm = {
            firstName: firstName, lastName: lastName,
            country: country, city: city,
            address: address, postalCode: postalCode,
            phone: phone
        }
        console.log('this user : ', userForm);
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
        const {firstName, lastName, country, city, address, postalCode, phone, isHidden} = this.state;

        return (
            <>
                <p>Complete the registration or <Link className="active cool" to="/">customize after ...</Link></p>
                <form>
                    <label>First name : </label>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={this.handleChange}
                    />
                    <label>Last name : </label>
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={this.handleChange}
                    />
                    <label>Country : </label>
                    <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={this.handleChange}
                    />
                    <label>City : </label>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={this.handleChange}
                    />
                    <label>Address : </label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={this.handleChange}
                    />
                    <label>Postal code : </label>
                    <input
                        type="text"
                        name="postalCode"
                        value={postalCode}
                        onChange={this.handleChange}
                    />
                    <label>Phone Number: </label>
                    <input
                        type="text"
                        name="phone"
                        value={phone}
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
        )
    }
}

export default SignUp_step2;