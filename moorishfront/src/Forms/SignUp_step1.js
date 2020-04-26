import React, {Component} from 'react';
import axios from "axios";
import './SignUp.css';
import {Link} from "react-router-dom";

class SignUp_step1 extends Component {

    constructor(props) {
        super(props);

        this.errors = {
            email: '',
            password: '',
            repassword: ''
        }
        this.state = {isHidden: 'true', errors: this.errors, isAuthenticated: false}
    }

    componentWillMount() {
        console.log("Component will mount");
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });

        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email =
                    value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    !(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"))
                        .test(value)
                        ? 'Password must be 8 characters long (minimum) and contains both Upper ' +
                        'and Lower case letters, number and a symbol!'
                        : '';
                break;
            case 'repassword':
                errors.repassword =
                    value !== this.state.password
                        ? 'Passwords do not match!'
                        : '';
                break;
            default:
                break;
        }
        ;
    }

    submitForm = () => {
        const {email, password} = this.state;
        const userForm = {
            email: email, password: password
        }
        axios.post(`/register`, userForm)
            .then(res => {
                console.log("Register",res.data);
                axios.post(`/signIn`, userForm)
                    .then(res => {
                        this.setState({isHidden: true, isAuthenticated: true});
                        console.log("Sign in",this.getToken(res.headers));
                        localStorage.setItem("userInfo", JSON.stringify(this.getToken(res.headers)));
                    })
                    .catch((error) => {
                        this.setState({isHidden: false, isAuthenticated: false});
                        console.log("could not retrieve the user ");
                    });
            })
            .catch((error) => {
                console.log("could not insert the user ");
            });
    }

    getToken = function(headers) {
        if (headers && headers.authorization) {
            const parted = headers.authorization.split(" ");
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    //axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} }).then();
    render() {
        const {email, password, repassword, isHidden} = this.state;

        return (
            <>
                <form>
                    <label>Email : </label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <p className='ErrorMessage'>{this.state.errors.email}</p>
                    <label>Password : </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <p className='ErrorMessage'>{this.state.errors.password}</p>
                    <label>Re-enter Password : </label>
                    <input
                        type="password"
                        name="repassword"
                        value={repassword}
                        onChange={this.handleChange}
                    />
                    <p className='ErrorMessage'>{this.state.errors.repassword}</p>

                    <p hidden={isHidden} className="IsHiddenText">incorrect data</p>
                    <Link className="active cool" to="/signUp_step2">
                    <input
                        className="ButtonSubmit"
                        type="button"
                        value="Sign Up"
                        onClick={this.submitForm}/>
                    </Link>
                </form>
            </>
        )
    }
}

export default SignUp_step1;