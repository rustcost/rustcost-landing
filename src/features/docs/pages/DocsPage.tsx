/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HashtagIcon } from "@heroicons/react/24/outline";
import type { JSX } from "react/jsx-runtime";

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

export default function DocsPage() {
  const { lng, topic } = useParams();
  const currentTopic = topic ?? "index";
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState<{ slug: string; title: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // Load content and build sidebar topics
  useEffect(() => {
    const files = import.meta.glob("../content/*/*.md", { as: "raw" });

    const load = async () => {
      // Build topics list for the language with numeric ordering support
      const keys = Object.keys(files).filter((k) =>
        k.startsWith(`../content/${lng}/`)
      );
      type Item = {
        fileKey: string;
        slug: string;
        displaySlug: string;
        title: string;
        order: number;
      };
      const items: Item[] = [];

      for (const k of keys) {
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

        let title = displaySlug
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        try {
          const raw = await files[k]();
          const m = /^\s*#\s+(.+)$/m.exec(raw);
          if (m) title = m[1].trim();
        } catch {}

        items.push({ fileKey: k, slug: base, displaySlug, title, order });
      }

      items.sort((a, b) =>
        a.order === b.order ? a.title.localeCompare(b.title) : a.order - b.order
      );
      setTopics(
        items.map(({ displaySlug, title }) => ({ slug: displaySlug, title }))
      );

      // Resolve current topic to an actual fileKey (prefer numbered match)
      const desired = currentTopic;
      let resolved = items.find((i) => i.displaySlug === desired)?.fileKey;
      if (!resolved) {
        // fallback to non-numbered path if exists
        const fallback = `../content/${lng}/${desired}.md`;
        if (files[fallback]) resolved = fallback;
      }
      if (resolved && files[resolved]) {
        const raw = (await files[resolved]!()) as string;
        setContent(normalizeMd(raw));
      } else {
        setContent(`# 404\nNot found: ${lng}/${desired}`);
      }
    };

    load();
  }, [lng, currentTopic]);

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

  const prefix = `/${lng || "en"}`;

  return (
    <div className="relative">
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
                to={
                  t.slug === "index"
                    ? `${prefix}/docs`
                    : `${prefix}/docs/${t.slug}`
                }
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  (topic ?? "index") === t.slug
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
                  const to =
                    slug === "index"
                      ? `${prefix}/docs`
                      : `${prefix}/docs/${slug}`;
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
                    to={
                      prev.slug === "index"
                        ? `${prefix}/docs`
                        : `${prefix}/docs/${prev.slug}`
                    }
                    className="group rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {"< "}
                    {prev.title}
                  </Link>
                )}
                {next && (
                  <Link
                    to={
                      next.slug === "index"
                        ? `${prefix}/docs`
                        : `${prefix}/docs/${next.slug}`
                    }
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
                  to={
                    t.slug === "index"
                      ? `${prefix}/docs`
                      : `${prefix}/docs/${t.slug}`
                  }
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    (topic ?? "index") === t.slug
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
