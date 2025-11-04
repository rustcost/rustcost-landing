www.rustcost.com

## Directory Overview

```
src/
├── app/                 # Core application setup (routing, providers, layouts)
│   ├── router.tsx       # Centralized route configuration
│   ├── providers/       # Context providers (e.g. i18n, theme)
│   └── layouts/
│       └── RootLayout.tsx
│
├── features/            # Domain-specific features (e.g. docs, blog)
│
├── docs/                # Documentation feature
│   ├── pages/DocsPage.tsx
│   ├── components/Sidebar.tsx
│   └── content/
│       ├── en/*.md      # English docs
│       └── ko/*.md      # Korean docs
│
├── blog/                # Blog feature (future-ready)
│   ├── pages/BlogPage.tsx
│   ├── pages/BlogPost.tsx
│   └── content/*.md
│
├── marketing/           # Public-facing pages
│   ├── pages/LandingPage.tsx
│   ├── pages/DownloadPage.tsx
│   ├── pages/SupportPage.tsx
│   └── pages/CommunityPage.tsx
│
├── shared/              # Reusable cross-feature code
│   ├── components/ThemeToggle.tsx
│   ├── hooks/
│   ├── lib/
│   └── styles/index.css
│
├── i18n/                # Internationalization setup
│   ├── i18n.ts
│   └── locales/...
│
└── public/
    └── logo.webp
```

## Naming Conventions

| Type       | Convention              | Example                 |
| ---------- | ----------------------- | ----------------------- |
| Components | PascalCase              | `ThemeToggle.tsx`       |
| Pages      | Suffix `.page.tsx`      | `DocsPage.page.tsx`     |
| Layouts    | Suffix `.layout.tsx`    | `RootLayout.layout.tsx` |
| Shared UI  | Suffix `.component.tsx` | `Sidebar.component.tsx` |
| Markdown   | kebab-case              | `getting-started.md`    |
