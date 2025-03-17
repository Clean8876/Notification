

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MultiDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dates, setDates] = useState([]);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("schedule");

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const time = new Date();
        time.setHours(hour, minute, 0);
        options.push(time);
      }
    }
    return options;
  };

  const handleAddDate = () => {
    if (selectedDate && selectedTime) {
      const combinedDateTime = new Date(selectedDate);
      combinedDateTime.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0
      );

      const isDuplicate = dates.some(
        (date) => date.getTime() === combinedDateTime.getTime()
      );

      if (isDuplicate) {
        setError("Duplicate date and time is not allowed.");
        return;
      }

      setDates([...dates, combinedDateTime]);
      setSelectedDate(null);
      setSelectedTime(null);
      setError(null);
    } else {
      setError("Please select both date and time.");
    }
  };

  const handleRemoveDate = (index) => {
    const updatedDates = dates.filter((_, i) => i !== index);
    setDates(updatedDates);
  };

  const handleSubmit = () => {
    if (mode === "schedule" && dates.length === 0) {
      alert("No events to submit!");
      return;
    }
    console.log("Submitted Events:", dates);
    localStorage.setItem("scheduledEvents", JSON.stringify(dates));
    setDates([]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-medium mb-8 text-center text-gray-800">
          Schedule
        </h1>

        {/* Mode Selection Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          >
            <option value="schedule">Schedule</option>
            <option value="send_now">Send Now</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {mode === "schedule" && (
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="datePicker"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select a date"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    id="datePicker"
                    aria-label="Select date"
                  />
                </div>

                <div>
                  <label
                    htmlFor="timePicker"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time
                  </label>
                  <DatePicker
                    selected={selectedTime}
                    onChange={(time) => setSelectedTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select a time"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                    injectTimes={generateTimeOptions()}
                    id="timePicker"
                    aria-label="Select time"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  onClick={handleAddDate}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full py-3 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Add to schedule"
                >
                  Add to Schedule
                </button>
              </div>
            </div>
          )}

          {mode === "schedule" && dates.length > 0 && (
            <div className="border-t border-gray-100 p-6">
              <h2 className="text-lg font-medium mb-4 text-gray-800">Your Schedule</h2>
              <ul className="space-y-2">
                {dates.map((date, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div>
                      <div className="font-medium">
                        {date.toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-gray-500">{formatTime(date)}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveDate(index)}
                      className="text-gray-400 hover:text-red-500 focus:outline-none p-1 rounded-full hover:bg-gray-200 transition-colors duration-150"
                      aria-label="Remove date"
                    >
                      ✖️
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Submit schedule"
          >
            {mode === "send_now" ? "Send Now" : "Submit Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiDatePicker;

