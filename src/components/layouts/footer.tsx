import Link from 'next/link';
import { Routes } from '~/types/enums';
import { renderSocial } from '../atoms/social';

/* eslint-disable max-len */
export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center bg-white/10 text-center">
      <div className="flex items-center p-6">
        {/* <div className="mr-12 hidden lg:block" /> */}
        <div className="flex">
          {renderSocial('text-white').map((social, idx) => (
            <span key={idx}>{social}</span>
          ))}
        </div>
      </div>
      <div className="mx-6 text-center md:py-2 md:text-left">
        <div className="grid-1 grid grid-cols-2 gap-8">
          <div className="">
            <h6
              className="
            mb-4
            flex
            items-center
          
            justify-end
            font-semibold
            uppercase
          "
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="cubes"
                className="mr-3 w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"
                ></path>
              </svg>
              Fer Tostado Web Dev
            </h6>
            <p className="justify-end text-right">
              This is my personal website and I don&apos;t intend to make any money off of it. I just want to share my
              passion for web development with the world.
            </p>
          </div>
          <div className="">
            <h6 className="mb-4 flex justify-end font-semibold uppercase">Contact</h6>
            <p className="mb-4 flex items-center justify-end">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="home"
                className="mr-4 w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
                ></path>
              </svg>
              Guadalajara, Jalisco, MX
            </p>
            <p className="mb-4 flex items-center justify-end break-all">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="envelope"
                className="mr-4 w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                ></path>
              </svg>
              fernandogtostado@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 text-center">
        <span>© {new Date().getFullYear()} Copyright:</span>
        <Link
          className="ml-2 font-semibold"
          href={Routes.home}
        >
          Fer Tostado
        </Link>
      </div>
    </footer>
  );
};
