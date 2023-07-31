import { Button, Form, Input, Modal } from "antd";
import { useEffect, useRef } from "react";

const AddReference = (props) => {
  const formRef = useRef(null);

  const addReference = (data) => {
    console.log("dattaaa ", data.latinName);
    const queryParams = new URLSearchParams();
    queryParams.append("latinName", data.latinName);
    const url = `http://localhost:5202/api/${props.reference.name}/Add?${queryParams.toString()}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("add ref fetched ", res);
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
  };

  const updateReference = (data) => {
    console.log("dattaaa modifier", data);
    console.log("dattaaa modifier", props.referenceObject.id);

    const queryParams = new URLSearchParams();
    queryParams.append("id", props.referenceObject.id);
    queryParams.append("latinName", data.latinName);

    const url = `http://localhost:5202/api/${props.reference.name}/Update?${queryParams.toString()}`;
    // const url = `http://localhost:5202/api/${props.reference.name}/Update?${queryParams.toString()}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("update ref fetched ", res);
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
  };

  const closeModal = () => {
    formRef.current.resetFields();
    props.setReferenceObject(null);
  };
  console.log("hi morning ", props.referenceObject?.name);
  useEffect(() => {
    if (formRef.current != undefined) {
        //   console.log("hi formRef 1", formRef.current);
    
          formRef.current.setFieldsValue({latinName:props.referenceObject?.name});
        //   console.log("hi formRef 2", formRef.current);
        }
  }, [ props.referenceObject?.name]);

  return (
    <Modal title={`${props.referenceObject?.action == "Add" ? "Ajouter une nouvelle" : "Modifier"} reference ${props.reference.label}`} open={props?.openModal} onOk={closeModal} onCancel={closeModal}>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddReference;
