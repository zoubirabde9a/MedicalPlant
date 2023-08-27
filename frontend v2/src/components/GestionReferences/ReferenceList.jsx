import { Avatar, Button, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import AddReference from "./AddReference";
import BackendServerUrl from "../../Config.jsx";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const matchingReference = {
  PlantOrigin: "plantOriginId",
  PlantDivision: "plantDivisionId",
  VegetableReign: "vegetableReignId",
  PlantClass: "plantClassId",
  PlantFamily: "plantFamilyId",
  PlantGenre: "plantGenreId",
  PlantSpecies: "plantSpeciesId",
  PlantPart: "plantPartId",
};

const ReferenceList = (props) => {
  // const [showModal, setShowModal] = useState(false);
  // const modalHandler = (entry) => setShowModal(entry);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [referenceObject, setReferenceObject] = useState(null);

  // const [collapsed, setCollapsed] = useState(false);

  const loadData = () => {
    fetch(BackendServerUrl + `api/${props.reference.name}/GetAll?offset=0&limit=9999`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => console.log(error));
  };

  const deleteItem = (data) => {
    const queryParams = new URLSearchParams();
    // queryParams.append("plantClassId", data[0]);
    // queryParams.append("latinName", data.latinName);
    console.log("id", data[matchingReference[props.reference.name]]);
    queryParams.append("id", data[matchingReference[props.reference.name]]);
    const url = BackendServerUrl + `api/${props.reference.name}/Remove?${queryParams.toString()}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        loadData();
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
        console.log("delete ref errs ", err);
      });
  };

  useEffect(() => {
    loadData();
  }, [props.reference.name]);

  return (
    <Content
      style={{
        margin: "20px",
      }}
    >
      <AddReference reloadList={loadData} reference={props.reference} openModal={referenceObject?.open} referenceObject={referenceObject} setReferenceObject={setReferenceObject} />
      <Title
        style={{
          margin: "20px",
          textAlign: "initial",
        }}
      >
        Liste des {props.reference.label}s
      </Title>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginRight: "2", padding: "15px", marginRight: "2.5%" }}>
        <Button
          onClick={() => {

            setReferenceObject({open:true,action:"Add",item:null});
          }}
        >
          Ajouter
        </Button>
      </div>

      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        style={{ overflow: "auto", maxHeight: "calc(100vh - 322px)", backgroundColor: "white", padding: "10px" }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                onClick={() => {
                  console.log("HEH modifier ", item);
                  setReferenceObject({open:true,action:"Update",id:item[matchingReference[props.reference.name]],name:item.latinName});

                  //   updateReference(item)
                }}
                key="list-item-edit"
              >
                modifier
              </a>,
              <a
                onClick={(e) => {
                  console.log("HEH supprimer ", item);
                  deleteItem(item);
                }}
                key="list-item-delete"
              >
                supprimer
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={<a id={item.latinName}> {item.latinName}</a>}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Content>
  );
};

export default ReferenceList;
