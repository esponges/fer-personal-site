import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [activeTheme, setActiveTheme] = useState('light');

  const setMode = (mode: string) => {
    window.localStorage.theme = mode;

    if (mode === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
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
    const isDarkMode = ('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = isDarkMode ? 'dark' : 'light';

    // todo? maybe add a listener to theme changes? overkill? how knows

    if (localTheme) {
      setActiveTheme(localTheme);
      setMode(localTheme);
    }
  }, []);

  return { activeTheme, toggleTheme };
};
