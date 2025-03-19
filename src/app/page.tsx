'use client';

import Head from 'next/head';
import { useState } from 'react';
import '@/lib/env';

import { dataPage } from '@/constant/data';

export default function HomePage() {
  const [page, setPage] = useState<{ content: string; effect: string }>(
    dataPage[0],
  );
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='text-2xl font-bold'>{page.content}</div>
          <div className='mt-4'>
            <button
              onClick={() => {
                const index = dataPage.indexOf(page);
                if (index === dataPage.length - 1) {
                  setPage(dataPage[0]);
                } else {
                  setPage(dataPage[index + 1]);
                }
              }}
              className='btn btn-primary'
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
