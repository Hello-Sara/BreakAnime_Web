import React, { useState, useEffect } from 'react';
import AdminMenu from '../../../components/molecules/admin-menu/AdminMenu';
import './AdminGenre.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/loaders/search.gif';
import Popup from '../../../components/molecules/pop-up/Popup';
import AddGenre from '../../popups/add-genre/AddGenre';
import EditGenre from '../../popups/edit-genre/EditGenre';

const AdminGenre = () => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [isAddGenreOpen, setIsAddGenreOpen] = useState(false);
    const [isEditGenreOpen, setIsEditGenreOpen] = useState(false);

    const [items, setItems] = useState([]);

    const [openPopupId, setOpenPopupId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
            fetchGenres();
            return () => {
              document.body.classList.remove('admin-home');
            };
        }
    }, []);

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

    const fetchGenres = async () => {
        try {
            const response = await axios.get('https://api.breakanime.ninja/api/genre/', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            setGenres(response.data);
            setItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (genreId) => {
        setOpenPopupId(genreId); 
        setIsEditGenreOpen(true);
    };

    const handleDelete = (genreId) => {
        axios.delete(`https://api.breakanime.ninja/api/genre/${genreId}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(() => {
            setIsLoading(true);
            fetchGenres().then(() => setIsLoading(false));
        }).catch((error) => {
            console.error(error);
        });
    };

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(genres.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {        
        let filteredGenres = genres.filter((genre) => {
            const name = genre.name?.toLowerCase() || "";
            const description = genre.description?.toLowerCase() || "";
            return name.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
        });
        // Calculer les éléments actuels après le filtrage
        setItems(filteredGenres.slice(indexOfFirstItem, indexOfLastItem));

        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="admin-container">
        <AdminMenu></AdminMenu>
        <div className="main-content">
            <h1>Admin Genres</h1>
            {isLoading ? (
                <div id="loading">
                    <img src={Loader} alt="Loading..." />
                </div>
                ) : 
                (
                    <>
                    <input
                        type="text"
                        placeholder="Search genres..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='add-genre' onClick={() => setIsAddGenreOpen(true)}>Add Genre</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Keyword</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items
                             .filter((genre) => {
                                const name = genre.name?.toLowerCase() || "";
                                const description = genre.description?.toLowerCase() || "";
                                return name.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
                              })    
                            .map((genre) => (
                                <tr key={genre.id}>
                                    <td>{genre.name}</td>
                                    <td>{genre.description}</td>
                                    <td>
                                        <button onClick={() => handleEdit(genre.id)}>Edit</button>
                                        <button onClick={() => handleDelete(genre.id)}>Delete</button>
                                    </td>
                                    <Popup isOpen={isAddGenreOpen} centered={true} size='xxl' onClose={() => setIsAddGenreOpen(false)}>
                                        <AddGenre
                                            onSave={(genre) => {
                                                console.log(genre);
                                                axios.post('https://api.breakanime.ninja/api/genre/', genre, {
                                                    headers: {
                                                        Authorization: `${localStorage.getItem('token')}`
                                                    }
                                                }).then(() => {
                                                    setIsAddGenreOpen(false);
                                                    fetchGenres();
                                                }).catch((error) => {
                                                    console.error(error);
                                                });
                                                setIsAddGenreOpen(false);
                                            }}
                                        />                                                                                                                                                                                                                         
                                    </Popup>
                                    <Popup isOpen={isEditGenreOpen && openPopupId === genre.id} centered={true} size='xxl' onClose={() => setIsEditGenreOpen(null)}>
                                        <EditGenre
                                            genre={genre}
                                            onSave={(genre) => {
                                                console.log(genre);
                                                axios.put(`https://api.breakanime.ninja/api/genre/${genre.id}`, genre, {
                                                    headers: {
                                                        Authorization: `${localStorage.getItem('token')}`
                                                    }
                                                }).then(() => {
                                                    setIsLoading(true);
                                                    setOpenPopupId(null);
                                                    fetchGenres().then(() => setIsLoading(false));
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

export default AdminGenre;