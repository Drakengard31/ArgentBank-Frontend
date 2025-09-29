import React from 'react';

function Feature({ icon, title, description, className }) {
    return (
        <div className={className}>
            <img src={icon} alt={`${title} Icon`} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Feature;