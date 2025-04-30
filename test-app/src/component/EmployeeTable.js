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
    <div className="table-responsive">
      <table className="table table-striped table-bordered" id="example">
        <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
            <td align="center">รหัสพนักงาน</td>
            <td align="center" style={{ width: '250px' }}>แผนก</td>
            <td align="center" style={{ width: '250px' }}>ชื่อ - นามสกุล</td>
            <td align="center">วัน/เวลา Check-in</td>
            <td align="center">Lat, Long Check-in</td>
            <td align="center">Maps</td>
            <td align="center">วัน/เวลา Check-out</td>
            <td align="center">Lat, Long Check-out</td>
            <td align="center">Maps</td>
          </tr>
        </thead>
        <tbody>
          {rows.data.length > 0 ? (
            rows.data.map((row, index) => (
              <tr key={index}>
                <td align="center">{row.username}</td>
                <td align="left">{row.department}</td>
                <td align="center">{row.name}</td>
                <td align="center">{formatDateTime(row.checkin_time)}</td>
                <td align="center">{row.checkin_latitude}, {row.checkin_longitude}</td>
                <td align="center">
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ borderRadius: '5px' }}
                    onClick={() => showMap(row.checkin_latitude, row.checkin_longitude)}
                  >
                    Map
                  </button>
                </td>
                <td align="center">{formatDateTime(row.checkout_time)}</td>
                <td align="center">{row.checkout_latitude}, {row.checkout_longitude}</td>
                <td align="center">
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ borderRadius: '5px' }}
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