'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import Button from '@/components/buttons/Button';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const route = useRouter();
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Button
            onClick={() => {
              route.push('/api/auth/login');
            }}
            variant='primary'
            className='text-heading-regular'
          >
            Meetings
          </Button>
        </div>
      </section>
    </main>
  );
}
