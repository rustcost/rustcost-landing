import { useId, type AriaRole, type ElementType, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type IconComponent = ElementType<{ className?: string }>;

export interface CardProps {
  id?: string;
  title: ReactNode;
  titleId?: string;
  descriptionId?: string;
  description?: ReactNode;
  icon?: IconComponent;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
  tabIndex?: number;
  role?: AriaRole;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
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
  id,
  title,
  description,
  icon: Icon,
  className,
  titleClassName,
  descriptionClassName,
  iconWrapperClassName,
  iconClassName,
  children,
  tabIndex,
  role,
  titleId,
  descriptionId,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: CardProps) {
  const autoTitleId = useId();
  const autoDescriptionId = useId();
  const headingId = titleId ?? `${autoTitleId}-title`;
  const paragraphId = description
    ? descriptionId ?? `${autoDescriptionId}-description`
    : undefined;

  return (
    <article
      id={id}
      className={twMerge(BASE_CARD_STYLES.card, className)}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : ariaLabelledBy ?? headingId}
      aria-describedby={ariaDescribedBy ?? paragraphId}
    >
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

      <h3
        id={headingId}
        className={twMerge(BASE_CARD_STYLES.title, titleClassName)}
      >
        {title}
      </h3>

      {description ? (
        <p
          id={paragraphId}
          className={twMerge(
            BASE_CARD_STYLES.description,
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </article>
  );
}
