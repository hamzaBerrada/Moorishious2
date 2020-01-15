import React, {Component} from 'react';
import axios from "axios";
import './SignUp.css';

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

    submitForm = () => {
        const {firstName, lastName, country, city, address, postalCode, phone} = this.state; //oe3im3io2r3o2
        const userForm = {
            firstName: firstName, lastName: lastName,
            country: country, city: city,
            address: address, postalCode: postalCode,
            phone: phone
        }

        const jsonToken = localStorage.getItem('userInfo');
        const token = JSON.parse(jsonToken);
        axios.post(`/completeRegister`, { headers: {"Authorization" : `Bearer ${token}`}, userForm })
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
                    <input
                        className="ButtonSubmit"
                        type="button"
                        value="Sign Up"
                        onClick={this.submitForm}/>
                </form>
            </>
        )
    }
}

export default SignUp_step2;