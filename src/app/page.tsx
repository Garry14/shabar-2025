'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import '@/lib/env';

import NextIcon from '@/components/icons/NextIcon';

import { dataPage } from '@/constant/data';

export default function HomePage() {
  const [page, setPage] = useState<{
    content: string;
    effect: string;
    arrangement: string;
  }>(dataPage[0]);
  const [appearButton, setAppearButton] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppearButton(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative py-12 flex flex-col items-center justify-center min-h-screen'>
          <div className='font-thin text-6xl text-center'>{page.content}</div>
          {appearButton && (
            <div className='mt-9 w-full flex justify-center'>
              {['end', 'body'].includes(page.arrangement) && (
                <button
                  onClick={() => {
                    const index = dataPage.indexOf(page);
                    setPage(dataPage[index - 1]);
                    setAppearButton(false);
                  }}
                  className='bg-green-500 hover:bg-green-300 w-12 h-12 mr-2'
                >
                  <div className='text-white rotate-180'>
                    <NextIcon />
                  </div>
                </button>
              )}
              {['start', 'body'].includes(page.arrangement) && (
                <button
                  onClick={() => {
                    const index = dataPage.indexOf(page);
                    setPage(dataPage[index + 1]);
                    setAppearButton(false);
                  }}
                  className='bg-green-500 hover:bg-green-300 w-12 h-12'
                >
                  <div className='text-white'>
                    <NextIcon />
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
