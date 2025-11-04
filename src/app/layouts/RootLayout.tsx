import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/app/layouts/Navbar";
import TopBar from "@/app/layouts/TopBar";
import i18n from "@/i18n/i18n";

export default function RootLayout() {
  const { lng } = useParams();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-center py-4 text-sm">
        © {new Date().getFullYear()} RustCost · Open FinOps for Kubernetes
      </footer>
    </div>
  );
}
