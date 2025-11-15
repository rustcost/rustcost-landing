import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import BrandLogo from "@/shared/components/BrandLogo";
import Card from "@/shared/components/Card";

export default function LandingPage() {
  const { lng } = useParams();
  const prefix = `/${lng || "en"}`;
  const { t } = useTranslation();

  const featureCards = [
    {
      Icon: ArrowTrendingUpIcon,
      title: t("landing.features.analytics.title", {
        defaultValue: "Kubernetes Cost Analysis",
      }),
      desc: t("landing.features.analytics.desc", {
        defaultValue:
          "RustCost provides intuitive insights into Kubernetes cluster resource usage and costs. You can track expenses in detail at the Pod, Namespace, and Node levels.",
      }),
    },
    {
      Icon: SparklesIcon,
      title: t("landing.features.lightweight.title", {
        defaultValue: "Lightweight Rust Architecture",
      }),
      desc: t("landing.features.lightweight.desc", {
        defaultValue:
          "Built with Rust, RustCost consumes minimal memory and delivers high execution speed. It runs efficiently even in cloud environments with limited resources.",
      }),
    },
    {
      Icon: CpuChipIcon,
      title: t("landing.features.collector.title", {
        defaultValue: "Efficient Collection Algorithm",
      }),
      desc: t("landing.features.collector.desc", {
        defaultValue:
          "Powered by optimized Rust-based algorithms, RustCost minimizes CPU usage during metric collection. It maintains stable performance with low overhead, even in large-scale clusters.",
      }),
    },
    {
      Icon: GlobeAltIcon,
      title: t("landing.features.neutrality.title", {
        defaultValue: "Vendor Neutral",
      }),
      desc: t("landing.features.neutrality.desc", {
        defaultValue:
          "RustCost is designed to be vendor-agnostic. It will support consistent cost analysis across AWS, GCP, Azure, and on-premise environments.",
      }),
    },
  ];

  const showbackItems = t("landing.costing.showback.items", {
    returnObjects: true,
  }) as string[];
  const chargeackItems = t("landing.costing.chargeback.items", {
    returnObjects: true,
  }) as string[];
  const philosophyItems = t("landing.philosophy.items", {
    returnObjects: true,
  }) as string[];
  const architectureItems = t("landing.architecture.items", {
    returnObjects: true,
  }) as string[];
  const whyRustCostItems = t("landing.whyRustCost.items", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[calc(100vh-134px)] flex items-center mb-8">
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

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("landing.features.title", { defaultValue: "Features" })}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {featureCards.map(({ Icon, title, desc }) => (
            <Card
              key={String(title)}
              icon={Icon}
              title={title}
              description={desc}
            />
          ))}
        </div>
      </section>

      {/* Costing Section : Showback & Chargeback */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("landing.costing.title", {
            defaultValue: "Costing",
          })}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title={t("landing.costing.showback.title", {
              defaultValue: "Showback",
            })}
            titleClassName="text-xl font-bold text-gray-900 dark:text-white"
            description={t("landing.costing.showback.desc", {
              defaultValue:
                "Make team or service resource consumption transparent to build real cost awareness.",
            })}
            descriptionClassName="mt-2 text-gray-600 dark:text-gray-300"
          >
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300 flex flex-col">
              {showbackItems.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card
            title={t("landing.costing.chargeback.title", {
              defaultValue: "Chargeback",
            })}
            titleClassName="text-xl font-bold text-gray-900 dark:text-white"
            description={t("landing.costing.chargeback.desc", {
              defaultValue:
                "Attribute real cost when needed to encourage responsibility and better decisions.",
            })}
            descriptionClassName="mt-2 text-gray-600 dark:text-gray-300"
          >
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300 flex flex-col">
              {chargeackItems.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("landing.philosophy.title", {
            defaultValue: "Philosophy",
          })}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
          {t("landing.philosophy.desc", {
            defaultValue:
              "RustCost balances three principles to stay useful and unobtrusive — like a fly that lands quietly: it helps without burdening the system.",
          })}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {philosophyItems.map((item) => (
            <Card key={item} title={item} titleClassName={"text-base"} />
          ))}
        </div>
      </section>

      {/* Architecture Section */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="rounded-2xl bg-linear-to-br from-gray-50 to-white p-6 shadow-sm ring-1 ring-gray-200 dark:from-gray-900 dark:to-gray-950 dark:ring-gray-800">
          <div className="flex items-center gap-2">
            <RocketLaunchIcon className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t("landing.architecture.title", {
                defaultValue: "Architecture & Scalability",
              })}
            </h2>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {t("landing.philosophy.desc", {
              defaultValue:
                "File‑based TSDB, no external DB. Kubernetes‑native integration. Rust backend (Axum) + React UI.",
            })}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-gray-700 dark:text-gray-300">
            {architectureItems.map((item) => (
              <li>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* whyRustCost */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("landing.whyRustCost.title", {
            defaultValue: "Why RustCost",
          })}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {t("landing.whyRustCost.desc", {
            defaultValue:
              "Beyond monitoring — toward understanding. Build intuition about your cluster’s cost structure.",
          })}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-gray-700 dark:text-gray-300">
          {whyRustCostItems.map((text) => (
            <Card key={text} title={text} titleClassName={"text-base"} />
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("landing.roadmap.title", {
            defaultValue: "Roadmap",
          })}
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="flex flex-col mx-auto max-w-4xl rounded-2xl justify-center bg-gray-900 p-6 text-white shadow-md dark:bg-gray-800 dark:text-white gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <a
              href={`${prefix}/docs`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-gray-900 shadow hover:bg-gray-100 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-300"
            >
              <span className="leading-tight">
                {t("landing.cta.getStarted", { defaultValue: "Get Started" })}
              </span>
              <ArrowRightIcon className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/rustcost/rustcost"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-2 text-white hover:bg-white/10 dark:border-white/30 dark:hover:bg-white/10"
            >
              <span className="leading-tight">
                {t("landing.cta.star", { defaultValue: "Star on GitHub" })}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
