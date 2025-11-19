import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { LanguageCode } from "@/types/i18n";
import { buildLanguagePrefix } from "@/constants/language";
import PageSEO from "@/shared/components/PageSEO";

export default function CommunityPage() {
  const { t } = useTranslation();
  type LanguageParams = { ["lng"]?: LanguageCode };
  const params = useParams<LanguageParams>();
  const prefix = buildLanguagePrefix(params["lng"]);

  const postsKo = [
    {
      title: t("community.posts.ko1", {
        defaultValue: "Korean Post about RustCost info",
      }),
      href: "https://www.cloudbro.ai/t/rustcost/3019/7",
    },
    {
      title: t("community.posts.ko2", {
        defaultValue: "Korean Post about RustCost project (Rust + FinOps)",
      }),
      href: "https://www.cloudbro.ai/t/rustcost-project-rust-finops/3012/3",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      <PageSEO
        titleKey="seo.community.title"
        titleDefault="RustCost Community"
        descriptionKey="seo.community.description"
        descriptionDefault="Join discussions, share ideas, and help shape RustCost."
      />
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {t("community.title", { defaultValue: "Community" })}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {t("community.subtitle", {
            defaultValue:
              "Join discussions, share ideas, and help shape RustCost.",
          })}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contribute card */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("community.contribute.title", {
              defaultValue: "How to contribute",
            })}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {t("community.contribute.body", {
              defaultValue:
                "Read our contribution guide and send PRs for code, docs, or design.",
            })}
          </p>
          <a
            href={`${prefix}/docs/contributing`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 select-none"
          >
            {t("community.contribute.cta", {
              defaultValue: "Open Contribution Guide",
            })}
          </a>
        </section>

        {/* CloudBro links (Korean) */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("community.cloudbro.title", { defaultValue: "CloudBro AI" })}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {t("community.cloudbro.desc", {
              defaultValue: "Community posts, discussions, and announcements.",
            })}
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            {postsKo.map((p) => (
              <li key={p.href}>
                <a
                  className="text-blue-600 underline dark:text-amber-400"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Placeholder: Feed to be powered by API later */}
      <section className="mt-8 rounded-xl border border-dashed border-gray-300 p-6 text-gray-600 dark:border-gray-700 dark:text-gray-300">
        {t("community.feed.placeholder", {
          defaultValue:
            "Community feed and events will appear here (API integration coming soon).",
        })}
      </section>
    </div>
  );
}
