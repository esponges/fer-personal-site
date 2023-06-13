export const NavbarToggler = ({ onToggle, isSidebarOpen }: { onToggle: () => void; isSidebarOpen: boolean }) => {
  return (
    <button
      className="fixed top-5 right-4 z-50 rounded-full p-2"
      onClick={onToggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ transform: isSidebarOpen ? 'rotate(180deg)' : '' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
        />
      </svg>
    </button>
  );
};
