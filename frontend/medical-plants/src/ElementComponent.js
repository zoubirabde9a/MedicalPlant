import React, {useState} from 'react';

const ElementComponent = ({ properties, text }) => {

    const [showModal, setShowModal] = useState(false);
    const [latinName, setLatinName] = useState(properties.latinName);
    const [commonName, setCommonName] = useState(properties.commonName);
    const [arabicName, setArabicName] = useState(properties.arabicName);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLatinNameChange = (e) => {
        setLatinName(e.target.value);
    };

    const handleCommonNameChange = (e) => {
        setCommonName(e.target.value);
    };

    const handleArabicNameChange = (e) => {
        setArabicName(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        
    }


    return (
        <div className="element">
            <div className="text">
                <img src="favicon.ico" alt="Small Image"/>
                <div>
                    {text}
                </div>
                <button className='modifyButton' onClick={handleButtonClick}>Modifier</button>
            </div>

            <div className="properties">
                {properties.map((property, index) => (property.value) && (
                    <div key={index} className="property">
                        <span className="property-name">{property.name}</span>
                        <span className="property-value">{property.value}</span>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>

                        <form onSubmit={handleSubmit}>
                            <label className='modal-item'>
                                Nom Latin:
                                <input className='modal-item'
                                       type="text"
                                       name="latinName"
                                       value={latinName}
                                       onChange={handleLatinNameChange}
                                />
                            </label>
                            <br/>

                            <label className='modal-item'>
                                Nom Commun:
                                <input className='modal-item'
                                       type="text"
                                       name="communName"
                                       value={commonName}
                                       onChange={handleCommonNameChange}
                                />
                            </label>
                            <br/>

                            <label className='modal-item'>
                                Nom Arabe:
                                <input className='modal-item'
                                       type="text"
                                       name="arabicName"
                                       value={arabicName}
                                       onChange={handleArabicNameChange}
                                />
                            </label>
                            <br/>

                            <button className='modal-item' type="submit">Modifier</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ElementComponent;