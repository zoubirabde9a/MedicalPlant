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
import AddPlantProperty from "./AddPlantProperty";

const PropertyList = ({filter, filterText}) => {
    const elements = [];
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
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

                case 'PlantConstituent':
                    path = `http://localhost:5202/api/PlantConstituent/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantContraindication':
                    path = `http://localhost:5202/api/PlantContraindication/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantEffect':
                    path = `http://localhost:5202/api/PlantEffect/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantNegativeEffect':
                    path = `http://localhost:5202/api/PlantNegativeEffect/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
                case 'PlantIndication':
                    path = `http://localhost:5202/api/PlantIndication/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
                    break;
            }
        }
        fetch(path)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.log(error));
    }, [filter, filterText, showModal, refresh]);

    console.log(data);
    data.map((item) =>
    {
        var properties = [];
        properties.push( { name: 'Nom Commun', value: item.latinName })
        switch (filter) {
            case 'PlantOrigin':
                elements.push({text: item.latinName, properties: properties, id : item.plantOriginId})
                break;
            case 'VegetableReign':
                elements.push({text: item.latinName, properties: properties, id : item.vegetableReignId})
                break;
            case 'PlantDivision':
                elements.push({text: item.latinName, properties: properties, id : item.plantDivisionId})
                break;
            case 'PlantClass':
                elements.push({text: item.latinName, properties: properties, id : item.plantClassId})
                break;
            case 'PlantFamily':
                elements.push({text: item.latinName, properties: properties, id : item.plantFamilyId})
                break;
            case 'PlantGenre':
                elements.push({text: item.latinName, properties: properties, id : item.plantGenreId})
                break;
            case 'PlantSpecies':
                elements.push({text: item.latinName, properties: properties, id : item.plantSpeciesId})
                break;
            case 'PlantPart':
                elements.push({text: item.latinName, properties: properties, id : item.plantPartId})
                break;

            case 'PlantConstituent':
                elements.push({text: item.latinName, properties: properties, id : item.plantConstituentId})
                break;
            case 'PlantContraindication':
                elements.push({text: item.latinName, properties: properties, id : item.plantContraindicationId})
                break;
            case 'PlantEffect':
                elements.push({text: item.latinName, properties: properties, id : item.plantEffectId})
                break;
            case 'PlantNegativeEffect':
                elements.push({text: item.latinName, properties: properties, id : item.plantPartId})
                break;
            case 'PlantIndication':
                elements.push({text: item.latinName, properties: properties, id : item.plantNegativeEffectId})
                break;
        }
    })

    const handleAddPressed = (e) =>
    {
        setShowModal(!showModal)
    }

    return (
        <div>
            <button className='modifyButton' onClick={handleAddPressed}>Ajouter</button>

            {
                (showModal && <AddPlantProperty property={filter} showModal = {showModal} setShowModal={setShowModal}/>)
            }


        <div className="element-list">
            {elements.map((element, index) => (
                <PropertyComponent
                    key={index}
                    properties={element.properties}
                    text={element.text}
                    setRefresh = {setRefresh}
                    refresh={refresh}
                    property={filter}
                    propertyId={element.id}
                />
            ))}
        </div>
        </div>
    );
};

export default PropertyList;