// components/EventItem.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { copyToClipboard } from '@/app/utils/clipboard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventItem = ({ event }: any) => {
  const deadline = new Date(event.event_schedule_deadline).toDateString();
  return (
    <div className='mb-4 border p-4'>
      <h2 className='mb-2 text-xl font-bold'>{event.name}</h2>
      <p>
        <strong>Date:</strong> {event.event_schedule_date}
      </p>
      <p>
        <strong>Start Time:</strong> {event.specific_time_start}
      </p>
      <p>
        <strong>End Time:</strong> {event.specific_time_end}
      </p>
      <p>
        <strong>Deadline:</strong> {deadline}
      </p>
      <div className='mt-4'>
        {/* <button className='mr-2 bg-blue-500 px-4 py-2 text-white'>
          Show Status
        </button> */}
        <button
          onClick={() => {
            copyToClipboard(
              `https://meetings-sigma.vercel.app/event/${event.internal_link}`
            );
            toast('URL copy to Clipboard.');
          }}
          className='bg-green-500 px-4 py-2 text-white'
        >
          Share
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventItem;
