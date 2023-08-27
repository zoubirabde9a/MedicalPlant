import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import BackendServerUrl from "../../Config.jsx";

const FormPlant = (props) => {
  const [originList, setOriginList] = useState([]);
  const [vegetableReignList, setVegetableReignList] = useState([]);
  const [plantDivisionList, setPlantDivisionList] = useState([]);
  const [plantClassList, setPlantClass] = useState([]);
  const [plantFamilyList, setPlantFamily] = useState([]);
  const [plantGenreList, setPlantGenre] = useState([]);
  const [plantSpeciesList, setPlantSpecies] = useState([]);
  const [plantPartList, setPlantPart] = useState([]);

  const [plantConstituent, setPlantConstituent] = useState(null);
  const [plantContraindication, setPlantContraindication] = useState(null);
  const [plantEffect, setPlantEffect] = useState(null);
  const [plantNegativeEffect, setPlantNegativeEffect] = useState(null);
  const [plantIndication, setPlantIndication] = useState(null);

  const [selectedPlantContraindicationList, setSelectedPlantContraindicationList] = useState(null)
  const [selectedPlantConstituentList, setSelectedPlantConstituentList] = useState(null)
  const [selectedPlantEffectList, setSelectedPlantEffectList] = useState(null)
  const [selectedPlantNegativeEffectList, setSelectedPlantNegativeEffectList] = useState(null)
  const [selectedPlantIndicationList, setSelectedPlantIndicationList] = useState(null)


  const [plantContraindicationList, setPlantContraindicationList] = useState([])
  const [plantConstituentList, setPlantConstituentList] = useState([])
  const [plantEffectList, setPlantEffectList] = useState([])
  const [plantNegativeEffectList, setPlantNegativeEffectList] = useState([])
  const [plantIndicationList, setPlantIndicationList] = useState([])

  const formRef = useRef(null);

  const isDataReady = () =>
  {
    return true;
  }

  const onFinish = async (values) => {
    var plantId = props?.itemData?.plantId ?? -1

    if (plantId != -1) {

      var contraindicationListString = (selectedPlantContraindicationList.join(','))
      var constituentListString = (selectedPlantConstituentList.join(','))
      var effectListString = (selectedPlantEffectList.join(','))
      var negativeEffectListString = (selectedPlantNegativeEffectList.join(','))
      var indicationListString = (selectedPlantIndicationList.join(','))

      console.log(values)

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
      queryParams.set("plantConstituentList", constituentListString);
      queryParams.set("plantEffectList", effectListString);
      queryParams.set("plantNegativeEffectList", negativeEffectListString);
      queryParams.set("plantIndicationList", indicationListString);
      const url = BackendServerUrl + `api/Plant/Update?${queryParams.toString()}`;

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
    console.log("closing modal!")
    formRef.current.resetFields();
    props.modalHandler(false);
    props.setItemData(null);

    setPlantConstituent(null)
    setPlantContraindication(null)
    setPlantEffect(null)
    setPlantNegativeEffect(null)
    setPlantIndication(null)

    setSelectedPlantConstituentList(null)
    setSelectedPlantContraindicationList(null)
    setSelectedPlantEffectList(null)
    setSelectedPlantNegativeEffectList(null)
    setSelectedPlantIndicationList(null)
  };


  const getPropertyEntry = (entry, property) =>
  {
    var id = 0
    switch (property)
    {
      case 'plantContraindication':
      {
        id = entry.plantContraindicationId
        break;
      }

      case 'plantConstituent':
      {
        id = entry.plantConstituentId
        break;
      }

      case 'plantEffect':
      {
        id = entry.plantEffectId
        break;
      }

      case 'plantNegativeEffect':
      {
        id = entry.plantNegativeEffectId
        break;
      }

      case 'plantIndication':
      {
        id = entry.plantIndicationId
        break;
      }
    }

    return id;
  }

  const getSelectedPropertyList = (list, property) =>
  {
    if (list != null)
    {
      var propertyList = []
      list.forEach(entry =>
      {
        if (entry != null)
        {
          propertyList.push(getPropertyEntry(entry, property))
        }
      })
      return propertyList
    }
  }

  const getViewList = (list, propertyName) =>
  {
    var list_list = []
    if (list != null) {
      list.map((element) => {
        list_list.push({
          label: element.latinName,
          value: getPropertyEntry(element, propertyName),
        });
      });
    }
    return list_list
  }



  useEffect(() => {

    var plantId = props?.itemData?.plantId ?? 0
    if (plantId == undefined)
    {
      plantId = 0
    }

    fetch(BackendServerUrl + "api/PlantDivision/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantDivisionList(data);
      })
      .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantOrigin/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {

        setOriginList(data);
      })
      .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/VegetableReign/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setVegetableReignList(data);
      })
      .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantClass/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantClass(data);
      })
      .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantFamily/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantFamily(data);
      })
      .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantGenre/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantGenre(data);
      })
      .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantSpecies/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantSpecies(data);
      })
      .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantPart/GetAll?offset=0&limit=9999")
      .then((response) => response.json())
      .then((data) => {
        setPlantPart(data);
      })
      .catch((error) => console.log(error));



    fetch(BackendServerUrl + "api/PlantContraindication/GetAll?offset=0&limit=9999")
        .then((response) => response.json())
        .then((data) => {
          setPlantContraindication(data);
        })
        .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantConstituent/GetAll?offset=0&limit=9999")
        .then((response) => response.json())
        .then((data) => {
          setPlantConstituent(data);
        })
        .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantEffect/GetAll?offset=0&limit=9999")
        .then((response) => response.json())
        .then((data) => {
          setPlantEffect(data);
        })
        .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantNegativeEffect/GetAll?offset=0&limit=9999")
        .then((response) => response.json())
        .then((data) => {
          setPlantNegativeEffect(data);
        })
        .catch((error) => console.log(error));

    fetch(BackendServerUrl + "api/PlantIndication/GetAll?offset=0&limit=9999")
        .then((response) => response.json())
        .then((data) => {
          setPlantIndication(data);
        })
        .catch((error) => console.log(error));

    var plantContraindicationList_list = getViewList(plantContraindication, "plantContraindication")
    setPlantContraindicationList(plantContraindicationList_list)

    var plantConstituentList_list = getViewList(plantConstituent, "plantConstituent")
    setPlantConstituentList(plantConstituentList_list)

    var plantEffectList_list = getViewList(plantEffect, "plantEffect")
    setPlantEffectList(plantEffectList_list)

    var plantNegativeEffectList_list = getViewList(plantNegativeEffect, "plantNegativeEffect")
    setPlantNegativeEffectList(plantNegativeEffectList_list)

    var plantIndicationList_list = getViewList(plantIndication, "plantIndication")
    setPlantIndicationList(plantIndicationList_list)

  }, [props.showModal]);

  useEffect(()=> {
    var selectedPlantContraindicationList_r =
        getSelectedPropertyList(props?.itemData?.plantContraindicationList ?? null, "plantContraindication")
    setSelectedPlantContraindicationList(selectedPlantContraindicationList_r)

  }, [props?.itemData?.plantContraindicationList])

  useEffect(()=>
  {
    var selectedPlantConstituentList_r =
        getSelectedPropertyList(props?.itemData?.plantConstituentList ?? null, "plantConstituent")
    setSelectedPlantConstituentList(selectedPlantConstituentList_r)

  }, [props?.itemData?.plantConstituentList])

  useEffect(()=>
  {
    var selectedPlantEffectList_r =
        getSelectedPropertyList( props?.itemData?.plantEffectList ?? null, "plantEffect")
    setSelectedPlantEffectList(selectedPlantEffectList_r)

  }, [props?.itemData?.plantEffectList])


  useEffect(()=>
  {

    var selectedPlantNegativeEffectList_r =
        getSelectedPropertyList(props?.itemData?.plantNegativeEffectList ?? null, "plantNegativeEffect")
    setSelectedPlantNegativeEffectList(selectedPlantNegativeEffectList_r)


  }, [props?.itemData?.plantNegativeEffectList])


  useEffect(()=>
  {

    var selectedPlantIndicationList_r =
        getSelectedPropertyList(props?.itemData?.plantIndicationList ?? null, "plantIndication")
    setSelectedPlantIndicationList(selectedPlantIndicationList_r)

  }, [props?.itemData?.plantIndicationList])

  const handlePlantContraindicationChange = (array) => {
    setSelectedPlantContraindicationList(array)
  };
  const handlePlantConstituentChange = (array) => {
    setSelectedPlantConstituentList(array)
  };
  const handlePlantEffectChange = (array) => {
    setSelectedPlantEffectList(array)
  };
  const handlePlantNegativeEffectChange = (array) => {
    setSelectedPlantNegativeEffectList(array)
  };
  const handlePlantIndicationChange = (array) => {
    setSelectedPlantIndicationList(array)
  };


  return props.showModal && isDataReady() ? (
    <Modal title="Ajouter une nouvelle plante" open={props.showModal} onCancel={closeModal}  footer={null}  okButtonProps={{ disabled: true }}>
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
            initialValue={ getSelectedPropertyList(props?.itemData?.plantContraindicationList ?? null, "plantContraindication")}
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

        <Form.Item
            label="Constituents"
            name="Constituents"
            initialValue={getSelectedPropertyList(props?.itemData?.plantConstituentList ?? null, "plantConstituent")}
        >
          <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              onChange={handlePlantConstituentChange}
              options = {plantConstituentList}
          />

        </Form.Item>

        <Form.Item
            label="Effets"
            name="Effects"
            initialValue={getSelectedPropertyList(props?.itemData?.plantEffectList ?? null, "plantEffect")}
        >
          <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              onChange={handlePlantEffectChange}
              options = {plantEffectList}
          />

        </Form.Item>


        <Form.Item
            label="Negative Effects"
            name="NegativeEffects"
            initialValue={getSelectedPropertyList(props?.itemData?.plantNegativeEffectList ?? null, "plantNegativeEffect")}
        >
          <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              onChange={handlePlantNegativeEffectChange}
              options = {plantNegativeEffectList}
          />

        </Form.Item>


        <Form.Item
            label="Indications"
            name="Indications"
            initialValue={getSelectedPropertyList(props?.itemData?.plantIndicationList ?? null, "plantIndication")}
        >
          <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              onChange={handlePlantIndicationChange}
              options = {plantIndicationList}
          />

        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Soumettre
          </Button>
        </Form.Item>


      </Form>
    </Modal>
  ) : null;
};
export default FormPlant;
