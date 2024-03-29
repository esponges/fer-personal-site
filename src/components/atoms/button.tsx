import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  textColor?: string;
  bgColor?: string;
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  textColor = "text-white",
  bgColor = "bg-gray-800",
  className,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      className={twMerge("rounded-lg px-4 py-2", textColor, bgColor, className)}
      {...props}
    >
      {children}
    </button>
  );
};
