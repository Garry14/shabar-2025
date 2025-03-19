'use client';

import { useState } from 'react';
import '@/lib/env';

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
      <main>
        <section className='bg-white'>
          <div className='layout relative py-12 flex flex-col md:flex-row items-center justify-center min-h-screen w-full'>
            {['end', 'body'].includes(dataPage[index].arrangement) && (
              <button
                onClick={handlePrev}
                className={`bg-green-100 hover:bg-green-300 w-12 h-12 mr-3 flex-shrink-0 rounded-full hidden md:block ${fade ? 'fade-exit-active' : 'fade-enter-active'}`}
              >
                <div className='text-white rotate-180'>
                  <NextIcon />
                </div>
              </button>
            )}
            <div
              className={`px-3 font-thin text-2xl md:text-6xl text-center ${fade ? 'fade-exit-active' : 'fade-enter-active'}`}
            >
              {dataPage[index].content}
            </div>
            {['start', 'body'].includes(dataPage[index].arrangement) && (
              <button
                onClick={handleNext}
                className={`bg-green-100 hover:bg-green-300 w-12 h-12 ml-3 flex-shrink-0 rounded-full hidden md:block ${fade ? 'fade-exit-active' : 'fade-enter-active'}`}
              >
                <div className='text-white'>
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
                  className='bg-green-100 hover:bg-green-300 w-12 h-12 mr-2 rounded-full'
                >
                  <div className='text-white rotate-180'>
                    <NextIcon />
                  </div>
                </button>
              )}
              {['start', 'body'].includes(dataPage[index].arrangement) && (
                <button
                  onClick={handleNext}
                  className='bg-green-100 hover:bg-green-300 w-12 h-12 rounded-full'
                >
                  <div className='text-white'>
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
