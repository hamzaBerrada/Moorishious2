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

    render() {
        const {character} = this.state;
        return (
            <>
                <div className="Container-product">
                    <div className="Img-catalogue">
                        <img src={logo1} alt="text"/>
                    </div>
                    <div className="Product-details">
                        <h1>product detail</h1>
                        <h1>{character.ref}</h1>
                        <h1>{character.name}</h1>
                        <h1>{character.price}</h1>
                        <h1>{character.gender}</h1>
                        <h1>{character.category}</h1>
                        <h1>{character.subCategory}</h1>
                        <h1>{character.desc}</h1>
                    </div>
                </div>
            </>
        );
    }
}

export default productDetail;