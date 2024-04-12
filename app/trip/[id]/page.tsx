'use client'

// import MyLink from '@/components/MyLink';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import MyDatePicker from '@/components/DatePicker';
import Button from '@/components/Button';
import TripNameForm from '@/components/TripNameForm';
import { format } from 'date-fns';
import AddBlockDropdown from '@/components/AddBlockDropdown';
import LogContent from '@/components/LogContent';

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


  // trip name event handler
  const handleTripNameSave = async (newTripName: string) => {
    console.log("tripName on trip page", newTripName);
    try {
      await axios.patch(`http://localhost:3001/trips/${trip.id}`, { name: newTripName });
      // setIsSaveButtonVisible(false);
      console.log('Trip name updated successfully:', newTripName);
    } catch (error) {
      console.error('Error updating trip name:', error);
    }
  };


    // date picker event handlers
  const [tripDates, setTripDates] = useState('0');

  const updateTripDates = async (newRange: DateRange) => {
    setTripDates(newRange);
  }

  const handleStartDateChange = async (newStartDate: Date) => {
    console.log('new startDate:', newStartDate);
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
    <main className="w-full h-svh px-24 py-8">
      <nav className="flex items-center justify-between py-4 mx-4">
        <Link href={"/"}>
          <Image src="/Back.svg" alt="logo" width={24} height={24} />
        </Link>
        <div className="ButtonGroup flex justify-between gap-2">
          <Button type="button" icon="/More.svg" variant="btn-icon" />
          <Button type="button" icon="/ArrowLeft.svg" label="Expand Map" variant="btn-secondary" />
        </div>
      </nav>
      <header className="LogHeader">
        <div  className="text-black">
          <TripNameForm 
            trip={trip}
            onTripNameSave={handleTripNameSave}
            >
          </TripNameForm>
          </div>
        <div className="ButtonGroup">
          <div>
            <MyDatePicker
              trip={trip}
              onRangeChange={updateTripDates}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            >
            </MyDatePicker>
          </div>
          <div className="GuestList"></div>
          <div className="Tags"></div>
        </div>
      </header>
      <div className="log content text-black">
        <LogContent/>
      </div>
    </main>
  );
};

export default TripPage;
