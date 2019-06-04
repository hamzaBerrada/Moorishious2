import React, {Component} from 'react';
import axios from "axios";

class productDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: []
        }
    }

    componentDidMount() {
        console.log("willMount");

        const ref = this.props.match.params.id;
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.get(`http://localhost:8080/getReference/${ref}`, config)
            .then(res => {
                console.log("la reference",res.data);
                this.setState({character: res.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const {character}= this.state;
        console.log(character);
        return (
            <div>
                <h1>product detail</h1>
                <h1>{character.ref}</h1>
            </div>

        );
    }
}

export default productDetail;