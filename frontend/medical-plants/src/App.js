import React, {useEffect, useState} from 'react';
import TableComponent from './TableComponent';
import TaskBar from "./TaskBar";
import ElementList from "./ElementList";
import {TableCell} from "@mui/material";
import ModalButton from "./ModalButton";
import ErrorComponent from "./ErrorComponent";
import SearchBar from "./SearchBar";

const App = () => {
    const [filter, setFilter] = useState([]);
    const [filterText, setFilterText] = useState([]);

  return (
      <div>
          <TaskBar/>
          <SearchBar setFilter={setFilter} setFilterText={setFilterText}/>
          <ElementList filter={filter} filterText={filterText}/>
      </div>
  );
};

export default App;