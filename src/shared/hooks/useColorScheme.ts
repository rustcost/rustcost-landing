import { useEffect, useState } from "react";

type ColorScheme = "light" | "dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const getInitialScheme = (): ColorScheme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
};

const getDocumentScheme = (): ColorScheme => {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
};

export const useColorScheme = (): ColorScheme => {
  const [scheme, setScheme] = useState<ColorScheme>(() => getInitialScheme());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DARK_QUERY);
    const handleDocumentMutation = () => setScheme(getDocumentScheme());
    const handleMediaChange = (event: MediaQueryListEvent) => {
      const storedTheme = window.localStorage.getItem("theme");
      if (!storedTheme) {
        setScheme(event.matches ? "dark" : "light");
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme" && event.newValue) {
        setScheme(event.newValue === "dark" ? "dark" : "light");
      }
    };

    // Keep images in sync with the current <html> class right away.
    handleDocumentMutation();

    const observer = new MutationObserver(handleDocumentMutation);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return scheme;
};

