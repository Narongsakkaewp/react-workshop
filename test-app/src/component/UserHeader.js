import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const UserHeader = ({
  onSearch,
  onReset,
}) => {
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());

  return (
    <div className="H-Menu">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSearch) onSearch(e);
          }}
        >
          <div className="H-Menu-2">
            <input
              type="text"
              name="code"
              placeholder="Code"
              autoComplete="off"
              className="H-Input"
            />

            <input
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="off"
              className="H-Input"
            />

            <select name="department" className="H-Dropdown">
              <option value="">แผนก</option>
              <option value="finance">--</option>
              <option value="finance">--</option>
              <option value="finance">--</option>
              <option value="finance">--</option>
              <option value="finance">--</option>
              <option value="finance">--</option>
            </select>

            <DatePicker
              label="เลือกวันที่เริ่มต้น"
              value={startDate}
              format="DD-MM-YYYY"
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: 'small', className: 'bg-white' } }}
            />

            <DatePicker
              label="เลือกวันที่สิ้นสุด"
              value={endDate}
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
              onClick={onReset} className="bg-gray-500 text-white hover:bg-gray-200 hover:text-black px-4 py-2 rounded">
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