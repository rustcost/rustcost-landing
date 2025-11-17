import { useColorScheme } from "@/shared/hooks/useColorScheme";
import { twMerge } from "tailwind-merge";

type BrandLogoProps = {
  className?: string;
  alt?: string;
  title?: string;
};

const LOGO_FOR_SCHEME: Record<"light" | "dark", string> = {
  light: "/logo-dark.webp",
  dark: "/logo-white.webp",
};

const BASE_LOGO_STYLES = {
  img: "h-12 w-12",
};

export default function BrandLogo({
  className,
  alt = "RustCost logo",
  title = "RustCost",
}: BrandLogoProps) {
  const scheme = useColorScheme();
  const src = LOGO_FOR_SCHEME[scheme];

  return (
    <img
      src={src}
      alt={alt}
      title={title}
      className={twMerge(BASE_LOGO_STYLES.img, className)}
      loading="lazy"
    />
  );
}
