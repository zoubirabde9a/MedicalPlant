import React, {useEffect, useState} from 'react';
import ErrorComponent from "./ErrorComponent";

const ModifyPlantClass = (props) => {

    const {showModal, setRefresh, setShowModal, plantClassId} = props;

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

    useEffect(() => {
        fetch('http://localhost:5202/api/PlantClass/Get?plantClassId=' + plantClassId)
            .then(response => response.json())
            .then(data => {
                setLatinName(data.latinName);
            })
            .catch(error => console.log(error));

    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update plant values
        if (plantClassId != -1){
            const queryParams = new URLSearchParams();
            queryParams.append('plantClassId', plantClassId);
            queryParams.append('latinName', latinName);

            const url = `http://localhost:5202/api/PlantClass/Update?${queryParams.toString()}`;
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

        // Close the modal
        setShowModal(false);
        setRefresh(true);
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

                            <button className='modal-item' type="submit">Modifier</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModifyPlantClass;