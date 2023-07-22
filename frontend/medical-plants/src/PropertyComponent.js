import React, {useState} from 'react';
import ModifyPlant from "./ModifyPlant";
import ModifyProperty from "./ModifyProperty";

const PropertyComponent = ({ properties, text, setRefresh, refresh, property, propertyId }) => {

    const [showModal, setShowModal] = useState(false);
    const [latinName, setLatinName] = useState(properties.latinName);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleRemoveButtonClick = async () =>
    {
        if (propertyId == undefined || propertyId <= 0)
        {
            return;
        }

        const queryParams = new URLSearchParams();
        queryParams.append('id', propertyId);


        var url = '';
        switch (property)
        {
            case 'PlantOrigin':
            {
                url = `http://localhost:5202/api/PlantOrigin/Remove?${queryParams.toString()}`;
                break;
            }
            case 'VegetableReign':
            {
                url = `http://localhost:5202/api/VegetableReign/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantDivision':
            {
                url = `http://localhost:5202/api/PlantDivision/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantClass':
            {
                url = `http://localhost:5202/api/PlantClass/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantFamily':
            {
                url = `http://localhost:5202/api/PlantFamily/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantGenre':
            {
                url = `http://localhost:5202/api/PlantGenre/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantSpecies':
            {
                url = `http://localhost:5202/api/PlantSpecies/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantPart':
            {
                url = `http://localhost:5202/api/PlantPart/Remove?${queryParams.toString()}`;
                break;
            }

            case 'PlantConstituent':
            {
                url = `http://localhost:5202/api/PlantConstituent/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantContraindication':
            {
                url = `http://localhost:5202/api/PlantContraindication/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantEffect':
            {
                url = `http://localhost:5202/api/PlantEffect/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantNegativeEffect':
            {
                url = `http://localhost:5202/api/PlantNegativeEffect/Remove?${queryParams.toString()}`;
                break;
            }
            case 'PlantIndication':
            {
                url = `http://localhost:5202/api/PlantIndication/Remove?${queryParams.toString()}`;
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
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }

        setRefresh(!refresh);
        console.log(refresh);
    }

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

        setRefresh(true);
    }


    return (
        <div className="element">
            <div className="text">
                <img src="favicon.ico" alt="Small Image"/>
                <div>
                    {text}
                </div>
                <button className='modifyButton' onClick={handleButtonClick}>Modifier</button>
                <button className='deleteButton' onClick={handleRemoveButtonClick}>Supprimer</button>
            </div>


            {showModal &&  <ModifyProperty property = {property} propertyId = {propertyId} setRefresh = {setRefresh} showModal = {showModal} setShowModal = {setShowModal} />}


        </div>
    );
};

export default PropertyComponent;