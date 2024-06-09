import React, { useState, useEffect } from 'react';
import './AddAnime.css';
import axios from 'axios';
import { useContext } from 'react';
import { AlertContext } from '../../../providers/Alert/AlertProvider';

const AddAnime = ({onAdd}) => {
    const [animeTitle, setAnimeTitle] = useState('titre');
    const [animeStatus, setAnimeStatus] = useState('0');
    const [animeEpisodes, setAnimeEpisodes] = useState('');
    const [animeType, setAnimeType] = useState('0');
    const [animeSeason, setAnimeSeason] = useState('');
    const [animeSynonyms, setAnimeSynonyms] = useState('');
    const [animeDescription, setAnimeDescription] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [animeImageLink, setAnimeImageLink] = useState('');
    

    useEffect(() => {
        // Remplacer 'your_api_endpoint' par l'endpoint réel
        axios.get('https://api.breakanime.ninja/api/seasons/', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        .then(data => {setSeasons(data.data); setAnimeSeason(data.data[0].id); })
    }, []);

    const sendAnime = (e) => {
        e.preventDefault();
        onAdd({
            titre: animeTitle,
            status: Number(animeStatus),
            episodes: Number(animeEpisodes),
            type: animeType,
            season: animeSeason,
            synonyms: animeSynonyms.split(','),
            description: animeDescription,
            picture: animeImageLink // Étape 3: Envoyez le lien de l'image avec les autres données
        });
    };

    return (
        <div className="add-anime-popup">
            <h2>Add Anime</h2>
            <form>
                {/* Les champs existants */}
                <label htmlFor="anime-title">Title:</label>
                <input type="text" id="anime-title" value={animeTitle} onChange={e => setAnimeTitle(e.target.value)} />

                <label htmlFor="anime-status">Status:</label>
                <select id="anime-status" value={animeStatus} onChange={e => setAnimeStatus(e.target.value)}>
                    <option value="0">FINI</option>
                    <option value="1">EN COURS</option>
                    <option value="2">PAS ENCORE DIFFUSÉ</option>                    
                </select>

                <label htmlFor="anime-episodes">Episodes:</label>
                <input type="number" id="anime-episodes" value={animeEpisodes} onChange={e => setAnimeEpisodes(e.target.value)} />

                <label htmlFor="anime-image-link">Image Link:</label>
                <input type="text" id="anime-image-link" value={animeImageLink} onChange={e => setAnimeImageLink(e.target.value)} />

                <label htmlFor="anime-type">Type:</label>
                <select id="anime-type" value={animeType} onChange={e => setAnimeType(e.target.value)}>
                    <option value="0">ANIME TV</option>
                    <option value="1">FILM</option>
                    <option value="2">SPECIAL</option>
                    <option value="4">ANIME ONA</option>
                    <option value="5">MUSIC</option>
                    <option value="6">UNDEFINED</option>
                </select>

                <label htmlFor="anime-season">Season:</label>
                <select id="anime-season" value={animeSeason} onChange={e => setAnimeSeason(e.target.value)}>
                    {seasons.map(season => <option key={season.id} value={season.id}>{season.year + ' ' + season.season}</option>)}
                </select>

                <label htmlFor="anime-synonyms">Synonyms:</label>
                <input type="text" id="anime-synonyms" value={animeSynonyms} onChange={e => setAnimeSynonyms(e.target.value)} />

                <label htmlFor="anime-description">Description:</label>
                <textarea id="anime-description" value={animeDescription} onChange={e => setAnimeDescription(e.target.value)}></textarea>

                <button type="submit" onClick={sendAnime}>Add</button>
            </form>
        </div>
    );
};

export default AddAnime;