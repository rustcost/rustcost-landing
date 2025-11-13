import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  BoltIcon,
  ArrowsRightLeftIcon,
  FlagIcon,
  ServerStackIcon,
  ClockIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import BrandLogo from "@/shared/components/BrandLogo";

export default function LandingPage() {
  const { lng } = useParams();
  const prefix = `/${lng || "en"}`;
  const { t } = useTranslation();

  const featureCards = [
    {
      Icon: BoltIcon,
      title: t("landing.features.performance.title", {
        defaultValue: "Effortless Performance",
      }),
      desc: t("landing.features.performance.desc", {
        defaultValue: "Rust  + Simple Layer for control and speed.",
      }),
    },
    {
      Icon: ArrowsRightLeftIcon,
      title: t("landing.features.reactivity.title", {
        defaultValue: "Fine‑Grained Reactivity",
      }),
      desc: t("landing.features.reactivity.desc", {
        defaultValue: "Update only what matters for responsive UX.",
      }),
    },
    {
      Icon: FlagIcon,
      title: t("landing.features.typechecked.title", {
        defaultValue: "Type‑checked UI",
      }),
      desc: t("landing.features.typechecked.desc", {
        defaultValue: "Catch issues at build time with a typed stack.",
      }),
    },
    {
      Icon: ServerStackIcon,
      title: t("landing.features.ssr.title", {
        defaultValue: "Server Side Rendering (SSR)",
      }),
      desc: t("landing.features.ssr.desc", {
        defaultValue: "SEO‑friendly and fast when you need it.",
      }),
    },
    {
      Icon: ClockIcon,
      title: t("landing.features.async.title", {
        defaultValue: "Async and Suspense",
      }),
      desc: t("landing.features.async.desc", {
        defaultValue: "First‑class async flows for data and charts.",
      }),
    },
    {
      Icon: MapIcon,
      title: t("landing.features.routing.title", {
        defaultValue: "Built‑in Routing",
      }),
      desc: t("landing.features.routing.desc", {
        defaultValue: "Client and server navigation that just works.",
      }),
    },
  ];

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Adjusted overlay: darker neutral gradient for light mode */}
        <div className="pointer-events-none absolute inset-0 " />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-1 relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            {/* Big logo + brand */}
            <div className="mb-6 flex flex-col items-center justify-center gap-5">
              <BrandLogo className="h-28 w-28 md:h-40 md:w-40 rounded-full shadow" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {t("landing.hero.title", {
                defaultValue: "Quiet but Sufficient FinOps Observability",
              })}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-700 dark:text-gray-300">
              {t("landing.hero.subtitle", {
                defaultValue:
                  "A lightweight, transparent way to understand and improve Kubernetes costs — not another heavy FinOps platform.",
              })}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`${prefix}/docs`}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-white shadow hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {t("landing.cta.getStarted", { defaultValue: "Get Started" })}
                <ArrowRightIcon className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/rustcost/rustcost"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                {t("landing.cta.viewOnGitHub", {
                  defaultValue: "View on GitHub",
                })}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                ⚙️ Rust + React
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                📦 Helm Chart
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                🗂 File-based TSDB (~10MB)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features: card grid */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("landing.features.title", { defaultValue: "Features" })}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map(({ Icon, title, desc }) => (
            <div
              key={String(title)}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 inline-flex rounded-xl bg-amber-500/15 p-3 text-amber-600 dark:text-amber-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Value — Showback & Chargeback */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Showback
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Make team or service resource consumption transparent to build
              real cost awareness.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Cluster
                / team breakdown
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Cost
                trend intuition
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Chargeback
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Attribute real cost when needed to encourage responsibility and
              better decisions.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />{" "}
                Accurate, efficient attribution
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500" /> Works
                with existing stacks
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          Philosophy
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
          RustCost balances three principles to stay useful and unobtrusive —
          like a fly that lands quietly: it helps without burdening the system.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Accuracy — neither excessive nor lax",
            "Sustainability — minimal load on systems",
            "Clarity — concise, actionable insights",
          ].map((txt) => (
            <div
              key={txt}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="font-semibold text-gray-900 dark:text-white">
                {txt}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm ring-1 ring-gray-200 dark:from-gray-900 dark:to-gray-950 dark:ring-gray-800">
          <div className="flex items-center gap-2">
            <RocketLaunchIcon className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              Architecture & Scalability
            </h2>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
            File‑based TSDB, no external DB. Kubernetes‑native integration. Rust
            backend (Axum) + React UI.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-gray-700 dark:text-gray-300">
            <li>• Kubernetes Metrics API, cAdvisor, Node Exporter</li>
            <li>• Helm Chart deployment</li>
            <li>• Lightweight footprint (~10MB memory)</li>
            <li>• Simple scaling and customization</li>
          </ul>
        </div>
      </section>

      {/* Use cases */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          Why RustCost
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
          Beyond monitoring — toward understanding. Build intuition about your
          cluster’s cost structure.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-gray-700 dark:text-gray-300">
          {[
            "Analyze resource consumption by cluster or team",
            "Understand and optimize per‑service cost ratios",
            "Complement Prometheus/Grafana and existing stacks",
            "Run FinOps experiments and improve awareness",
            "Operate at scale with clear cost ownership",
            "Democratize FinOps with a simple, trusted tool",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          Roadmap
        </h2>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {[
            "GPU cost analysis",
            "Network/Volume costs",
            "Multi‑cluster federation",
            "Custom pricing & alerts",
            "Helm‑based multi‑cluster",
            "CNCF collaboration",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-gray-300 px-3 py-1 text-gray-700 dark:border-gray-700 dark:text-gray-200"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gray-900 p-6 text-white shadow-md dark:bg-gray-800 dark:text-white">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold">
                {t("landing.cta.headline", {
                  defaultValue: "Understand and improve your costs",
                })}
              </h3>
              <p className="text-gray-300 dark:text-gray-300">
                {t("landing.cta.sub", {
                  defaultValue:
                    "Install with Helm and get cost awareness in minutes.",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={`${prefix}/docs`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-gray-900 shadow hover:bg-gray-100 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-300"
              >
                {t("landing.cta.getStarted", { defaultValue: "Get Started" })}
                <ArrowRightIcon className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/rustcost/rustcost"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-white hover:bg-white/10 dark:border-white/30 dark:hover:bg-white/10"
              >
                {t("landing.cta.star", { defaultValue: "Star on GitHub" })}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
