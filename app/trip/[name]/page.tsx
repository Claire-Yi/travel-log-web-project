'use client'

import { useRouter } from 'next/router';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import MyDatePicker from '@/components/DatePicker';
import Button from '@/components/Button';
import { format } from 'date-fns';

// In Next.js, when you create a dynamic route using square brackets [] in the filename of a page component, Next.js automatically provides a route parameter named id to that page component based on the structure of the URL.

const TripPage = () => {
  const {name} = useParams<{name: string}>(); // Access the id parameter from the URL

  const [trip, setTrip] = useState(null);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  useEffect(() => {
    const fetchTripByName = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/trips`); 
        if (response.status === 200) {
          for (const TripItem of response.data) {
            // const TripItem: { [key: string]: string } = response.data[index];
            if (TripItem.name === name)
            {setTrip(TripItem)}
          };
        } else {
          throw new Error('Failed to fetch trip data');
        }
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    };

    if (name) {
      fetchTripByName();
    }
  }, [name]);

  if (!trip) {
    return <div>Loading...</div>;
  }
  console.log(trip);

  return (
    <main className="w-full h-svh px-32 py-16">
      <nav>
        <Button type="button" icon="/Back.svg" variant="btn-icon"/>
        <div className='ButtonGroup flex justify-between w-full'>
          <Button type="button" icon="/More.svg" variant="btn-icon"/>
          <Button type="button" icon="/ArrowLeft.svg" label="Expand Map" variant="btn-secondary"/>
        </div>
      </nav>
      <header className='LogHeader'>
        <h1 className="text-black">{trip.name}</h1>
        <div className="ButtonGroup">
          <div>
            <MyDatePicker trip={trip}></MyDatePicker>
          </div>
          <div className="GuestList"></div>
          <div className="Tags"></div>
        </div>
      </header>
      {/* <div className="TabGroup">
        <Tab></Tab>
        <Tab></Tab>
      </div> */}
    </main>
  );
};

export default TripPage;
