/* eslint-disable max-len */
import { Fragment, useCallback, useEffect, useRef } from "react";
import type { BgColor } from "~/types/enums";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  outerCloseBtn?: boolean;
  innerCloseBtn?: boolean;
  title?: string;
  showActions?: boolean;
  bgColor?: BgColor | string;
};

// todo: close modal on outside click
export const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  showActions,
  bgColor,
  outerCloseBtn,
  innerCloseBtn,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const checkOutsideClick = useCallback((e: MouseEvent) => {
    console.log(modalRef.current, modalRef?.current?.contains(e.target as Node));
    // if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
    //   onClose();
    // }

    // this is not working because any outside click is considered a click on the modal
    // play with the tailwind settings to figure out how to fix
  }, []);

  // close modal on outside click
  useEffect(() => {
    // this aint working - fix
    if (isOpen) {
      document.body.addEventListener("click", checkOutsideClick);
    }

    return () => {
      if (!isOpen) return;
      document.body.removeEventListener("click", checkOutsideClick);
    };
  }, [modalRef, onClose, isOpen, checkOutsideClick]);

  if (!isOpen) {
    return null;
  }

  return (
    <Fragment>
      <div
        ref={modalRef}
        className="fixed inset-0 z-[102] 
        flex items-center justify-center 
        overflow-y-auto overflow-x-hidden 
        outline-none focus:outline-none"
      >
        <div className="relative mx-auto my-6 w-auto md:max-w-6xl lg:min-w-[40%]">
          {(outerCloseBtn || innerCloseBtn) && (
            <button
              className={`absolute ${outerCloseBtn ? "-right-6 -top-6" : "right-2 top-0 z-[103]"}
              border-0 bg-transparent p-1 text-3xl font-semibold
              leading-none opacity-50`}
              onClick={onClose}
            >
              <span className="h-6 w-6 bg-transparent text-2xl text-white outline-none focus:outline-none ">×</span>
            </button>
          )}
          {/* content */}
          <div
            className={`relative flex w-full flex-col rounded-lg border-0 ${
              bgColor ?? "bg-white"
            } shadow-lg outline-none focus:outline-none`}
          >
            {/* header */}
            {title && (
              <div
                className={`
              modal__header border-blueGray-200 flex 
              items-start items-center justify-center justify-between
              rounded-t ${title ? "border-b border-solid" : ""} p-5`}
              >
                <h6 className="mb-0 font-semibold">{title}</h6>
                <button
                  className="float-right ml-auto border-0
                bg-transparent p-1 text-3xl
                font-semibold leading-none text-black
                opacity-75 outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="h-6 w-6 bg-white text-2xl text-black outline-none focus:outline-none">×</span>
                </button>
                {/* outside div x close btn */}
              </div>
            )}
            {/* body */}
            <div>
              <div className="text-blueGray-500 my-4 text-lg leading-relaxed">{children}</div>
            </div>
            {/* actions */}
            {showActions && (
              <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                <button
                  className="mb-1 mr-1 rounded bg-red-500 px-6
                py-3 text-sm font-bold uppercase text-white shadow outline-none 
                transition-all duration-150 ease-linear 
                hover:shadow-lg focus:outline-none active:bg-red-600"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-[101] bg-black opacity-25" />
    </Fragment>
  );
};
