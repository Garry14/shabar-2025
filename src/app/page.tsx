'use client';

import Head from 'next/head';
import { useState } from 'react';
import '@/lib/env';

import NextIcon from '@/components/icons/NextIcon';

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
        <div className='layout relative py-12 flex flex-col items-center justify-center min-h-screen'>
          <div className='font-thin text-6xl text-center'>{page.content}</div>
          <div className='mt-9 w-full flex justify-center'>
            <button
              onClick={() => {
                const index = dataPage.indexOf(page);
                if (index === 0) {
                  setPage(dataPage[dataPage.length - 1]);
                } else {
                  setPage(dataPage[index - 1]);
                }
              }}
              className='bg-green-500 hover:bg-green-300 w-12 h-12 mr-2'
            >
              <div className='text-white rotate-180'>
                <NextIcon />
              </div>
            </button>
            <button
              onClick={() => {
                const index = dataPage.indexOf(page);
                if (index === dataPage.length - 1) {
                  setPage(dataPage[0]);
                } else {
                  setPage(dataPage[index + 1]);
                }
              }}
              className='bg-green-500 hover:bg-green-300 w-12 h-12'
            >
              <div className='text-white '>
                <NextIcon />
              </div>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
