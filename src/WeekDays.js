

const WeekDays = ({ weeklyWorkingDays, handleCheckboxChange }) => {
    return (
      <div className>
        {weeklyWorkingDays.map((day, index) => (
          <div key={index} className="d-flex align-items-center my-5 border border-1">
            <div className="border border-1 p-1">
              <div>{day.day}</div>
              <div>{day.date}</div>
            </div>
            <div className>
           {day.day!=='Saturday'  && day.day!=="Sunday" && (Object.keys(day.workingHours).map((hour) => (
               <label key={hour} className="px-3">
                {hour}
                <input
                  type="checkbox"
                  checked={day.workingHours[hour]}
                  onChange={() => handleCheckboxChange(index, hour)}
                />
              </label>
            )))}
                </div>
          </div>
        ))}
      </div>
    );
  };
export default WeekDays;
