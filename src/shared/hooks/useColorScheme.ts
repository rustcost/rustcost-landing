import { useEffect, useState } from "react";
import type { ColorScheme } from "@/types/theme";
import {
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
  DARK_SCHEME_MEDIA_QUERY,
  DEFAULT_COLOR_SCHEME,
  THEME_STORAGE_KEY,
} from "@/constants/theme";

const getInitialScheme = (): ColorScheme => {
  if (typeof window === "undefined") {
    return DEFAULT_COLOR_SCHEME;
  }

  const storedTheme = window.localStorage.getItem(
    THEME_STORAGE_KEY
  ) as ColorScheme | null;
  if (storedTheme === COLOR_SCHEME_DARK || storedTheme === COLOR_SCHEME_LIGHT) {
    return storedTheme;
  }

  return window.matchMedia(DARK_SCHEME_MEDIA_QUERY).matches
    ? COLOR_SCHEME_DARK
    : COLOR_SCHEME_LIGHT;
};

const getDocumentScheme = (): ColorScheme => {
  if (typeof document === "undefined") {
    return DEFAULT_COLOR_SCHEME;
  }

  return document.documentElement.classList.contains("dark")
    ? COLOR_SCHEME_DARK
    : COLOR_SCHEME_LIGHT;
};

export const useColorScheme = (): ColorScheme => {
  const [scheme, setScheme] = useState<ColorScheme>(() => getInitialScheme());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DARK_SCHEME_MEDIA_QUERY);
    const handleDocumentMutation = () => setScheme(getDocumentScheme());
    const handleMediaChange = (event: MediaQueryListEvent) => {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (!storedTheme) {
        setScheme(event.matches ? COLOR_SCHEME_DARK : COLOR_SCHEME_LIGHT);
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        setScheme(
          event.newValue === COLOR_SCHEME_DARK
            ? COLOR_SCHEME_DARK
            : COLOR_SCHEME_LIGHT
        );
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

