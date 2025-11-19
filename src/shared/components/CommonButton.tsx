import { twMerge } from "tailwind-merge";

interface CommonButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const BASE_BUTTON_STYLES = {
  button:
    "rounded-md border border-gray-300 bg-white/80 px-2 py-1 text-xs text-gray-700 hover:bg-white dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200 select-none",
};

export default function CommonButton({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}: CommonButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(BASE_BUTTON_STYLES.button, className)}
    >
      {children}
    </button>
  );
}
