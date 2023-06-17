import React from 'react';
import TableComponent from './TableComponent';
import TaskBar from "./TaskBar";

const App = () => {
  return (
      <div>
          <TaskBar/>
        <TableComponent />
      </div>
  );
};

export default App;