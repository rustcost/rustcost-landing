import { twMerge } from "tailwind-merge";

interface BadgeProps {
  text: string;
  variant?: "green" | "blue" | "yellow" | "red";
}

const BASE_BADGE_STYLES = {
  badge: "rounded-full px-2 py-0.5 text-[10px] font-bold",
};

const colorMap: Record<string, string> = {
  green: "bg-emerald-600 text-white",
  blue: "bg-blue-600 text-white",
  yellow: "bg-amber-500 text-white",
  red: "bg-red-600 text-white",
};

export default function Badge({ text, variant = "blue" }: BadgeProps) {
  const style = colorMap[variant] || colorMap.blue;

  return (
    <span className={twMerge(BASE_BADGE_STYLES.badge, style)}>{text}</span>
  );
}
