import React from 'react';
import './AdminHome.css';

import LOGO from '../../../assets/logos/logo_VBlanc.png';

const AdminHome = () => {
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
                <div className="card-container">
                    <div className="card">
                        <h2>Gérer les Animes</h2>
                        {/* Contenu pour gérer les Animes */}
                    </div>
                    <div className="card">
                        <h2>Gérer les Genres</h2>
                        {/* Contenu pour gérer les Genres */}
                    </div>
                    <div className="card">
                        <h2>Gérer les Saisons</h2>
                        {/* Contenu pour gérer les Saisons */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminHome;
