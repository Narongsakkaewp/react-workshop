import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const UserHeader = ({
  countActive = 0,
  countUnActive = 0,
  onSearch,
  onReset,
  onPrint
}) => {
  const [date, setDate] = useState(null);

  return (
    <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSearch) onSearch(e);
          }}
        >
          <div className="relative flex flex-wrap items-center my-2 font-kanit font-light gap-2">
            <input
              type="text"
              name="code"
              placeholder="code"
              autoComplete="off"
              className="border rounded px-3 py-2"
            />

            <input
              type="text"
              name="name"
              placeholder="name"
              autoComplete="off"
              className="border rounded px-3 py-2"
            />

            <select name="department" className="border rounded px-3 py-2">
              <option value="">เลือกแผนก</option>
              <option value="hr">ทรัพยากรบุคคล</option>
              <option value="it">ไอที</option>
              <option value="finance">การเงิน</option>
            </select>

            <DatePicker
                label="เลือกวันที่"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                slotProps={{ textField: { size: 'small', className: 'bg-white' } }}
            />
            <div className='ml-40 space-x-2'>
            <button type="submit" className="bg-indigo-900 text-white hover:bg-indigo-400 hover:text-black px-4 py-2 rounded">
              ค้นหา
            </button>
            
            <button
              type="button"
              onClick={onReset}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
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