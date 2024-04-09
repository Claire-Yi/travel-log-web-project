import React, { useState } from 'react';

// interface Trip {
//     name?: string;
//   }
  
  interface tripNameProps {
    onSave: (newTripName: string | undefined) => void;
  }


const TripName: React.FC <tripNameProps>= ({onSave}) => {
  return (
    <div>
      <input type = "text" />
    </div>
  );
};

export default TripName;
