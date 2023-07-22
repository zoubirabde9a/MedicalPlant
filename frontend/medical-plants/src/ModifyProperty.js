import React, {useEffect, useState} from 'react';
import ErrorComponent from "./ErrorComponent";

const ModifyProperty = (props) => {

    const {property, showModal, setRefresh, setShowModal, propertyId} = props;

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
        var url = '';
        switch (property)
        {
            case 'PlantOrigin':
            {
                url = 'http://localhost:5202/api/PlantOrigin/Get?plantOriginId=' + propertyId;
                break;
            }
            case 'VegetableReign':
            {
                url = 'http://localhost:5202/api/VegetableReign/Get?vegetableReignId=' + propertyId;
                break;
            }
            case 'PlantDivision':
            {
                url = 'http://localhost:5202/api/PlantDivision/Get?plantDivisionId=' + propertyId;
                break;
            }
            case 'PlantClass':
            {
                url = 'http://localhost:5202/api/PlantClass/Get?plantClassId=' + propertyId;
                break;
            }
            case 'PlantFamily':
            {
                url = 'http://localhost:5202/api/PlantFamily/Get?plantFamilyId=' + propertyId;
                break;
            }
            case 'PlantGenre':
            {
                url = 'http://localhost:5202/api/PlantGenre/Get?plantGenreId=' + propertyId;
                break;
            }
            case 'PlantSpecies':
            {
                url = 'http://localhost:5202/api/PlantSpecies/Get?plantSpeciesId=' + propertyId;
                break;
            }
            case 'PlantPart':
            {
                url = 'http://localhost:5202/api/PlantPart/Get?plantPartId=' + propertyId;
                break;
            }


            case 'PlantConstituent':
            {
                url = 'http://localhost:5202/api/PlantConstituent/Get?id=' + propertyId;
                break;
            }

            case 'PlantContraindication':
            {
                url = 'http://localhost:5202/api/PlantContraindication/Get?id=' + propertyId;
                break;
            }

            case 'PlantEffect':
            {
                url = 'http://localhost:5202/api/PlantEffect/Get?id=' + propertyId;
                break;
            }

            case 'PlantNegativeEffect':
            {
                url = 'http://localhost:5202/api/PlantNegativeEffect/Get?id=' + propertyId;
                break;
            }

            case 'PlantIndication':
            {
                url = 'http://localhost:5202/api/PlantIndication/Get?id=' + propertyId;
                break;
            }
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setLatinName(data.latinName);
            })
            .catch(error => console.log(error));

    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update plant values
        if (propertyId != -1){
            const queryParams = new URLSearchParams();
            queryParams.append('id', propertyId);
            queryParams.append('latinName', latinName);

            var url = `http://localhost:5202/api/PlantClass/Update?${queryParams.toString()}`;

            switch (property)
            {
                case 'PlantOrigin':
                {
                    url = `http://localhost:5202/api/PlantOrigin/Update?${queryParams.toString()}`;
                    break;
                }
                case 'VegetableReign':
                {
                    url = `http://localhost:5202/api/VegetableReign/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantDivision':
                {
                    url = `http://localhost:5202/api/PlantDivision/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantClass':
                {
                    url = `http://localhost:5202/api/PlantClass/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantFamily':
                {
                    url = `http://localhost:5202/api/PlantFamily/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantGenre':
                {
                    url = `http://localhost:5202/api/PlantGenre/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantSpecies':
                {
                    url = `http://localhost:5202/api/PlantSpecies/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantPart':
                {
                    url = `http://localhost:5202/api/PlantPart/Update?${queryParams.toString()}`;
                    break;
                }

                case 'PlantConstituent':
                {
                    url = `http://localhost:5202/api/PlantConstituent/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantContraindication':
                {
                    url = `http://localhost:5202/api/PlantContraindication/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantEffect':
                {
                    url = `http://localhost:5202/api/PlantEffect/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantNegativeEffect':
                {
                    url = `http://localhost:5202/api/PlantNegativeEffect/Update?${queryParams.toString()}`;
                    break;
                }
                case 'PlantIndication':
                {
                    url = `http://localhost:5202/api/PlantIndication/Update?${queryParams.toString()}`;
                    break;
                }
            }

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

export default ModifyProperty;