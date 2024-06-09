import React from 'react';
import LOGO from '../../../assets/logos/logo_VBlanc.png';
import './AdminMenu.css';
import SecondaryBouton from '../../atoms/secondary-bouton/SecondaryBouton';
import { useNavigate } from 'react-router-dom';

const AdminMenu = () => {
    const navigate = useNavigate();

    let handleDeconnection = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    }

    return (
        <nav className="sidebar">
            <ul className="sidebar-nav">
                <li className="logo-item">
                    <a href='/admin/dashboard'><img src={LOGO} alt="Logo" className="logo" /></a>
                </li>
                <li className="sidebar-item">
                    <h3 className="sidebar-link">Gestion :</h3>
                </li>
                <li className="sidebar-item">
                    <a href="/admin/users" className="sidebar-link">Gérer les utilisateurs</a>
                </li>
                <li className="sidebar-item">
                    <a href="/admin/animes" className="sidebar-link">Gérer les Animes</a>
                </li>
                <li className="sidebar-item">
                    <a href="/admin/genres" className="sidebar-link">Gestion des Genres</a>
                </li>
                <li className="sidebar-item">
                    <a href="/admin/seasons" className="sidebar-link">Gestion des Saisons/Année</a>
                </li>
                <li className="sidebar-item sidebar-action">
                    <SecondaryBouton 
                        name="Déconnexion" 
                        style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(229, 193, 79, 1)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', 'cursor': 'pointer' }}
                        onHoverStyle={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(229, 193, 79, 1)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', 'cursor': 'pointer' }}
                        Submit={() => handleDeconnection()}
                    />
                </li>
            </ul>
        </nav>
    );
};

export default AdminMenu;