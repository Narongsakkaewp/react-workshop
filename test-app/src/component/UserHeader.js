import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const UserHeader = ({
  countActive = 0,
  countUnActive = 0,
  onSearch,
  onReset,
  onPrint
}) => {
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());

  return (
    <div className="px-9 pt-5 flex justify-center items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
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
              label="เลือกวันที่เริ่มต้น"
              value={startDate}
              format="DD-MM-YYYY"
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: 'small', className: 'bg-white' } }}
            />

            <DatePicker
              label="เลือกวันที่สิ้นสุด" className='font-kanit'
              value={endDate}
              format="DD-MM-YYYY"
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: 'small', className: 'bg-white' } }}
            />

            <div className='space-x-2'>
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