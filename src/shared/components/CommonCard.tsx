import type { ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type IconComponent = ElementType<{ className?: string }>;

export interface CardProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: IconComponent;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
}

const BASE_CARD_STYLES = {
  card: "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900",
  iconWrapper:
    "mb-4 inline-flex rounded-xl bg-amber-500/15 p-3 text-amber-600 dark:text-amber-400",
  icon: "h-6 w-6",
  title: "text-lg font-bold text-gray-900 dark:text-white",
  description: "mt-1 text-sm text-gray-600 dark:text-gray-300",
};

export default function CommonCard({
  title,
  description,
  icon: Icon,
  className,
  titleClassName,
  descriptionClassName,
  iconWrapperClassName,
  iconClassName,
  children,
}: CardProps) {
  return (
    <div className={twMerge(BASE_CARD_STYLES.card, className)}>
      {Icon ? (
        <div
          className={twMerge(
            BASE_CARD_STYLES.iconWrapper,
            iconWrapperClassName
          )}
        >
          <Icon className={twMerge(BASE_CARD_STYLES.icon, iconClassName)} />
        </div>
      ) : null}

      <h3 className={twMerge(BASE_CARD_STYLES.title, titleClassName)}>
        {title}
      </h3>

      {description ? (
        <p
          className={twMerge(
            BASE_CARD_STYLES.description,
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </div>
  );
}
