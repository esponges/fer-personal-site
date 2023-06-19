import Link from 'next/link';

export const NAV_LINK_HOVER_CLASS = 'hover:bg-white/20 hover:text-gray';

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
      className={!isMobile && shouldDisplay ? 'ml-6' : 'block'}
    >
      <span
        className={`rounded font-bold md:p-3 font-color-dark--primary ${textColor} ${textSize} ${className} ${!shouldDisplay ? 'hidden' : null}`}
      >
        {children}
      </span>
    </Link>
  );
};
