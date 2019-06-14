import React, {Component} from 'react';
import axios from "axios";
import logo1 from '../resources/1.jpg';
import './ProductDetail.css';

class productDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: []
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
                        <input
                            type="button"
                            value="Add to bag"
                            onClick={this.submitForm} />
                    </div>
                </div>
            </>
        );
    }
}

export default productDetail;