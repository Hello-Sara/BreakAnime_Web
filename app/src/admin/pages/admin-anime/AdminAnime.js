import React, { useState, useEffect, useRef, useContext } from 'react';
import AdminMenu from '../../../components/molecules/admin-menu/AdminMenu';
import './AdminAnime.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/loaders/search.gif';
import SearchBar from '../../../components/atoms/search-bar/SearchBar';
import Popup from '../../../components/molecules/pop-up/Popup';
import AnimeDetails from '../../popups/anime-details/AnimeDetails';
import Actions from '../../popups/actions/Actions';
import { AlertContext } from '../../../providers/Alert/AlertProvider';
import AnimeEdition from '../../popups/anime-edition/AnimeEdition';
import AssociateGenre from '../../popups/anime-associate-genre/AssociateGenre';


const AdminAnime = () => {
    const navigate = useNavigate();
    
    const [animes, setAnimes] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pageMaxOffset, setPageMaxOffset] = useState(10);  // Nombre de pages à afficher autour de la page courante [currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [filteredAnimes, setFilteredAnimes] = useState([]); 
    let currentItems = filteredAnimes.slice(indexOfFirstItem, indexOfLastItem);
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const spanRef = useRef();
    const [selectedAnime, setSelectedAnime] = useState({});

    const [openPopupId, setOpenPopupId] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdition, setOpenEdition] = useState(false);
    const [openAssociation, setOpenAssociation] = useState(false);

    const { showAlert } = useContext(AlertContext);
    

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

    useEffect(() => {
        const handleResize = () => {
            setIsPopupOpen(false);  // Fermer toutes les popups
            if(window.innerWidth <= 1000) {
                setItemsPerPage(3);
                setPageMaxOffset(5);
            } else if(window.innerWidth > 1000) {
                setItemsPerPage(6);
                setPageMaxOffset(10);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        currentItems = filteredAnimes.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentPage(1);
    }, [filteredAnimes]);


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

    const fetchAnimes = async () => {
        try {
            const response = await axios.get('https://api.breakanime.ninja/api/animes/', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            setAnimes(response.data);
            setFilteredAnimes(response.data);
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

    const handleShowDetails = () => {
        setIsPopupOpen(false);
        setOpenDetails(true);
    };

    const handleEdit = (animeId) => {
        // Handle edit action for the anime with the given ID
        setIsPopupOpen(false);
        setOpenEdition(true);
    };

    const handleDelete = (anime) => {
        // Handle delete action for the anime with the given ID
        axios.delete(`https://api.breakanime.ninja/api/animes/${anime.id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(() => {
            showAlert("Anime supprimé avec succès", "info", 3000);
            setIsPopupOpen(false);
            fetchAnimes();
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleAssociateGenre = (animeId) => {
        setIsPopupOpen(false);
        setOpenAssociation(true);
    };


    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredAnimes.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="admin-container">
        <AdminMenu></AdminMenu>
        <div className="main-content">
            <h1>Admin Anime</h1>
            { isLoading ? (
                <div id="loading">
                    <img src={Loader} alt="Loading..." />
                </div>
                ) : 
                (
                    <>
                    <SearchBar animes={animes} setFilteredAnimes={setFilteredAnimes} />
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
                                        <span className='actions' ref={spanRef} onClick={(event) => handleSpanClick(event, anime)}>...</span>
                                    </td>
                                    <Popup isOpen={isPopupOpen && openPopupId === anime.id} top={popupPosition.top} left={popupPosition.left} onClose={() => setIsPopupOpen(false)}>                                                                                                   
                                        <Actions
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onDetails={handleShowDetails}
                                            item={selectedAnime}
                                            itemSpecificButtons={[
                                                { 
                                                    name: 'Show details',
                                                    action: handleShowDetails,
                                                    style: { margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #FEC200', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'},
                                                    onHoverStyle:{ margin: '10px', padding: '6px 6px 6px 6px', 'color': '#fff', "backgroundColor": '#FEC200', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}                                                
                                                },
                                                { 
                                                    name: 'Edit',
                                                    action: handleEdit,
                                                    style: { margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #494946', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'},
                                                    onHoverStyle:{ margin: '10px', padding: '6px 6px 6px 6px', 'color': '#fff', "backgroundColor": '#494946', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}                                                
                                                },
                                                {
                                                    name: 'Associate Genre',
                                                    action: handleAssociateGenre,
                                                    style: { margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #494946', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'},
                                                    onHoverStyle:{ margin: '10px', padding: '6px 6px 6px 6px', 'color': '#fff', "backgroundColor": '#494946', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}
                                                },
                                                {
                                                    name: 'Delete',
                                                    action: handleDelete,
                                                    style: { margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #F25252', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'},
                                                    onHoverStyle:{ margin: '10px', padding: '6px 6px 6px 6px', 'color': '#fff', "backgroundColor": '#F25252', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}                                                                                                    
                                                }                                                                                              
                                            ]}
                                        />                                        
                                    </Popup>
                                </tr>
                            ))}
                            <Popup isOpen={openDetails} onClose={() => setOpenDetails(false)} centered={true} size='xxl'>
                               <AnimeDetails anime={selectedAnime} />
                            </Popup>
                            <Popup isOpen={openEdition} centered={true} onClose={() => setOpenEdition(false)} size='xxl'>
                                <AnimeEdition 
                                    anime={selectedAnime}
                                    onStatusChange={(event) => {
                                        setSelectedAnime({ ...selectedAnime, status: event.target.value });
                                    }}
                                    onDescriptionChange={(event) => {
                                        setSelectedAnime({ ...selectedAnime, description: event.target.value });
                                    }}
                                    onTitleChange={(event) => {
                                        setSelectedAnime({ ...selectedAnime, titre: event.target.value });
                                    }}
                                    onSeasonChange={(event) => {
                                        console.log('value',event.target.value);
                                        setSelectedAnime({ ...selectedAnime, animeSeason: event.target.value });
                                    }}
                                    onEpisodeCountChange={(event) => {
                                        setSelectedAnime({ ...selectedAnime, episodes: event.target.value });
                                    }}

                                    onSave={(event) => {
                                        event.preventDefault();
                                        console.log('anime',selectedAnime);
                                        if(selectedAnime.description === '' || selectedAnime.titre === '' || selectedAnime.animeSeason === '' || selectedAnime.episodes === '') {
                                            showAlert('Veuillez remplir tous les champs', 'error', 3000);
                                        } else {
                                            axios.put(`https://api.breakanime.ninja/api/animes/${selectedAnime.id}`, {
                                                titre: selectedAnime.titre,
                                                description: selectedAnime.description,
                                                status: selectedAnime.status,
                                                episodes: selectedAnime.episodes,
                                                seasonId: Number(selectedAnime.animeSeason)
                                            }, {
                                                headers: {
                                                    Authorization: `${localStorage.getItem('token')}`
                                                }
                                            }).then(() => {
                                                showAlert("Anime modifié avec succès", "info", 3000);
                                                fetchAnimes();
                                                setOpenEdition(false);
                                            }).catch((error) => {
                                                console.error(error);
                                            });
                                        }
                                    }}
                                />
                            </Popup>
                            <Popup isOpen={openAssociation} centered={true} onClose={() => setOpenAssociation(false)} size='xxl'>
                                <AssociateGenre 
                                    anime={selectedAnime}
                                    handleReassociate={(genres) => {
                                        axios.post(`https://api.breakanime.ninja/api/anime/addGenres`, {
                                            animeId: selectedAnime.id,
                                            genreIds: genres
                                        }, {
                                            headers: {
                                                Authorization: `${localStorage.getItem('token')}`
                                            }
                                        }).then(() => {
                                            showAlert("Genres associés avec succès", "info", 3000);
                                            fetchAnimes();
                                        }).catch((error) => {
                                            console.error(error);
                                        });
                                        setOpenAssociation(false);
                                        setIsLoading(true); 
                                    }}
                                />
                            </Popup>
                        </tbody>                    
                    </table>
                    <ul id="page-numbers">
                        {pageNumbers.map(number => {
                            if (number < currentPage + pageMaxOffset && number > currentPage - pageMaxOffset) {
                                return (
                                    <li key={number} id={number} onClick={handlePageChange} style={{ cursor: 'pointer' }} className={number === currentPage ? 'current-page' : 'page-number'}>
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