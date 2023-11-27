'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import { toast, ToastContainer } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-toastify/dist/ReactToastify.css';

import { createEvent } from '@/app/utils/apis/createEvent';

export default function CreateEvent() {
  const [eventSummary, setEventSummary] = useState('');
  const [duration, setDuration] = useState<number>(30);
  const [meetDate, setMeetDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [deadLineEndTime, setDeadLineEndTime] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const route = useRouter();

  const handleDurationClick = (value: number) => {
    setDuration(value);
  };

  const handleDoneClick = async () => {
    const year = meetDate.getFullYear();
    const month = meetDate.getMonth() + 1;
    const day = meetDate.getDate();
    const deadlineYear = deadlineDate.getFullYear();
    const deadlineMonth = deadlineDate.getMonth() + 1;
    const deadlineDay = deadlineDate.getDate();

    const deadline = deadlineYear + '-' + deadlineMonth + '-' + deadlineDay;
    let deadlineDateTime = '';
    if (deadLineEndTime) {
      deadlineDateTime = new Date(
        `${deadline}T${deadLineEndTime}Z`
      ).toISOString();
    }

    const userId = localStorage.getItem('userId');

    if (startTime === '' || endTime === '' || deadLineEndTime === '') {
      toast('Please provide values for all fields');
      return;
    }

    const payload = {
      host: userId,
      event_schedule_date: year + '-' + month + '-' + day,
      specific_time_start: startTime,
      specific_time_end: endTime,
      event_schedule_deadline: deadlineDateTime,
      description,
      is_draft: false,
      event_duration: duration,
      summary: eventSummary
    };

    try {
      const response = await createEvent(payload);
      if (response && !response.success) {
        toast('Something went wrong.please try again.');
      } else {
        route.replace('/');
        toast('Event Created!');
      }
    } catch (e) {
      toast('Something went wrong.please try again.');
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='mb-4 text-2xl font-bold'>Create Event</h1>

      {/* Event Name */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Summary
        </label>
        <input
          type='text'
          className='mt-1 w-full rounded-md border p-2'
          value={eventSummary}
          onChange={(e) => setEventSummary(e.target.value)}
        />
      </div>

      {/* Duration */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Duration
        </label>
        <div className='flex'>
          <button
            className={`flex-grow rounded-md border p-2 ${
              duration === 30 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleDurationClick(30)}
          >
            30m
          </button>
          <button
            className={`flex-grow rounded-md border p-2 ${
              duration === 60 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleDurationClick(60)}
          >
            60m
          </button>
          <button
            className={`flex-grow rounded-md border p-2 ${
              duration === 120 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleDurationClick(120)}
          >
            2hrs
          </button>
        </div>
      </div>

      {/* Meet Date */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Meet Date
        </label>
        <div className='flex'>
          <DatePicker
            selected={meetDate}
            onChange={(date) => {
              if (date) setMeetDate(date);
            }}
          />
        </div>
      </div>

      {/* Time Picker */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Start Time
        </label>
        <div className='flex'>
          <TimePicker
            value={startTime}
            disableClock
            onChange={(time) => {
              setStartTime(time as string);
            }}
          />
        </div>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          End Time
        </label>
        <div className='flex'>
          <TimePicker
            value={endTime}
            disableClock
            onChange={(time) => {
              setEndTime(time as string);
            }}
          />
        </div>
      </div>

      {/* Deadline Date */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Deadline Date
        </label>
        <div className='flex'>
          <DatePicker
            selected={deadlineDate}
            onChange={(date) => {
              if (date) setDeadlineDate(date);
            }}
          />
        </div>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Deadline Time
        </label>
        <div className='flex'>
          <TimePicker
            value={deadLineEndTime}
            disableClock
            onChange={(time) => {
              setDeadLineEndTime(time as string);
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Description
        </label>
        <textarea
          rows={4}
          className='mt-1 w-full rounded-md border p-2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Done Button */}
      <div>
        <button
          className='rounded-md bg-blue-500 px-4 py-2 text-white'
          onClick={handleDoneClick}
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
