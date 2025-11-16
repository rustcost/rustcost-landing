import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/app/layouts/Navbar";
import TopBar from "@/app/layouts/TopBar";
import i18n from "@/i18n/i18n";
import { normalizeLanguageCode } from "@/constants/language";
import type { LanguageCode } from "@/types/i18n";

export default function RootLayout() {
  type LanguageParams = { ["lng"]?: LanguageCode };
  const params = useParams<LanguageParams>();
  const language = normalizeLanguageCode(params["lng"]);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const showTopBar = import.meta.env.VITE_APP_ENV !== "PROD";

  return (
    <div className="flex flex-col min-h-screen">
      {showTopBar && <TopBar />}
      <Navbar />
      <main className="grow container max-w-7xl mx-auto px-4 md:px-6 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-center py-4 text-sm">
        © {new Date().getFullYear()} RustCost · Open FinOps for Kubernetes
      </footer>
    </div>
  );
}
