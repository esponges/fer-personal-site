/* eslint-disable max-len */
import { useDarkMode } from "~/utils/hooks/useDarkMode";

export const DarkModeToggler = () => {
  const { toggleTheme, activeTheme } = useDarkMode();

  if (activeTheme === "dark") {
    return (
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white/90 hover:bg-white/20 dark:text-white"
        onClick={toggleTheme}
        id="navbar-lightmode-toggler"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white/90 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeWidth="{2}"
            d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white/90 dark:text-white"
      onClick={toggleTheme}
      id="navbar-darkmode-toggler"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white/90 dark:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        />
      </svg>
    </button>
  );
};
