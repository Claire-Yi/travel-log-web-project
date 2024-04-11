import React, { useState } from 'react';

interface Trip {
    name?: string;
  }
  
  interface tripNameFormProps {
    trip: Trip;
    onTripNameSave: (newTripName: string | undefined) => void;
    // onInputFocusChange: (isFocused: boolean) => void;
  }


const TripNameForm: React.FC <tripNameFormProps>= ({trip, onTripNameSave}) => {
  const defaultTripName = trip?.name ? trip.name : 'New Trip';
  const [tripName, setTripName] = useState(defaultTripName);
  const [inputActive, setInputActive] = useState(false);
  // const [isInputFocused, setIsInputFocused] = useState(false);
  // console.log('isInputFocused:', isInputFocused);

  console.log ("tripName1:", tripName);

  const handleInputChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTripName(e.target.value);
    console.log ("tripName:", tripName);
  };

  const handleBlur = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onTripNameSave(tripName);
  }

  // const handleInputFocus = () => {
  //   setIsInputFocused(true);
  //   onInputFocusChange(true);
  // };

  // const handleInputBlur = () => {
  //   setIsInputFocused(false);
  //   onInputFocusChange(false);
  // };

  return (
    <form>
      <input
      className="rounded-lg hover:bg-neutral-100 text-lg p-2 gap-4  " 
      value={tripName}
      type="text"
      maxLength={40}
      onChange={handleInputChange}
      // onFocus={() => setInputActive(true)}
      onBlur={handleBlur} 
      />
      {/* {console.log("isbuttoninfocus:", inputActive)} */}
      {/* {inputActive && ( // Conditionally render the button only when inputActive is true
        <button onClick={handleButtonClick}>Save</button>
      )} */}
    </form>
  );
};

export default TripNameForm;
