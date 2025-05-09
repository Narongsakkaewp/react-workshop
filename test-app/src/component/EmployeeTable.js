// test-app/src/component/EmployeeTable.js
import React, { useEffect, useState } from 'react';

const EmployeeTable = ({ formValues }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCheckins = async (params) => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/listCheckin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
    // console.log('Form Data:', formData);
  };


  useEffect(() => {
    if (formValues) {
      console.log("✅ เรียก API ด้วย searchData:", formValues);
      fetchCheckins(formValues);
    }
  }, [formValues]);

  const formatDateTime = (dt) => {
    return dt ? new Date(dt).toLocaleString() : '-';
  };

  const showMap = (lat, lng) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <table className='custom-table'>
        <thead className='custom-thead'>
          <tr className="custom-row">
            <td className="custom-cell">รหัสพนักงาน</td>
            <td className="custom-cell">แผนก</td>
            <td className="custom-cell">ชื่อ - นามสกุล</td>
            <td className="custom-cell">วัน/เวลา Check-in</td>
            <td className="custom-cell">Lat, Long Check-in</td>
            <td className="custom-cell">Maps</td>
            <td className="custom-cell">วัน/เวลา Check-out</td>
            <td className="custom-cell">Lat, Long Check-out</td>
            <td className="custom-cell">Maps</td>
          </tr>
        </thead>
        <tbody>
          {rows.data && rows.data.length > 0 ? (
            rows.data.map((row, index) => (
              <tr key={index} className='hover:bg-blue-200 border-2'>
                <td className="custom-cell-tbody">{row.username}</td>
                <td className="custom-cell-tbody">{row.department}</td>
                <td className="custom-cell-tbody">{row.name}</td>
                <td className="custom-cell-tbody">{formatDateTime(row.checkin_time)}</td>
                <td className="custom-cell-tbody">{row.checkin_latitude}, {row.checkin_longitude}</td>
                <td className="custom-cell-tbody">
                  <button
                    className="bg-blue-500 text-white text-md px-3 py-1 rounded-lg hover:bg-slate-300 transition"
                    onClick={() => showMap(row.checkin_latitude, row.checkin_longitude)}
                  >
                    Map
                  </button>
                </td>
                <td className="custom-cell-tbody">{formatDateTime(row.checkout_time)}</td>
                <td className="custom-cell-tbody">{row.checkout_latitude}, {row.checkout_longitude}</td>
                <td className="custom-cell-tbody">
                  <button
                    className="bg-red-700 text-white text-md px-3 py-1 rounded-lg hover:bg-red-300 transition"
                    onClick={() => showMap(row.checkout_latitude, row.checkout_longitude)}
                  >
                    Map
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td align="center" colSpan="9">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
