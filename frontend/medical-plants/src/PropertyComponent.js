import React, {useState} from 'react';

const PropertyComponent = ({ properties, text }) => {

    const [showModal, setShowModal] = useState(false);
    const [latinName, setLatinName] = useState(properties.latinName);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLatinNameChange = (e) => {
        setLatinName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add the plant
        {
            const queryParams = new URLSearchParams();
            queryParams.append('latinName', latinName);

            const url = `http://localhost:5202/api/Plant/Add?${queryParams.toString()}`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
            } catch (error) {
                console.error('Error:', error);
            }
        }
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

                            <button className='modal-item' type="submit">Modifier</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PropertyComponent;