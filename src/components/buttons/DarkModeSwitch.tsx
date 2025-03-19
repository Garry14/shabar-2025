import { useEffect, useState } from 'react';

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className='absolute top-2 right-2 z-10 p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:bg-gray-200 focus:dark:bg-gray-800 focus:outline-none'
    >
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default DarkModeSwitch;
