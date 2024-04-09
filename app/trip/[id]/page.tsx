'use client'

import { useRouter } from 'next/router';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import MyDatePicker from '@/components/DatePicker';
import Button from '@/components/Button';
import TripName from '@/components/TripName';
import { format } from 'date-fns';

// In Next.js, when you create a dynamic route using square brackets [] in the filename of a page component, Next.js automatically provides a route parameter named id to that page component based on the structure of the URL.
interface Trip {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
}

const TripPage = () => {
  // const { name } = useParams<{ name: string }>();
  const { id } = useParams<{id:string}>();
  const [trip, setTrip] = useState<Trip | null>(null);
  // const [newStartDate, setNewStartDate] = useState<Date | undefined>();
  // const [newEndDate, setNewEndDate] = useState<Date | undefined>();

  
// get trip data with id/url param and setTrip with db data
  useEffect(() => {
    const fetchTripById = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/trips/${id}`);
        if (response.status === 200) {
          setTrip(response.data);
        } else {
          throw new Error('Failed to fetch trip data');
        }
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    };

    if (id) {
      fetchTripById();
    }
  }, [id]);
  // console.log(trip);

  //log name input evenhandlers
  const [tripName, setTripName] = useState(trip?.name ? trip.name : 'New Trip');
  const [inputActive, setInputActive] = useState(false);

  const handleTripNameChange = (newTripName: string) => {
    setTripName(newTripName);
  };

  const handleTripNameSave = async (newTripName: string | undefined) => {
    await axios.patch(`http://localhost:3001/trips/${trip.name}`, { name: newTripName});
    console.log('New log name:', newTripName);
    setInputActive(false);
    // } catch (error) {
    //     console.error('Error updating log name', error);
    // }
  };

  const handleInputFocus = () => {
    setInputActive(true);
  };

    // date picker event handlers
  const handleStartDateChange = async (newStartDate: Date) => {
    console.log('new startDate:', newStartDate);
    // setNewStartDate(startDate);
    if (trip && newStartDate) {
      try {
        await axios.patch(`http://localhost:3001/trips/${trip.id}`, { startDate: newStartDate });
        console.log('Start date updated successfully:', newStartDate);
      } catch (error) {
        console.error('Error updating start date:', error);
      }
    }
  };

  const handleEndDateChange = async (newEndDate: Date) => {
    // setNewEndDate(endDate);
    if (trip && newEndDate) {
      try {
        await axios.patch(`http://localhost:3001/trips/${trip.id}`, { endDate: newEndDate });
        console.log("newEndDate:", newEndDate);
        console.log('End date updated successfully');
      } catch (error) {
        console.error('Error updating end date:', error);
      }
    }
  };

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full h-svh px-32 py-16">
      <nav>
        <Button type="button" icon="/Back.svg" variant="btn-icon" />
        <div className="ButtonGroup flex justify-between w-full">
          <Button type="button" icon="/More.svg" variant="btn-icon" />
          <Button type="button" icon="/ArrowLeft.svg" label="Expand Map" variant="btn-secondary" />
        </div>
      </nav>
      <header className="LogHeader">
        <div  className="text-black" onClick={handleInputFocus}>
          <TripName onSave={handleTripNameChange}>{tripName}</TripName>
          {inputActive && (
        <button onClick={handleTripNameSave}>Save</button>
        )}
        </div>
        <div className="ButtonGroup">
          <div>
            <MyDatePicker
              trip={trip}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />
          </div>
          <div className="GuestList"></div>
          <div className="Tags"></div>
        </div>
      </header>
    </main>
  );
};

export default TripPage;
