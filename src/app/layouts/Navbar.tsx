/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  Bars3Icon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "@/shared/components/ThemeToggle";
import logo from "/logo.webp";

export default function Navbar() {
  const { t } = useTranslation();
  const { lng } = useParams();
  const prefix = `/${lng || "en"}`;
  const [open, setOpen] = useState(false);

  const navLinkClass =
    "hover:text-yellow-400 transition-colors px-4 py-2 text-lg font-semibold";

  const handleLangChange = (newLang: string) => {
    const path = window.location.pathname;
    // replace current `/:lng` prefix
    const next = `/${newLang}${path.slice(3)}`;
    window.location.pathname = next;
  };

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/80 backdrop-blur shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="RustCost"
            className="h-12 w-12 rounded-full shadow-sm"
          />
          <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
            RustCost
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 lg:gap-6 text-gray-700 dark:text-gray-300">
          <NavLink to={`${prefix}/`} end className={navLinkClass}>
            {t("navbar.home")}
          </NavLink>
          <NavLink to={`${prefix}/docs`} className={navLinkClass}>
            {t("navbar.docs")}
          </NavLink>
          <NavLink to={`${prefix}/download`} className={navLinkClass}>
            {t("navbar.download")}
          </NavLink>
          <NavLink to={`${prefix}/community`} className={navLinkClass}>
            {t("navbar.community")}
          </NavLink>
          <NavLink to={`${prefix}/support`} className={navLinkClass}>
            {t("navbar.support")}
          </NavLink>
          <NavLink to={`${prefix}/blog`} className={navLinkClass}>
            {t("navbar.blog")}
          </NavLink>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {/* Language Toggle */}
          <div className="relative">
            <GlobeAltIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select
              className="appearance-none pl-7 pr-6 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-700 
                     bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
              value={lng}
              onChange={(e) => handleLangChange(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="ko">KR</option>
            </select>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="RustCost"
                className="h-12 w-12 rounded-full"
              />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                RustCost
              </span>
            </div>
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>

          <div className="px-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <select
                className="bg-transparent border border-gray-300 dark:border-gray-700 text-sm rounded px-2.5 py-1 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                value={lng}
                onChange={(e) => handleLangChange(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="ko">KR</option>
              </select>
            </div>
          </div>

          <nav className="mt-6 flex flex-col items-stretch gap-2 px-4">
            {[
              { to: `${prefix}/`, label: t("navbar.home"), end: true },
              { to: `${prefix}/docs`, label: t("navbar.docs") },
              { to: `${prefix}/download`, label: t("navbar.download") },
              { to: `${prefix}/community`, label: t("navbar.community") },
              { to: `${prefix}/support`, label: t("navbar.support") },
              { to: `${prefix}/blog`, label: t("navbar.blog") },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={(item as any).end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `w-full rounded-xl px-5 py-4 text-2xl font-bold transition-colors ${
                    isActive
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/80"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
