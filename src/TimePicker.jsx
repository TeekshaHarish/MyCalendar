import React, { useState } from "react";

const TimePicker = ({ label, value, onChange }) => {
  const [hours, setHours] = useState(value.split(":")[0] || "00");
  const [minutes, setMinutes] = useState(value.split(":")[1] || "00");

  const handleHoursChange = (e) => {
    const newHours = e.target.value.padStart(2, "0");
    setHours(newHours);
    onChange(`${newHours}:${minutes}`);
  };


  const handleMinutesChange = (e) => {
    const newMinutes = e.target.value.padStart(2, "0");
    setMinutes(newMinutes);
    onChange(`${hours}:${newMinutes}`);
  };

  return (
    <div className="flex gap-3 my-4 items-center">
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-2">
        <select
          value={hours}
          onChange={handleHoursChange}
          className="block w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center"
        >
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={String(i).padStart(2, "0")}>
              {String(i).padStart(2, "0")}
            </option>
          ))}
        </select>
        <span className="text-lg font-medium text-gray-700">:</span>
        <select
          value={minutes}
          onChange={handleMinutesChange}
          className="block w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center"
        >
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={String(i).padStart(2, "0")}>
              {String(i).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
