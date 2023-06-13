import { Routes } from '~/types/enums';
import { NavbarLink, NAV_LINK_HOVER_CLASS } from '../atoms/navbar/navbarLink';
import { renderSocial } from '../atoms/social';

const NAV_EL_COLOR = 'text-gray-800';

export const Sidebar = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <div
      className={`
      fixed top-0 left-0 z-40 h-screen w-64 
      bg-white transition-transform sm:translate-x-0 dark:bg-gray-600
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="h-full overflow-y-auto bg-white/10 px-3 py-4">
        <ul className="space-y-2 font-medium">
          <li>
            <NavbarLink
              href={Routes.home}
              textSize="md:text-4xl text-3xl"
              className={NAV_LINK_HOVER_CLASS}
              shouldDisplay
              isMobile
              textColor={NAV_EL_COLOR}
              onClick={onClick}
            >
              FerTostado
            </NavbarLink>
          </li>
          <li>
            <NavbarLink
              href={Routes.posts}
              textSize="md:text-xl lg:text-2xl text-lg"
              className={NAV_LINK_HOVER_CLASS}
              shouldDisplay
              isMobile
              textColor={NAV_EL_COLOR}
              onClick={onClick}
            >
              Posts
            </NavbarLink>
          </li>
          <li>
            <NavbarLink
              href={Routes.projects}
              textSize="md:text-xl lg:text-2xl text-lg"
              className={NAV_LINK_HOVER_CLASS}
              shouldDisplay
              isMobile
              textColor={NAV_EL_COLOR}
              onClick={onClick}
            >
              Projects
            </NavbarLink>
          </li>
          <li className="flex py-3">
            {renderSocial(`${NAV_EL_COLOR} dark:text-white`).map((social, idx) => (
              <span key={idx}>{social}</span>
            ))}
          </li>
          <li>
            <span className={`${NAV_EL_COLOR} dark:text-white`}>{new Date().getFullYear()}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
