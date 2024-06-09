import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../../../components/molecules/admin-menu/AdminMenu';

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isConnected = !!localStorage.getItem('token');
        if(!isConnected) {
            // Rediriger vers la page de connexion
            navigate('/admin');
        } else {
            document.body.classList.add('admin-home');
            fetchUsers();
            return () => {
              document.body.classList.remove('admin-home');
            };
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://api.breakanime.ninja/api/resource/users/', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const editUser = (userId) => {
        // Logique pour éditer un utilisateur
    };

    const deleteUser = (userId) => {
        // Logique pour supprimer un utilisateur
    };

    const grantAdminAccess = (userId) => {
        // Logique pour accorder l'accès administrateur à un utilisateur
    };

    const downgradeToNormalUser = (userId) => {
        // Logique pour rétrograder un utilisateur en utilisateur normal
    };

    return (        
        <div className="admin-container">
            <AdminMenu></AdminMenu>
            <div className="main-content">
                <h1>Administration des utilisateurs</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => editUser(user.id)}>Éditer</button>
                                    <button onClick={() => deleteUser(user.id)}>Supprimer</button>
                                    <button onClick={() => grantAdminAccess(user.id)}>Accorder l'accès administrateur</button>
                                    <button onClick={() => downgradeToNormalUser(user.id)}>Rétrograder en utilisateur normal</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>            
        </div>
    );
};

export default AdminUser;