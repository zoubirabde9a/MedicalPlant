import React, {useEffect, useState} from 'react';
import ElementComponent from './ElementComponent';
import AddPlant from "./AddPlant";

const ElementList = (props) => {
    const {filter, filterText, originList, divisionList, vegetableReignList, plantClassList, plantFamilyList, plantGenreList, plantPartList, plantSpeciesList} = props;

    const elements = [];
    const ids = [];
    const [showModal, setShowModal] = useState(false);


    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [pageSize, setPageSize] = useState(500);
    const [pageOffset, setPageOffset] = useState(0);

    useEffect(() => {
        var path = `http://localhost:5202/api/Plant/GetAll?offset=${pageOffset}&limit=${pageSize}`;
        if (filterText && filterText.length > 0) {
            switch (filter) {
                case 'latinName':
                    path = `http://localhost:5202/api/Plant/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=${filterText}`;
                    break;
                case 'commonName':
                    path = `http://localhost:5202/api/Plant/GetAllByCommonName?offset=${pageOffset}&limit=${pageSize}&commonNameLike=${filterText}`;
                    break;
                case 'arabicName':
                    path = `http://localhost:5202/api/Plant/GetAllByArabicName?offset=${pageOffset}&limit=${pageSize}&arabicNameLike=${filterText}`;
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


    data.map((item) =>
    {
        var properties = [];
        properties.push( { name: 'Nom Commun', value: item.commonName })
        properties.push( { name: 'Nom Arabe', value: item.arabicName })

        properties.push( { name: 'Origine', value: item.origin.latinName })
        properties.push( { name: 'Classe', value: item.plantClass.latinName })
        properties.push( { name: 'Dévision', value: item.plantDivision.latinName })
        properties.push( { name: 'Famille', value: item.plantFamily.latinName })
        properties.push( { name: 'Genre', value: item.plantGenre.latinName })
        properties.push( { name: 'Régne', value: item.vegetableReign.latinName })
        properties.push( { name: 'Èspéce', value: item.plantSpecies.latinName })
        properties.push( { name: 'Partie Utilisé', value: item.usedPart.latinName })
        elements.push({text: item.latinName, properties: properties})
        ids.push(item.plantId)
    })
    const handleAddPlant= () =>
    {
        setShowModal(!showModal);
    }

    return (
        <div>
            <button className='modifyButton' onClick={handleAddPlant}>Ajouter</button>

        <AddPlant showModal = {showModal} setShowModal = {setShowModal} originList={originList} divisionList = {divisionList}
                  vegetableReignList = {vegetableReignList} plantClassList = {plantClassList}
                  plantFamilyList = {plantFamilyList} plantGenreList = {plantGenreList} plantSpeciesList = {plantSpeciesList} plantPartList = {plantPartList}></AddPlant>

        <div className="element-list">

            {elements.map((element, index) => (
                <ElementComponent
                    plantId={ids[index]}
                    properties={element.properties}
                    text={element.text}
                    setRefresh={setRefresh}
                    originList={originList} divisionList = {divisionList}
                    vegetableReignList = {vegetableReignList} plantClassList = {plantClassList}
                    plantFamilyList = {plantFamilyList} plantGenreList = {plantGenreList} plantSpeciesList = {plantSpeciesList} plantPartList = {plantPartList}
                />
            ))}
        </div>
        </div>
    );
};

export default ElementList;