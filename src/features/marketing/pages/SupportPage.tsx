import { useTranslation } from "react-i18next";
import { SUPPORT_APPLY_URL, SUPPORTERS } from "@/constants/support";
import type { Supporter } from "@/types/support";

function SupporterCard({ supporter }: { supporter: Supporter }) {
  return (
    <a
      href={supporter.href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-gray-800"
    >
      {supporter.darkSrc ? (
        <>
          <img
            src={supporter.lightSrc}
            alt={supporter.alt}
            loading="lazy"
            className="max-h-16 object-contain block dark:hidden"
          />
          <img
            src={supporter.darkSrc}
            alt={supporter.alt}
            loading="lazy"
            className="max-h-16 object-contain hidden dark:block"
          />
        </>
      ) : (
        <img
          src={supporter.lightSrc}
          alt={supporter.alt}
          loading="lazy"
          className="max-h-16 object-contain"
        />
      )}
    </a>
  );
}

export default function SupportPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {t("support.title", { defaultValue: "Support" })}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {t("support.subtitle", {
            defaultValue: "Partners and companies supporting RustCost.",
          })}
        </p>
      </header>

      {/* Supporters */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {t("support.supporters.title", { defaultValue: "Supporters" })}
          </h2>
          <a
            href={SUPPORT_APPLY_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            {t("support.supporters.addApply", {
              defaultValue: "Apply as a Sponsor",
            })}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUPPORTERS.map((supporter) => (
            <SupporterCard key={supporter.href} supporter={supporter} />
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          {t("support.supporters.note", {
            defaultValue:
              "Thanks to our supporters. Display order is alphabetical unless sponsored.",
          })}
        </p>
      </section>
    </div>
  );
}
