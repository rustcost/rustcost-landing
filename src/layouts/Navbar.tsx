import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/components/etc/ThemeToggle";
import logo from "/logo.webp";

export default function Navbar() {
  const { t } = useTranslation();
  const { lng } = useParams();
  const prefix = `/${lng || "en"}`;

  const navClass =
    "hover:text-yellow-400 transition-colors px-4 py-2 text-lg font-semibold";

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="RustCost"
            className="h-14 w-14 rounded-full shadow-sm"
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            RustCost
          </span>
        </div>

        <nav className="flex gap-6 text-gray-700 dark:text-gray-300">
          <NavLink to={`${prefix}/`} end className={navClass}>
            {t("navbar.home")}
          </NavLink>
          <NavLink to={`${prefix}/docs`} className={navClass}>
            {t("navbar.docs")}
          </NavLink>
          <NavLink to={`${prefix}/download`} className={navClass}>
            {t("navbar.download")}
          </NavLink>
          <NavLink to={`${prefix}/community`} className={navClass}>
            {t("navbar.community")}
          </NavLink>
          <NavLink to={`${prefix}/support`} className={navClass}>
            {t("navbar.support")}
          </NavLink>
          <NavLink to={`${prefix}/blog`} className={navClass}>
            {t("navbar.blog")}
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <select
            className="bg-transparent border border-gray-300 dark:border-gray-700 text-base rounded px-3 py-1 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            value={lng}
            onChange={(e) => {
              const newLang = e.target.value;
              window.location.pathname = `/${newLang}${window.location.pathname.slice(
                3
              )}`;
            }}
          >
            <option value="en">EN</option>
            <option value="ko">KR</option>
          </select>
        </div>
      </div>
    </header>
  );
}
