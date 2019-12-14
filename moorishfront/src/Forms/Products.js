import React, {Component} from 'react';
import './Products.css';
import axios from "axios";
import {Link} from 'react-router-dom';
import logo1 from '../resources/1.jpg';
import logo2 from '../resources/2.jpg';

class Products extends Component {
    constructor(props) {
        super(props);
        const colors = {
            'red': false, 'yellow': false, 'green': false, 'black': false, 'purple': false,
            'gray': false, 'blue': false, 'white': false, 'brown': false, 'orange': false
        };
        const sizes = {'XS': false, 'S': false, 'M': false, 'L': false, 'XL': false, '2XL': false,
            '3XL': false, '4XL': false};

        this.state = {
            characters: [],
            isPointed: false,
            selected: '',
            colors,
            sizes,
            subCategories: [],
            brands: [],
            filters: [
                character => true,
                character => true,
                character => true,
                character => true,
                character => true
            ]
        }
    }

    componentWillMount() {
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        const category = this.props.match.params.category.toUpperCase();
        const gender = this.props.match.params.gender.toUpperCase();
        this.setState({gender: gender, category: category});

        axios.get(`/listReference`, config)
            .then(res => {
                this.setState({characters: (res.data).filter(r=>r.gender=== gender
                        && r.category=== category)});
            })
            .catch((error) => {
                console.log(error);
            });

        axios.post(`/subCategory`, category)
            .then(res => {
                const subCategories = ['ALL', ...res.data];
                this.setState({subCategories: subCategories})
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(`/brandReference`)
            .then(res => {
                const brands = ['ALL', ...res.data];
                this.setState({brands: brands})
                console.log("this is the brands : ",this.state.brands);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    mouseEnter(ev, key) {
        ev.preventDefault();
        this.setState({isPointed: true, selected: key});
    }

    mouseLeave(ev, key) {
        ev.preventDefault();
        this.setState({isPointed: false, selected: key});
    }

    filterPrice = (minRange, maxRange) => {
        const {filters} = this.state;
        filters[0] = character => character.price > minRange && character.price <= maxRange;
        this.setState({ filters });
    }

    filterColor = (event,index) => {
        let {colors, filters} = this.state;
        colors[index] = event.target.checked;

        let selectedColors = Object.keys(colors).filter(key => colors[key]);
        if(selectedColors.length === 0) {
            filters[1] = character => true;
            this.setState({ filters });
            return;
        }
        const hasSelectedColor = character => {
            for(let i = 0; i < character.colors.length; ++i) {
                for(let j = 0; j < selectedColors.length; ++j) {
                    if(character.colors[i] === selectedColors[j]) {
                        return true;
                    }
                }
            }
            return false;
        }
        filters[1] = hasSelectedColor;
        this.setState({ filters });
    }

    filterSize = (event,index) => {
        let {sizes, filters} = this.state;
        sizes[index] = event.target.checked;

        let selectedSizes = Object.keys(sizes).filter(key => sizes[key]);
        if(selectedSizes.length === 0) {
            filters[2] = character => true;
            this.setState({ filters });
            return;
        }
        const hasSelectedSize = character => {
            for(let i = 0; i < character.sizes.length; ++i) {
                for(let j = 0; j < selectedSizes.length; ++j) {
                    if(character.sizes[i] === selectedSizes[j]) {
                        console.log("character :",character.sizes[i])
                        return true;
                    }
                }
            }
            return false;
        }
        filters[2] = hasSelectedSize;
        this.setState({ filters });
    }

    filterBrand = (brand) => {
        const {filters} = this.state;
        if(brand === 'ALL') filters[4] = character => character.brand !== brand;
        else filters[3] = character => character.brand === brand;
        this.setState({ filters });
    }

    filterSubCategory = (subCategory) => {
        const {filters} = this.state;
        if(subCategory === 'ALL') filters[4] = character => character.subCategories !== subCategory;
        else filters[4] = character => character.subCategory === subCategory;
        this.setState({ filters });
    }

    render() {
        const {characters, colors, sizes, filters, subCategories, brands} = this.state;
        const displayedCharacters = characters.filter(filters[0])
            .filter(filters[1])
            .filter(filters[2])
            .filter(filters[3])
            .filter(filters[4]);

        return (
            <div>
                <p>MOORISH | {this.state.gender} | {this.state.category}</p>

                <div>
                    <h2>Filter By</h2>
                    <label>Price</label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="range"
                            value="all"
                            onChange={() => this.filterPrice(0.0001, Number.MAX_SAFE_INTEGER)}/>
                        ALL</label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="range"
                            value="0-150"
                            onChange={() => this.filterPrice(0.0001, 150)}/>
                        0$-150$</label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="range"
                            value="150-300"
                            onChange={() => this.filterPrice(150, 300)}/>
                        150$-300$</label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="range"
                            value="300-500"
                            onChange={() => this.filterPrice(300, 500)}/>
                        300$-500$</label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="range"
                            value="500"
                            onChange={() => this.filterPrice(500, Number.MAX_SAFE_INTEGER)}/>
                        500$-more</label>

                    <label>Size</label>
                    <div className="Product-sizes">
                        {(Object.keys(sizes)).map(size => {
                            return (
                                <div key={size}>
                                    <input type='checkbox'
                                           onChange={(e) => this.filterSize(e,size)}/>
                                    <div className="Product-size">{size}</div>
                                </div>
                            )
                        })
                        }
                    </div>

                    <label>Color</label>
                    <div className="Product-colors">
                        {(Object.keys(colors)).map((col) => {
                            return (
                                <div key={col}>
                                    <input type='checkbox'
                                           onChange={(e) => this.filterColor(e,col)}/>
                                    <div className="Product-color" style={{"backgroundColor": col}}> </div>
                                </div>)
                        })
                        }
                    </div>

                    <label>Brand</label>
                        {brands.map((brand) => {
                         return (
                             <label className="radio" key={brand}>
                                <input
                                    type="radio"
                                    name="brand"
                                    value="brand"
                                    onChange={() => this.filterBrand(brand)}/>
                                {brand}</label>)
                        })}

                    <label>Category</label>
                    {subCategories.map((sub) => {
                        return (
                            <label className="radio" key={sub}>
                                <input
                                    type="radio"
                                    name="sub"
                                    value="sub"
                                    onChange={() => this.filterSubCategory(sub)}/>
                                {sub}</label>)
                    })}

                </div>

                <section className="products">
                    {displayedCharacters.map((character, index) => {
                            const id = character.ref;
                            return (
                                <Link key={index}
                                      className="product-card" to={{
                                          pathname: `/${character.gender.toLowerCase()}/${character.category.toLowerCase()}/${id}`
                                      }}>

                                    <div className="product-image" onMouseEnter={(e) => this.mouseEnter(e, index)}
                                         onMouseLeave={(e) => this.mouseLeave(e, index)}>
                                        {(this.state.isPointed && this.state.selected === index) ?
                                            <img alt="hamid"
                                                 src={logo1}/>
                                            : <img alt="hamid1"
                                                   src={logo2}/>
                                        }
                                    </div>
                                    <div className="product-info">
                                        <h5>{character.ref}</h5>
                                        <h6>{character.price} $</h6>
                                    </div>
                                </Link>
                            )
                        }
                    )}
                </section>
            </div>

        );
    }
}

export default Products;