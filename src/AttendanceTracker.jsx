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

  const [currentYear, setCurrentYear] = useState("2025");
  const months = ['Yen', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
  const dates = ['03 fev', '05 fev', '07 fev', '10 fev', '12 fev', '14 fev', '17 fev', '19 fev', '21 fev', '24 fev', '26 fev', '28 fev'];

  const tabs = ['Davomat', 'Baholash', 'Uyga vazifa', 'Reyting', 'Imtixonlar', 'Mashqlar', 'Tarix', 'Izoh'];

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('attendance');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleAttendance = (studentId) => {
    const key = `${studentId}`;
    let newStatus;
    
    if (!attendance[key]) newStatus = 'present';
    else if (attendance[key] === 'present') newStatus = 'absent';
    else newStatus = undefined;

    const newAttendance = {
      ...attendance,
      [key]: newStatus
    };
    setAttendance(newAttendance);
    localStorage.setItem('attendance', JSON.stringify(newAttendance));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-xl font-bold mb-4">Hasanboy Yangi ertalab toq Preinter 13/15</h1>
      
      {/* Teacher Info */}
      <div className="mb-4 text-sm">
        <p>O'qituvchi: <span className="text-blue-500">Khasan Djemilov</span></p>
        <p>Narx: 300 000 so'm</p>
        <p>Vaqt: 13:30 - 15:00</p>
        <p>Kurs: Pre-intermediate (Level 3)</p>
        <p>Boshlnish sanasi: Nov 29, 2023</p>
        <p>Xona: Birinchi xona</p>
        <p>O'tilgan darslar: 124</p>
        <p>Dars kunlari: <span className="text-green-600">Dushanba</span> <span className="text-green-600">Chorshanba</span> <span className="text-green-600">Juma</span></p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${index === 0 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Year and Months */}
      <div className="flex items-center gap-2 mb-4">
        <select 
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="2025">2025</option>
        </select>
        <div className="flex gap-2">
          {months.map((month, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${index === 1 ? 'bg-blue-500 text-white' : 'border'}`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Dates */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {dates.map((date, index) => (
          <button
            key={index}
            className="px-3 py-1 text-sm border rounded"
          >
            {date}
          </button>
        ))}
      </div>

      {/* Students List */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="mb-4 font-semibold">TALABALAR</h2>
        <div className="space-y-2">
          {students.map((student) => (
            <div key={student.id} 
                 className="flex items-center justify-between p-2 bg-white rounded hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{student.id}.</span>
                <span className="text-blue-600">{student.name}</span>
              </div>
              <button
                onClick={() => toggleAttendance(student.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  attendance[student.id] === 'present' 
                    ? 'bg-blue-500 text-white' 
                    : attendance[student.id] === 'absent'
                      ? 'bg-red-500 text-white'
                      : 'border'
                }`}
              >
                {attendance[student.id] === 'present' ? '✓' : attendance[student.id] === 'absent' ? '✕' : ''}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AttendanceTracker;