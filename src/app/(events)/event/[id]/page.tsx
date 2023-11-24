'use client';

// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import { fetchEvent } from '@/app/utils/apis/fetchEvent';

export default function EventPage({
  params: { id },
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
    await fetchEvent(123);
  };

  if (loading) {
    return (
      <div>
        <p>Loading.......</p>
      </div>
    );
  }
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='max-w-md rounded-md bg-white p-6 shadow-md'>
        <h1 className='mb-4 text-2xl font-bold'>Event Details</h1>

        <div className='mb-4'>
          <label className='block text-gray-600'>Event Name:</label>
          <p className='text-gray-800'>Sample Event {id}</p>
        </div>

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
          <button className='rounded bg-green-500 px-4 py-2 text-white'>
            Accept
          </button>
          <button className='rounded bg-red-500 px-4 py-2 text-white'>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
