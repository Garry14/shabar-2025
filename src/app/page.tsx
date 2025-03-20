'use client';

import Cookies from 'js-cookie';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import '@/lib/env';

import DarkModeSwitch from '@/components/buttons/DarkModeSwitch';
import NextIcon from '@/components/icons/NextIcon';
import Skeleton from '@/components/Skeleton';

import { dataPage } from '@/constant/data';

export default function HomePage() {
  const [fade, setFade] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const indexFromStorage = isClient ? Number(Cookies?.get('index') ?? 0) : 0;
  const canVibrate = 'vibrate' in navigator;

  const handleNext = () => {
    setFade(true);
    if (canVibrate) {
      navigator.vibrate(200);
    }
    setTimeout(() => {
      Cookies.set(
        'index',
        ((indexFromStorage + 1) % dataPage.length)?.toString(),
        {
          expires: 1,
        },
      );
      setFade(false);
    }, 500);
  };

  const handlePrev = () => {
    setFade(true);
    if (canVibrate) {
      navigator.vibrate(200);
    }
    setTimeout(() => {
      Cookies.set(
        'index',
        (
          (indexFromStorage - 1 + dataPage.length) %
          dataPage.length
        )?.toString(),
        {
          expires: 1,
        },
      );
      setFade(false);
    }, 500);
  };

  if (!isClient) {
    return (
      <>
        <main>
          <section className='bg-white dark:bg-gray-900'>
            <DarkModeSwitch />
            <div className='layout relative py-12 flex flex-col md:flex-row items-center justify-center min-h-screen w-full'>
              <Skeleton />
            </div>
          </section>
        </main>
        <style>{`
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
      `}</style>
      </>
    );
  }

  return (
    <>
      <Head>
        <meta
          name='format-detection'
          content='telephone=no, date=no, email=no, address=no'
        />
      </Head>
      <main>
        <section className='bg-white dark:bg-gray-900'>
          <DarkModeSwitch />
          <div className='layout relative py-12 flex flex-col md:flex-row items-center justify-center min-h-screen w-full'>
            {['end', 'body'].includes(
              dataPage[indexFromStorage].arrangement,
            ) && (
              <button
                onClick={handlePrev}
                className={`bg-gray-300 dark:bg-gray-700 hover:bg-black dark:hover:bg-white w-12 h-12 mr-3 flex-shrink-0 rounded-full hidden md:block ${fade ? 'fade-exit-active' : 'fade-enter-active'}`}
              >
                <div className='text-white dark:text-gray-900 rotate-180'>
                  <NextIcon />
                </div>
              </button>
            )}
            <div
              className={`px-3 !leading-relaxed overflow-hidden dark:text-gray-200 font-thin text-2xl md:text-6xl text-center ${fade ? 'fade-exit-active' : 'fade-enter-active'}`}
              dangerouslySetInnerHTML={{
                __html: dataPage[indexFromStorage].content,
              }}
            />
            {['start', 'body'].includes(
              dataPage[indexFromStorage].arrangement,
            ) && (
              <button
                onClick={handleNext}
                className={`bg-gray-300 dark:bg-gray-700 hover:bg-black dark:hover:bg-white w-12 h-12 ml-3 flex-shrink-0 rounded-full hidden md:block ${fade ? 'fade-exit-active' : 'fade-enter-active'}`}
              >
                <div className='text-white dark:text-gray-900'>
                  <NextIcon />
                </div>
              </button>
            )}

            <div
              className={`mt-9 w-full flex justify-center md:hidden ${fade ? 'fade-exit-active' : 'fade-enter-active'}`}
            >
              {['end', 'body'].includes(
                dataPage[indexFromStorage].arrangement,
              ) && (
                <button
                  onClick={handlePrev}
                  className='bg-gray-300 dark:bg-gray-700 w-12 h-12 mr-2 rounded-full focus:outline-none active:bg-gray-700 dark:active:bg-gray-300'
                >
                  <div className='text-white dark:text-gray-900 rotate-180'>
                    <NextIcon />
                  </div>
                </button>
              )}
              {['start', 'body'].includes(
                dataPage[indexFromStorage].arrangement,
              ) && (
                <button
                  onClick={handleNext}
                  className='bg-gray-300 dark:bg-gray-700 w-12 h-12 rounded-full focus:outline-none active:bg-gray-700 dark:active:bg-gray-300'
                >
                  <div className='text-white dark:text-gray-900'>
                    <NextIcon />
                  </div>
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
      <style>{`
      .fade-enter {
        opacity: 0;
      }
      .fade-enter-active {
        opacity: 1;
        transition: opacity 0.5s ease-in;
      }
      .fade-exit {
        opacity: 1;
      }
      .fade-exit-active {
        opacity: 0;
        transition: opacity 0.5s ease-out;
      }
    `}</style>
    </>
  );
}
