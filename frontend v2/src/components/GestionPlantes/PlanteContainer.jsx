import { AutoComplete, Button, Layout } from "antd";
import FormPlant from "./FormPlant";
import Datatable from "./Datatable";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";

const PlantContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [filterText, setFilterText] = useState(null);
  const [tableData, setTableData] = useState(null);

  const modalHandler = (entry) => setShowModal(entry);

  const searchHandler = (e) => {
    console.log("search ", e);
    setFilterText(e);
  };

  const searchFunction = () => {
    const pageOffset = 1;
    const pageSize = 10;
    var path = `http://localhost:5202/api/PlantDivision/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
    if (filterText) {
      switch ("PlantOrigin") {
        case "PlantOrigin":
          path = `http://localhost:5202/api/PlantOrigin/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "VegetableReign":
          path = `http://localhost:5202/api/VegetableReign/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantDivision":
          path = `http://localhost:5202/api/PlantDivision/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantClass":
          path = `http://localhost:5202/api/PlantClass/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantFamily":
          path = `http://localhost:5202/api/PlantFamily/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantGenre":
          path = `http://localhost:5202/api/PlantGenre/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantSpecies":
          path = `http://localhost:5202/api/PlantSpecies/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
          break;
        case "PlantPart":
          path = `http://localhost:5202/api/PlantPart/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
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
    fetch("http://localhost:5202/api/Plant/GetAll?offset=0&limit=20")
      .then((response) => response.json())
      .then((data) => {
        console.log("tableData ", data);
        setTableData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    searchFunction();
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

      <FormPlant fetchData={fetchData} showModal={showModal} modalHandler={modalHandler} />
      <Datatable fetchData={fetchData} tableData={tableData}/>
    </Content>
  );
};

export default PlantContainer;
