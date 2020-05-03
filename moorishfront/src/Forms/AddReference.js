import React, {Component} from 'react';
import '../CSS/AddReference.css';
import axios from "axios";

class AddReference extends Component {
    constructor(props) {
        super(props);

        const selectedColors = {
            'RED': true, 'YELLOW': true, 'GREEN': true, 'BLACK': true, 'PURPLE': true,
            'GRAY': true, 'BLUE': true, 'WHITE': true, 'BROWN': true, 'ORANGE': true
        };
        const selectedSizes = {'XS': true, 'S': true, 'M': true, 'L': true, 'XL': true, 'XXL': true,
            'XXXL': true, 'XXXXL': true};

        this.character = {
            ref: '',
            name: '',
            price: '',
            gender: 'MEN',
            category: [],
            subCategory: [],
            brand: [],
            desc: '',
            colors:[],
            sizes:[],
            file: null,

            error: '',
            msg: '',

            checkSize: 'checkedSize',
            checkColor: 'checkedColor'
        };

        this.state = {
            character: this.character,
            characters: [],
            selectedColors,
            selectedSizes};
    }

    componentWillMount() {
        axios.get(`/categoryReference`)
            .then(res => {
                const character = {...this.state.character};
                character.category = res.data;
                this.setState({character: character})
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(`/brandReference`)
            .then(res => {
                const character = {...this.state.character};
                character.brand = res.data;
                this.setState({character: character})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleCategory = event => {
        this.handleChange(event);
        const cat = "" + event.target.value;
        console.log(cat);
        axios.post(`/subCategory`, cat)
            .then(res => {
                const character = {...this.state.character};
                character.subCategory = res.data;
                this.setState({character: character})
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    changeColor = (event, col) => {
        let {selectedColors} = this.state;
        selectedColors[col] = event.target.checked;
        this.setState({selectedColors});
    }

    changeSize = (event,size) => {
        let {selectedSizes} = this.state;
        selectedSizes[size] = event.target.checked;
        this.setState({selectedSizes});
    }

    submitForm = (event) => {
        event.preventDefault();


        //////////////////////Upload///////////////////////////
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        // event.preventDefault();
        this.setState({error: '', msg: ''});
        if (!this.state.file) {
            this.setState({error: 'Please upload a file.'})
            return;
        }
        if (this.state.file.size >= 2000000) {
            this.setState({error: 'File size exceeds limit of 2MB.'})
            return
        }

        let data = new FormData();

        data.append('file', this.state.file);
        //data.append('name', this.state.file.name);
        axios.post(`/uploadFile`, data, config)
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        ////////////////////////////////////////////////////////
        const {selectedColors, selectedSizes, character} = this.state;
        let colors = Object.keys(selectedColors).filter(key => selectedColors[key]);
        let sizes = Object.keys(selectedSizes).filter(key => selectedSizes[key]);
        character.colors = colors;
        character.sizes = sizes;
        this.setState({character: character});

        const reference = {
            ref: this.state.ref,
            name: this.state.name,
            price: this.state.price,
            gender: this.state.gender,
            category: this.state.category,
            subCategory: this.state.subCategory,
            brand: this.state.brand,
            desc: this.state.desc,
            colors: this.state.character.colors,
            sizes: this.state.character.sizes
        }
        axios.post(`/addReference`, reference)
            .then(res => {
                this.props.handleSubmit(reference);
            }).catch((error) => {
            console.log("could not add the ref ");
        });

        this.setState(this.character);
    }

    render() {
        const {ref, name, price, gender, category, subCategory, brand, desc, selectedColors, selectedSizes} = this.state;
        const {checkSize, checkColor} = this.state.character;

        return (
            <form>
                <label>Reference</label>
                <input
                    type="text"
                    name="ref"
                    value={ref}
                    onChange={this.handleChange}/>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}/>
                <label>Price</label>
                <input
                    type="text"
                    name="price"
                    value={price}
                    placeholder="EURO"
                    onChange={this.handleChange}/>
                <label>Gender</label>
                <label className="radio">
                    <input
                        type="radio"
                        name="gender"
                        value="MEN"
                        checked={gender === 'MEN'}
                        onChange={this.handleChange}/>
                    MEN</label>
                <label className="radio">
                    <input
                        type="radio"
                        name="gender"
                        value="WOMEN"
                        onChange={this.handleChange}/>
                    WOMEN</label>
                <label>Category</label>
                <select name="category" value={category} onChange={this.handleCategory} multiple={true}>
                    {this.state.character.category.map(field => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>
                <label>Subcategory</label>
                <select name="subCategory" value={subCategory} onChange={this.handleChange} multiple={false}>
                    {this.state.character.subCategory.map(field => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>
                <label>Brand</label>
                <select name="brand" value={brand} onChange={this.handleChange} multiple={false}>
                    {this.state.character.brand.map(field => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>
                <label>Description</label>
                <textarea
                    name="desc"
                    value={desc}
                    onChange={this.handleChange}/>

                <label>Choose sizes</label>
                <div className="Product-sizes">
                    {(Object.keys(selectedSizes)).map(size => {
                        return (
                            <div key={size}>
                                <input type='checkbox' checked={selectedSizes[size]}
                                       onChange={(event) => this.changeSize(event, size)}/>
                                <div className={checkSize}>{size}</div>
                            </div>
                        )
                    })
                    }
                </div>
                <label>Choose colors</label>
                <div className="Product-colors">
                    {(Object.keys(selectedColors)).map((col) => {
                        return (
                            <div key={col}>
                                <input type='checkbox' checked={selectedColors[col]}
                                       onChange={(event) => this.changeColor(event, col)}/>
                                <div className={checkColor} style={{"backgroundColor": col}}> </div>
                            </div>)
                    })
                    }
                </div>

                <label>Principal Image</label>
                <div className="App-intro">
                    <h4 style={{color: 'red'}}>{this.state.error}</h4>
                    <h4 style={{color: 'green'}}>{this.state.msg}</h4>
                    <input onChange={this.onFileChange} multiple type="file"/>
                </div>

                <input
                    type="button"
                    value="Submit"
                    onClick={this.submitForm}/>
            </form>
        );
    }

}

export default AddReference;
