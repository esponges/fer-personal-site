/* eslint-disable max-len */
// apparently this use client should be removed since its parent already has it
// but if I remove the app breaks https://github.com/vercel/next.js/discussions/46795
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Routes } from '~/types/enums';
import { useDeviceWidth } from '~/utils/hooks/misc';
import { SocialMediaIcon } from '../atoms/socialMediaIcon';
import { Sidebar } from './sidebar';

export const NavbarLink = ({
  href,
  children,
  textSize = 'text-lg',
  className,
  shouldDisplay = true,
  isMobile = false,
  textColor = 'text-white',
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  textSize?: string;
  textColor?: string;
  className?: string;
  shouldDisplay?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={!isMobile && shouldDisplay ? 'ml-6' : 'block'}
    >
      <span
        className={`rounded font-bold md:p-3 ${textColor} ${textSize} ${className} ${!shouldDisplay ? 'hidden' : null}`}
      >
        {children}
      </span>
    </Link>
  );
};

const NavbarToggler = ({ onToggle, isSidebarOpen }: { onToggle: () => void; isSidebarOpen: boolean }) => {
  return (
    <button
      className="fixed top-4 right-4 z-50 rounded-full p-2"
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

export const navElHoverClass = 'hover:bg-white/20 hover:text-gray';

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useDeviceWidth();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobile ? (
        <Sidebar
          onClick={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
        />
      ) : null}
      <nav className="flex h-20 flex-row items-center bg-white/10 px-2 md:px-0">
        <div className="w-full">
          <div className="xs:text-center mx-auto max-w-3xl justify-between md:flex">
            <div className={isMobile ? 'align-center flex justify-center text-center' : ''}>
              {isMobile ? (
                <NavbarToggler
                  onToggle={handleSidebarToggle}
                  isSidebarOpen={isSidebarOpen}
                />
              ) : null}
              <NavbarLink
                href={Routes.home}
                textSize="md:text-4xl text-3xl"
                className={navElHoverClass}
                shouldDisplay
                isMobile={isMobile}
              >
                FerTostado
              </NavbarLink>
              <NavbarLink
                href={Routes.posts}
                textSize="md:text-xl lg:text-2xl text-lg"
                className={navElHoverClass}
                shouldDisplay={!isMobile}
              >
                Posts
              </NavbarLink>
              <NavbarLink
                href={Routes.projects}
                textSize="md:text-xl lg:text-2xl text-lg"
                className={navElHoverClass}
                shouldDisplay={!isMobile}
              >
                Projects
              </NavbarLink>
            </div>
            <div className="hidden flex-row items-center gap-4 md:flex">
              <SocialMediaIcon
                url="https://github.com/esponges"
                icon="github"
              />
              <SocialMediaIcon
                url="https://www.linkedin.com/in/luis-fernando-gonz%C3%A1lez-tostado-a9696177/"
                icon="linkedIn"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
