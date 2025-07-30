import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './use.redux';
import { setTheme, type Theme } from '../context/slices/auth.slice';

export const useTheme = () => {
  const theme = useAppSelector((state) => state.auth.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const root = window.document.documentElement;
    const applySystemTheme = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        root.classList.toggle('dark', e.matches);
      }
    };
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', applySystemTheme);
    } else {
      root.classList.add(theme);
    }

    return () => {
      mediaQuery.removeEventListener('change', applySystemTheme);
    };
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  };

  return { theme, changeTheme };
};