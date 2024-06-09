import React, { useState, useEffect, useRef } from 'react';
import AdminMenu from '../../../components/molecules/admin-menu/AdminMenu';
import './AdminAnime.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/loaders/search.gif';
import SecondaryBouton from '../../../components/atoms/secondary-bouton/SecondaryBouton';
import SearchBar from '../../../components/atoms/search-bar/SearchBar';
import Popup from '../../../components/molecules/pop-up/Popup';
import AnimeDetails from '../../popups/anime-details/AnimeDetails';

const AdminAnime = () => {
    const [animes, setAnimes] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
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
    
        // Supprimer le gestionnaire d'événements lorsque le composant est démonté
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

    const handleShowDetails = (animeId) => {
        // Handle edit action for the anime with the given ID
        setIsPopupOpen(false);
        setOpenDetails(true);
        console.log('Show details anime:', animeId);
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
                                        <SecondaryBouton 
                                            Submit={() => selectedAnime && handleShowDetails(selectedAnime.titre)}                                                 
                                            name={"Show details"} 
                                            style={{ margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #FEC200', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                                            onHoverStyle={{ margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#FEC200', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                                        />
                                        <SecondaryBouton 
                                            Submit={() => selectedAnime && handleEdit(selectedAnime.titre)}                                                 
                                            name={"Edit"} 
                                            style={{ margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #494946', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                                            onHoverStyle={{ margin: '10px', padding: '6px 6px 6px 6px', 'color': '#fff', "backgroundColor": '#494946', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                                        />
                                        <SecondaryBouton 
                                            Submit={() => selectedAnime && handleAssociateGenre(selectedAnime.id)}                                                 
                                            name={"Associate Genre"} 
                                            style={{margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #494946', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                                            onHoverStyle={{ margin: '10px', padding: '6px 6px 6px 6px','color': '#fff', "backgroundColor": '#494946', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                                        />
                                        <SecondaryBouton 
                                            Submit={() => selectedAnime && handleDelete(selectedAnime.id)}                                                 
                                            name={"Delete"} 
                                            style={{margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #F25252', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer' }}
                                            onHoverStyle={{ margin: '10px', padding: '6px 6px 6px 6px', 'color': '#fff', "backgroundColor": '#F25252', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                                        />
                                    </Popup>
                                </tr>
                            ))}
                            <Popup isOpen={openDetails} onClose={() => setOpenDetails(false)} centered={true} size='xxl'>
                               <AnimeDetails anime={selectedAnime} />
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