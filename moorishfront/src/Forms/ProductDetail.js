import React, {Component} from 'react';
import axios from "axios";
import logo1 from '../resources/1.jpg';
import '../CSS/ProductDetail.css';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        const ref = this.props.match.params.id;
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.get(`/getReference/${ref}`, config)
            .then(res => {
                let product = this.state;
                product.ref = res.data;
                this.setState({character: res.data});
                console.log("character:: ", this.state.character);
            })
            .catch((error) => {
                console.log("could not retreive the param ", ref);
            });

        const product = {
            ref: this.props,
            color: 'BLACK',
            size: 'M',
            quantity: 1
        }

        this.state = {
            character: [],
            bag: [],
            product,
            colors: [],
            sizes: [],
            qty: 1
        }
    }

    componentWillMount() {
        this.getColors();
        this.getSizes();

        const val = localStorage.getItem('bagNotAuth') || '';
        const bag = [];
        val !== '' ? this.bag = JSON.parse(val) : this.bag = [];
        this.setState({bag : this.bag});
    }

    componentDidMount() {
        // when user leaves/refreshes the page
        //localStorage.setItem('bagNotAuth', JSON.stringify(this.state.bag))
    }

    componentWillUnmount() {
        // saves if component has a chance to unmount
        //localStorage.setItem('bagNotAuth', JSON.stringify(this.state.bag))
    }

    getColors = () => {
        axios.get(`/getColors`)
            .then(res => {
                console.log("getColors : ", res.data);
                this.setState({colors: res.data});
            }).catch((error) => {
            console.log("can't get colors");
        });
    }

    getSizes = () => {
        axios.get(`/getSizes`)
            .then(res => {
                console.log("getSizes : ", res.data);
                this.setState({sizes: res.data});
            }).catch((error) => {
            console.log("can't get sizes");
        });
    }

    changeColor = (col) => {
        const { product }  = this.state;
        product.color = col;
        console.log(col);
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
        product.ref = character;
        console.log("product : ", product);
        !this.isAuthenticated()
            ?   this.storeBagToVisitor(product)
            :   this.storeBagToAuthenticatedUser(product);

        this.setState(() => { return { product: {}}});
    }

    storeBagToVisitor =(product) => {
        this.setState(prevState => {
            return {
                product: {},
                bag: [...prevState.bag, product]
            }
        }, () => {
                localStorage.setItem('bagNotAuth', JSON.stringify(this.state.bag))
        });
    }

    storeBagToAuthenticatedUser = (product) => {
        const jsonToken = localStorage.getItem('userInfo');
        const token = JSON.parse(jsonToken);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${token}`
        }
        console.log("this is the sent product : ",product);
        axios.post(`/addToBag`, product, { headers: headers})
            .then(res => {
                console.log("the bag : ", res.data);
            }).catch((error) => {
            console.log("could not add to bag");
        });
    }

    isAuthenticated = () => {
        return localStorage.getItem('userInfo');
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
                            {(this.state.sizes).map(size => {
                                return (<div key={size} className="Product-size"
                                             onClick={()=>this.changeSize(size)}>{size}</div>)
                            })
                            }
                        </div>

                        <div className="Product-colors">
                            {(this.state.colors).map(col => {
                                return (<div key={col} className="Product-color" style={{"backgroundColor" : col}}
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

export default ProductDetail;