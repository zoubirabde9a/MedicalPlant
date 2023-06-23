import React from 'react';
import ElementComponent from './ElementComponent';

const ElementList = ({ elements }) => {
    const array = []
    return (
        <div className="element-list">
            {elements.map((element, index) => (
                <ElementComponent
                    key={index}
                    properties={element.properties}
                    text={element.text}
                />
            ))}
        </div>
    );
};

export default ElementList;