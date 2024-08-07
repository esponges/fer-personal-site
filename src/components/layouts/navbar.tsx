/* eslint-disable max-len */
"use client";

import { useEffect, useState } from "react";
import { Routes } from "~/types/enums";
import { useDeviceWidth } from "~/utils/hooks/misc";
import { NavbarLink, NAV_LINK_HOVER_CLASS } from "~/components/atoms/navbar/navbarLink";
import { NavbarStripe } from "~/components/atoms/navbar/navbarStripe";
import { NavbarToggler } from "~/components/atoms/navbar/navbarToggler";
import { SocialMediaIcon } from "~/components/atoms/socialMediaIcon";
import { Sidebar } from "~/components/layouts/sidebar";
import { DarkModeToggler } from "~/components/atoms/darkModeToggler";
import { Badge } from "../atoms/badge";

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
 
  const { isMobile } = useDeviceWidth();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // handle hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <NavbarStripe>
        <div />
      </NavbarStripe>
    );

  return (
    <>
      {isMobile ? (
        <Sidebar
          onClick={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
        />
      ) : null}
      <NavbarStripe>
        <div className="w-full">
          <div className="xs:text-center mx-auto max-w-3xl justify-between md:flex">
            <div className={`${isMobile ? "" : "flex items-center justify-center"} text-center`}>
              {isMobile ? (
                <NavbarToggler
                  // onToggle={toggleTheme}
                  onToggle={handleSidebarToggle}
                  isSidebarOpen={isSidebarOpen}
                />
              ) : null}
              <NavbarLink
                href={Routes.me}
                textSize="md:text-4xl text-3xl dark:text-white"
                className={NAV_LINK_HOVER_CLASS}
                shouldDisplay
                isMobile={isMobile}
                id="navbar-home-link"
              >
                FerTostado
              </NavbarLink>
              <NavbarLink
                href={Routes.posts}
                textSize="md:text-xl lg:text-2xl text-lg"
                className={NAV_LINK_HOVER_CLASS}
                shouldDisplay={!isMobile}
                id="navbar-blog-link"
              >
                Blog
              </NavbarLink>
              <NavbarLink
                href={Routes.projects}
                textSize="md:text-xl lg:text-2xl text-lg"
                className={NAV_LINK_HOVER_CLASS}
                shouldDisplay={!isMobile}
                id="navbar-projects-link"
              >
                Projects
              </NavbarLink>
              <NavbarLink
                href={Routes.about}
                textSize="md:text-xl lg:text-2xl text-lg"
                className={NAV_LINK_HOVER_CLASS}
                shouldDisplay={!isMobile}
                id="navbar-about-link"
              >
                About
                <Badge
                  className="ml-2"
                  icon="🤖"
                  iconSize="text-xs"
                  iconColor="text-gray-500"
                  bgColor="bg-yellow-500"
                  textColor="text-gray-500"
                >
                  <span className="text-md">AI</span>
                </Badge>
              </NavbarLink>
            </div>
            <div className="hidden flex-row items-center gap-4 md:flex">
              <DarkModeToggler />
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
      </NavbarStripe>
    </>
  );
};
