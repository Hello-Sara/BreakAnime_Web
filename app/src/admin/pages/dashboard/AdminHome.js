import React, { useEffect } from 'react';
import './AdminHome.css';
import SecondaryBouton from '../../../components/atoms/secondary-bouton/SecondaryBouton';

import LOGO from '../../../assets/logos/logo_VBlanc.png';

const AdminHome = () => {
    useEffect(() => {
        document.body.classList.add('admin-home');
        return () => {
          document.body.classList.remove('admin-home');
        };
    });

    return (
        <div className="admin-container">
            {/* Menu latéral */}
            <nav className="sidebar">
                <ul className="sidebar-nav">
                    <li className="logo-item">
                        <img src={LOGO} alt="Logo" className="logo" />
                    </li>
                    <li className="sidebar-item">
                        <h3 className="sidebar-link">Gestion :</h3>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">Gérer les Animes</a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">Gestion des Genres</a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">Gestion des Saisons/Année</a>
                    </li>
                </ul>
            </nav>

            {/* Contenu principal */}
            <main className="main-content">
                <header className="header">
                    {/* Icône du compte */}
                    <div className="account-icon">
                        <a href="#">
                            <i className="fas fa-user-circle"></i>
                        </a>
                    </div>
                </header>

                {/* Cartes pour gérer les propriétés */}
                <div className="admin-card-container">
                    <div className="admin-card anime-card">
                        <div className="admin-card-stats" style={{color: '#947a32'}}>
                            <span>1300</span>
                        </div>
                        <div className="admin-card-footer">
                            <SecondaryBouton name="Gestion des animes" style={{padding: '5px', "background-color": 'rgba(255, 255, 255, 0.95)', 'border': '2px solid transparent', 'border-radius': '5px', 'backdrop-filter': 'blur(40px)' }}/>
                        </div>
                    </div>
                    <div className="admin-card genre-card">
                        <div className="admin-card-stats" style={{color: '#755645'}}>
                            <span>70</span>
                        </div>
                        <div className="admin-card-footer">
                            <SecondaryBouton name="Gestion des genres" style={{padding: '5px', "background-color": 'rgba(255, 255, 255, 0.95)', 'border': '2px solid transparent', 'border-radius': '5px', 'backdrop-filter': 'blur(40px)' }}/>
                        </div>
                    </div>
                    <div className="admin-card season-card">
                        <div className="admin-card-stats" style={{color: '#5c3448'}}>
                            <span>20</span>
                        </div>
                        <div className="admin-card-footer">
                            <SecondaryBouton name="Gestion des saisons" style={{padding: '5px', "background-color": 'rgba(255, 255, 255, 0.95)', 'border': '2px solid transparent', 'border-radius': '5px', 'backdrop-filter': 'blur(40px)' }}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminHome;
