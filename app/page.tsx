'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import TripCard from '@/components/TripCard';
import {Trip} from "@/components/TripCard";
import { toDate } from 'date-fns';
import Button from '@/components/Button';

function HomePage() {
  // State to store trip data
  const [trips, setTrips] = useState<Trip[]>([]);

  // Fetch trip data (using Axios)
  useEffect(() => {
    axios.get('http://localhost:3001/trips')
      .then(response => {
        const data = response.data;
        // Convert date strings to Date objects
        // data.forEach((trip: any) => {
        //  trip.dateCreated = new Date(trip.dateCreated);
          //console.log(trip.dateCreated);
        // });
        setTrips(data);
      })
      .catch(error => console.error('Error fetching trips:', error));
  }, []);

  return (
    <main className="w-full px-32 py-16">
      <header className="flex items-center justify-between w-full mb-16">
        <h1 className="text-xl text-black">Claire&apos;s Logs</h1> {/* screen title */}
        {/* search components */}
        <div className="flex items-center justify-between gap-6">
          <search>
            <form>
              <input className="px-4 py-2 bg-slate-50 rounded-lg" placeholder="Search" />
            </form>
          </search>
          <div className="flex gap-4">
            <Button type="button" icon="/Filter.svg" variant="btn-icon"/>
            <button className="text-sm text-black">sort</button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20"> {/* trip card grid */}
        {trips.map(trip => (
          <Link key={trip.id} href={`/trip/${trip.name}`}>{/* Wrap TripCard with Link */}
            <TripCard trip={trip} />
          </Link>
        ))}
      </div>
      {/* fixed button at center bottome of page*/}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 ">
        <Button type="button" icon="/Add.svg" label="Add New Log" variant="btn-primary"/>
      </div>
    </main>  
  );
}

export default HomePage;
