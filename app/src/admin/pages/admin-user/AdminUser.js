import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../../../components/molecules/admin-menu/AdminMenu';
import Popup from '../../../components/molecules/pop-up/Popup';
import Actions from '../../popups/actions/Actions';
import { AlertContext } from '../../../providers/Alert/AlertProvider';

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const spanRef = useRef();
    const [selectedAnime, setSelectedAnime] = useState({});

    const [openPopupId, setOpenPopupId] = useState(null);


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
            console.log('users',response.data);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const isTokenExpired = async () => {
        try {
            const response = await axios.get('https://api.breakanime.ninja/api/auth/verifyToken', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            return response.data.expired;
        } catch (error) {
            console.error(error);
        }
    };

    const editUser = (userId) => {
        // Logique pour éditer un utilisateur
    };

    const deleteUser = (user) => {
        axios.delete(`https://api.breakanime.ninja/api/resource/user/${user.id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            fetchUsers().then(() => {
                showAlert('User deleted', 'success', 3000);
            });
        }).catch((error) => {
            showAlert('Error happened trying to delete user ' + error, 'danger', 3000);
        });
    };

    const grantAdminAccess =  (user) => {
        axios.put(`https://api.breakanime.ninja/api/resource/user/${user.id}`, {
            role: 1
        }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setIsPopupOpen(false);
            fetchUsers().then(() => {
                showAlert('Admin access granted', 'success', 3000);
            });
        }).catch((error) => {
            console.error(error);
        });
    };

    const downgradeToNormalUser = (user) => {
       axios.put(`https://api.breakanime.ninja/api/resource/user/${user.id}`, {
            role: 0
        }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setIsPopupOpen(false);
            fetchUsers().then(() => {
                showAlert('User retrograted', 'success', 3000);
            });
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleSpanClick = (event, anime) => {
        if (isPopupOpen) {
            setIsPopupOpen(false);
        }
        setSelectedAnime(anime);
        const popupWidth = window.innerWidth * 0.12;  // Convertir 10vw + 2vw de marge en pixels
        setPopupPosition({ top: event.clientY, left: event.clientX - popupWidth});
        setOpenPopupId(anime.id);  // Ouvrir la popup de cet anime     
        setIsPopupOpen(true); 
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
                    {users.map((user) => {
                        const itemSpecificButtons = [
                            { name: 'Edit', action: editUser },
                            { name: 'Delete', action: deleteUser }
                        ];

                        if (user.role === 0) {
                            itemSpecificButtons.push({ name: 'Grant Admin', action: grantAdminAccess });
                        } else if (user.role === 1) {
                            itemSpecificButtons.push({ name: 'Retrograte', action: downgradeToNormalUser });
                        }

                        return (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className='actions' ref={spanRef} onClick={(event) => handleSpanClick(event, user)}>...</span>
                                </td>
                                <Popup isOpen={isPopupOpen && openPopupId === user.id} top={popupPosition.top} left={popupPosition.left} onClose={() => setIsPopupOpen(false)}>                                                                                                   
                                    <Actions                                
                                        item={user}                                        
                                        itemSpecificButtons={itemSpecificButtons}
                                    />                                        
                                </Popup>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>            
        </div>
    );
};

export default AdminUser;