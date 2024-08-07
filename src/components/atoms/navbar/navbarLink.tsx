import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const NAV_LINK_HOVER_CLASS = "hover:bg-white/20 hover:text-gray";

export const NavbarLink = ({
  href,
  children,
  textSize = "text-lg",
  className,
  shouldDisplay = true,
  isMobile = false,
  textColor = "text-white",
  onClick,
  id,
  ariaLabel = "navbar-link",
}: {
  href: string;
  children: React.ReactNode;
  textSize?: string;
  textColor?: string;
  className?: string;
  shouldDisplay?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
  id?: string;
  ariaLabel?: string;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={!isMobile && shouldDisplay ? "ml-6" : "block"}
      id={id}
      aria-label={ariaLabel}
    >
      <button
        className={twMerge(
          "font-color-dark--primary rounded font-bold md:p-3 relative",
          textColor,
          textSize,
          className,
          !shouldDisplay ? "hidden" : "",
          ariaLabel
        )}
      >
        {children}
      </button>
    </Link>
  );
};
