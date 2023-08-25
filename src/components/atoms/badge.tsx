import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: string;
  iconClassName?: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
};

export const Badge = ({
  children,
  className,
  icon = "",
  iconColor = "text-white",
  iconSize = "text-2xl",
  iconClassName = "",
  bgColor = "bg-gray-800",
  textColor = "text-white",
  textSize = "text-sm",
}: Props) => {
  return (
    <div
      className={twMerge(
        "relative inline-flex items-center justify-center absolute -top-1 md:-right-4 -right-6",
        className,
      )}
    >
      <span
        className={twMerge(
          "p-1 rounded-xl items-center justify-center",
          bgColor,
          textColor,
          textSize,
          iconClassName,
        )}
      >
        {children}
        {icon ? (
          <span className={twMerge(iconColor, iconSize)}>{icon}</span>
        ) : null}
      </span>
    </div>
  );
};
