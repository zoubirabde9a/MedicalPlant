import React, { useState } from 'react';
import ErrorComponent from "./ErrorComponent";

const AddPlant = (props) => {

    const {showModal, setShowModal, originList, divisionList, vegetableReignList, plantClassList, plantFamilyList, plantGenreList, plantSpeciesList, plantPartList} = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [latinName, setLatinName] = useState('');
    const [commonName, setCommonName] = useState('');
    const [arabicName, setArabicName] = useState('');
    const [originId, setOrigin] = useState(0);
    const [divisionId, setDivision] = useState(0);
    const [vegetableReignId, setVegetableReign] = useState(0);
    const [classId, setClass] = useState(0);
    const [familyId, setFamily] = useState(0);
    const [genreId, setGenre] = useState(0);
    const [speciesId, setSpecies] = useState(0);
    const [usedPartId, setUsedPart] = useState(0);


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

    const handleOriginChange = (e) => {
        setOrigin(e.target.value);
    }

    const handleDivisionChange = (e) => {
        setDivision(e.target.value);
    }

    const handleVegetableReignChange = (e) => {
        setVegetableReign(e.target.value);
    }


    const handleClassChange = (e) => {
        setClass(e.target.value);
    }

    const handleFamilyChange = (e) => {
        setFamily(e.target.value);
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    }

    const handleSpeciesChange = (e) => {
        setSpecies(e.target.value);
    }

    const handlePlantPartsChange = (e) => {
        setUsedPart(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        var plantId = -1;
        // Add the plant
        {
            const queryParams = new URLSearchParams();
            queryParams.append('latinName', latinName);
            queryParams.append('commonName', commonName);
            queryParams.append('arabicName', arabicName);

            const url = `http://localhost:5202/api/Plant/Add?${queryParams.toString()}`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                plantId = data.plantId;
                setErrorMessage(data.error);
            } catch (error) {
                console.error('Error:', error);
            }
        }


        // Update plant values
        if (plantId != -1){
            const queryParams = new URLSearchParams();
            queryParams.append('plantId', plantId);
            queryParams.append('latinName', latinName);
            queryParams.append('commonName', commonName);
            queryParams.append('arabicName', arabicName);
            queryParams.append('plantOriginId', originId);
            queryParams.append('plantDivisionId', divisionId);
            queryParams.append('plantVegetableReignId', vegetableReignId);
            queryParams.append('plantClassId', classId);
            queryParams.append('plantFamilyId', familyId);
            queryParams.append('plantGenreId', genreId);
            queryParams.append('plantSpeciesId', speciesId);
            queryParams.append('plantPartId', usedPartId);

            const url = `http://localhost:5202/api/Plant/Update?${queryParams.toString()}`;
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
        setCommonName('');
        setArabicName('');
        setOrigin(0)
        setDivision(0)
        setVegetableReign(0)
        setClass(0)
        setFamily(0)
        setGenre(0)
        setSpecies(0)
        setUsedPart(0)

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


                            <label className='modal-item'>
                                Origine:
                                <select className='modal-item' value={originId} onChange={(e) => handleOriginChange(e)}>
                                    <option className='modal-item' value={0}></option>
                                    {originList.map((element, index) => (
                                    <option value={element.plantOriginId}>{element.latinName}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>

                            <label className='modal-item'>
                                Division:
                                <select className='modal-item' value={divisionId} onChange={(e) => handleDivisionChange(e)}>
                                    <option className='modal-item' value={0}></option>
                                    {divisionList.map((element, index) => (
                                        <option className='modal-item' value={element.plantDivisionId}>{element.latinName}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>

                            <label className='modal-item'>
                                Régne:
                                <select className='modal-item' value={vegetableReignId} onChange={(e) => handleVegetableReignChange(e)}>
                                    <option className='modal-item' value={0}></option>
                                    {vegetableReignList.map((element, index) => (
                                        <option className='modal-item' value={element.vegetableReignId}>{element.latinName}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>


                            <label className='modal-item'>
                                Classe:
                                <select className='modal-item' value={classId} onChange={(e) => handleClassChange(e)}>
                                    <option className='modal-item' value={0}></option>
                                    {plantClassList && plantClassList.map((element, index) => (
                                        <option className='modal-item' value={element.plantClassId}>{element.latinName}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>

                            <label className='modal-item'>
                                Famille:
                                <select className='modal-item' value={familyId} onChange={(e) => handleFamilyChange(e)}>
                                    <option className='modal-item' value={0}></option>
                                    {plantFamilyList && plantFamilyList.map((element, index) => (
                                        <option className='modal-item' value={element.plantFamilyId}>{element.latinName}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>

                            <label className='modal-item'>
                                Genre:
                                <select className='modal-item' value={genreId} onChange={(e) => handleGenreChange(e)}>
                                    <option className='modal-item' value={0}></option>
                                    {plantGenreList && plantGenreList.map((element, index) => (
                                        <option className='modal-item' value={element.plantGenreId}>{element.latinName}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>

                            <label className='modal-item'>
                                Éspece:
                                <select className='modal-item' value={speciesId} onChange={(e) => handleSpeciesChange(e)}>
                                    <option className='modal-item' value={0}></option>
                                    {plantSpeciesList && plantSpeciesList.map((element, index) => (
                                        <option className='modal-item' value={element.plantSpeciesId}>{element.latinName}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>

                            <label className='modal-item'>
                                Partie Utilise:
                                <select className='modal-item' value={usedPartId} onChange={(e) => handlePlantPartsChange(e)}>
                                    <option className='modal-item' value={0}></option>
                                    {plantPartList && plantPartList.map((element, index) => (
                                        <option className='modal-item' value={element.plantPartId}>{element.latinName}</option>
                                    ))}
                                </select>
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

export default AddPlant;