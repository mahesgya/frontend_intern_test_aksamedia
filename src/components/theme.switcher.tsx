import React from 'react';
import { useTheme } from '../hooks/use.theme';
import { type Theme } from '../context/slices/auth.slice';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SystemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const themeOptions: { name: Theme; icon: React.ReactNode }[] = [
  { name: 'light', icon: <SunIcon /> },
  { name: 'dark', icon: <MoonIcon /> },
  { name: 'system', icon: <SystemIcon /> },
];

export const ThemeSwitcher = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 p-1 rounded-full bg-gray-200 dark:bg-gray-700">
      {themeOptions.map((option) => (
        <button
          key={option.name}
          onClick={() => changeTheme(option.name)}
          className={`p-1.5 rounded-full transition-colors duration-200 focus:outline-none ${
            theme === option.name
              ? 'bg-primary text-white'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          aria-label={`Switch to ${option.name} mode`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};