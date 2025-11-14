import type { ElementType, ReactNode } from "react";

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

const baseCardClasses =
  "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900";
const baseIconWrapperClasses =
  "mb-4 inline-flex rounded-xl bg-amber-500/15 p-3 text-amber-600 dark:text-amber-400";
const baseIconClasses = "h-6 w-6";
const baseTitleClasses = "text-lg font-bold text-gray-900 dark:text-white";
const baseDescriptionClasses = "mt-1 text-sm text-gray-600 dark:text-gray-300";

const mergeClasses = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function Card({
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
    <div className={mergeClasses(baseCardClasses, className)}>
      {Icon ? (
        <div
          className={mergeClasses(baseIconWrapperClasses, iconWrapperClassName)}
        >
          <Icon className={mergeClasses(baseIconClasses, iconClassName)} />
        </div>
      ) : null}

      <h3 className={mergeClasses(baseTitleClasses, titleClassName)}>{title}</h3>

      {description ? (
        <p
          className={mergeClasses(baseDescriptionClasses, descriptionClassName)}
        >
          {description}
        </p>
      ) : null}

      {children}
    </div>
  );
}
