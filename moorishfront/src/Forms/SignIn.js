import React, {Component} from 'react';
import axios from "axios";
import '../CSS/SignIn.css';
import {Link} from "react-router-dom";

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.user = {
            email: '',
            password: ''
        }
        this.state = {user: this.user, isHidden: 'true', isAuthenticated: 'false'}
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
    //  insert into app_user values (1, 'haha', 'ffff','dddd','user','hamid','1','hamid','$2a$10$u/qFQNVjqiZL7CJLteco4uEWfBJcT2AhG6cfrE8efBrooCeIH9yau',020202020,30000);
        const {email, password} = this.state; //Hamza322@ : $2a$10$yCqxG7rzEX3LKSiPOYtQ/uB3Xy4WEHdQhEDh/.vdfwuIQo9vLpVTa
        const user = {
            email: email,
            password: password
        }
        axios.post(`/signIn`, (user))
            .then(res =>{
                const jwtToken = res.headers.authorization;
                if (jwtToken !== null) {
                    console.log("Sign in",this.getToken(res.headers));
                    localStorage.setItem("userInfo", JSON.stringify(this.getToken(res.headers)));
                    this.setState({isHidden: true, isAuthenticated: true});
                }
                else this.setState({isHidden: false, isAuthenticated: false});
            })
            .catch((error) => {
            console.log("could not retrieve the user ");
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

    render() {
        const {email, password, isHidden} = this.state;
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
                    <label>Password : </label>
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <p hidden={isHidden} className="IsHiddenText">User or password incorrect</p>
                    <input
                        className="ButtonSubmit"
                        type="button"
                        value="Sign In"
                        onClick={this.submitForm}/>
                </form>
                <div className="Separator"> </div>
                <form>
                    <Link className="active cool" to="/signUp_step1">
                    <input
                        className="ButtonSubmit"
                        type="button"
                        value="Register"
                        onClick={this.close}/>
                    </Link>
                </form>

            </>
        )
    }
}

export default SignIn;