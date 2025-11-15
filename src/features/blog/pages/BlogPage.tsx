import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildLanguagePrefix } from "@/constants/language";
import type { LanguageCode } from "@/types/i18n";

export default function BlogPage() {
  type LanguageParams = { ["lng"]?: LanguageCode };
  const params = useParams<LanguageParams>();
  const prefix = buildLanguagePrefix(params["lng"]);
  const { t } = useTranslation();
  const posts = [
    { slug: "v1-launch", title: "RustCost v1 Launch" },
    { slug: "lightweight-finops", title: "How RustCost Optimizes FinOps" },
  ];

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {t("blog.title", { defaultValue: "RustCost Blog" })}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {t("blog.subtitle", {
            defaultValue:
              "News and articles from the RustCost team (API integration coming soon).",
          })}
        </p>
      </header>

      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              to={`${prefix}/blog/${p.slug}`}
              className="text-blue-600 hover:underline"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
