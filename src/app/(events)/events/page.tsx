/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';

import EventItem from '@/app/(events)/events/component/EventItem';
import { eventList } from '@/app/utils/apis/events';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEvents = async () => {
    try {
      const events = await eventList();
      setEvents(events || []);
    } catch (e) {
      setEvents([]);
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='mb-4 text-2xl font-bold'>Event List</h1>
      {events.length === 0 && (
        <p className='flex items-center justify-center'>
          No Event Found.Please create event
        </p>
      )}
      {events.map((event: any) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsPage;
