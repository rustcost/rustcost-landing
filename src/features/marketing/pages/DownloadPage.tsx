import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDockerHubDashboardTags } from "@/lib/api";
import Badge from "@/shared/components/Badge";
import PageSEO from "@/shared/components/PageSEO";
import CopyButton from "@/shared/components/CopyButton";
import { buildLanguagePrefix } from "@/constants/language";
import {
  CORE_IMAGE_NAME,
  DASHBOARD_IMAGE_NAME,
  CORE_REPOSITORY_URL,
  DASHBOARD_REPOSITORY_URL,
  DOWNLOAD_PRODUCTS,
  HELM_INSTALL_COMMAND,
} from "@/constants/download";
import type { VersionInfo } from "@/types/download";
import type { LanguageCode } from "@/types/i18n";

export default function DownloadPage() {
  type LanguageParams = { ["lng"]?: LanguageCode };
  const params = useParams<LanguageParams>();
  const prefix = buildLanguagePrefix(params["lng"]);
  const docsInstallHref = `${prefix}/${"docs"}/${"install"}`;

  const [tab, setTab] = useState<"helm" | "docker">("helm");
  const [coreVersions, setCoreVersions] = useState<VersionInfo[]>([]);
  const [dashboardVersions, setDashboardVersions] = useState<VersionInfo[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadTags = async () => {
      try {
        const payload = await fetchDockerHubDashboardTags();
        if (isMounted) {
          const tags = payload.results;

          const mapVersions = (repo: string) =>
            tags.map((tag) => ({
              version: tag.name,
              date: tag.last_updated.slice(0, 10),
              notes: `${repo}/releases/tag/v${tag.name}`,
            }));

          setCoreVersions(mapVersions(CORE_REPOSITORY_URL));
          setDashboardVersions(mapVersions(DASHBOARD_REPOSITORY_URL));
        }
      } catch (error) {
        if (isMounted) {
          console.error("[DownloadPage] Failed to load Docker Hub tags", error);
        }
      }
    };

    void loadTags();

    return () => {
      isMounted = false;
    };
  }, []);

  const getVersionsForProduct = (productId: string) => {
    if (productId === "core") return coreVersions;
    if (productId === "dashboard") return dashboardVersions;
    return [];
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      <PageSEO
        titleKey="seo.download.title"
        titleDefault="Download RustCost"
        descriptionKey="seo.download.description"
        descriptionDefault="Get Helm charts or Docker images for RustCost core and dashboard components."
      />

      {/* Hero */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Install RustCost
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Deploy via Helm (recommended) or run with Docker images.
        </p>
      </header>

      {/* Tabs */}
      <div className="mx-auto max-w-3xl lg:max-w-4xl rounded-xl border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("helm")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors select-none ${
              tab === "helm"
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70"
            }`}
          >
            Helm (Recommended)
          </button>
          <button
            onClick={() => setTab("docker")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors select-none ${
              tab === "docker"
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70"
            }`}
          >
            Docker Images
          </button>
        </div>

        {tab === "helm" ? (
          <div className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Install the chart into the{" "}
              <code className="font-mono">rustcost</code> namespace:
            </p>
            <div className="relative mt-3 not-prose">
              <pre className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
                {HELM_INSTALL_COMMAND}
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={HELM_INSTALL_COMMAND} />
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-amber-300/40 bg-amber-50/50 p-4 text-amber-800 dark:border-amber-300/20 dark:bg-amber-400/10 dark:text-amber-200">
              The Helm chart provisions recommended RBAC. Ensure your cluster
              has an SSD-backed StorageClass for persistent volumes; NFS/HDD is
              not supported.
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
              Verify:
              <pre className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
                kubectl get pods -n rustcost kubectl get pvc -n rustcost
              </pre>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
              Continue to{" "}
              <a
                href={docsInstallHref}
                className="text-blue-600 underline dark:text-amber-400"
              >
                Installation Docs
              </a>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Images
              </h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>
                  Core backend:{" "}
                  <a
                    className="text-blue-600 underline dark:text-amber-400"
                    href={`https://hub.docker.com/r/${CORE_IMAGE_NAME}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {CORE_IMAGE_NAME}
                  </a>
                </li>
                <li>
                  Dashboard:{" "}
                  <a
                    className="text-blue-600 underline dark:text-amber-400"
                    href={`https://hub.docker.com/r/${DASHBOARD_IMAGE_NAME}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {DASHBOARD_IMAGE_NAME}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Quick start (compose)
              </h3>
              <pre className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
                version: "3.8" services: rustcost: image: {CORE_IMAGE_NAME}
                container_name: rustcost restart: unless-stopped ports: -
                "9090:9090" volumes: - rustcost-data:/data # must be SSD-backed
                in production rustcost-dashboard: image: {
                  DASHBOARD_IMAGE_NAME
                }{" "}
                container_name: rustcost-dashboard restart: unless-stopped
                ports: - "8080:80" volumes: rustcost-data: {}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Kubernetes PVC (SSD)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Example PersistentVolumeClaim using an SSD storage class:
              </p>
              <pre className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
                apiVersion: v1 kind: PersistentVolumeClaim metadata: name:
                rustcost-data namespace: rustcost spec: accessModes:
                ["ReadWriteOnce"] storageClassName: ssd resources: requests:
                storage: 10Gi
              </pre>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Use an SSD-backed StorageClass; NFS/HDD is not supported.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                RBAC (if running manually)
              </h3>
              <pre className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
                apiVersion: rbac.authorization.k8s.io/v1 kind: ClusterRole
                metadata: name: rustcost-read rules: - apiGroups: [""]
                resources: ["nodes", "pods", "namespaces"] verbs: ["get",
                "list", "watch"] --- apiVersion: rbac.authorization.k8s.io/v1
                kind: ClusterRoleBinding metadata: name: rustcost-read roleRef:
                apiGroup: rbac.authorization.k8s.io kind: ClusterRole name:
                rustcost-read subjects: - kind: ServiceAccount name: default
                namespace: rustcost
              </pre>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                The Helm chart provisions RBAC automatically. Only use this if
                deploying manifests manually.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Versions matrix */}
      <section className="mt-10 space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Versions
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Images are multi-arch and designed for Kubernetes. OS/Architecture
          selection is not required; tags are shown for visibility.
        </p>

        {DOWNLOAD_PRODUCTS.map((product) => {
          const versions = getVersionsForProduct(product.id);
          return (
            <div
              key={product.id}
              className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.title.toLowerCase()}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {product.title} container image —{" "}
                      <a
                        className="text-blue-600 underline dark:text-amber-400"
                        href={`https://hub.docker.com/r/${product.image}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {product.image}
                      </a>
                    </p>
                  </div>
                  <a
                    href={product.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm dark:text-amber-400"
                  >
                    repo
                  </a>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/60">
                    <tr>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                        Tag
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                        Date
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                        Image
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                        Pull
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {versions.map((version, idx) => {
                      const tag = `${product.image}:${version.version}`;
                      const pull = `docker pull ${tag}`;
                      const isLatest = idx === 0;
                      const badgeText = isLatest ? "LATEST" : "LTS";
                      const badgeVariant = isLatest ? "green" : "blue";

                      return (
                        <tr
                          key={tag}
                          className="border-t border-gray-100 dark:border-gray-800"
                        >
                          <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                            <div className="flex items-center gap-2">
                              <span className="font-mono">
                                v{version.version}
                              </span>
                              <Badge text={badgeText} variant={badgeVariant} />
                            </div>
                          </td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                            {version.date}
                          </td>
                          <td className="px-4 py-2">
                            <code className="rounded bg-gray-100 px-2 py-1 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              {tag}
                            </code>
                          </td>
                          <td className="px-4 py-2">
                            <code className="rounded bg-gray-100 px-2 py-1 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              {pull}
                            </code>
                          </td>
                          <td className="px-4 py-2">
                            <CopyButton text={pull} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-600 dark:text-gray-400">
                <span>
                  Multi-arch manifests (amd64/arm64). Optimized for Kubernetes.
                </span>
                <span>
                  {versions[0]?.notes && (
                    <a
                      href={versions[0].notes}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline dark:text-amber-400"
                    >
                      Latest release notes
                    </a>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
