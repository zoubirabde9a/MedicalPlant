import React, {useEffect, useState} from 'react';
import ElementComponent from './ElementComponent';

const ElementList = (props) => {
    const {filter, filterText} = props;
    const elements = [];

    const [data, setData] = useState([]);
    useEffect(() => {
        var path = 'http://localhost:5202/api/Plant/GetAll?offset=0&limit=20';
        if (filterText && filterText.length > 0) {
            switch (filter) {
                case 'latinName':
                    path = 'http://localhost:5202/api/Plant/GetAllByLatinName?offset=0&limit=20&latinNameLike=' + filterText;
                    break;
                case 'commonName':
                    path = 'http://localhost:5202/api/Plant/GetAllByCommonName?offset=0&limit=20&commonNameLike=' + filterText;
                    break;
                case 'arabicName':
                    path = 'http://localhost:5202/api/Plant/GetAllByArabicName?offset=0&limit=20&arabicNameLike=' + filterText;
                    break;
            }
        }
        fetch(path)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.log(error));
    }, [filter, filterText]);

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
    })

    return (
        <div className="element-list">
            {elements.map((element, index) => (
                <ElementComponent
                    key={index}
                    properties={element.properties}
                    text={element.text}
                />
            ))}
        </div>
    );
};

export default ElementList;