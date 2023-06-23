import React from 'react';

const ElementComponent = ({ properties, text }) => {
    return (
        <div className="element">
            <div className="text">{text}</div>
            <div className="properties">
                {properties.map((property, index) => (
                    <div key={index} className="property">
                        <span className="property-name">{property.name}</span>
                        <span className="property-value">{property.value}</span>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ElementComponent;