import { useState } from "react";
import { twMerge } from "tailwind-merge";

export type CommonOption = {
  label: string;
  value: string;
};

type CommonSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: CommonOption[];
  className?: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
};

const BASE_STYLES = {
  container: "relative inline-flex items-center",
  trigger:
    "inline-flex items-center gap-1 pl-7 pr-6 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
  panel:
    "absolute left-0 top-full mt-1 w-full min-w-[7rem] rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-50",
  option:
    "cursor-pointer px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
  iconWrapper: "absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none",
};

export default function CommonSelect({
  value,
  onChange,
  options,
  className,
  ariaLabel = "Select option",
  icon,
}: CommonSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const styles = BASE_STYLES;

  const selected = options.find((opt) => opt.value === value) ?? options[0];

  const toggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div className={twMerge(styles.container, className)}>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}

      <button
        type="button"
        aria-label={ariaLabel}
        onClick={toggle}
        className={styles.trigger}
      >
        {selected.label}
      </button>

      {isOpen && (
        <div className={styles.panel}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={styles.option}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
