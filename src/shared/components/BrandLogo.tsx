import { useColorScheme } from "@/shared/hooks/useColorScheme";

type BrandLogoProps = {
  className?: string;
  alt?: string;
  title?: string;
};

const LOGO_FOR_SCHEME: Record<"light" | "dark", string> = {
  light: "/logo-dark.webp",
  dark: "/logo-white.webp",
};

export default function BrandLogo({
  className = "h-12 w-12",
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
      className={className}
      loading="lazy"
    />
  );
}
