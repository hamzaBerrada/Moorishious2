import React, {Component} from 'react';
import './Bag.css';
import AddUserInfo from "./AddUserInfo";
import axios from "axios";
import SignIn from "./SignIn";

class Bag extends Component {
    constructor(props) {
        super(props);

        const product = {
            ref: {},
            color: '',
            size: ''
        }

        this.state = {
            color: [],
            size: [],
            quantity : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            product,
            toggleBag: true,
            toggleAsGuest: false,
            toggleSignIn: false,
            bag: []
        }

        this.isAuthenticated()
            ?  this.getBagAuthenticatedUser()
            :  this.getBagAsGuest();

        setTimeout(() => {
            console.log('timeout bag ', this.state.bag);
        }, 500);
    }

    componentWillMount() {

    }

    changeColor = (ev, index) => {
        const newElem = ev.target.value;
        let {bag} = this.state;
        bag[index].color = newElem;
        this.setState(() => {
            return {bag}
        }, () => {
            this.isAuthenticated()
            ?   this.updateBagAuthenticatedUser(bag[index])
            :   localStorage.setItem('bagNotAuth', JSON.stringify(bag))
        })
    }

    changeSize = (ev, index) => {
        const newSize = ev.target.value;
        let {bag} = this.state;
        bag[index].size = newSize;
        this.setState(() => {
            return {bag}
        }, () => {
            this.isAuthenticated()
                ?   this.updateBagAuthenticatedUser(bag[index])
                :   localStorage.setItem('bagNotAuth', JSON.stringify(bag))
        })
    }

    changeQty = (ev, index) => {
        const newQuantity = ev.target.value;
        let {bag} = this.state;
        bag[index].quantity = newQuantity;
        this.isAuthenticated()
            ?   this.updateBagAuthenticatedUser(bag[index])
            :   localStorage.setItem('bagNotAuth', JSON.stringify(bag));
                this.setState({bag});
    }

    updateBagAuthenticatedUser = (product) => {
        console.log("product id : ", product.id);
        const jsonToken = localStorage.getItem('userInfo');
        const token = JSON.parse(jsonToken);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${token}`
        }
        axios.post(`/updateBag`, product, { headers: headers})
            .then(res => {
                console.log("the bag was updated : ", res.data);
                this.setState({bag:res.data});
            }).catch((error) => {
            console.log("could not update the bag");
        });
    }

    deleteProduct = (e, index) => {
        let {bag} = this.state;
        this.isAuthenticated()
            ?   this.deleteProductAuthenticatedUser(bag[index])
            :   this.deleteProductAsGuest(bag,index);
    }

    deleteProductAsGuest = (bag, index) =>{
        if (index !== -1) {
            bag.splice(index, 1);
            localStorage.setItem('bagNotAuth', JSON.stringify(bag));
            this.setState({bag:bag});
        }
        else console.log("error retrieving index");
    }

    deleteProductAuthenticatedUser = (product) =>{
        console.log("Product : ", product);
        const jsonToken = localStorage.getItem('userInfo');
        const token = JSON.parse(jsonToken);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${token}`
        }
        axios.post(`/deleteProduct`, product, { headers: headers})
            .then(res => {
                this.setState({bag: res.data});
            }).catch((error) => {
            console.log("Not deleted");
        });
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

    getBagAuthenticatedUser = () => {
        const jsonToken = localStorage.getItem('userInfo');
        const token = JSON.parse(jsonToken);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${token}`
        }
        axios.get(`/listBag`, { headers: headers})
            .then(res => {
                if((res.data) === null || (res.data) === "" || (res.data) === undefined) return;
                else this.setState({bag: res.data});
            }).catch((error) => {
            this.setState({bag: []});
            console.log("could not get bag");
        });
    }

    getBagAsGuest = () => {
        const val = localStorage.getItem('bagNotAuth') || '';
        const bag = [];
        val !== '' ? this.bag = JSON.parse(val) : this.bag = [];

        const bagAsGuest = this.bag;
        axios.get(`/listReference`)
            .then(res => {
                    let refs = res.data;
                    let newBag = [];
                    refs.map((ref) => {
                        for (let i = 0; i < bagAsGuest.length; i++) {
                            if (ref.id === bagAsGuest[i].ref.id) {
                                newBag = [...newBag, bagAsGuest[i]];
                            }
                        }
                    });
                    this.setState({bag: newBag});
            }).catch((error) => {
            console.log("could not upload the bag");
        });
    }

    isAuthenticated = () => {
        return localStorage.getItem('userInfo');
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
                                            <p>{key.ref.name}</p>
                                            <p>{key.ref.price} $</p>
                                            <p>{key.ref.category}</p>
                                            <p>{key.ref.subCategory}</p>

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
                                            <select name="color" value={key.color} selected={key.color}
                                                    onChange={(ev) => this.changeColor(ev, index)}
                                                    multiple={false}>
                                                {(key.ref.colors).map(field => (
                                                    <option key={field} value={field}>
                                                        {field}
                                                    </option>
                                                ))}
                                            </select>

                                            <label>Size</label>
                                            <select name="size" value={key.size}
                                                    onChange={(ev) => this.changeSize(ev, index)}
                                                    multiple={false}>
                                                {(key.ref.sizes).map(field => (
                                                    <option key={field} value={field}>
                                                        {field}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                type="button"
                                                value="Delete"
                                                onClick={(ev) => this.deleteProduct(ev, index)}/>
                                            <div className="Separation"> </div>
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