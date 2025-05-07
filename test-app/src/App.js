import React from 'react';
import EmployeeTable from './component/EmployeeTable';
import Headers from './component/Header';
import UserHeader from './component/UserHeader';

function App() {
  return (
    <div className="App bg-green-300 min-h-screen p-5">
      <div className='container mx-auto bg-white rounded-md p-5'>
        <Headers />
        <UserHeader />
        <EmployeeTable />
      </div>
    </div>

  );
}

export default App;