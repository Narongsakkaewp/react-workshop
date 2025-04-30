import React from 'react';
import EmployeeTable from './component/EmployeeTable';
import Headers from './component/Header';

function App() {
  return (
    <div className="App" style={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
      <Headers />
      <EmployeeTable />
    </div>
  );
}

export default App;