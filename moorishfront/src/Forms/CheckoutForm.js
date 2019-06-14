import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from "axios";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.payement = {
            amount : '',
            currency : '',
            description : '',
            source : ''
        }

        this.state = {complete: false, payement : this.payement};

    }

     async submit(evt){
        evt.preventDefault();
        let {token}= await this.props.stripe.createToken({name : "Name"});
        console.log(token.id);
        const payement  ={... this.state.payement} ;
        payement.source = "tok_mastercard";
        this.setState({payement : payement});

        console.log(this.state.payement.source);
        axios.post(`/getPaid/`, payement)
            .then(res => {
                if(res.status === 200) this.setState({complete : true});
            })
    }

    render() {
        const complete = this.state.complete;
        return (
            <div className="checkout">
                {complete?
                    ( <h1>Purchase Complete</h1>) : (<p></p>)
                }
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);