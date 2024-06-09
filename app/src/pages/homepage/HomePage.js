import React from 'react';
import Menu from '../../components/molecules/menu/Menu';
import Bouton from '../../components/atoms/bouton/Bouton';
import Card from '../../components/organisms/cards/Card';

import IconQuizz from '../../assets/icons/global/quizz.svg';
import IconCommunaute from '../../assets/icons/global/communaute.svg';
import IconDecouverte from '../../assets/icons/global/decouverte.svg';
import IconSuivi from '../../assets/icons/global/suivi.svg';

import './HomePage.css';


function HomePage() {

    return (
        <>
            {/* <Menu /> */}
            <div className="container">
                <div className="title-container">
                    <h1 className="title">Break Anime</h1>
                    <p >Ne perds plus de temps à chercher quoi regarder,
                    <br />laisse l'application te proposer des animés
                    <br />adaptés à tes goûts.</p>
                </div>
            </div>
            <div className="button-container">
                <Bouton name="Télécharger" onClick={() => console.log('Bouton cliqué')} />
            </div>
            <div className="scroll-container">
                <p className="scroll-text">Scroll</p>
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.49996 6.00075L0.256958 1.75775L1.67196 0.34375L4.49996 3.17275L7.32796 0.34375L8.74296 1.75775L4.49996 6.00075Z" fill="#808080"/>
                </svg>
            </div>            
            <div className="universe-container">
                <h2 >L'univers</h2>
                <p >Dans l'univers complexe de l'anime, 
                <br />Break Anime simplifie la découverte en proposant une approche 
                <br /><span style={{color: '#F2A007'}}>Rapide, amusante et adaptée</span> à chaque utilisateur.</p>
                <div className="card-container">
                    <Card 
                        icon={IconQuizz} 
                        title="Quizz" 
                        text={<>Trouvez des animes qui<br />vous correspondent</>} 
                    />
                    <Card 
                        icon={IconSuivi} 
                        title="Suivi Facile" 
                        text={<>Gardez une trace de tout<br />ce que vous regardez</>} 
                    />
                    <Card 
                        icon={IconCommunaute} 
                        title="Communaute" 
                        text={<>Laissez des commentaires,<br />notez vos animes préférées</>} 
                    />
                    <Card 
                        icon={IconDecouverte} 
                        title="Decouverte" 
                        text={<>Une bibliothèque d'anime,<br />constamment mise à jour</>} 
                    />
                </div>
            </div>

        </>
    );
}

export default HomePage;