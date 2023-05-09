/* eslint-disable max-len */
import Link from "next/link";
import { Routes } from "~/types/enums";
import { SocialMediaIcon } from "../atoms/socialMediaIcon";

export const Navbar = () => {
  return (
    <nav className="flex h-20 flex-row items-center bg-white/10 px-2 md:px-0">
      <div className="w-full">
        <div className="mx-auto flex max-w-3xl justify-between">
          <div className="">
            <Link href={Routes.home}>
              <span className="text-xl font-bold text-white md:text-3xl">
                FerTostado
              </span>
            </Link>
            <Link href={Routes.posts}>
              <span className="ml-6 font-bold text-white md:text-lg">
                Posts
              </span>
            </Link>
            <Link href={Routes.projects}>
              <span className="ml-6 font-bold text-white md:text-lg">
                Projects
              </span>
            </Link>
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
