import React, {Component} from 'react';
import axios from "axios";
import logo1 from '../resources/1.jpg';
import './ProductDetail.css';

class productDetail extends Component {
    constructor(props) {
        super(props);
        const colors = ['red', 'yellow', 'green', 'black', 'purple', 'gray', 'blue'];

        const product = {
            reference: this.props,
            color: '',
            quantity: ''
        }
        this.state = {
            character: [],
            bag: [],
            colors,
            product,
            colr: "",
            qty: 1
        }
    }

    componentWillMount() {

        const ref = this.props.match.params.id;
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.get(`/getReference/${ref}`, config)
            .then(res => {
                this.setState({character: res.data})
            })
            .catch((error) => {
                console.log("could not retreive the param ", ref);
            });
    }

    submitForm = (event) => {
        console.log("hamid in product Detail");
    }

    changeColor = (coll) => {
        console.log("the selected color is : ", coll);
        this.setState({colr: coll});
    }

    changeQty = (evt) =>{
        const val = (evt.target.validity.valid) ? evt.target.value : this.state.qty;
        this.setState({qty: val});

        console.log("the selected product is : ", this.state.product);
    }

    render() {
        const {character} = this.state;
        return (
            <>
                <div className="Container-product">
                    <div className="Img-catalogue">
                        <img src={logo1} alt="text"/>
                    </div>
                    <div className="Product-details">
                        <h4>product detail</h4>
                        <h4>{character.ref}</h4>
                        <h4>{character.name}</h4>
                        <h4>{character.price}</h4>
                        <h4>{character.gender}</h4>
                        <h4>{character.category}</h4>
                        <h4>{character.subCategory}</h4>
                        <h4>{character.desc}</h4>

                        <input type="number"  min="1" max="10" value={this.state.qty}
                               onInput={this.changeQty} />

                        <div className="Product-colors">
                            {this.state.colors.map(col => {
                                return (<div className="Product-color" style={{"background-color" : col}}
                                             onClick={()=>this.changeColor(col)}> </div>)
                            })
                            }
                        </div>

                        <input
                            type="button"
                            value="Add to bag"
                            onClick={this.submitForm}/>
                    </div>
                </div>
            </>
        );
    }
}

export default productDetail;