import { Routes } from "~/types/enums";
import { DarkModeToggler } from "../atoms/darkModeToggler";
import { NavbarLink, NAV_LINK_HOVER_CLASS } from "../atoms/navbar/navbarLink";
import { renderSocial } from "../atoms/social";

const NAV_EL_COLOR = "text-gray-800";

export const Sidebar = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <div
      className={`
      fixed top-0 left-0 z-40 h-screen w-64 
      bg-white transition-transform dark:bg-gray-600 sm:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex h-full flex-col justify-between overflow-y-auto px-3 py-4">
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
          <li>
            <DarkModeToggler />
          </li>
          <li className="flex">
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
