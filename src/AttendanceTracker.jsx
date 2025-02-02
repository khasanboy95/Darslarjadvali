import React, { useState } from "react";

function AttendanceTracker() {
  const [attendances, setAttendances] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);

  const students = [
    { id: 1, name: "Abdurahimova Nozanin", phone: "(991) 810-22-06" },
    { id: 2, name: "Joraboyeva Xusnora", phone: "(991) 011-73-86" },
    { id: 3, name: "Karimova Madina", phone: "(901) 388-99-10" },
    { id: 4, name: "Komilova Munisa", phone: "(991) 444-82-05" },
    { id: 5, name: "Mashrapov Azizbek", phone: "(991) 405-13-83" },
    { id: 6, name: "Muhammadqodirov Muhammadsodiq", phone: "(998) 906-85-33" },
    { id: 7, name: "Nomonjonova Madina", phone: "(991) 447-00-23" },
    { id: 8, name: "Odiljonova Gavharoy", phone: "(991) 130-43-51" },
    { id: 9, name: "Qaxramonova Ruqiyaxon", phone: "(991) 004-12-87" },
    { id: 10, name: "Risiqboyeva Muazzam", phone: "(941) 710-23-33" },
    { id: 11, name: "Sharobiddinova Noila", phone: "(901) 821-93-21" },
    { id: 12, name: "Soliyeva Mohidil", phone: "(77) 009-31-86" },
    { id: 13, name: "Valijonov Omadbek", phone: "(941) 431-18-57" },
    { id: 14, name: "Xasanova Durdona", phone: "(991) 542-12-81" },
    { id: 15, name: "Xoshimjonova Xadicha", phone: "(941) 080-47-46" }
  ];

  const markAttendance = (studentId, status) => {
    const key = `${currentDate}-${studentId}`;
    const newAttendances = { ...attendances, [key]: status };
    setAttendances(newAttendances);
    localStorage.setItem('attendances', JSON.stringify(newAttendances));
  };

  const getAttendanceStatus = (studentId) => {
    const key = `${currentDate}-${studentId}`;
    return attendances[key];
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
        Hasanboy Yangi ertalab toq Preinter 13/15
      </h1>

      <input
        type="date"
        value={currentDate}
        onChange={(e) => setCurrentDate(e.target.value)}
        style={{ 
          marginBottom: '20px',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'left' }}>№</th>
            <th style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'left' }}>F.I.O</th>
            <th style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Telefon</th>
            <th style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>Holati</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const status = getAttendanceStatus(student.id);
            const backgroundColor = status === 'present' ? '#dcfce7' : status === 'absent' ? '#fee2e2' : 'white';

            return (
              <tr key={student.id} style={{ backgroundColor }}>
                <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>{student.id}</td>
                <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>{student.name}</td>
                <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>{student.phone}</td>
                <td style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                  <button
                    onClick={() => markAttendance(student.id, 'present')}
                    style={{
                      padding: '8px 16px',
                      marginRight: '8px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: status === 'present' ? '#22c55e' : '#e5e7eb',
                      color: status === 'present' ? 'white' : 'black',
                      cursor: 'pointer'
                    }}
                  >
                    Bor
                  </button>
                  <button
                    onClick={() => markAttendance(student.id, 'absent')}
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: status === 'absent' ? '#ef4444' : '#e5e7eb',
                      color: status === 'absent' ? 'white' : 'black',
                      cursor: 'pointer'
                    }}
                  >
                    Yo'q
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Bugungi statistika:</h3>
        <p style={{ color: '#16a34a', marginBottom: '8px' }}>
          Bor: {Object.values(attendances).filter(status => status === 'present').length} ta
        </p>
        <p style={{ color: '#dc2626' }}>
          Yo'q: {Object.values(attendances).filter(status => status === 'absent').length} ta
        </p>
      </div>
    </div>
  );
}

export default AttendanceTracker;