import React, {useEffect, useState} from 'react';
import TableComponent from './TableComponent';
import TaskBar from "./TaskBar";
import ElementList from "./ElementList";
import {TableCell} from "@mui/material";
import ModalButton from "./AddPlant";
import ErrorComponent from "./ErrorComponent";
import SearchBar from "./SearchBar";
import PropertyList from "./PropertyList";

const App = () => {

    const [currentPage, setCurrentPage] = useState('home');
    const [filter, setFilter] = useState([]);
    const [filterText, setFilterText] = useState([]);
    const [originList, setOriginList] = useState([]);
    const [vegetableReignList, setVegetableReignList] = useState([]);
    const [plantDivisionList, setPlantDivisionList] = useState([]);

    const [plantClassList, setPlantClass] = useState([]);
    const [plantFamilyList, setPlantFamily] = useState([]);
    const [plantGenreList, setPlantGenre] = useState([]);
    const [plantSpeciesList, setPlantSpecies] = useState([]);
    const [plantPartList, setPlantPart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5202/api/PlantDivision/GetAll?offset=0&limit=9999')
            .then(response => response.json())
            .then(data => {
                setPlantDivisionList(data)
            })
            .catch(error => console.log(error));

        fetch('http://localhost:5202/api/PlantOrigin/GetAll?offset=0&limit=9999')
            .then(response => response.json())
            .then(data => {
                setOriginList(data)
            })
            .catch(error => console.log(error));

        fetch('http://localhost:5202/api/VegetableReign/GetAll?offset=0&limit=9999')
            .then(response => response.json())
            .then(data => {
                setVegetableReignList(data)
            })
            .catch(error => console.log(error));

        fetch('http://localhost:5202/api/PlantClass/GetAll?offset=0&limit=9999')
            .then(response => response.json())
            .then(data => {
                setPlantClass(data)
            })
            .catch(error => console.log(error));

        fetch('http://localhost:5202/api/PlantFamily/GetAll?offset=0&limit=9999')
            .then(response => response.json())
            .then(data => {
                setPlantFamily(data)
            })
            .catch(error => console.log(error));

        fetch('http://localhost:5202/api/PlantGenre/GetAll?offset=0&limit=9999')
            .then(response => response.json())
            .then(data => {
                setPlantGenre(data)
            })
            .catch(error => console.log(error));

        fetch('http://localhost:5202/api/PlantSpecies/GetAll?offset=0&limit=9999')
            .then(response => response.json())
            .then(data => {
                setPlantSpecies(data)
            })
            .catch(error => console.log(error));

        fetch('http://localhost:5202/api/PlantPart/GetAll?offset=0&limit=9999')
            .then(response => response.json())
            .then(data => {
                setPlantPart(data)
            })
            .catch(error => console.log(error));
    }, []);



    return (
      <div>
          <TaskBar setCurrentPage={setCurrentPage} />
          <SearchBar currentPage={currentPage} setFilter={setFilter} setFilterText={setFilterText}/>
          {(currentPage == 'plantOrigin' && <PropertyList filter={'PlantOrigin'} filterText={filterText}/>)}
          {(currentPage == 'vegetableReign' && <PropertyList filter={'VegetableReign'} filterText={filterText}/>)}
          {(currentPage == 'plantDivision' && <PropertyList filter={'PlantDivision'} filterText={filterText}/>)}
          {(currentPage == 'plantClass' && <PropertyList filter={'PlantClass'} filterText={filterText}/>)}
          {(currentPage == 'plantFamily' && <PropertyList filter={'PlantFamily'} filterText={filterText}/>)}
          {(currentPage == 'plantGenre' && <PropertyList filter={'PlantGenre'} filterText={filterText}/>)}
          {(currentPage == 'plantSpecies' && <PropertyList filter={'PlantSpecies'} filterText={filterText}/>)}
          {(currentPage == 'plantPart' && <PropertyList filter={'PlantPart'} filterText={filterText}/>)}
          {( currentPage == 'home' &&
           <ElementList filter={filter} filterText={filterText} originList = {originList} divisionList = {plantDivisionList} vegetableReignList = {vegetableReignList} plantClassList = {plantClassList}
                        plantFamilyList = {plantFamilyList} plantGenreList = {plantGenreList} plantSpeciesList = {plantSpeciesList} plantPartList = {plantPartList}/>)}
      </div>
  );
};

export default App;