import React, { useEffect, useState } from 'react';
import './AnimeEdition.css';
import axios from 'axios';

const AnimeEdition = ({ anime, onStatusChange, onDescriptionChange, onTitleChange, onSeasonChange, onEpisodeCountChange, onSave }) => {
    
    const [seasons, setSeasons] = useState([]);
    

    useEffect(() => {
        console.log(anime);
        axios.get('https://api.breakanime.ninja/api/seasons/', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(data =>  {setSeasons(data.data);  console.log(data)})
    }, []);

    const mapStatus = (status) => {
        switch(status) {
            case 'FINI':
                return 0;
            case 'EN COURS':
                return 1;
            case 'PAS ENCORE DIFFUSÉ':
                return 2;
            default:
                return 'Status inconnu';
        }
    };

    return (
        <div className='edit-container'>
            <h1>Anime Edition</h1>
            <label>Status</label>
            <p>{anime.status.id}</p>
            <br />
            <select value={mapStatus(anime.status)} onChange={onStatusChange}>
                <option value="0">FINI</option>
                <option value="1">EN COURS</option>
                <option value="2">PAS ENCORE DIFFUSÉ</option>      
            </select>
            <br />
            <label>Description</label>
            <textarea value={anime.description} onChange={onDescriptionChange} />
            <br />
            <label>Title</label>
            <input type="text" value={anime.titre} onChange={onTitleChange} />
            <br />
            <label>Season</label>
            <select value={anime.animeSeason.id} onChange={onSeasonChange}>
                {seasons.map(season => (
                    <option key={season.id} value={season.id}>{season.year + ' ' + season.season}</option>
                ))}
            </select>
            <br />
            <label>Episode Count</label>
            <input type="number" value={anime.episodes} onChange={onEpisodeCountChange} />
            <br />
            <button onClick={onSave}>Save</button>
        </div>
    );
};

export default AnimeEdition;