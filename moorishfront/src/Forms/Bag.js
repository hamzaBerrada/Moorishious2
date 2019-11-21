import React, {Component} from 'react';
import './Bag.css';
import AddUserInfo from "./AddUserInfo";
import axios from "axios";
import SignIn from "./SignIn";

class Bag extends Component {
    constructor(props) {
        super(props);
        const color = ['red', 'yellow', 'green', 'black', 'purple', 'gray', 'blue'];
        const size = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
        const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const product = {
            reference: {},
            color: '',
            size: ''
        }

        this.state = {
            color,
            size,
            quantity,
            product,
            toggleBag: true,
            toggleAsGuest: false,
            toggleSignIn: false
        }
    }

    componentWillMount() {
        const val = localStorage.getItem('bag') || '';
        const bag = JSON.parse(val);

        this.setState({bag});

        // this.setState(prevState=>{
        //      return {bag : [...prevState, bag]}
        //  });
        setTimeout(() => {

            console.log('timeout bag ', this.state.bag);
        }, 500)
    }

    changeColor = (ev, index) => {
        const newElem = ev.target.value;
        let {bag} = this.state;
        bag[index].color = newElem;
        this.setState(() => {
            return {bag}
        }, () => {
            localStorage.setItem('bag', JSON.stringify(bag))
        })
    }

    changeSize = (ev, index) => {
        const newSize = ev.target.value;
        let {bag} = this.state;
        bag[index].size = newSize;
        this.setState(() => {
            return {bag}
        }, () => {
            localStorage.setItem('bag', JSON.stringify(bag))
        })
    }

    changeQty = (ev, index) => {
        const newQuantity = ev.target.value;
        let {bag} = this.state;
        bag[index].quantity = newQuantity;
        this.setState(() => {
            return {bag}
        }, () => {
            localStorage.setItem('bag', JSON.stringify(bag))
        });
    }

    deleteProduct = (e, index) => {
        let {bag} = this.state;
        if (index !== -1) {
            bag.splice(index, 1);
            this.setState(() => {
                return {bag}
            }, () => {
                localStorage.setItem('bag', JSON.stringify(bag))
            });
        }
    }


    asGuest = () => {
        this.setState({toggleAsGuest: true, toggleSignIn: false, toggleBag: false});
    }

    signIn = () => {
        this.setState({toggleSignIn: true, toggleAsGuest: false, toggleBag: false});
    }

    submitForm = () => {
        const products = this.state.bag;
        console.log("this is the bag in submit form : ", this.state.bag);
        const url = '/purchaseProducts';
        if (products) {
            axios.post(url, products)
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }
    }


    render() {
        const {bag} = this.state;
        const {toggleBag, toggleAsGuest, toggleSignIn} = this.state;
        console.log('render: the bag is ', this.state.bag);
        return (
            <>
                <div className="Bag-Content" hidden={!toggleBag}><h1>Bag</h1>

                    <div>
                        <h1>
                            {bag.map((key, index) => {
                                return (
                                    <div>
                                        <div className="Products-Bag">
                                            <p>{key.reference.name}</p>
                                            <p>{key.reference.price} $</p>
                                            <p>{key.reference.category}</p>
                                            <p>{key.reference.subCategory}</p>

                                            <label>Quantity</label>
                                            <select name="quantity" value={key.quantity}
                                                    onChange={(ev) => this.changeQty(ev, index)} multiple={false}>
                                                {this.state.quantity.map(field => (
                                                    <option key={field} value={field}>
                                                        {field}
                                                    </option>
                                                ))}
                                            </select>

                                            <label>Color</label>
                                            <select name="color" value={key.color}
                                                    onChange={(ev) => this.changeColor(ev, index)}
                                                    multiple={false}>
                                                {(key.reference.colors || this.state.color).map(field => (
                                                    <option key={field} value={field}>
                                                        {field}
                                                    </option>
                                                ))}
                                            </select>

                                            <label>Size</label>
                                            <select name="size" value={key.size}
                                                    onChange={(ev) => this.changeSize(ev, index)}
                                                    multiple={false}>
                                                {(key.reference.sizes ||this.state.size).map(field => (
                                                    <option key={field} value={field}>
                                                        {field}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                type="button"
                                                value="Delete"
                                                onClick={(ev) => this.deleteProduct(ev, index)}/>
                                            <div className="Separation"></div>
                                        </div>
                                    </div>)
                            })}
                        </h1>


                        <input
                            type="button"
                            value="Continue as a guest"
                            onClick={this.asGuest}/>

                        <input
                            type="button"
                            value="Sign in"
                            onClick={this.signIn}/>

                    </div>

                </div>
                <div className="AddUser-Content" hidden={!toggleSignIn}>
                    <SignIn/>
                </div>

                <div className="AddUser-Content" hidden={!toggleAsGuest}>
                    <AddUserInfo/>
                </div>

            </>

        );
    }
}

export default Bag;