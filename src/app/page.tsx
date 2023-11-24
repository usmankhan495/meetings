// import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
'use client';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import { eventList } from '@/app/utils/apis/events';
import { loginWithSocial } from '@/app/utils/apis/loginWithSocial';

export default function HomePage() {
  const { data, status } = useSession();
  const route = useRouter();
  // eslint-disable-next-line no-console
  console.log('my session:::', data, status);

  React.useEffect(() => {
    if (status === 'authenticated' && data.user) {
      init(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const init = async (data: any) => {
    const payload = {
      platform: 'google',
      access_token: data.access_token,
      refresh_token: data.refresh
    };
    const response = await loginWithSocial(payload);

    await eventList(response?.data?.token);
  };

  // const getEventList = async () => {
  //   eventList();
  // };

  if (status === 'loading') {
    return (
      <div>
        <p>Loading.....</p>
      </div>
    );
  }
  return (
    <main>
      <div className='flex h-screen items-center justify-center'>
        <div className='space-x-4'>
          {status === 'unauthenticated' && (
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className='rounded bg-blue-500 px-4 py-2 text-white'
            >
              Sign In
            </button>
          )}
          {status === 'authenticated' && (
            <button
              onClick={() => signOut()}
              className='rounded bg-red-500 px-4 py-2 text-white'
            >
              Sign Out
            </button>
          )}

          {status === 'authenticated' && (
            <>
              <button
                onClick={() => {
                  route.push('/create-event');
                }}
                className='rounded bg-green-500 px-4 py-2 text-white'
              >
                Create Event
              </button>

              <button className='rounded bg-purple-500 px-4 py-2 text-white'>
                My Event
              </button>
            </>
          )}
        </div>
      </div>

      {/* <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          {status === 'unauthenticated' ? (
            <button onClick={() => signIn('google', { callbackUrl: '/' })}>
              Sign in
            </button>
          ) : (
            <button onClick={() => signOut()}>Sign out</button>
          )}
          <button
            onClick={() => {
              route.push('/create-event');
            }}
          >
            Create Event
          </button>
        </div>
      </section> */}
    </main>
  );
}
