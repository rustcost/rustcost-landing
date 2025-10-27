import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import BlogPage from "@/pages/BlogPage";
import BlogPost from "@/pages/BlogPost";
import DocsPage from "@/pages/DocsPage";
import DownloadPage from "@/pages/DownloadPage";
import LandingPage from "@/pages/LandingPage";
import SupportPage from "@/pages/SupportPage";
import CommunityPage from "@/pages/CommunityPage";
import "@/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
  {
    path: "/:lng",
    element: <RootLayout />,
    errorElement: <h1>404 - Not Found</h1>,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/:lng/docs",
        element: <DocsPage />,
      },
      {
        path: "/:lng/docs/:topic",
        element: <DocsPage />,
      },
      { path: "download", element: <DownloadPage /> },
      { path: "community", element: <CommunityPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogPost /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
