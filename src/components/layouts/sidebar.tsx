import { Routes } from '~/types/enums';
import { NavbarLink, navElHoverClass } from './navbar';

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`
      fixed top-0 left-0 z-40 h-screen w-64 
       bg-white/10 transition-transform sm:translate-x-0
       ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `} // remove this
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 bg-white/10 px-3 py-4">
        <ul className="space-y-2 font-medium">
          <li>
            <NavbarLink
              href={Routes.home}
              textSize="md:text-4xl text-3xl"
              className={navElHoverClass}
              shouldDisplay
              isMobile
              textColor='text-gray-500'
            >
              FerTostado
            </NavbarLink>
          </li>
          <li>
            <NavbarLink
              href={Routes.posts}
              textSize="md:text-xl lg:text-2xl text-lg"
              className={navElHoverClass}
              shouldDisplay
              isMobile
              textColor='text-gray-500'
            >
              Posts
            </NavbarLink>
          </li>
          <li>
            <NavbarLink
              href={Routes.projects}
              textSize="md:text-xl lg:text-2xl text-lg"
              className={navElHoverClass}
              shouldDisplay
              isMobile
              textColor='text-gray-500'
            >
              Projects
            </NavbarLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
