import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import SecondaryBouton from '../../../components/atoms/secondary-bouton/SecondaryBouton';

import LOGO from '../../../assets/logos/logo_VBlanc.png';
import axios from 'axios';

const AdminHome = () => {
    const [stats, setStats] = useState(undefined); 
    
    useEffect(() => {
        axios.get('https://api.breakanime.ninja/api/admin/stats', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        .then(response => setStats(response.data))
        .catch(error => console.error(error));
        
        document.body.classList.add('admin-home');
        return () => {
          document.body.classList.remove('admin-home');
        };
    }, []);

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
                            <span>{stats?.animes}</span>
                        </div>
                        <div className="admin-card-footer">
                            <SecondaryBouton name="Gestion des animes" style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(255, 255, 255, 0.95)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)' }}/>
                            <SecondaryBouton name="Ajouter un anime" style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(229, 193, 79, 1)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)' }}/>
                        </div>
                    </div>
                    <div className="admin-card genre-card">
                        <div className="admin-card-stats" style={{color: '#755645'}}>
                            <span>{stats?.genres}</span>
                        </div>
                        <div className="admin-card-footer">
                            <SecondaryBouton name="Gestion des genres" style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(255, 255, 255, 0.95)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)' }}/>
                            <SecondaryBouton name="Ajouter un genre" style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(229, 193, 79, 1)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)' }}/>
                        </div>
                    </div>
                    <div className="admin-card season-card">
                        <div className="admin-card-stats" style={{color: '#5c3448'}}>
                        <span>{stats?.seasons}</span>
                        </div>
                        <div className="admin-card-footer">
                            <SecondaryBouton name="Gestion des saisons" style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(255, 255, 255, 0.95)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)' }}/>
                            <SecondaryBouton name="Ajouter une saison" style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(229, 193, 79, 1)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)' }}/>
                        </div>
                    </div>
                    <div className="admin-card user-card">
                        <div className="admin-card-stats" style={{color: '#5e658c'}}>
                        <span>{stats?.users}</span>
                        </div>
                        <div className="admin-card-footer">
                            <SecondaryBouton name="Gestion des users" style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(255, 255, 255, 0.95)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)' }}/>
                            <SecondaryBouton name="Ajouter un user" style={{padding: '5px 10px 5px 10px', "backgroundColor": 'rgba(229, 193, 79, 1)', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)' }}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminHome;
