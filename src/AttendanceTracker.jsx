import React, { useState } from "react";

function AttendanceTracker() {
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

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('attendance');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAttendance = (studentId, status) => {
    const newAttendance = {
      ...attendance,
      [`${selectedDate}-${studentId}`]: status
    };
    setAttendance(newAttendance);
    localStorage.setItem('attendance', JSON.stringify(newAttendance));
  };

  const getStudentStatus = (studentId) => {
    return attendance[`${selectedDate}-${studentId}`];
  };

  const getRowStyle = (studentId) => {
    const status = getStudentStatus(studentId);
    if (status === 'present') return 'bg-green-100';
    if (status === 'absent') return 'bg-red-100';
    return '';
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hasanboy Yangi ertalab toq Preinter 13/15</h1>
      
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left">№</th>
            <th className="border p-2 text-left">F.I.O</th>
            <th className="border p-2 text-left">Telefon</th>
            <th className="border p-2 text-center">Holati</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className={getRowStyle(student.id)}>
              <td className="border p-2">{student.id}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.phone}</td>
              <td className="border p-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleAttendance(student.id, 'present')}
                    className={`px-4 py-1 rounded ${
                      getStudentStatus(student.id) === 'present'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    Bor
                  </button>
                  <button
                    onClick={() => handleAttendance(student.id, 'absent')}
                    className={`px-4 py-1 rounded ${
                      getStudentStatus(student.id) === 'absent'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    Yo'q
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h3 className="font-bold mb-2">Bugungi statistika:</h3>
        <p className="text-green-600">
          Bor: {Object.values(attendance).filter(status => status === 'present').length} ta
        </p>
        <p className="text-red-600">
          Yo'q: {Object.values(attendance).filter(status => status === 'absent').length} ta
        </p>
      </div>
    </div>
  );
}

export default AttendanceTracker;