import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssociateGenre.css';

const API_URL = "https://api.breakanime.ninja/api/genre/name/";

function AssociateGenre(anime) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    setSelectedGenres(anime.anime.genres);
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(API_URL + searchTerm);
          setGenres(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des genres', error);
        }
      } else {
        setGenres([]);
      }
    };

    fetchGenres();
  }, [searchTerm]);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      const isGenreSelected = prevSelectedGenres.some((g) => g.id === genre.id);
      if (isGenreSelected) {
        return prevSelectedGenres.filter((g) => g.id !== genre.id);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
  };

  const unSelectGenre = (genre) => { 
    console.log('unselect genre', genre);
    setSelectedGenres((prevSelectedGenres) => {
      return prevSelectedGenres.filter((g) => g.id !== genre.id);
    });
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {genres.map((genre) => (
          <label key={genre.id}>
            <input
              type="checkbox"
              checked={selectedGenres.some((g) => g.id === genre.id)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre.name}
          </label>
        ))}
      </div>

      <h2>Genres sélectionnés</h2>
      <div className='selected-visualization'>
        {selectedGenres.map((genre) => (
          <label className='selected-label' key={genre.id} onClick={() => {
            unSelectGenre(genre);
          }} >
            {genre.name}
          </label>
        ))}
      </div>
    </div>
  );
}

export default AssociateGenre;