/* eslint-disable max-len */
import Link from 'next/link';
import { Routes } from '~/types/enums';
import { SocialMediaIcon } from '../atoms/socialMediaIcon';

const NavbarLink = ({
  href,
  children,
  textSize = 'text-lg',
  className,
}: {
  href: string;
  children: React.ReactNode;
  textSize?: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`ml-6`}
    >
      <span className={`rounded p-3 font-bold text-white ${textSize} ${className}`}>
        {children}
      </span>
    </Link>
  );
};

export const Navbar = () => {
  const navElHoverClass = 'hover:bg-white/20 hover:text-gray';

  return (
    <nav className="flex h-20 flex-row items-center bg-white/10 px-2 md:px-0">
      <div className="w-full">
        <div className="mx-auto flex max-w-3xl justify-between">
          <div className="">
            <NavbarLink
              href={Routes.home}
              textSize="text-3xl"
              className={navElHoverClass}
            >
              FerTostado
            </NavbarLink>
            <NavbarLink
              href={Routes.posts}
              className={navElHoverClass}
            >
              Posts
            </NavbarLink>
            <NavbarLink
              href={Routes.projects}
              className={navElHoverClass}
            >
              Projects
            </NavbarLink>
          </div>
          <div className="flex flex-row items-center gap-4">
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
  );
};
