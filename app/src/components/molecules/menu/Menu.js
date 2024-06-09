import React from 'react';
import Logo from '../../atoms/icons/logo/Logo';
import Bouton from '../../atoms/cta-bouton/CTABouton';
import burgerIcon from '../../../assets/icons/global/burger.svg'; 
import './Menu.css';

function Menu() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <nav className="menu">
            <button className="burger" onClick={() => setIsOpen(!isOpen)}>
                <img src={burgerIcon} alt="Menu" />
                <div><a href="#">L’univers</a></div>
                <div><a href="#">Contexte</a></div>
                <div><a href="#">Les plus</a></div>
                <div><a href="#">Témoignages</a></div>
                <div><a href="#">Contact</a></div>
                <div><a href="#">Télécharger</a></div>
            </button>
            {isOpen && (
                <ul className="nav-links">
                    <li><a href="#">L’univers</a></li>
                    <li><a href="#">Contexte</a></li>
                    <li><a href="#">Les plus</a></li>
                    <li><a href="#">Témoignages</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            )}
            <Logo />
            <div className="buttons">
                <Bouton name="Télécharger" onClick={() => console.log('Bouton cliqué')} />
            </div>
        </nav>
    );
}

export default Menu;