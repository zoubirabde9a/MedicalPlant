import React, {useState} from 'react';
import AddPlant from "./AddPlant";
import ModifyPlant from "./ModifyPlant";

const ElementComponent = ({ plantId, setRefresh, properties, text , originList, divisionList, vegetableReignList,
                              plantClassList, plantFamilyList, plantGenreList, plantPartList, plantSpeciesList}) => {

    const [showModal, setShowModal] = useState(false);


    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        
    }


    return (
        <div className="element">
            <div className="text">
                <img src="favicon.ico" alt="Small Image"/>
                <div className='element-name'>
                    {text}
                </div>
                <button className='modifyButton' onClick={handleButtonClick}>Modifier</button>
            </div>

            <div className="properties">
                {properties.map((property, index) => (property.value) && (
                    <div key={index} className="property">
                        <span className="property-name">{property.name}</span>
                        <span className="property-value">{property.value}</span>
                    </div>
                ))}
            </div>

            {showModal &&  <ModifyPlant plantId = {plantId} setRefresh = {setRefresh} showModal = {showModal} setShowModal = {setShowModal} originList={originList} divisionList = {divisionList}
                                     vegetableReignList = {vegetableReignList} plantClassList = {plantClassList}
                                     plantFamilyList = {plantFamilyList} plantGenreList = {plantGenreList} plantSpeciesList = {plantSpeciesList} plantPartList = {plantPartList}></ModifyPlant>}

        </div>
    );
};

export default ElementComponent;