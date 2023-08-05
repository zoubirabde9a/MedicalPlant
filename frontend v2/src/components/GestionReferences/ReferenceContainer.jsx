import { Avatar, Button, Layout, List, Menu, Skeleton, theme } from "antd";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import ReferenceList from "./ReferenceList";

const ReferenceContainer = () => {
  // const [showModal, setShowModal] = useState(false);
  // const modalHandler = (entry) => setShowModal(entry);
  // const [initLoading, setInitLoading] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  // const [list, setList] = useState([]);
  // const [collapsed, setCollapsed] = useState(false);

  const listReference = [
    {
      key: "0",
      name: "PlantOrigin",
      label: "Origin",
    },
    {
      key: "1",
      name: "PlantDivision",
      label: "Division",
    },
    {
      key: "2",
      name: "VegetableReign",
      label: "Régne",
    },
    {
      key: "3",
      name: "PlantClass",
      label: "Classe",
    },
    {
      key: "4",
      name: "PlantFamily",
      label: "Famille",
    },
    {
      key: "5",
      name: "PlantGenre",
      label: "Genre",
    },
    {
      key: "6",
      name: "PlantSpecies",
      label: "Éspece",
    },
    {
      key: "7",
      name: "PlantPart",
      label: "Partie Utilisée",
    },


    {
      key: "8",
      name: "PlantConstituent",
      label: "Constituents",
    },
    {
      key: "9",
      name: "PlantContraindication",
      label: "Contre Indications",
    },
    {
      key: "10",
      name: "PlantEffect",
      label: "Effects",
    },
    {
      key: "11",
      name: "PlantNegativeEffect",
      label: "Effects Négatives",
    },
    {
      key: "12",
      name: "PlantIndication",
      label: "Indications",
    },
  ];

  const [reference, setReference] = useState(listReference[0]);

  const onReference = (e) => {
    // console.log("click ", listReference[e.key]);
    setReference(listReference[e.key]);
  };

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#e1efe1",
  }}>
      <Sider
        style={{
          background: "green",
          // height: "100vh",
        }}
      >
        <div className="demo-logo-vertical">Reference</div>
        <Menu theme="light" defaultSelectedKeys={["0"]} mode="inline" items={listReference} onClick={onReference} />
      </Sider>
      <ReferenceList reference={reference} />
    </Layout>
  );
};

export default ReferenceContainer;
