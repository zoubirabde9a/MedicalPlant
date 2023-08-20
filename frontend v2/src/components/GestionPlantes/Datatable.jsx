import { Button, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";

const Datatable = (props) => {

  const getStringFromList = (record, recordList) =>
  {
    if (record == null || record == undefined ||
        recordList == null || recordList == undefined)
    {
      return ""
    }
    var list = []
    recordList.forEach((entry) =>
    {
      if (entry != null && entry != undefined) {
        list.push(entry.latinName)
      }
    })

    return list.join(', ')
  }

  const getStringFromList_ = (record, recordList) =>
  {
    console.log("recordList : ", recordList.length)
    if (record == null || record == undefined ||
        recordList == null || recordList == undefined)
    {
      return ""
    }
    console.log("a ", recordList.length)
    var list = []
    recordList.forEach((entry) =>
    {
      console.log(entry)
      if (entry != null && entry != undefined) {
        list.push(entry.latinName)
        console.log(entry.latinName)
      }
    })
    console.log("c ", recordList.length)
    return list.join(', ')
  }

  const columns = [
    {
      title: "Id",
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
      title: "Origine",
      dataIndex: "origin",
      key: "origin",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "Régne",
      dataIndex: "vegetableReign",
      key: "vegetableReign",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "Division",
      dataIndex: "plantDivision",
      key: "plantDivision",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "Classe",
      dataIndex: "plantClass",
      key: "plantClass",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "Famille",
      dataIndex: "plantFamily",
      key: "plantFamily",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "Genre",
      dataIndex: "plantGenre",
      key: "plantGenre",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "éspece",
      dataIndex: "plantSpecies",
      key: "plantSpecies",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },
    {
      title: "Partie Utilisee",
      dataIndex: "usedPart",
      key: "usedPart",
      align: "center",
      render: (item) => <a>{item.latinName}</a>,
    },










    {
      title: "Contre Indications",
      dataIndex: "contraindications",
      key: "plantContraindicationList",
      align: "center",
      render: (text,record,index) => <a>{getStringFromList(record, record?.plantContraindicationList)}</a>,
    },
    {
      title: "Constituents",
      dataIndex: "constituents",
      key: "plantConstituentList",
      align: "center",
      render: (text,record,index) => <a>{getStringFromList(record, record?.plantConstituentList)}</a>,
    },
    {
      title: "Effects",
      dataIndex: "effects",
      key: "plantEffectList",
      align: "center",
      render: (text,record,index) => <a>{getStringFromList(record, record?.plantEffectList)}</a>,
    },
    {
      title: "Effects Negatives",
      dataIndex: "negativeEffect",
      key: "plantNegativeEffectList",
      align: "center",
      render: (text,record,index) => <a>{getStringFromList(record, record?.plantNegativeEffectList)}</a>,
    },
    {
      title: "Indications",
      dataIndex: "indications",
      key: "plantIndicationList",
      align: "center",
      render: (text,record,index) => <a>{getStringFromList_(record, record?.plantIndicationList)}</a>,
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

    const queryParams = new URLSearchParams();
    queryParams.append("plantId", record.plantId);

    const url = `http://localhost:5202/api/Plant/Remove?${queryParams.toString()}`;
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
