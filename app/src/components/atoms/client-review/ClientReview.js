import React from 'react';
import './ClientReview.css';

const ClientReview = ({ imageSrc, altText, reviewText, reviewer }) => {
    return (
        <div className='review'>
            <div className='review-image'>
                <img src={imageSrc} alt={altText} className='quizz-img'/>
            </div>
            <div className='review-text'>
                <p>
                    {reviewText}
                </p>
                <h4>
                    {reviewer}
                </h4>
            </div>
        </div>
    );
};

export default ClientReview;