'use client';

import { useState } from 'react';
import '@/lib/env';

import DarkModeSwitch from '@/components/buttons/DarkModeSwitch';
import NextIcon from '@/components/icons/NextIcon';

import { dataPage } from '@/constant/data';

export default function HomePage() {
  const [index, setIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(false);

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dataPage.length);
      setFade(false);
    }, 500); // Match the duration of the fade-out animation
  };

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setIndex(
        (prevIndex) => (prevIndex - 1 + dataPage.length) % dataPage.length,
      );
      setFade(false);
    }, 500); // Match the duration of the fade-out animation
  };

  return (
    <>
      <main className='relative'>
        <div className='absolute top-2 right-2'>
          <DarkModeSwitch />
        </div>
        <section className='bg-white dark:bg-gray-900'>
          <div className='layout relative py-12 flex flex-col md:flex-row items-center justify-center min-h-screen w-full'>
            {['end', 'body'].includes(dataPage[index].arrangement) && (
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
              className={`px-3 dark:text-gray-200 font-thin text-2xl md:text-6xl text-center ${fade ? 'fade-exit-active' : 'fade-enter-active'}`}
            >
              {dataPage[index].content}
            </div>
            {['start', 'body'].includes(dataPage[index].arrangement) && (
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
              {['end', 'body'].includes(dataPage[index].arrangement) && (
                <button
                  onClick={handlePrev}
                  className='bg-gray-300 dark:bg-gray-700 hover:bg-black dark:hover:bg-white w-12 h-12 mr-2 rounded-full'
                >
                  <div className='text-white dark:text-gray-900 rotate-180'>
                    <NextIcon />
                  </div>
                </button>
              )}
              {['start', 'body'].includes(dataPage[index].arrangement) && (
                <button
                  onClick={handleNext}
                  className='bg-gray-300 dark:bg-gray-700 hover:bg-black dark:hover:bg-white w-12 h-12 rounded-full'
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
