import { AutoComplete, Button, Layout } from "antd";
import FormPlant from "./FormPlant";
import Datatable from "./Datatable";
import DeletePlant from './DeletePlant';
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import PropertySelector from "./PropertySelector.jsx";
import BackendServerUrl from "../../Config.jsx";

const PlantContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeletePlant, setShowDeletePlant] = useState(false);
  const [showPropertySelector, setShowPropertySelector] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [tableData, setTableData] = useState(null);
  const [itemData, setItemData] = useState(null);

  const modalHandler = (entry) => setShowModal(entry);
  const propertySelectorHandler = (entry) => setShowPropertySelector(entry);

  const searchHandler = (e) => {
    console.log("search ", e);
    setFilterText(e);
  };

  const searchFunction = () => {
    const pageOffset = 1;
    const pageSize = 10;
    var path = BackendServerUrl + `api/PlantDivision/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
    if (filterText) {
      switch ("PlantOrigin") {
        case "PlantOrigin":
          path = BackendServerUrl + `api/PlantOrigin/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "VegetableReign":
          path = BackendServerUrl + `api/VegetableReign/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantDivision":
          path = BackendServerUrl + `api/PlantDivision/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantClass":
          path = BackendServerUrl + `api/PlantClass/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantFamily":
          path = BackendServerUrl + `api/PlantFamily/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantGenre":
          path = BackendServerUrl + `api/PlantGenre/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantSpecies":
          path = BackendServerUrl + `api/PlantSpecies/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantPart":
          path = BackendServerUrl + `api/PlantPart/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
      }
    }
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        console.log("data search ", data);
        setSearchData(data);
      })
      .catch((error) => console.log(error));
  };


  const fetchData = () => {
    fetch(BackendServerUrl + `api/Plant/GetAllByLatinName?offset=0&limit=99999&latinNameLike=` + filterText)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    searchFunction();
    fetchData();
  }, [filterText]);

  return (
    <Content
      style={{
        margin: "20px",
        height: "100vh",
      }}
    >
      <Button
        onClick={() => setShowModal(true)}
        style={
          {
            //   fontSize: "16px",
            //   width: 128,
            //   height: 128,
          }
        }
      >
        Ajouter
      </Button>
      <AutoComplete
        // options={options}
        style={{
          width: 200,
        }}
        // onSelect={onSelect}
        // onSearch={(text) => setOptions(getPanelValue(text))}
        onChange={searchHandler}
        placeholder="Recherche"
      />

      <FormPlant fetchData={fetchData} showModal={showModal} modalHandler={modalHandler} setItemData={setItemData} itemData={itemData}/>
      <DeletePlant fetchData={fetchData} itemData={itemData} setShowDeletePlant={setShowDeletePlant} showDeletePlant={showDeletePlant} />
      <PropertySelector showPropertySelector={showPropertySelector} propertySelectorHandler={propertySelectorHandler}/>
      <Datatable fetchData={fetchData} tableData={tableData} modalHandler={modalHandler} setItemData={setItemData} setShowDeletePlant={setShowDeletePlant} showDeletePlant={setShowDeletePlant}/>
    </Content>
  );
};

export default PlantContainer;
