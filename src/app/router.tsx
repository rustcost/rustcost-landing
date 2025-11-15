import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/app/layouts/RootLayout";
import DocsPage from "@/features/docs/pages/DocsPage";
import LandingPage from "@/features/marketing/pages/LandingPage";
import DownloadPage from "@/features/marketing/pages/DownloadPage";
import SupportPage from "@/features/marketing/pages/SupportPage";
import CommunityPage from "@/features/marketing/pages/CommunityPage";
import BlogPage from "@/features/blog/pages/BlogPage";
import BlogPost from "@/features/blog/pages/BlogPost";
import { buildLanguagePrefix } from "@/constants/language";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={buildLanguagePrefix()} replace />,
  },
  {
    path: "/:lng",
    element: <RootLayout />,
    errorElement: <h1>404 - Not Found</h1>,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "docs",
        element: <DocsPage />,
      },
      {
        path: `docs/:topic`,
        element: <DocsPage />,
      },
      { path: "download", element: <DownloadPage /> },
      { path: "community", element: <CommunityPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "blog", element: <BlogPage /> },
      {
        path: `blog/:slug`,
        element: <BlogPost />,
      },
    ],
  },
]);

export default router;
