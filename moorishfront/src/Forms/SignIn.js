import React, {Component} from 'react';
import axios from "axios";
import './SignIn.css';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.user = {
            email: '',
            password: ''
        }
        this.state = {user: this.user}
    }

    componentWillMount() {
      console.log("Component will mount");
    }

    submitForm() {
        const user = {
            email: 'user',
            password: 'user'
        };
        axios.post(`/signIn`, user)
            .then(res => {
                console.log(res.data);
            });
    }

    render() {
        const {email, password} = this.state;
        return (
            <>
                <form>
                    <label>Email : </label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                    />
                    <label>Password : </label>
                    <input
                        type="text"
                        name="password"
                        value={password}
                    />

                    <input
                        className="ButtonSubmit"
                        type="button"
                        value="Sign In"
                        onClick={this.submitForm}/>
                </form>
                <div className="Separator"> </div>
                <form>
                    <input
                        className="ButtonSubmit"
                        type="button"
                        value="Register"
                        onClick={this.submitForm}/>
                </form>

            </>
        )
    }
}

export default SignIn;