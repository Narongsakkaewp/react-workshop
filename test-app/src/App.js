import React,{useState} from 'react';
import EmployeeTable from './component/EmployeeTable';
import Headers from './component/Header';
import UserHeader from './component/UserHeader';

function App() {
  const [formValues, setSearchData] = useState(null);

  const handleSearch = (formValues) => {
    setSearchData(formValues);
  };
  const handleReset = () => {
    setSearchData(null);
  };

  return (
    <div className="App">
      <main className='main'>
        <div className=' bg-white rounded-lg p-5 shadow-md shadow-slate-300'>
          <Headers />
          <UserHeader onSearch={handleSearch} onReset={handleReset} />
          <EmployeeTable searchData={formValues} />
        </div>
      </main>

      <footer className='footer'>
        <p>© 2025 Employee.<br/>All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;