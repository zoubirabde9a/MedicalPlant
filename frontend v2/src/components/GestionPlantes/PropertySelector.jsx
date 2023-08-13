import { Button, Checkbox, Form, Input, List, Modal, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import FormItem from "antd/es/form/FormItem/index.js";

const PropertySelector = (props) => {
  const [propertyList, setPropertyList] = useState([]);


  var filterText = ""
  var pageOffset = 0
  var pageSize = 99999

  var path = `http://localhost:5202/api/PlantContraindication/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
  switch ("PlantOrigin")
  {
    case "PlantOrigin":
      path = `http://localhost:5202/api/PlantContraindication/GetAllByLatinName?offset=${pageOffset}&limit=${pageSize}&latinNameLike=` + filterText;
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
  useEffect(() => {
    fetch(path)
        .then((response) => response.json())
        .then((data) => {
          setPropertyList(data)
        })
        .catch((error) => console.log(error));
  }, []);

  const onFinish = () =>
  {
    props.propertySelectorHandler(false)
  }
  const closeModal = () =>
  {
    props.propertySelectorHandler(false)
  };

  const handleChange = () => {

  }

  return props.showPropertySelector ? (
    <Modal title="Ajouter une nouvelle plante" open={props.showPropertySelector} onOk={closeModal} onCancel={closeModal}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 550,
        }}
        // initialValues={null}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >

        <FormItem>
          <Select placeholder="Select a option..">
            {propertyList.map((element) => (
                <Option value={element.PlantContraindicationId}>{element.latinName}</Option>
            ))}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  ) : null;
};
export default PropertySelector;
