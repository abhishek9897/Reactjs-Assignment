
import React, { useState, useEffect } from 'react';
import WeekDays from './WeekDays';
import SavedEntries from './SavesEntries';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
 

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState('UTC+0');
  const [weeklyWorkingDays, setWeeklyWorkingDays] = useState([]);
  const [savedEntries, setSavedEntries] = useState([]);

  const changeWeek = (week) => {
    
    const newWeekStart = new Date(currentDate);
    week === 'next' ? newWeekStart.setDate(newWeekStart.getDate() + 7) : newWeekStart.setDate(newWeekStart.getDate() - 7);
    setCurrentDate(newWeekStart)
  };

  const handleChangeTimezone = (timezone) => {
    setSelectedTimezone(timezone);
  };

  const handleCheckboxChange = (dayIndex, hour) => {
    setWeeklyWorkingDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[dayIndex].workingHours[hour] = !updatedDays[dayIndex].workingHours[hour] ;
      return updatedDays;
    });
  };
  

  const handleSave = () => {
    const selectedEntries = [];

    weeklyWorkingDays.forEach((day) => {
      Object.keys(day.workingHours).forEach((hour) => {
        if (day.workingHours[hour]) {
          const selectedDate = new Date(day.date);
        
          const timeAdjustment = selectedTimezone === 'UTC+0' ? 0 : 5.5; 
          selectedDate.setHours(selectedDate.getHours() + timeAdjustment);

          selectedEntries.push({
            Id: selectedEntries.length + 101,
            Name: `test${selectedEntries.length + 1}`,
            Date: selectedDate.toLocaleDateString(),
            Time: hour,
          });
        }
      });
    });

    setSavedEntries([...selectedEntries]);
  };


  useEffect(() => {
 

    const startOfWeek = new Date(currentDate);
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(endOfWeek.getDate() + 6); 

    const workingDays = [];
    for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
      workingDays.push({
        day: d.toLocaleDateString('en-US', { weekday: 'long' }),
        date: d.toLocaleDateString(),
        workingHours: {
          '8AM': false,
          '9AM': false,
          '10AM': false,
          '11AM': false,
          '12PM': false,
          '1PM':false,
          '2PM':false,
          '3PM':false,
          '4PM':false,
          '5PM':false,
          '6PM':false,
          '7PM':false,
          '8PM':false,
          '9PM':false,
          '10PM':false,
          '11PM':false
        },
      });
    }
    setWeeklyWorkingDays(workingDays);
  }, [currentDate, selectedTimezone]);

  return (
    <div className='m-2'>
      <div className='WeekButtons'>
        <button onClick={() => changeWeek('prev')}>Previous Week</button>
        <p>{currentDate.toLocaleDateString()}</p>
        <button onClick={() => changeWeek('next')}>Next Week</button>
      </div>

      <div>
        <label>Select Timezone:</label>
        <select value={selectedTimezone} onChange={(e) => handleChangeTimezone(e.target.value)}>
          <option value="UTC+0">UTC+0</option>
          <option value="IST">IST</option>
        </select>
      </div>

      <WeekDays weeklyWorkingDays={weeklyWorkingDays} handleCheckboxChange={handleCheckboxChange} />

      <div className='my-3'>
        <button onClick={handleSave}>Save</button>
      </div>

      <SavedEntries savedEntries={savedEntries} />
    </div>
  );
};

export default App;
