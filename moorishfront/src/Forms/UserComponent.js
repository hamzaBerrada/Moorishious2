import React, { Component } from 'react';
import '../CSS/Form.css';
import Popup from "reactjs-popup";
import user from "../resources/user.png";
import SignIn from "./SignIn";
import {Link} from "react-router-dom";

class UserComponent extends Component {

    isAuthenticated = () => {
        return !!localStorage.getItem('userInfo');
    }


    logout = () => {
        localStorage.removeItem('userInfo');
    }

    render() {
        return (
            <>
                {!this.isAuthenticated() ?
                    <Popup trigger={<img className="logIn" src={user} alt={"User"}/>} modal>
                        {close => (
                            <div>
                                <a href="# " className="close" onClick={close}>
                                    &times;
                                </a>
                                <SignIn></SignIn>
                            </div>
                        )}
                    </Popup>
                    :
                    <div className="dropdown">
                        <Link className="dropBtn" to="/userComponent">
                            <img className="logInGreen" src={user} alt={"User"}/>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/userProfile"><li href="#">Profile</li></Link>
                            <Link to="/#"><li href="#">Purchases</li></Link>
                            <Link to="/" onClick={this.logout}><li href="#">Log out</li></Link>
                        </div>
                    </div>
                }
            </>
        );
    }

}

export default UserComponent;
