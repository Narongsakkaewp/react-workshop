import React from 'react';
import EmployeeTable from './component/EmployeeTable';
import Headers from './component/Header';
import UserHeader from './component/UserHeader';

function App() {
  return (
    <div className="App bg-gradient-to-r from-emeraldStart to-emeraldEnd shadow-lg min-h-screen p-5">
      <div className=' bg-white rounded-lg p-5'>
        <Headers />
        <UserHeader />
        <EmployeeTable />
      </div>
    </div>

  );
}

export default App;