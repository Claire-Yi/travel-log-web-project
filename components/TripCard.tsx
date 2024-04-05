'use client'

import React from 'react';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { Button } from 'react-bootstrap';


// specifying the props Trip expect to receive, and type of each prop
export interface Trip {
  id: number;
  name?: string;
// should the type be Date here?
  dateCreated: string;
  startDate?: string;
  endDate?: string;
}

// specifying prop TripCardProps expects to receive, and type of the prop
// so a component like Trip could represent types? or is it a nested function?
interface TripCardProps {
  trip: Trip;
}

//defines that TripCard expects to receive TripCardProps as property and extract 'trip' prop from TripCardProps
// it could've been ({id: number; name:string...}) instead of ({trip})?
const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    const newStartDate = trip.startDate ? parseISO(trip.startDate) : null;
    const formattedStartDate = newStartDate ? format(newStartDate, 'MMMM d, yyyy') : '';

    const newEndDate = trip.endDate ? parseISO(trip.endDate): null;
    const formattedEndDate = newEndDate ? format(newEndDate, 'MMMM d, yyyy') : '';

  return (
    <div className="trip-card block pb-4 space-y-4 overflow-hidden rounded-md hover:bg-neutral-100 transition duration-300">
        <Image src="/images/Shanghai.png" alt={trip.name} width={500} height={500}/>
        <div className="flex justify-between items-start px-4">
            <div className="trip-details space-y-2">
                <h2 className="text-md text-black">{trip.name}</h2>
                <p className="text-xs text-black">{formattedStartDate}-{formattedEndDate}</p>
            </div>
            <div>
            <Button type="button" icon="/More.svg" variant="btn-icon"/>
            </div>
        </div>
    </div>
  );
};

export default TripCard;
