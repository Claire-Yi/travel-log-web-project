import React, { useState, useEffect, createContext, useContext } from 'react';
import Button from './Button';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from "axios";

interface Trip {
  dateCreated: string;
  startDate?: string;
  endDate?: string;
}

interface TripProps {
  trip: Trip;
}

const MyDatePicker: React.FC <TripProps>= ({trip}) => {
  console.log('startDate:', trip.startDate);
  const pastMonth = new Date();
  const newStartDate = trip.startDate ? new Date(trip.startDate) : pastMonth;
  const newEndDate = trip.endDate ? new Date(trip.endDate) : addDays(pastMonth, 0);
  // state hook to set DatePicker to open or close, default to not show
  const [showDatePicker, setShowDatePicker] = useState(false);
  // console.log('new start date', newStartDate)

  const defaultSelected: DateRange | undefined = trip.startDate
    ? trip.endDate
      ? { from: newStartDate, to: newEndDate }
      : { from: newStartDate, to: addDays(newStartDate, 0) }
    : undefined;
  console.log('defaultSelected', defaultSelected)

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  console.log ('range', range)


  let footer = <p className = "pt-4">pick the first day.</p>;
  // check if there is a starting date
  if (range?.from) {
    if (!range.to) {
      footer = <p className = "pt-4">{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p className = "pt-4">
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }

  const handleButtonClick = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleDateSelect = (selectedRange: DateRange) => {
    sendDataToServer(selectedRange);
    // Update local state
    setRange(selectedRange);
  };

  const sendDataToServer = (selectedRange: DateRange) => {
    // Make an HTTP request to your server to send the selected date range data
      axios.post('http://localhost:3001/trips', selectedRange)
      .then(response => {
        console.log('Date range data sent successfully');
      })
      .catch(error => {
        console.error('Error sending date range data:', error);
      });
  };

  return (
    <>
      <div className="Date Picker w-full h-64">
        <Button type="button" icon="/Calendar.svg" variant="btn-icon" onClick={handleButtonClick}></Button>
        {showDatePicker && (
          <div>
            <DayPicker
          className="text-black font-light"
          captionLayout="dropdown-buttons" fromYear={2015} toYear={2050}
          id="test"
          mode="range"
          defaultMonth={newStartDate}
          selected={range}
          footer={footer}
          onSelect={handleDateSelect}
          />
          </div>
        )}
      </div>
    </>
  );
};

export default MyDatePicker