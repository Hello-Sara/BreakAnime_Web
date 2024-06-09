import React from 'react';
import SecondaryBouton from '../../../components/atoms/secondary-bouton/SecondaryBouton';
import './Actions.css';

const Actions = ({ item, onDelete, onEdit, onDetails, itemSpecificButton }) => {
    return (
        <div className='action-container'>
           <SecondaryBouton 
                Submit={() => item && onDetails(item)}                                                 
                name={"Show details"} 
                style={{ margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #FEC200', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                onHoverStyle={{ margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#FEC200', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
            />
            <SecondaryBouton 
                Submit={() => item && onEdit(item)}                                                 
                name={"Edit"} 
                style={{ margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #494946', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                onHoverStyle={{ margin: '10px', padding: '6px 6px 6px 6px', 'color': '#fff', "backgroundColor": '#494946', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
            />
            <SecondaryBouton 
                Submit={() => item && itemSpecificButton.action(item)}                                                 
                name={itemSpecificButton.name} 
                style={{margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #494946', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
                onHoverStyle={{ margin: '10px', padding: '6px 6px 6px 6px','color': '#fff', "backgroundColor": '#494946', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
            />
            <SecondaryBouton 
                Submit={() => item && onDelete(item)}                                                 
                name={"Delete"} 
                style={{margin: '10px', padding: '6px 6px 6px 6px', "backgroundColor": '#fff', 'border': '2px solid #F25252', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer' }}
                onHoverStyle={{ margin: '10px', padding: '6px 6px 6px 6px', 'color': '#fff', "backgroundColor": '#F25252', 'border': '2px solid transparent', 'borderRadius': '5px', 'backdropFilter': 'blur(40px)', cursor: 'pointer'}}
            />
        </div>
    );
};

export default Actions;