import React from 'react';
const Title = ({ title, subtitle }) => {
    return (
        <div className="main-title">
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
};

export default Title;
