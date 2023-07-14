import React, {useEffect, useState} from 'react';
import ElementComponent from './ElementComponent';
import PropertyComponent from "./PropertyComponent";
import AddPlant from "./AddPlant";
import AddPlantDivision from "./AddPlantDivision";
import AddPlantOrigin from "./AddPlantOrigin";
import AddPlantVegetableReign from "./AddPlantVegetableReign";
import AddPlantClass from "./AddPlantClass";
import AddPlantFamily from "./AddPlantFamily";
import AddPlantGenre from "./AddPlantGenre";
import AddPlantSpecies from "./AddPlantSpecies";
import AddPlantUsedPart from "./AddPlantUsedPart";

const PropertyList = ({filter, filterText}) => {
    const elements = [];
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([]);

    const [pageSize, setPageSize] = useState(500);
    const [pageOffset, setPageOffset] = useState(0);


    useEffect(() => {
        var path = `http://localhost:5202/api/PlantDivision/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
        if (filterText) {
            switch (filter) {
                case 'PlantOrigin':
                    path = `http://localhost:5202/api/PlantOrigin/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'VegetableReign':
                    path = `http://localhost:5202/api/VegetableReign/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantDivision':
                    path = `http://localhost:5202/api/PlantDivision/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantClass':
                    path = `http://localhost:5202/api/PlantClass/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantFamily':
                    path = `http://localhost:5202/api/PlantFamily/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantGenre':
                    path = `http://localhost:5202/api/PlantGenre/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantSpecies':
                    path = `http://localhost:5202/api/PlantSpecies/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantPart':
                    path = `http://localhost:5202/api/PlantPart/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
            }
        }
        fetch(path)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.log(error));
    }, [filter, filterText, showModal]);

    data.map((item) =>
    {
        var properties = [];
        properties.push( { name: 'Nom Commun', value: item.latinName })
        elements.push({text: item.latinName, properties: properties})
    })

    const handleAddPressed = (e) =>
    {
        setShowModal(!showModal)
    }

    return (
        <div>
            <button className='modifyButton' onClick={handleAddPressed}>Ajouter</button>

            {
                (filter == 'PlantOrigin' && showModal && <AddPlantOrigin showModal = {showModal} setShowModal={setShowModal}/>)
            }
            {
                (filter == 'VegetableReign' && showModal && <AddPlantVegetableReign showModal = {showModal} setShowModal={setShowModal}/>)
            }
            {
                (filter == 'PlantDivision' && showModal && <AddPlantDivision showModal = {showModal} setShowModal={setShowModal}/>)
            }
            {
                (filter == 'PlantClass' && showModal && <AddPlantClass showModal = {showModal} setShowModal={setShowModal}/>)
            }
            {
                (filter == 'PlantFamily' && showModal && <AddPlantFamily showModal = {showModal} setShowModal={setShowModal}/>)
            }
            {
                (filter == 'PlantGenre' && showModal && <AddPlantGenre showModal = {showModal} setShowModal={setShowModal}/>)
            }
            {
                (filter == 'PlantSpecies' && showModal && <AddPlantSpecies showModal = {showModal} setShowModal={setShowModal}/>)
            }
            {
                (filter == 'PlantPart' && showModal && <AddPlantUsedPart showModal = {showModal} setShowModal={setShowModal}/>)
            }

        <div className="element-list">
            {elements.map((element, index) => (
                <PropertyComponent
                    key={index}
                    properties={element.properties}
                    text={element.text}
                />
            ))}
        </div>
        </div>
    );
};

export default PropertyList;