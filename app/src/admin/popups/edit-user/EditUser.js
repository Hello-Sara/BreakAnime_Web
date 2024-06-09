import React from 'react';
import './EditUser.css';

const EditUser = ({ user, handleSave, handleEditName, handleEditEmail }) => {
    return (
        <div className='add-user'>
            <h2>Ajouter un utilisateur</h2>
            <form>
                <div>
                    <label className='user-label'>pseudo:</label>
                    <input className='user-imput' type="text" value={user.name} onChange={handleEditName} />
                </div>
                <div>
                    <label className='user-label'>mail:</label>
                    <input className='user-imput' type="email" value={user.email} onChange={handleEditEmail} />
                </div>        
                <button className='add-user-btn' type="submit" onClick={handleSave}>Edit</button>
            </form>
        </div>
    );
};
export default EditUser;