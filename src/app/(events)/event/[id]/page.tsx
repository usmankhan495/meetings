'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { fetchEvent } from '@/app/utils/apis/fetchEvent';
import { updateEvent } from '@/app/utils/apis/updateEventStatus';

export default function EventPage({
  params: { id }
}: {
  params: { id: string };
}) {
  const { data, status } = useSession();
  // const authorized = status === 'authenticated';
  const router = useRouter();
  const unAuthorized = status === 'unauthenticated';
  const loading = status === 'loading';

  React.useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading) return;

    // if the user is not authorized, redirect to the login page
    // with a return url to the current page
    if (unAuthorized) {
      router.push('/');
    }
  }, [loading, unAuthorized, status, router]);

  React.useEffect(() => {
    if (status === 'authenticated' && data.user) {
      fetchEventData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchEventData = async () => {
    await fetchEvent(id);
  };

  if (loading) {
    return (
      <div>
        <p>Loading.......</p>
      </div>
    );
  }

  const onPressAccept = async () => {
    try {
      const payload = {
        attendees: 2,
        status: 2
      };
      await updateEvent(payload);
      toast('Event invite Accepted');
    } catch (e) {
      toast('Something went wrong.');
    }
  };

  const onPressDecline = async () => {
    try {
      const payload = {
        attendees: 2,
        status: 3
      };
      await updateEvent(payload);
      toast('Event invite Declined');
    } catch (e) {
      toast('Something went wrong.');
    }
  };
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='max-w-md rounded-md bg-white p-6 shadow-md'>
        <h1 className='mb-4 text-2xl font-bold'>Event Details</h1>

        {/* <div className='mb-4'>
          <label className='block text-gray-600'>Event Name:</label>
          <p className='text-gray-800'>Sample Event {id}</p>
        </div> */}

        <div className='mb-4'>
          <label className='block text-gray-600'>Event Date:</label>
          <p className='text-gray-800'>2023-11-26</p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>Start Time:</label>
          <p className='text-gray-800'>08:00 AM</p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>End Time:</label>
          <p className='text-gray-800'>10:00 AM</p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>Event Deadline:</label>
          <p className='text-gray-800'>2023-11-26 12:00 PM</p>
        </div>

        <div className='flex space-x-4'>
          <button
            onClick={onPressAccept}
            className='rounded bg-green-500 px-4 py-2 text-white'
          >
            Accept
          </button>
          <button
            onClick={onPressDecline}
            className='rounded bg-red-500 px-4 py-2 text-white'
          >
            Decline
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
