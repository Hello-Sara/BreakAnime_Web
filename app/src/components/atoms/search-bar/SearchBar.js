import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ animes, setFilteredAnimes }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = animes.filter(anime => {
            return Object.entries(anime).some(([key, val]) => {
                if (val === null) {
                    return false;
                }
                if (key === 'animeSeason') {
                    return Object.values(val).some(item =>
                        String(item).toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
                if (Array.isArray(val)) {
                    return val.some(item => 
                        item && String(item.name).toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
                return String(val).toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
        setFilteredAnimes(results);
    }, [animes, searchTerm, setFilteredAnimes]);

    return (
        <div>
            <p>Live Filter</p>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                className='live-filter'
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>        
    );
};

export default SearchBar;