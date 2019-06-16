import React, {Component} from 'react';
import './Products.css';
import axios from "axios";
import {Link} from 'react-router-dom';
import logo1 from '../resources/1.jpg';
import logo2 from '../resources/2.jpg';

class bag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            isPointed: false,
            selected: ''
        }
    }

    componentWillMount() {
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.get(`/listReference`, config)
            .then(res => {
                console.log(res.data);
                this.setState({characters: res.data})
            })
            .catch((error) => {
                console.log(error);
            });

    }

    mouseEnter(ev, key) {
        ev.preventDefault();
        this.setState({isPointed: true, selected: key});
    }

    mouseLeave(ev, key) {
        ev.preventDefault();
        this.setState({isPointed: false, selected: key});
    }

    render() {
        const {characters} = this.state;

        return (
            <div>
                <h1>Jackets</h1>
                <nav className="product-filter">


                    <div className="sort">
                        <div className="collection-sort">
                            <label className="label-product">Filter by:</label>
                            <select>
                                <option value="/">All Jackets</option>
                                <option value="/">2016</option>
                                <option value="/">jacket</option>
                                <option value="/">Jackets</option>
                                <option value="/">layers</option>
                                <option value="/">Obermeyer</option>
                                <option value="/">Roxy</option>
                                <option value="/">womens</option>
                            </select>
                        </div>

                        <div className="collection-sort">
                            <label className="label-product">Sort by:</label>
                            <select>
                                <option value="/">Featured</option>
                                <option value="/">Best Selling</option>
                                <option value="/">Alphabetically, A-Z</option>
                                <option value="/">Alphabetically, Z-A</option>
                                <option value="/">Price, low to high</option>
                                <option value="/">Price, high to low</option>
                                <option value="/">Date, new to old</option>
                                <option value="/">Date, old to new</option>
                            </select>
                        </div>
                    </div>
                </nav>

                <section className="products">
                    {characters.map((character, index) => {
                            const id = character.ref;
                            return (

                                <Link key={index}
                                      className="product-card" to={`/product/${id}`}>

                                    <div className="product-image" onMouseEnter={(e) => this.mouseEnter(e, index)}
                                         onMouseLeave={(e) => this.mouseLeave(e, index)}>
                                        {(this.state.isPointed && this.state.selected === index) ?
                                            <img alt="hamid"
                                                 src={logo1}/>
                                            : <img alt="hamid1"
                                                   src={logo2}/>
                                        }
                                    </div>
                                    <div className="product-info">
                                        <h5>{character.ref}</h5>
                                        <h6>{character.price} $</h6>
                                    </div>
                                </Link>

                            )
                        }
                    )}
                </section>
            </div>

        );
    }
}

export default bag;