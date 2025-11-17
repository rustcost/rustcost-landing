import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS } from "@/constants/language";
import type { LanguageCode } from "@/types/i18n";
import CommonSelect from "@/shared/components/CommonSelect";

export default function LangSelect({
  value = DEFAULT_LANGUAGE,
  onChange,
  className = "",
  ariaLabel = "Select language",
}: {
  value?: LanguageCode;
  onChange?: (next: LanguageCode) => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <CommonSelect
      value={value}
      onChange={(val) => onChange?.(val as LanguageCode)}
      options={LANGUAGE_OPTIONS.map((opt) => ({
        label: opt.label,
        value: opt.code,
      }))}
      className={className}
      ariaLabel={ariaLabel}
      icon={
        <GlobeAltIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      }
    />
  );
}
