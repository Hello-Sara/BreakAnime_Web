import React, { useState } from 'react';
import './AddGenre.css';

const AddGenre = ({onSave}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({name, description});
    };

    return (
        <div className='add-genre-container'>
            <h2>Add Genre</h2>
            <form onSubmit={handleSubmit} className='add-genre-form'>
                <label htmlFor="name">Name:</label>
                <input className='add-genre-imput' type="text" id="name" value={name} onChange={handleNameChange} />

                <label htmlFor="description">Description:</label>
                <textarea className='add-genre-imput' id="description" value={description} onChange={handleDescriptionChange} />

                <button type="submit">Add Genre</button>
            </form>
        </div>
    );
};

export default AddGenre;