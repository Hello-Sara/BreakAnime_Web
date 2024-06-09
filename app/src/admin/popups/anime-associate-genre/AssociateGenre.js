import React, { useState, useEffect } from 'react';

const AssociateGenre = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        // Fetch genres from the backend
        const fetchGenres = async () => {
            try {
                const response = await fetch('/api/genres');
                const data = await response.json();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreSelection = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    const handleAssociateGenres = () => {
        // Send selected genres to the backend to associate with the current anime
        // Implement your logic here
    };

    return (
        <div>
            <h2>Associate Genres</h2>
            <div>
                <input type="text" placeholder="Search genre" />
                {/* Render the list of genres */}
                {genres.map((genre) => (
                    <div key={genre.id}>
                        <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre.id)}
                            onChange={() => handleGenreSelection(genre.id)}
                        />
                        <label>{genre.name}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleAssociateGenres}>Associate Genres</button>
        </div>
    );
};

export default AssociateGenre;