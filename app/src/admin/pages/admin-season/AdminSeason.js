import React, { useState, useEffect } from 'react';
import AdminMenu from '../../../components/molecules/admin-menu/AdminMenu';
import './AdminSeason.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/loaders/search.gif';
import Popup from '../../../components/molecules/pop-up/Popup';
import AddSeason from '../../popups/add-season/AddSeason';

const AdminSeason = () => {
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    const [isAddSeasonOpen, setIsAddSeasonOpen] = useState(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = seasons.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const isConnected = !!localStorage.getItem('token');
        if(!isConnected) {
            navigate('/admin');
        } else {
            document.body.classList.add('admin-home');
            fetchSeasons();
            return () => {
              document.body.classList.remove('admin-home');
            };
        }
    }, []);

    const fetchSeasons = async () => {
        try {
            const response = await axios.get('https://api.breakanime.ninja/api/seasons/', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            setSeasons(response.data);
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

    const handleAddSeason = () => {
        setIsAddSeasonOpen(true);
    };

    const handleDelete = (genreId) => {
        axios.delete(`https://api.breakanime.ninja/api/seasons/${genreId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(() => {
            fetchSeasons();
        }).catch((error) => {
            console.error(error);
        });
    };

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(seasons.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="admin-container">
        <AdminMenu></AdminMenu>
        <div className="main-content">
            <h1>Admin Seasons</h1>
            {isLoading ? (
                <div id="loading">
                    <img src={Loader} alt="Loading..." />
                </div>
                ) : 
                (
                    <>
                    <button className='add-season-btn' onClick={handleAddSeason}>Add season</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Season</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((genre) => (
                                <tr key={genre.id}>
                                    <td>{genre.year}</td>
                                    <td>{genre.season}</td>
                                    <td>
                                        <button onClick={() => handleDelete(genre.id)}>Delete</button>
                                    </td>
                                    <Popup isOpen={isAddSeasonOpen} centered={true} size='xxl' onClose={() => setIsAddSeasonOpen(false)}>
                                        <AddSeason
                                            onSave={(animeSeason) => {
                                                axios.post('https://api.breakanime.ninja/api/seasons/', animeSeason, {
                                                    headers: {
                                                        Authorization: `${localStorage.getItem('token')}`
                                                    }
                                                }).then(() => {
                                                    setIsAddSeasonOpen(false);
                                                    fetchSeasons();
                                                }).catch((error) => {
                                                    console.error(error);
                                                });
                                            }} 
                                        />
                                    </Popup>
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

export default AdminSeason;