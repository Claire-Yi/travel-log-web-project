import React, { useState, useEffect, createContext, useContext } from 'react';
import Button from './Button';
import { addDays, format, parse } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


interface Trip {
  // dateCreated: string;
  startDate?: string;
  endDate?: string;
}

interface MyDatePickerProps {
  trip: Trip;
  onRangeChange: (newRange: DateRange | undefined) => void;
  onStartDateChange: (newStartDate: Date | undefined) => void;
  onEndDateChange: (newEndDate: Date | undefined) => void;
}

const MyDatePicker: React.FC <MyDatePickerProps>= ({trip, onRangeChange, onStartDateChange, onEndDateChange}) => {
  // console.log('startDate:', trip.startDate);
  const pastMonth = new Date();
  const existingStartDate = trip.startDate ? new Date(trip.startDate) : new Date();
  const existingEndDate = trip.endDate ? new Date(trip.endDate) : new Date();
  const defaultStartDate = existingStartDate ? existingStartDate : pastMonth;
  const defaultEndDate = existingEndDate ? existingEndDate : addDays(pastMonth, 0);
  // state hook to set DatePicker to open or close, default to not show
  const [showDatePicker, setShowDatePicker] = useState(false);

// display start and end date if exist in db, otherwise display current date
  const defaultSelected: DateRange | undefined = { from: defaultStartDate, to: defaultEndDate };

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  // const [newStartDate, setNewStartDate] = useState<Date | undefined>();
  // console.log ("StartDate:", defaultStartDate);
 
  
  let dateDisplay = <p></p>;
  if (range?.from) {
    if (!range.to) {
      dateDisplay = (
      <p className = "pt-4">
        <div className="startDate flex gap-1">
            <div>{format(range.from, 'MMM')}</div>
            <div>{format(range.from, 'do')}</div>
        </div>
      </p>
      );
    } else if (range.to) {
      dateDisplay = (
        <p className = "flex gap-2">
          <div className="startDate flex gap-1">
            <div>{format(range.from, 'MMM')}</div>
            <div>{format(range.from, 'do')}</div>
          </div>
          –
          <div className="endDate flex gap-1">
            <div>{format(range.to, 'MMM')}</div>
            <div>{format(range.to, 'do')}</div>
            <div>{format(range.to, 'y')}</div>
          </div>
        </p>
      );
    }
  }

  const handleButtonClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange) {
      // Update local state
    setRange(selectedRange);
    onRangeChange(selectedRange);
    onStartDateChange(selectedRange.from);
    onEndDateChange(selectedRange.to);
    }
  };

  return (
    <>
      <div className="Date Picker">
        {/* <div className='text-black pb-2'>{dateDisplay}</div> */}
        <Button type="button" icon="/Calendar.svg" variant="btn-tertiary" onClick={handleButtonClick} label={dateDisplay}></Button>
        {showDatePicker && (
          <div className="flex-col">
            <DayPicker
          className="text-black font-light"
          captionLayout="dropdown-buttons" fromYear={2015} toYear={2050}
          id="test"
          mode="range"
          defaultMonth={defaultStartDate}
          selected={range}
          // footer={footer}
          onSelect={handleDateSelect}
          />
        </div>
        )}
      </div>
    </>
  );
};

export default MyDatePicker;