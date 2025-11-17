/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HashtagIcon } from "@heroicons/react/24/outline";
import type { JSX } from "react/jsx-runtime";
import {
  buildLanguagePrefix,
  normalizeLanguageCode,
} from "@/constants/language";
import type { LanguageCode } from "@/types/i18n";
import PageSEO from "@/shared/components/PageSEO";

type TocItem = { id: string; text: string; level: number };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Replace <br>, <br/>, <br /> with actual line breaks in markdown
// Skips fenced code blocks to avoid altering code examples
function normalizeMd(raw: string): string {
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i];
    const trimmed = t.trimStart();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      out.push(t);
      continue;
    }
    if (inFence) {
      out.push(t);
    } else {
      out.push(t.replace(/<br\s*\/?>(?=\s|$)/gi, "\n"));
    }
  }
  return out.join("\n");
}

const docFiles = import.meta.glob("../content/*/*.md", { as: "raw" });

type DocCacheValue = {
  normalized: string;
  title?: string;
};

const docCache = new Map<string, Promise<DocCacheValue>>();

function loadDoc(fileKey: string): Promise<DocCacheValue> {
  const loader = docFiles[fileKey];
  if (!loader) {
    return Promise.reject(new Error("Doc not found for key: " + fileKey));
  }

  if (!docCache.has(fileKey)) {
    docCache.set(
      fileKey,
      (async () => {
        const raw = (await loader()) as string;
        const heading = /^\s*#\s+(.+)$/m.exec(raw)?.[1].trim();
        return {
          normalized: normalizeMd(raw),
          title: heading,
        };
      })()
    );
  }

  return docCache.get(fileKey)!;
}

export default function DocsPage() {
  type DocsParams = {
    ["lng"]?: LanguageCode;
    ["topic"]?: string;
  };
  const params = useParams<DocsParams>();
  const language = normalizeLanguageCode(params["lng"]);
  const currentTopic = params["topic"] ?? "index";
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState<{ slug: string; title: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    type Item = {
      fileKey: string;
      slug: string;
      displaySlug: string;
      title: string;
      order: number;
    };

    const keys = Object.keys(docFiles).filter((k) =>
      k.startsWith(`../content/${language}/`)
    );

    const items: Item[] = keys.map((k) => {
      const filename = k.split("/").pop()!; // e.g., 001_overview.md
      const base = filename.replace(/\.md$/, "");
      let order = Number.POSITIVE_INFINITY;
      let displaySlug = base;

      const mOrder = /^(\d{2,3})[_-](.+)$/.exec(base);
      if (mOrder) {
        order = parseInt(mOrder[1], 10);
        displaySlug = mOrder[2];
      } else if (base === "index") {
        order = Number.NEGATIVE_INFINITY; // keep index at very top
        displaySlug = "index";
      }

      const fallbackTitle = displaySlug
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return {
        fileKey: k,
        slug: base,
        displaySlug,
        title: fallbackTitle,
        order,
      };
    });

    items.sort((a, b) =>
      a.order === b.order ? a.title.localeCompare(b.title) : a.order - b.order
    );

    if (!cancelled) {
      setTopics(
        items.map(({ displaySlug, title }) => ({ slug: displaySlug, title }))
      );
    }

    const desired = currentTopic;
    const fallbackPath = `../content/${language}/${desired}.md`;
    let resolved = items.find((i) => i.displaySlug === desired)?.fileKey;
    if (!resolved && docFiles[fallbackPath]) {
      resolved = fallbackPath;
    }

    if (resolved && docFiles[resolved]) {
      loadDoc(resolved)
        .then((doc) => {
          if (!cancelled) {
            setContent(doc.normalized);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setContent(`# 404\nNot found: ${language}/${desired}`);
          }
        });
    } else {
      setContent(`# 404\nNot found: ${language}/${desired}`);
    }

    Promise.all(
      items.map(async ({ fileKey, displaySlug, title }) => {
        try {
          const doc = await loadDoc(fileKey);
          return { slug: displaySlug, title: doc.title ?? title };
        } catch {
          return { slug: displaySlug, title };
        }
      })
    ).then((loadedTopics) => {
      if (!cancelled) {
        setTopics(loadedTopics);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [language, currentTopic]);

  // Build table of contents
  const toc: TocItem[] = useMemo(() => {
    const lines = content.split("\n");
    const items: TocItem[] = [];
    for (const line of lines) {
      const m = /^(#{1,6})\s+(.+)$/.exec(line.trim());
      if (m) {
        const level = m[1].length;
        const text = m[2].replace(/`/g, "").trim();
        const id = slugify(text);
        items.push({ id, text, level });
      }
    }
    return items;
  }, [content]);

  // Track active heading for TOC highlighting and handle ESC to close image preview
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("article h1, article h2, article h3")
    );
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => obs.observe(h));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewSrc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      obs.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [content]);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const Heading =
    (tag: keyof JSX.IntrinsicElements) =>
    ({ children, ...props }: any) => {
      const text = String(children).replace(/<[^>]+>/g, "");
      const id = slugify(text);
      const T = tag as any;
      return (
        <T id={id} className="group scroll-mt-28" {...props}>
          {children}
          <a
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(id);
            }}
            aria-label={`Link to ${text}`}
            className="ml-2 align-middle inline-flex opacity-0 group-hover:opacity-100 text-gray-400 hover:text-amber-500 transition"
          >
            <HashtagIcon className="h-4 w-4" />
          </a>
        </T>
      );
    };

  const prefix = buildLanguagePrefix(language);
  const docsBasePath = `${prefix}/${"docs"}`;
  const buildDocPath = (slug?: string) =>
    slug && slug !== "index" ? `${docsBasePath}/${slug}` : docsBasePath;

  return (
    <div className="relative">
      <PageSEO
        titleKey="seo.docs.title"
        titleDefault="RustCost Documentation"
        descriptionKey="seo.docs.description"
        descriptionDefault="Install guides, architecture notes, and docs for RustCost."
      />
      {/* Mobile drawer trigger */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md border px-3 py-2 text-sm text-gray-700 dark:text-gray-200 dark:border-gray-700"
        >
          Menu
        </button>
        <div className="text-sm text-gray-500">Docs</div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_220px] gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky self-start top-24 h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <nav className="space-y-2">
            {topics.map((t) => (
              <Link
                key={t.slug}
                to={buildDocPath(t.slug)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  currentTopic === t.slug
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70"
                }`}
              >
                {t.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="prose max-w-none dark:prose-invert leading-relaxed prose-p:my-4 prose-li:my-1.5 prose-ul:space-y-1.5 prose-ol:space-y-1.5 prose-headings:mt-8 prose-headings:mb-3 prose-img:my-6 prose-table:my-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: Heading("h1"),
              h2: Heading("h2"),
              h3: Heading("h3"),
              h4: Heading("h4"),
              p({ children, ...rest }) {
                return (
                  <p className="whitespace-pre-line" {...rest}>
                    {children}
                  </p>
                );
              },
              li({ children, ...rest }) {
                return (
                  <li className="whitespace-pre-line" {...rest}>
                    {children}
                  </li>
                );
              },
              code({ inline, className, children, ...rest }: any) {
                const text = Array.isArray(children)
                  ? children.join("")
                  : String(children);
                if (inline) {
                  return (
                    <code
                      className={`rounded-md bg-gray-100 px-1 py-0.5 dark:bg-gray-800 ${
                        className || ""
                      }`}
                      {...rest}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <div className="not-prose relative">
                    <pre className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 overflow-x-auto">
                      <code className={className} {...rest}>
                        {children}
                      </code>
                    </pre>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(text)}
                      className="absolute top-2 right-2 rounded-md border border-gray-300 bg-white/80 px-2 py-1 text-xs text-gray-700 hover:bg-white dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200"
                    >
                      Copy
                    </button>
                  </div>
                );
              },
              table({ children }) {
                return (
                  <div className="not-prose overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      {children}
                    </table>
                  </div>
                );
              },
              img: ({ src, alt, title }: any) => (
                <img
                  src={src}
                  alt={alt}
                  title={title}
                  loading="lazy"
                  className="mx-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-800"
                  onClick={() => setPreviewSrc(src)}
                />
              ),
              a: ({ href, children, ...aProps }: any) => {
                const url = String(href || "");
                const classes =
                  "text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-amber-400 dark:hover:text-amber-300";
                if (/^https?:\/\//i.test(url)) {
                  return (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes}
                      {...aProps}
                    >
                      {children}
                    </a>
                  );
                }
                if (url.startsWith("./")) {
                  const slug = url.replace(/^\.\//, "").replace(/\.md$/, "");
                  const to = buildDocPath(slug);
                  return (
                    <Link to={to} className={classes} {...(aProps as any)}>
                      {children}
                    </Link>
                  );
                }
                return (
                  <a href={url} className={classes} {...aProps}>
                    {children}
                  </a>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
          {(() => {
            const idx = topics.findIndex((t) => t.slug === currentTopic);
            const prev = idx > 0 ? topics[idx - 1] : null;
            const next =
              idx >= 0 && idx < topics.length - 1 ? topics[idx + 1] : null;
            if (!prev && !next) return null;
            return (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
                {prev && (
                  <Link
                    to={buildDocPath(prev.slug)}
                    className="group rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {"< "}
                    {prev.title}
                  </Link>
                )}
                {next && (
                  <Link
                    to={buildDocPath(next.slug)}
                    className="group justify-self-end rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {next.title}
                    {" >"}
                  </Link>
                )}
              </div>
            );
          })()}
        </article>

        {/* TOC */}
        <aside className="hidden lg:block sticky self-start top-24 h-[calc(100vh-7rem)] overflow-y-auto pl-2">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">
            On this page
          </div>
          <ul className="space-y-1">
            {toc
              .filter((i) => i.level <= 3)
              .map((i) => (
                <li key={i.id} className={i.level > 2 ? "ml-3" : ""}>
                  <a
                    href={`#${i.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(i.id);
                    }}
                    className={`block rounded px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      activeId === i.id
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {i.text}
                  </a>
                </li>
              ))}
          </ul>
        </aside>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="font-semibold">Docs</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border px-2 py-1 text-sm text-gray-700 dark:text-gray-200 dark:border-gray-700"
              >
                Close
              </button>
            </div>
            <nav className="space-y-2">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  to={buildDocPath(t.slug)}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    currentTopic === t.slug
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70"
                  }`}
                >
                  {t.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      {previewSrc && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewSrc(null)}
        >
          <img
            src={previewSrc}
            alt="preview"
            className="max-h-full max-w-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
