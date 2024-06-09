import React from 'react';
import SearchIcon from '../../atoms/icons/global/search/SearchIcon';
import './Search.css';

function Search() {
    return (
        <div className="search">
            <input type="text" className="search-input" placeholder="Rechercher des titres" />
            <SearchIcon className="search-icon" />
        </div>
    );
}

export default Search;