import React, { useState } from 'react';
import './AddSeason.css';

const AddSeason = ({onSave}) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [season, setSeason] = useState('Printemps');

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleSeasonChange = (e) => {
        setSeason(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let mappedSeason = 0;

        switch(season) {
            case 'Printemps':
                mappedSeason = 0;
                break;
            case 'Été':
                mappedSeason = 1;
                break;
            case 'Automne':
                mappedSeason = 2;
                break;
            case 'Hiver':
                mappedSeason = 3;
                break;
            default:
                mappedSeason = 4;
        }

        const seasonObject = {
            year: Number(year),
            season: mappedSeason
        };
        onSave(seasonObject);
    };

    return (
        <div className='add-season'>
            <h2>Ajouter une saison</h2>
            <form className='add-season-form' onSubmit={handleSubmit}>
                <label>
                    Année:
                    <input type="text" className='add-season-imput' value={year} onChange={handleYearChange} />
                </label>
                <br />
                <label>
                    Saison:
                    <select value={season} className='add-season-input' onChange={handleSeasonChange}>
                        <option value="0">Printemps</option>
                        <option value="1">Été</option>
                        <option value="2">Automne</option>
                        <option value="3">Hiver</option>
                    </select>
                </label>
                <br />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddSeason;