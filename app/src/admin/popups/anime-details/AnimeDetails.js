import React from 'react';
import Tag from '../../../components/atoms/tag/Tag';

const AnimeDetails = ({ anime }) => {
    return (
        <div style={{maxHeight: '85vh', overflow: 'auto'}}>
            <div style={{display: 'flex', gap: '20px'}}>
                <div style={{padding: '0px 50px'}}>
                    <img src={anime.picture} alt={anime.titre}  width="200"/>
                </div>
                <div>
                    <h1>{anime.titre}</h1>
                    <span style={{fontSize: '1.2em', marginBottom: '20px'}}>Status : {anime.status}</span>
                    <br></br>
                    <span style={{fontSize: '1.2em', marginBottom: '20px'}}>Id :{anime.id}</span>
                    <br></br>
                    <span style={{fontSize: '1.2em', marginBottom: '20px'}}>Episodes :{anime.episodes}</span>
                    <br></br>
                    <span style={{fontSize: '1.2em', marginBottom: '20px'}}>Type: {anime.type}</span>
                    <br></br>
                    {anime.animeSeason ? 
                        (
                            <>
                            
                                
                            <span style={{fontSize: '1.2em', marginBottom: '20px'}}>Season: {anime.animeSeason.season}  {anime.animeSeason.year}</span>
                            </>
                        ) 
                        : ( 
                            <> <span>No season associated</span> </> 
                        )
                    }                                    
                </div>                                      
            </div>
            <hr/>
            <div style={{padding: '0px 50px'}}>
                <h4 style={{color: '#0B0B0B', 'textAlign': 'center', fontFamily: 'Nuku', fontSize: '1.5em'}}>Synonymes</h4>
                <hr/>
                <ul style={{textAlign: 'left', padding: '0px'}}>
                    {
                        anime.synonyms ? anime.synonyms.map((synonym, index) => (
                            <li key={index}>{synonym.name + ' | '}</li>
                        )) : <li>No synonyms</li>
                    }
                </ul>
            </div>
            <div style={{padding: '0px 50px'}}>
                <h4 style={{color: '#0B0B0B', 'textAlign': 'center' , fontFamily: 'Nuku', fontSize: '1.5em'}}>Description</h4>
                <hr/>
                <p style={{color: '#0B0B0B', fontSize: '1em', textAlign: 'left'}}>{anime.description}</p>
            </div>
            <div style={{padding: '0px 50px'}}>
                <h4 style={{color: '#0B0B0B', 'textAlign': 'center' , fontFamily: 'Nuku', fontSize: '1.5em'}}>Genres</h4>
                <hr/>
                <ul>
                    {
                        anime.genres ? anime.genres.map((genre) => (
                            <Tag key={genre.id} text={genre.name} backgroundColor='#494946' style={{ margin: '5px' }} />
                        )) : <li>No genres</li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default AnimeDetails;