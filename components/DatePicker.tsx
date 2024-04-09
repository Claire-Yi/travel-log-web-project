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
  onStartDateChange: (newStartDate: Date | undefined) => void;
  onEndDateChange: (newEndDate: Date | undefined) => void;
}

const MyDatePicker: React.FC <MyDatePickerProps>= ({trip, onStartDateChange, onEndDateChange}) => {
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
 
  
  let footer = <p className = "pt-4"></p>;
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

  const handleDateSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange) {
      // Update local state
    setRange(selectedRange);
    onStartDateChange(selectedRange.from);
    onEndDateChange(selectedRange.to);
    }
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
          defaultMonth={defaultStartDate}
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

export default MyDatePicker;