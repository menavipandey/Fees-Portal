import React from 'react';
import './Card.css'; // Import CSS for styling

const Card = ({ title, content }) => {
    return (
        <div className="card">
            <h3 className='title'>{title}</h3>
            <p className='content'>{content}</p>
        </div>
    );
};

export default Card;
