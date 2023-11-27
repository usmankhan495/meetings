'use client';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import { loginWithSocial } from '@/app/utils/apis/loginWithSocial';

export default function HomePage() {
  const { data, status } = useSession();
  const route = useRouter();

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
    try {
      const response = await loginWithSocial(payload);
      if (!response?.success) {
        signOut();
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

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

              <button
                onClick={() => {
                  route.push('/events');
                }}
                className='rounded bg-purple-500 px-4 py-2 text-white'
              >
                My Event
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
