import React, { useState } from 'react';
import DatePicker from '@/node_modules/react-date-picker/dist/cjs/DatePicker';
import Button from './Button';
import 'react-date-picker/dist/DatePicker.css';

const MyDatePicker: React.FC = () => {
  const [Date, setDate] = useState(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleButtonClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className='w-full h-64'>
      <Button type="button" icon="/Calendar.svg" variant="btn-icon" onClick={handleButtonClick}>Select Date</Button>
      {showDatePicker && (
        <div>
          <DatePicker className="text-black"
            selectsStart
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            startDate={startDate}
            endDate={endDate}
            selectsRange
          />
          <DatePicker
          selectsEnd
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          endDate={endDate}
          startDate={startDate}
          minDate={startDate}
        />
        </div>
      )}
    </div>
  );
};

export default MyDatePicker