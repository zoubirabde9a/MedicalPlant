import React, { useState } from 'react';
import ErrorComponent from "./ErrorComponent";

const ModalButton = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [latinName, setLatinName] = useState('');
    const [commonName, setCommonName] = useState('');
    const [arabicName, setArabicName] = useState('');

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

        const queryParams = new URLSearchParams();
        queryParams.append('latinName', latinName);
        queryParams.append('commonName', commonName);
        queryParams.append('arabicName', arabicName);

        const url = `http://localhost:5202/api/Plant/Add?${queryParams.toString()}`;
        console.log(url)
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

        // Reset the text fields
        setLatinName('');
        setCommonName('');
        setArabicName('');

        // Close the modal
        setShowModal(false);
    };

    return (
        <div>
            <ErrorComponent errorMessage={errorMessage}/>

            <button onClick={handleButtonClick}>Open Modal</button>

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

                            <button className='modal-item' type="submit">Ajouter</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalButton;