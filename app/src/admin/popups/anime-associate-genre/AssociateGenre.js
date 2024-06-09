import axios from 'axios';
import React, { useState, useEffect } from 'react';
// Assurez-vous d'importer la fonction pour faire des requêtes HTTP, par exemple `axios`

function AssociateGenre() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      if (searchTerm) {
        try {
          // Remplacez `URL_API` par l'URL de votre API et ajustez le chemin si nécessaire
          const response = await axios.get("https://api.breakanime.ninja/api/genre/name/"+ searchTerm);  
          setGenres(response.data.json());
        } catch (error) {
          console.error('Erreur lors de la récupération des genres', error);
          // Gérer l'erreur comme vous le souhaitez
        }
      } else {
        setGenres([]);
      }
    };

    fetchGenres();
  }, [searchTerm]);

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
          <div key={genre.id}>{genre.name}</div>
        ))}
      </div>
    </div>
  );
}

export default AssociateGenre;