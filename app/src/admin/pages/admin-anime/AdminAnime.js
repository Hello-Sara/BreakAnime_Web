import React, { useState, useEffect } from 'react';
import AdminMenu from '../../../components/molecules/admin-menu/AdminMenu';
import './AdminAnime.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/loaders/search.gif';

const AdminAnime = () => {
    const [animes, setAnimes] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = animes.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const isConnected = !!localStorage.getItem('token');
        if(!isConnected) {
            navigate('/admin');
        } else {
            isTokenExpired().then((response) => {
                if (response) {
                    navigate('/admin');
                }    
            });
            document.body.classList.add('admin-home');
            fetchAnimes();
            return () => {
              document.body.classList.remove('admin-home');
            };
        }
    }, []);

    const fetchAnimes = async () => {
        try {
            const response = await axios.get('https://api.breakanime.ninja/api/animes/', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            setAnimes(response.data);
            setIsLoading(false);
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

    const handleEdit = (animeId) => {
        // Handle edit action for the anime with the given ID
        console.log('Edit anime:', animeId);
    };

    const handleDelete = (animeId) => {
        // Handle delete action for the anime with the given ID
        console.log('Delete anime:', animeId);
    };

    const handleAssociateGenre = (animeId) => {
        // Handle associate genre action for the anime with the given ID
        console.log('Associate genre to anime:', animeId);
    };


    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(animes.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="admin-container">
        <AdminMenu></AdminMenu>
        <div className="main-content">
            <h1>Admin Anime</h1>
            {isLoading ? (
                <div id="loading">
                    <img src={Loader} alt="Loading..." />
                </div>
                ) : 
                (
                    <>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((anime) => (
                                <tr key={anime.id}>
                                    <td>{anime.titre}</td>
                                    <td>{anime.description}</td>
                                    <td>
                                        <button onClick={() => handleEdit(anime.id)}>Edit</button>
                                        <button onClick={() => handleDelete(anime.id)}>Delete</button>
                                        <button onClick={() => handleAssociateGenre(anime.id)}>Associate Genre</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>                    
                    </table>
                    <ul id="page-numbers">
                        {pageNumbers.map(number => {
                            if (number < currentPage + 10 && number > currentPage - 10) {
                                return (
                                    <li key={number} id={number} onClick={handlePageChange} style={{ cursor: 'pointer' }}>
                                    {number}
                                 </li>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </>
            )}
            </div>
        </div>
    );
};

export default AdminAnime;