import React, {Component} from 'react';
import axios from "axios";

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
            email: this.state.email,
            address: this.state.password
        };
        axios.post(`/addUser`, user)
            .then(res => {
                this.props.handleSubmit(user);
            });

        this.setState(this.infos);
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
                        type="button"
                        value="Submit"
                        onClick={this.submitForm}/>
                </form>

            </>
        )
    }
}

export default SignIn;