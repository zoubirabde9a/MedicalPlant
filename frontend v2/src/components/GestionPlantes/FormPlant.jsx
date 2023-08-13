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

  const [plantConstituent, setPlantConstituent] = useState([]);
  const [plantContraindication, setPlantContraindication] = useState([]);
  const [plantEffect, setPlantEffect] = useState([]);
  const [plantNegativeEffect, setPlantNegativeEffect] = useState([]);
  const [plantIndication, setPlantIndication] = useState([]);

  const [selectedPlantConstituent, setSelectedPlantConstituent] = useState([]);
  const [selectedPlantContraindication, setSelectedPlantContraindication] = useState([]);
  const [selectedPlantEffect, setSelectedPlantEffect] = useState([]);
  const [selectedPlantNegativeEffect, setSelectedPlantNegativeEffect] = useState([]);
  const [selectedPlantIndication, setSelectedPlantIndication] = useState([]);

  const formRef = useRef(null);

  const onFinish = async (values) => {
    var plantId = props.itemData.plantId

    if (plantId != -1) {

      var contraindicationListString = (selectedPlantContraindicationList.join(','))

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
      queryParams.set("plantContraindicationList", contraindicationListString);
      const url = `http://localhost:5202/api/Plant/Update?${queryParams.toString()}`;
      console.log(contraindicationListString)
      console.log(url)
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
          .then((response) => {
            response.json().then((data) => {
              props.fetchData();
              props.modalHandler(false);
            })
            .catch((error) => console.log(error));

          })

    } else {
      console.log("ERRROROROROROROROROR");
    }

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
    var plantId = props?.itemData?.plantId ?? 0
    if (plantId == undefined)
    {
      plantId = 0
    }

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


    fetch("http://localhost:5202/api/PlantContraindication/GetAll?offset=0&limit=9999")
        .then((response) => response.json())
        .then((data) => {
          console.log("lol : " + data.length)
          setPlantContraindication(data);
        })
        .catch((error) => console.log(error));

    fetch("http://localhost:5202/api/PlantContraindication/GetByPlantId?offset=0&limit=9999&plantId=" + plantId)
        .then((response) => response.json())
        .then((data) => {
          setSelectedPlantContraindication(data);
          console.log("selected list size : " + data.length)
          data.forEach(element =>
          {
            console.log("selected list : " + element.plantContraindicationId)
            selectedPlantContraindicationList.push(element.plantContraindicationId)
          });
        })
        .catch((error) => console.log(error));
  }, []);

  var plantContraindicationList = [];
  var selectedPlantContraindicationList = [];

  const handlePlantContraindicationChange = (array) => {
    selectedPlantContraindicationList = array
  };



  plantContraindication.map((element) =>
  {
    plantContraindicationList.push({
      label: element.latinName,
      value: element.plantContraindicationId,
    });
  });

  selectedPlantContraindication.map((element) =>
  {
    plantContraindicationList.push(element.latinName);
  });


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
          initialValue={props?.itemData?.origin?.plantOriginId ?? null}
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
          initialValue={props?.itemData?.plantDivision?.plantDivisionId ?? null}
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
          initialValue={props?.itemData?.vegetableReign?.vegetableReignId ?? null}
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
          initialValue={props?.itemData?.plantClass?.plantClassId ?? null}
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
          initialValue={props?.itemData?.plantFamily?.plantFamilyId ?? null}
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

          initialValue={props?.itemData?.plantGenre?.plantGenreId ?? null}
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

          initialValue={props?.itemData?.plantSpecies?.plantSpeciesId ?? null}
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

          initialValue={props?.itemData?.usedPart?.plantPartId ?? null}
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










        <Form.Item
            label="Contre Indication"
            name="contraindications"

            initialValue={selectedPlantContraindicationList}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your password!",
            //   },
            // ]}
        >

            <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="Please select"
                onChange={handlePlantContraindicationChange}
                options = {plantContraindicationList}
            />

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
