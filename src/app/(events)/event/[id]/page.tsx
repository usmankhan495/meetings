'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { fetchEvent } from '@/app/utils/apis/fetchEvent';
import { updateEvent } from '@/app/utils/apis/updateEventStatus';
import { convertTo12HourFormat } from '@/app/utils/convertTo12HourFormat';

export default function EventPage({
  params: { id }
}: {
  params: { id: string };
}) {
  const { data, status } = useSession();
  const [event, setEvent] = React.useState<{
    id: number;
    attendee: {
      id: number;
    };
    event: {
      summary: string;
      specific_time_start: string;
      specific_time_end: string;
      event_schedule_deadline: string;
      description: string;
      event_schedule_date: string;
      id: number;
    };
  }>();
  // const authorized = status === 'authenticated';
  const router = useRouter();
  const unAuthorized = status === 'unauthenticated';
  const loading = status === 'loading';

  const getDeadLineDate = () => {
    if (event?.event?.event_schedule_deadline) {
      const deadlineYear = new Date(
        event?.event?.event_schedule_deadline
      ).getFullYear();
      const deadlineMonth =
        new Date(event?.event?.event_schedule_deadline).getMonth() + 1;
      const deadlineDay = new Date(
        event?.event?.event_schedule_deadline
      ).getDate();

      return deadlineYear + '-' + deadlineMonth + '-' + deadlineDay;
    } else return '';
  };

  const getDeadlineTime = () => {
    if (event?.event?.event_schedule_deadline) {
      const deadlineTime = new Date(
        event?.event?.event_schedule_deadline
      ).toLocaleTimeString();

      return deadlineTime;
    } else {
      return '';
    }
  };

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
    const event = await fetchEvent(id);
    setEvent(event);
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
        attendees: event?.id,
        status: 2
      };
      const response = await updateEvent(payload);
      if (response && !response.success) {
        toast('Something went wrong.');
      } else {
        toast('Event invite Accepted.');
        router.replace('/');
      }
    } catch (e) {
      toast('Something went wrong.');
    }
  };

  const onPressDecline = async () => {
    try {
      const payload = {
        attendees: event?.id,
        status: 3
      };
      const response = await updateEvent(payload);
      if (response && !response.success) {
        toast('Something went wrong.');
      } else {
        toast('Event invite Declined.');
        router.replace('/');
      }
    } catch (e) {
      toast('Something went wrong.');
    }
  };
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='max-w-md rounded-md bg-white p-6 shadow-md'>
        <h1 className='mb-4 text-2xl font-bold'>Event Details</h1>

        <div className='mb-4'>
          <label className='block text-gray-600'>Event Name:</label>
          <p className='text-gray-800'>{event?.event?.summary}</p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>Event Date:</label>
          <p className='text-gray-800'>{event?.event.event_schedule_date}</p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>Start Time:</label>
          <p className='text-gray-800'>
            {convertTo12HourFormat(event?.event.specific_time_start || '')}
          </p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>End Time:</label>
          <p className='text-gray-800'>
            {convertTo12HourFormat(event?.event?.specific_time_end || '')}
          </p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>Event Deadline:</label>
          <p className='text-gray-800'>{getDeadLineDate()}</p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>Event Deadline:</label>
          <p className='text-gray-800'>{getDeadlineTime()}</p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-600'>Description</label>
          <p className='text-gray-800'>{event?.event.description}</p>
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
