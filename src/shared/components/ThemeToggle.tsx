import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import {
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
  DARK_SCHEME_MEDIA_QUERY,
  THEME_STORAGE_KEY,
} from "@/constants/theme";

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme === COLOR_SCHEME_DARK;
    }
    return window.matchMedia(DARK_SCHEME_MEDIA_QUERY).matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_STORAGE_KEY, COLOR_SCHEME_DARK);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_STORAGE_KEY, COLOR_SCHEME_LIGHT);
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setDarkMode(!isDarkMode)}
      className="p-2 rounded-md border border-gray-300 dark:border-gray-600 
                 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                 focus:outline-none focus:ring-2 focus:ring-amber-500 
                 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
}
