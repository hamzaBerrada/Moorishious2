import React, {Component} from 'react';
import './App.css';
import './Forms/ListReference'
import ListReference from "./Forms/ListReference";
import AddReference from "./Forms/AddReference";
import axios from "axios";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import logo from "./resources/logo.png";
import user from "./resources/user.png";
import bag from "./resources/bag.png";
import './Forms/Menu.css';
import Products from "./Forms/Products";
import ProductDetail from "./Forms/ProductDetail";
import Bag from "./Forms/Bag.js";
import ProductsByGender from "./Forms/ProductsByGender";
import ProductsByCategory from "./Forms/ProductsByCategory";
import Popup from "reactjs-popup";
import SignIn from "./Forms/SignIn";
import SignUp_step1 from "./Forms/SignUp_step1";
import SignUp_step2 from "./Forms/SignUp_step2";


class App extends Component {

    state = {
        characters: []
    };

    removeCharacter = ref => {
        axios.post(`http://localhost:8080/deleteReference`, ref)
            .then(() => {
                const {characters} = this.state;
                this.setState({
                    characters: characters.filter((character) => {
                        return character.ref !== ref.ref;
                    })
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]});
    }

    render() {

        return (
            <>
                <Router>
                        <header>
                            <div className="logo">
                                <img src={logo} alt={"Moorish"}/>
                            </div>
                            <nav>
                                <ul>
                                    <li>
                                        <Link className="cool" to="/addReference">Add Reference</Link>
                                    </li>
                                    <li>
                                        <Link className="active cool" to="/table">List Reference</Link>
                                    </li>
                                    <li>
                                        <Link className="cool" to="/products">Products</Link>
                                    </li>
                                    <Link className="bag" to="/bag">
                                        <img src={bag} alt={"Bag"}/>
                                    </Link>
                                    <Popup trigger={<img className="logIn" src={user} alt={"User"}/>} modal>
                                        {close => (
                                            <div>
                                                <a className="close" onClick={close}>
                                                    &times;
                                                </a>
                                                <SignIn></SignIn>
                                            </div>
                                        )}
                                    </Popup>
                                </ul>
                            </nav>
                            <div className="menu-toggle">
                                <i className="fa fa-bars" aria-hidden="true">
                                </i>
                            </div>
                        </header>

                    <div className="container">
                        <Route exact path="/" component={ProductsByGender}/>
                        <Route path="/table"
                               render={() => <ListReference
                                   removeCharacter={this.removeCharacter}
                               />}/>
                        <Route exact path="/addReference" render={() => <AddReference handleSubmit={this.handleSubmit}/>}/>
                        <Route exact path="/bag" component={Bag}/>
                        <Route exact path='/:gender' component={ProductsByCategory}/>
                        <Route exact path="/:gender/:category" component={Products}/>
                        <Route exact path='/:gender/:category/:id' component={ProductDetail}/>
                        <Route exact path='/signUp_step1' component={SignUp_step1}/>
                        <Route exact path='/signUp_step2' component={SignUp_step2}/>
                    </div>

                </Router>

            </>
        );
    }
}

export default App;
