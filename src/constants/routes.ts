import type { DocSidebarLink, NavLinkConfig } from "@/types/routes";

export const NAVIGATION_LINKS: NavLinkConfig[] = [
  {
    key: "home",
    i18nKey: "navbar.home",
    segment: "",
    exact: true,
  },
  { key: "docs", i18nKey: "navbar.docs", segment: "docs" },
  {
    key: "download",
    i18nKey: "navbar.download",
    segment: "download",
  },
  {
    key: "community",
    i18nKey: "navbar.community",
    segment: "community",
  },
  {
    key: "support",
    i18nKey: "navbar.support",
    segment: "support",
  },
  { key: "blog", i18nKey: "navbar.blog", segment: "blog" },
];

export const DOC_SIDEBAR_LINKS: DocSidebarLink[] = [
  { key: "install", label: "Installation", segment: "install" },
  { key: "config", label: "Configuration", segment: "config" },
  { key: "api", label: "API Reference", segment: "api" },
];
