import React, {Component} from 'react';
import '../CSS/Menu.css';
import logo from '../resources/logo.png';

class Menu extends Component {

    render() {
        return (
            <header>
                <div className="logo">
                    <img className="logo-menu" src={logo} alt={"Moorish"}/>
                </div>
                <nav>
                    <ul>
                        <li><a href="#men" className="active cool">Men</a></li>
                        <li><a href="#women" className="cool">Women</a></li>
                        <li><a href="#panier" className="cool">Panier</a></li>
                        <li><a href="#login" className="cool">Connexion</a></li>
                    </ul>
                </nav>
                <div className="menu-toggle">
                    <i className="fa fa-bars" aria-hidden="true">
                    </i>
                </div>
            </header>




        )
    }


}

export default Menu;