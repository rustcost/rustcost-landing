import { NavLink, useParams } from "react-router-dom";

export default function Sidebar() {
  const { lng } = useParams();
  const prefix = `/${lng || "en"}`;
  return (
    <aside className="w-64 border-r pr-4">
      <nav className="flex flex-col space-y-2">
        <NavLink to={`${prefix}/docs/install`} className="text-blue-600 hover:underline">
          Installation
        </NavLink>
        <NavLink to={`${prefix}/docs/config`} className="text-blue-600 hover:underline">
          Configuration
        </NavLink>
        <NavLink to={`${prefix}/docs/api`} className="text-blue-600 hover:underline">
          API Reference
        </NavLink>
      </nav>
    </aside>
  );
}
