import { Button, Checkbox, Form, Input, List, Modal, Select } from "antd";
import { useEffect, useRef, useState } from "react";

const FormPlant = (props) => {
  const [originList, setOriginList] = useState([]);
  const [vegetableReignList, setVegetableReignList] = useState([]);
  const [plantDivisionList, setPlantDivisionList] = useState([]);
  const [plantClassList, setPlantClass] = useState([]);
  const [plantFamilyList, setPlantFamily] = useState([]);
  const [plantGenreList, setPlantGenre] = useState([]);
  const [plantSpeciesList, setPlantSpecies] = useState([]);
  const [plantPartList, setPlantPart] = useState([]);

  const formRef = useRef(null);

  const onFinish = async (values) => {
    console.log("onFinish: ", values);
    var plantId = -1;
    const queryParams = new URLSearchParams();
    // queryParams.append("plantId", plantId);
    queryParams.append("latinName", values.latinName);
    queryParams.append("commonName", values.commonName);
    queryParams.append("arabicName", values.arabicName);
    // queryParams.append("plantOriginId", values.originId);
    // queryParams.append("plantDivisionId", values.ivisionId);
    // queryParams.append("plantVegetableReignId", values.vegetableReignId);
    // queryParams.append("plantClassId", values.classId);
    // queryParams.append("plantFamilyId", values.familyId);
    // queryParams.append("plantGenreId", values.genreId);
    // queryParams.append("plantSpeciesId", values.speciesId);
    // queryParams.append("plantPartId", values.usedPartId);
    const url = `http://localhost:5202/api/Plant/Add?${queryParams.toString()}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data: success ", data);
        plantId = data.plantId;
        if (plantId != -1) {
          const queryParams = new URLSearchParams();
          queryParams.append("plantId", plantId);
          queryParams.append("latinName", values.latinName);
          queryParams.append("commonName", values.commonName);
          queryParams.append("arabicName", values.arabicName);
          queryParams.append("plantOriginId", values.originId);
          queryParams.append("plantDivisionId", values.plantDivisionId);
          queryParams.append("plantVegetableReignId", values.vegetableReignId);
          queryParams.append("plantClassId", values.plantClassId);
          queryParams.append("plantFamilyId", values.plantFamilyId);
          queryParams.append("plantGenreId", values.plantGenreId);
          queryParams.append("plantSpeciesId", values.plantSpeciesId);
          queryParams.append("plantPartId", values.usedPartId);
          const url = `http://localhost:5202/api/Plant/Update?${queryParams.toString()}`;
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("hamdoulah ");
              props.fetchData();
              props.modalHandler(false);
            })
            .catch((error) => console.log(error));
        } else {
          console.log("ERRROROROROROROROROR");
        }
      })
      .catch((error) => console.error("Error:", error));
    props.modalHandler(false);
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  //   props.modalHandler(false);
  // };
  const closeModal = () => {
    formRef.current.resetFields();
    props.modalHandler(false);
    props.setItemData(null);
  };

  useEffect(() => {
    fetch("http://localhost:5202/api/PlantDivision/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantDivisionList(data);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:5202/api/PlantOrigin/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        console.log("PlantOrigin", data);
        setOriginList(data);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:5202/api/VegetableReign/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setVegetableReignList(data);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:5202/api/PlantClass/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantClass(data);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:5202/api/PlantFamily/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantFamily(data);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:5202/api/PlantGenre/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantGenre(data);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:5202/api/PlantSpecies/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantSpecies(data);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:5202/api/PlantPart/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantPart(data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("item ", props?.itemData?.commonName);
  return props.showModal ? (
    <Modal title="Ajouter une nouvelle plante" open={props.showModal} onOk={closeModal} onCancel={closeModal}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        // initialValues={null}
        ref={formRef}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Form.Item
          label="plantId"
          name="plantId"
          initialValue={props?.itemData?.plantId ?? null}
          style={{ display: "none" }}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your password!",
          //   },
          // ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nom Commun"
          name="commonName"
          initialValue={props?.itemData?.commonName ?? null}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your password!",
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nom Latin"
          name="latinName"
          initialValue={props?.itemData?.latinName ?? null}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your Nom Latin",
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nom Arabe"
          name="arabicName"
          initialValue={props?.itemData?.arabicName ?? null}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your username!",
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Origin"
          name="originId"
          initialValue={props?.itemData?.plantOriginId ?? null}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your password!",
          //   },
          // ]}
        >
          <Select placeholder="Select a option..">
            {originList.map((element) => (
              <Option value={element.plantOriginId}>{element.latinName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Division"
          name="plantDivisionId"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your username!",
          //   },
          // ]}
        >
          <Select placeholder="Select a option..">
            {plantDivisionList.map((element) => (
              <Option value={element.plantDivisionId}>{element.latinName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Régne"
          name="vegetableReignId"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your password!",
          //   },
          // ]}
        >
          <Select placeholder="Select a option..">
            {vegetableReignList.map((element) => (
              <Option value={element.vegetableReignId}>{element.latinName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Classe"
          name="plantClassId"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your username!",
          //   },
          // ]}
        >
          <Select placeholder="Select a option..">
            {plantClassList.map((element) => (
              <Option value={element.plantClassId}>{element.latinName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Famille"
          name="plantFamilyId"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your username!",
          //   },
          // ]}
        >
          <Select placeholder="Select a option..">
            {plantFamilyList.map((element) => (
              <Option value={element.plantFamilyId}>{element.latinName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Genre"
          name="plantGenreId"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your password!",
          //   },
          // ]}
        >
          <Select placeholder="Select a option..">
            {plantGenreList.map((element) => (
              <Option value={element.plantGenreId}>{element.latinName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Éspece"
          name="plantSpeciesId"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your username!",
          //   },
          // ]}
        >
          <Select placeholder="Select a option..">
            {plantSpeciesList.map((element) => (
              <Option value={element.plantSpeciesId}>{element.latinName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Partie Utilise"
          name="usedPartId"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your password!",
          //   },
          // ]}
        >
          <Select placeholder="Select a option..">
            {plantPartList.map((element) => (
              <Option value={element.plantPartId}>{element.latinName}</Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  ) : null;
};
export default FormPlant;
