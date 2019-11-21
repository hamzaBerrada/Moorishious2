import React, {Component} from 'react';
import './App.css';
import './Forms/ListReference'
import ListReference from "./Forms/ListReference";
import AddReference from "./Forms/AddReference";
import axios from "axios";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import logo from "./resources/logo.png";
import './Forms/Menu.css';
import Products from "./Forms/Products";
import ProductDetail from "./Forms/ProductDetail";
import Bag from "./Forms/Bag.js";
import ProductsByGender from "./Forms/ProductsByGender";
import ProductsByCategory from "./Forms/ProductsByCategory";


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
                                    <li>
                                        <Link className="cool" to="/bag">Bag</Link>
                                    </li>
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
                    </div>


                </Router>





            </>
        );
    }
}

export default App;
