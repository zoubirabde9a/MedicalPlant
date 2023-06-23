import React, {useEffect, useState} from 'react';
import TableComponent from './TableComponent';
import TaskBar from "./TaskBar";
import ElementList from "./ElementList";
import {TableCell} from "@mui/material";

const App = () => {
    const elements = [
        {
            properties: [
                { name: 'Property 1', value: 'Value 1' },
                { name: 'Property 2', value: 'Value 2' },
                // Add more properties as needed
            ],
            text: 'Some text for element 1',
        },
        {
            properties: [
                { name: 'Property A', value: 'Value A' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                { name: 'Property B', value: 'Value B' },
                // Add more properties as needed
            ],
            text: 'Some text for element 2',
        },
        // Add more elements as needed
    ];


    elements.at(0).properties.push( { name: 'c 2', value: 'c 2' })
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5202/api/Plant/GetAll?offset=0&limit=20')
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.log(data)
            })
            .catch(error => console.log(error));
    }, []);

    data.map((item) =>
    {
        var properties = [];
        properties.push( { name: 'Nom Latin', value: item.latinName })
        properties.push( { name: 'Nom Arabe', value: item.arabicName })
        elements.push({text: item.plantId, properties: properties})
    })


  return (
      <div>
          <TaskBar/>
        <TableComponent />
          <ElementList  elements={elements}/>
      </div>
  );
};

export default App;