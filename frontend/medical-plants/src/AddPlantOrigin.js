import React, { useState } from 'react';
import ErrorComponent from "./ErrorComponent";

const AddPlantOrigin = (props) => {

    const {showModal, setShowModal} = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [latinName, setLatinName] = useState('');


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

            const url = `http://localhost:5202/api/PlantOrigin/Add?${queryParams.toString()}`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setErrorMessage(data.error);
            } catch (error) {
                console.error('Error:', error);
            }
        }


        // Reset the text fields
        setLatinName('');

        // Close the modal
        setShowModal(false);
    };

    return (
        <div>
            <ErrorComponent errorMessage={errorMessage}/>

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

                            <button className='modal-item' type="submit">Ajouter</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPlantOrigin;