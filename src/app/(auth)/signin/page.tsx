'use client';

import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import ArrowLink from '@/components/links/ArrowLink';

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
  const { data: session, status } = useSession();

  console.log('session::::..............', session, status);
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <p className='mt-2 text-sm text-gray-700'>
            <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
              Sign in page
            </ArrowLink>
          </p>

          <button onClick={() => signIn('google', { callbackUrl: '/' })}>
            Sign in with Google
          </button>
        </div>
      </section>
    </main>
  );
}
