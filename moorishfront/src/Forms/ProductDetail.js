import React, {Component} from 'react';
import axios from "axios";
import logo1 from '../resources/1.jpg';
import './ProductDetail.css';

class productDetail extends Component {
    constructor(props) {
        super(props);
        const colors = ['red', 'yellow', 'green', 'black', 'purple', 'gray', 'blue'];
        const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

        const product = {
            reference: this.props,
            color: '',
            size: '',
            quantity: 1
        }

        this.state = {
            character: [],
            bag: JSON.parse(localStorage.getItem('bag') || ''),
            product,
            colors,
            sizes,
            qty: 1
        }
    }

    componentWillMount() {
        const ref = this.props.match.params.id;
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.get(`/getReference/${ref}`, config)
            .then(res => {
                let product = this.state;
                product.reference = res.data;
                this.setState({character: res.data});
            })
            .catch((error) => {
                console.log("could not retreive the param ", ref);
            });

        const val = localStorage.getItem('bag') || '';
        const bag = JSON.parse(val);
        this.setState({bag});

    }

    componentDidMount() {
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            localStorage.setItem('bag', JSON.stringify(this.state.bag))
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            localStorage.setItem('bag', JSON.stringify(this.state.bag))
        );

        // saves if component has a chance to unmount
        localStorage.setItem('bag', JSON.stringify(this.state.bag))
    }

    changeColor = (col) => {
        const { product }  = this.state;
        product.color = col;
        this.setState({product});
    }

    changeSize = (size) => {
        const { product } = this.state;
        product.size = size;
        this.setState({product});
    }

    changeQty = (qty) =>{
        const { product }  = this.state;
        product.quantity = qty.target.value;
        this.setState({product});
    }

    submitForm = (character) => {
        let { product }  = this.state;
        product.reference = character;
        this.setState(prevState => {
            return {
                product: {},
                bag: [...prevState.bag, product]
            }
        }, () => {
            localStorage.setItem('bag', JSON.stringify(this.state.bag));
            console.log('The selected product is : ', this.state)});

        this.setState(() => { return { product: {}}});
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
                        <p>product detail</p>
                        <p>{character.ref}</p>
                        <p>{character.name}</p>
                        <p>{character.price}</p>
                        <p>{character.gender}</p>
                        <p>{character.category}</p>
                        <p>{character.subCategory}</p>
                        <p>{character.desc}</p>

                        <input type="number"  min="1" max="10" value={this.state.product.quantity || 1}
                               onInput={this.changeQty} />

                        <div className="Product-sizes">
                            {this.state.sizes.map(size => {
                                return (<div className="Product-size"
                                             onClick={()=>this.changeSize(size)}>{size}</div>)
                            })
                            }
                        </div>

                        <div className="Product-colors">
                            {this.state.colors.map(col => {
                                return (<div className="Product-color" style={{"backgroundColor" : col}}
                                             onClick={()=>this.changeColor(col)}> </div>)
                            })
                            }
                        </div>

                        <input
                            type="button"
                            value="Add to bag"
                            onClick={()=>this.submitForm(character)}/>
                    </div>
                </div>
            </>
        );
    }
}

export default productDetail;