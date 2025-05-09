// test-app/src/component/EmployeeTable.js
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const UserHeader = ({ onSearch, onReset }) => {
  const [startDate, setStartDate] = useState(dayjs(), { startDate: '' });
  const [endDate, setEndDate] = useState(dayjs());
  const [formData, setFormData] = useState({ code: '', name: '', department: '', startDate: '', endDate: '' });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
      } catch (error) {
        console.error('Error fetching departments:', error);
      }

      setDepartments([
        { value: 'it', label: 'แผนก : ไอที' },
        { value: 'mrk', label: 'แผนก : การตลาด' },
        { value: 'hr', label: 'แผนก : บุคคล' },
        { value: 'acc', label: 'แผนก : บัญชี' },
      ]);
    };

    fetchDepartments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleReset = () => {
    setFormData({ code: '', name: '' });
    setStartDate(dayjs());
    setEndDate(dayjs());
    if (onReset) onReset();
  };

  return (
    <div className="H-Menu">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formValues = Object.fromEntries(formData.entries());
            if (onSearch) onSearch(formValues);
          }}
        >
          <div className="H-Menu-2">
            <input
              type="text"
              name="code"
              placeholder="Code"
              value={formData.code}
              onChange={handleInputChange}
              autoComplete="off"
              className="H-Input"
            />

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="off"
              className="H-Input"
            />
            
            <select
              name="department"
              className="H-Dropdown"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="">แผนก</option>
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>

            <DatePicker
              label="เลือกวันที่เริ่มต้น"
              value={startDate}
              name='startDate'
              format="DD-MM-YYYY"
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: 'small', className: 'bg-white' } }}
            />

            <DatePicker
              label="เลือกวันที่สิ้นสุด"
              value={endDate}
              name='endDate'
              format="DD-MM-YYYY"
              minDate={startDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: 'small', className: 'bg-white' } }}
            />

            <div className='btn-group'>
              <button type="submit" className="bg-yellow-500 text-white hover:bg-yellow-200 hover:text-black px-4 py-2 rounded">
                ค้นหา
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white hover:bg-gray-200 hover:text-black px-4 py-2 rounded">
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default UserHeader;