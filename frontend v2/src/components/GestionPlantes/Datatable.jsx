import { Button, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";

const Datatable = (props) => {

  const columns = [
    {
      title: "plantId",
      dataIndex: "plantId",
      key: "plantId",
      align: "center",
    },
    {
      title: "Nom Commun",
      dataIndex: "commonName",
      key: "commonName",
      align: "center",
    },
    {
      title: "Nom Latin",
      dataIndex: "latinName",
      key: "latinName",
      align: "center",
    },
    {
      title: "Nom Arabe",
      dataIndex: "arabicName",
      key: "arabicName",
      align: "center",
      // render: (text) => <a>{text.latinName}</a>,
    },
    {
      title: "origin",
      dataIndex: "origin",
      key: "origin",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "vegetableReign",
      dataIndex: "vegetableReign",
      key: "vegetableReign",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "plantDivision",
      dataIndex: "plantDivision",
      key: "plantDivision",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "plantClass",
      dataIndex: "plantClass",
      key: "plantClass",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "plantFamily",
      dataIndex: "plantFamily",
      key: "plantFamily",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "plantGenre",
      dataIndex: "plantGenre",
      key: "plantGenre",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "plantSpecies",
      dataIndex: "plantSpecies",
      key: "plantSpecies",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "usedPart",
      dataIndex: "usedPart",
      key: "usedPart",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text,record,index) => {
        return (
          <>
            <Button color="blue" key="0" onClick={(e)=>onEdit(record)}>
              Modifier
            </Button>
            <Button color="blue" key="1" onClick={(e)=>onDelete(record)}>
              Supprimer
            </Button>
          </>
        );
      },
    },
  
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: "Action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  const onEdit = (record)=>{
    console.log('eeeeeeeeeeee ',record);
    props.setItemData(record)
    props.modalHandler(true)
  }

  const onDelete = (record)=>{
    console.log('eeeeeeeeeeee ',record);
  }

  useEffect(() => {
    props.fetchData();
  }, []);

  return props.tableData ? (
    <Table columns={columns} dataSource={props.tableData} />
  ) : (
    <p>Error</p>
  );
};
export default Datatable;
