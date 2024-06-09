import React, { useState } from 'react';
import './AdminLogin.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Bouton from '../../../components/atoms/bouton/Bouton';

import LOGO from '../../../assets/logos/logo_VNoir.png';
import BG01 from '../../../assets/img/admin/BG_Img01.png';
import BG02 from '../../../assets/img/admin/BG_Img02.png';
import BG03 from '../../../assets/img/admin/BG_Img03.png';
import BG04 from '../../../assets/img/admin/BG_Img04.png';
import BG05 from '../../../assets/img/admin/BG_Img05.png';

const AdminLogin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://api.breakanime.ninja/api/auth/login', {
                email: email,
                password: password
            });

            console.log(response);

            //if (response.data.role === 1) {
                localStorage.setItem('token', response.data.token);
                navigate('/admin/dashboard');
            //} else {
                // Gérer le cas où l'utilisateur n'est pas un administrateur
            //}
        } catch (error) {
            console.error(error);
            // Gérer l'erreur
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="anime-list">
                    {/* Partie gauche pour la liste des animes */}
                    <Carousel 
                        autoPlay 
                        interval={8000} 
                        infiniteLoop 
                        useKeyboardArrows 
                        dynamicHeight
                        showThumbs={false}
                        showStatus={false}
                        emulateTouch={false}
                        showIndicators={false}
                        showArrows={false}
                    >
                        <div>
                            <img src={BG01} />
                        </div>
                        <div>
                            <img src={BG02}  />
                        </div>
                        <div>
                            <img src={BG03} />
                        </div>
                        <div>
                            <img src={BG04} />
                        </div>
                        <div>
                            <img src={BG05} />*
                        </div>
                    </Carousel>
                </div>
                <div className="login-module">
                    {/* Partie droite pour le module de connexion */}
                    <img src={LOGO} alt="Logo" className="logo" />
                    <h2 className="login-header">BreakAdmin</h2>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Mot de passe:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
                        </div>
                        <div className='connection'>
                            <Bouton name="connexion" Submit={(e) => handleLogin(e)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

