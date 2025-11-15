import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS } from "@/constants/language";
import type { ChangeEvent } from "react";
import type { LanguageCode } from "@/types/i18n";

type LangSelectVariant = "desktop" | "mobile";

type LangSelectProps = {
  value?: LanguageCode;
  onChange?: (next: LanguageCode) => void;
  variant?: LangSelectVariant;
  className?: string;
  ariaLabel?: string;
};

const VARIANT_STYLES: Record<
  LangSelectVariant,
  { container: string; select: string; icon?: string }
> = {
  desktop: {
    container: "relative inline-flex items-center",
    select:
      "appearance-none pl-7 pr-6 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors",
    icon: "absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400",
  },
  mobile: {
    container: "inline-flex items-center",
    select:
      "bg-transparent border border-gray-300 dark:border-gray-700 text-sm rounded px-2.5 py-1 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-400",
  },
};

export default function LangSelect({
  value = DEFAULT_LANGUAGE,
  onChange,
  variant = "desktop",
  className = "",
  ariaLabel = "Select language",
}: LangSelectProps) {
  const styles = VARIANT_STYLES[variant];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as LanguageCode;
    onChange?.(next);
  };

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      {styles.icon && <GlobeAltIcon className={styles.icon} aria-hidden="true" />}
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={handleChange}
        className={styles.select}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
