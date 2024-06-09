import React, { useState } from 'react';
import './EditGenre.css';

const EditGenre = ({ genre, onSave }) => {
    const [editedGenre, setEditedGenre] = useState(genre);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedGenre((prevGenre) => ({
            ...prevGenre,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editedGenre);
    };

    return (
        <div className="edit-genre-popup">
            <h2>Edit Genre</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedGenre.name}
                    onChange={handleInputChange}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    className='add-genre-imput'
                    name="description"
                    value={editedGenre.description}
                    onChange={handleInputChange}
                ></textarea>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default EditGenre;