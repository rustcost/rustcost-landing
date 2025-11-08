import { useState } from "react";
import { useParams } from "react-router-dom";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          // ignore
        }
      }}
      className="rounded-md border border-gray-300 bg-white/80 px-2 py-1 text-xs text-gray-700 hover:bg-white dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function DownloadPage() {
  const { lng } = useParams();
  const prefix = `/${lng || "en"}`;
  const [tab, setTab] = useState<"helm" | "docker">("helm");

  const helmCommands = `helm repo add rustcost https://rustcost.github.io/rustcost-helmchart/
helm repo update
helm upgrade --install rustcost rustcost/rustcost -n rustcost --create-namespace`;

  const coreImage = "kimc1992/rustcost";
  const feImage = "kimc1992/rustcost-dashboard";
  const coreRepo = "https://github.com/rustcost/rustcost";
  const feRepo = "https://github.com/rustcost/rustcost-dashboard";

  type Ver = { version: string; date: string; badge?: "LATEST" | "LTS"; notes?: string };
  const coreVersions: Ver[] = [
    { version: "0.3.0", date: "2025-01-05", badge: "LATEST", notes: `${coreRepo}/releases/tag/v0.3.0` },
    { version: "0.2.0", date: "2024-12-10", badge: "LTS", notes: `${coreRepo}/releases/tag/v0.2.0` },
  ];
  const feVersions: Ver[] = [
    { version: "0.3.0", date: "2025-01-05", badge: "LATEST", notes: `${feRepo}/releases/tag/v0.3.0` },
    { version: "0.2.0", date: "2024-12-10", badge: "LTS", notes: `${feRepo}/releases/tag/v0.2.0` },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
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
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("helm")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "helm"
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70"
            }`}
          >
            Helm (Recommended)
          </button>
          <button
            onClick={() => setTab("docker")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
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
              Install the chart into the <code className="font-mono">rustcost</code> namespace:
            </p>
            <div className="relative mt-3 not-prose">
              <pre className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
{helmCommands}
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={helmCommands} />
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-amber-300/40 bg-amber-50/50 p-4 text-amber-800 dark:border-amber-300/20 dark:bg-amber-400/10 dark:text-amber-200">
              The Helm chart provisions recommended RBAC. Ensure your cluster has an SSD-backed
              StorageClass for persistent volumes; NFS/HDD is not supported.
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
              Verify:
              <pre className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
kubectl get pods -n rustcost
kubectl get pvc -n rustcost
              </pre>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
              Continue to <a href={`${prefix}/docs/install`} className="text-blue-600 underline dark:text-amber-400">Docs → Install</a>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Images</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>
                  Core backend: <a className="text-blue-600 underline dark:text-amber-400" href={`https://hub.docker.com/r/${coreImage}`} target="_blank" rel="noreferrer">{coreImage}</a>
                </li>
                <li>
                  Dashboard: <a className="text-blue-600 underline dark:text-amber-400" href={`https://hub.docker.com/r/${feImage}`} target="_blank" rel="noreferrer">{feImage}</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick start (compose)</h3>
              <pre className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
version: "3.8"
services:
  rustcost:
    image: {coreImage}
    container_name: rustcost
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - rustcost-data:/data  # must be SSD-backed in production

  rustcost-dashboard:
    image: {feImage}
    container_name: rustcost-dashboard
    restart: unless-stopped
    ports:
      - "8080:80"

volumes:
  rustcost-data: {}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Kubernetes PVC (SSD)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Example PersistentVolumeClaim using an SSD storage class:</p>
              <pre className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rustcost-data
  namespace: rustcost
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: ssd
  resources:
    requests:
      storage: 10Gi
              </pre>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Use an SSD-backed StorageClass; NFS/HDD is not supported.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">RBAC (if running manually)</h3>
              <pre className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: rustcost-read
rules:
  - apiGroups: [""]
    resources: ["nodes", "pods", "namespaces"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: rustcost-read
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: rustcost-read
subjects:
  - kind: ServiceAccount
    name: default
    namespace: rustcost
              </pre>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">The Helm chart provisions RBAC automatically. Only use this if deploying manifests manually.</p>
            </div>
          </div>
        )}
      </div>

      {/* Versions matrix */}
      <section className="mt-10 space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Versions</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Images are multi-arch and designed for Kubernetes. OS/Architecture selection is not required; tags are shown for visibility.
        </p>

        {[{ title: "RustCost Core", image: coreImage, repo: coreRepo, versions: coreVersions }, { title: "RustCost Dashboard", image: feImage, repo: feRepo, versions: feVersions }].map(
          (section) => (
            <div key={section.title} className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{section.title.toLowerCase()}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{section.title} container image • <a className="text-blue-600 underline dark:text-amber-400" href={`https://hub.docker.com/r/${section.image}`} target="_blank" rel="noreferrer">{section.image}</a></p>
                  </div>
                  <a href={section.repo} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm dark:text-amber-400">repo</a>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/60">
                    <tr>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Tag</th>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Date</th>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Image</th>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Pull</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.versions.map((v) => {
                      const tag = `${section.image}:${v.version}`;
                      const pull = `docker pull ${tag}`;
                      return (
                        <tr key={tag} className="border-t border-gray-100 dark:border-gray-800">
                          <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                            <div className="flex items-center gap-2">
                              <span className="font-mono">v{v.version}</span>
                              {v.badge && (
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${v.badge === 'LATEST' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>
                                  {v.badge}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{v.date}</td>
                          <td className="px-4 py-2">
                            <code className="rounded bg-gray-100 px-2 py-1 text-gray-800 dark:bg-gray-800 dark:text-gray-200">{tag}</code>
                          </td>
                          <td className="px-4 py-2">
                            <code className="rounded bg-gray-100 px-2 py-1 text-gray-800 dark:bg-gray-800 dark:text-gray-200">{pull}</code>
                          </td>
                          <td className="px-4 py-2"><CopyButton text={pull} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-600 dark:text-gray-400">
                <span>Multi-arch manifests (amd64/arm64). Optimized for Kubernetes.</span>
                <span>
                  {section.versions[0]?.notes && (
                    <a href={section.versions[0].notes} target="_blank" rel="noreferrer" className="text-blue-600 underline dark:text-amber-400">Latest release notes</a>
                  )}
                </span>
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
}
