import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [activeTheme, setActiveTheme] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  const setMode = (mode: string) => {
    window.localStorage.theme = mode;
    // document.documentElement.classList.add(mode);
    if (mode === 'light') {
      // window.localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      // window.localStorage.theme = 'dark';
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    setActiveTheme(mode);
  };

  const toggleTheme = () => {
    if (activeTheme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.theme;
    if (localTheme) {
      setActiveTheme(localTheme);
      setMode(localTheme);
    }
    setIsMounted(true);
  }, []);

  return { activeTheme, toggleTheme, isMounted };
};
