import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

class ProductsByCategory extends Component {
    constructor(props) {
        super(props);

        this.state ={
            categories: [],
            gender: ''
        }
    }

    componentWillMount() {
        const gender = this.props.match.params.gender.toUpperCase();
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.get(`/getCategoriesByGender/${gender}`, config)
            .then(res => {
                let categories = res.data;
                this.setState({categories, gender});
                console.log("componentWillMount : ", this.state.categories);
            })
            .catch((error) => {
                console.log("could not retreive the param ");
            });
    }

    render() {
        const {categories,gender} = this.state;

        return (
            <div>
                {categories.map((category, index)=>(
                    <div>
                    <Link key={index} to={{
                        pathname: `/${gender.toLowerCase()}/${category.toLowerCase()}`
                    }}>
                        {category}
                    </Link>
                    </div>
                )
                )}
            </div>

        );
    }
}

export default ProductsByCategory;