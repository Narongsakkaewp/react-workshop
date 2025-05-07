import React, { useEffect, useState } from 'react';

const EmployeeTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDateTime = (dt) => {
    return dt ? new Date(dt).toLocaleString() : '-';
  };

  // Optional: log rows

  const showMap = (lat, lng) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    }
  };

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/listCheckin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer LcbxpDu7J2Dj2DkRlAKM6649tSSdwuJtKfcoSQhR', // replace with your token
          },
        });

        // console.log(response); // Optional: log response

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data); // Optional: log data
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckins();
  }, []);
  // console.log(rows.data); 
  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <table id="example">
        <thead>
          <tr>
            <td className="border-2">รหัสพนักงาน</td>
            <td className="border-2">แผนก</td>
            <td className="border-2">ชื่อ - นามสกุล</td>
            <td className="border-2">วัน/เวลา Check-in</td>
            <td className="border-2">Lat, Long Check-in</td>
            <td className="border-2">Maps</td>
            <td className="border-2">วัน/เวลา Check-out</td>
            <td className="border-2">Lat, Long Check-out</td>
            <td className="border-2">Maps</td>
          </tr>
        </thead>
        <tbody>
          {rows.data.length > 0 ? (
            rows.data.map((row, index) => (
              <tr id='tr_list' key={index} className='hover:bg-blue-200 border-2'>
                <td className="border-2">{row.username}</td>
                <td className="border-2">{row.department}</td>
                <td className="border-2">{row.name}</td>
                <td className="border-2">{formatDateTime(row.checkin_time)}</td>
                <td className="border-2">{row.checkin_latitude}, {row.checkin_longitude}</td>
                <td className="border-2">
                  <button
                    className="bg-blue-500 text-white text-md px-3 py-1 rounded-lg hover:bg-slate-300 transition"
                    onClick={() => showMap(row.checkin_latitude, row.checkin_longitude)}
                  >
                    Map
                  </button>
                </td>
                <td className="border-2">{formatDateTime(row.checkout_time)}</td>
                <td className="border-2">{row.checkout_latitude}, {row.checkout_longitude}</td>
                <td className="border-2">
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
      {/* <div className="flex items-center justify-center mt-4">
        <label> <input type="checkbox" defaultChecked></input> Test </label> &nbsp;&nbsp;&nbsp;
        <label> <input type="checkbox" defaultChecked></input> Checkbox </label>
      </div> */}
      
    </div>
  );
};

export default EmployeeTable;