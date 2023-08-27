import { Button, Form, Input, Modal } from "antd";
import { useEffect, useRef } from "react";
import BackendServerUrl from "../../Config.jsx";

const AddReference = (props) => {
  const formRef = useRef(null);

  const addReference = (data) => {
    const queryParams = new URLSearchParams();
    queryParams.append("latinName", data.latinName);
    const url = BackendServerUrl + `api/${props.reference.name}/Add?${queryParams.toString()}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        formRef.current.resetFields();
        props.reloadList();
        // setLoading(false);

        // const newData = data.concat(res.results);
        // setData(newData);
        // setList(newData);
        // setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        // window.dispatchEvent(new Event("resize"));
      })
      .catch((err) => {
        console.log("add ref errs ", err);
      });
      closeModal()
  };

  const updateReference = (data) => {

    const queryParams = new URLSearchParams();
    queryParams.append("id", props.referenceObject.id);
    queryParams.append("latinName", data.latinName);

    const url = BackendServerUrl + `api/${props.reference.name}/Update?${queryParams.toString()}`;
    // const url = BackendServerUrl + `api/${props.reference.name}/Update?${queryParams.toString()}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        formRef.current.resetFields();

        props.reloadList();
        //POP UP Notification ajouter

        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        // window.dispatchEvent(new Event("resize"));
      })
      .catch((err) => {
        console.log("update ref errs ", err);
      });

      closeModal()
  };

  const closeModal = () => {
    formRef.current.resetFields();
    props.setReferenceObject(null);
  };

 useEffect(() => {
    if (formRef.current != undefined) {
        //   console.log("hi formRef 1", formRef.current);
    
          formRef.current.setFieldsValue({latinName:props.referenceObject?.name});
        //   console.log("hi formRef 2", formRef.current);
        }
  }, [ props.referenceObject?.name]);

  return (
    <Modal title={`${props.referenceObject?.action == "Add" ? "Ajouter une nouvelle" : "Modifier"} reference ${props.reference.label}`} open={props?.openModal} onOk={closeModal} onCancel={closeModal} footer={null}>
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
        initialValues={{
          remember: true,
        }}
        ref={formRef}
        onFinish={props.referenceObject?.action == "Add" ? addReference : updateReference}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nom Latin"
          name="latinName"
        //   initialValue={props.referenceObject?.name ?? null}
          rules={[
            {
              required: true,
              message: "Veuillez saisir le nom !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Soumettre
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddReference;
