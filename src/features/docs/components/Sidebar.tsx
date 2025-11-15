import { NavLink, useParams } from "react-router-dom";
import { buildLanguagePrefix } from "@/constants/language";
import { DOC_SIDEBAR_LINKS } from "@/constants/routes";
import type { LanguageCode } from "@/types/i18n";

export default function Sidebar() {
  type LanguageParams = { ["lng"]?: LanguageCode };
  const params = useParams<LanguageParams>();
  const prefix = buildLanguagePrefix(params["lng"]);
  return (
    <aside className="w-64 border-r pr-4">
      <nav className="flex flex-col space-y-2">
        {DOC_SIDEBAR_LINKS.map((link) => (
          <NavLink
            key={link.key}
            to={`${prefix}/${"docs"}/${link.segment}`}
            className="text-blue-600 hover:underline"
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
