# Contributing to RustCost

Thank you for contributing to RustCost! This guide explains how to get started, coding conventions, and contribution standards across all RustCost repositories.

---

## 🧩 Repository Overview

| Repository | Description | Primary Tech |
|-------------|--------------|---------------|
| **rustcost-core** | Core services: API, Collector, Processor | Rust |
| **rustcost-hub** | Multi-node coordination and orchestration | Rust |
| **rustcost-dashboard** | Dashboards, visualization, frontend UI | TypeScript / React |
| **rustcost-site** | Documentation and marketing website | TypeScript / Vite + React |
| **rustcost-helmchart** | Helm deployment configurations | YAML |
| **.github** | Org-wide workflows, issue templates, actions, profiles | YAML / Markdown |

Each repository follows the same collaboration process unless stated otherwise.

---

## 🚀 How to Contribute

1. Fork the relevant repository (e.g., `rustcost-core`, `rustcost-dashboard`).
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

3. Create a feature branch:

```bash
git checkout -b feat/my-feature
```

4. Implement your changes following the style guidelines below.
5. Run tests / format / lint (see next section).
6. Commit with a clear message:

```
feat(core): add new cost aggregation logic
fix(dashboard): resolve null pointer on chart load
```

7. Push and open a Pull Request to the main repo’s `main` branch.
8. Describe your PR clearly: what it changes, why it’s needed, related issue (e.g., “Closes #42”), and screenshots for UI changes.

---

## 🧠 Coding Standards

### 🦀 Rust (Core / Hub)

- Use Rust 1.80+
- Run:

```bash
cargo fmt --all
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

- Keep modules small and focused
- Add or update unit tests for new functionality
- Avoid panics in production paths

### ⚛️ TypeScript (Dashboard / Site)

- Use Node 20+
- Run before commit:

```bash
npm run lint
npm run test
npm run build
```

- Components should be functional (Hooks preferred)
- Follow ESLint + Prettier configuration in each repo
- Keep UI accessible (a11y)

### 🧢 Helm Chart

- Follow Helm best practices
- Run:

```bash
helm lint ./charts/rustcost
```

- Validate example values using `kind` or `minikube`

---

## 🧩 Development Setup

Each repository has its own README with setup instructions. Common dependencies:

- Rust toolchain (via `rustup`)
- Node.js (for frontend / docs)
- Docker & Kubernetes (for local cluster testing)
- Helm (for deployment)

To work across multiple repos:

```bash
gh repo clone rustcost/rustcost-core
gh repo clone rustcost/rustcost-hub
gh repo clone rustcost/rustcost-dashboard
gh repo clone rustcost/rustcost-site
gh repo clone rustcost/rustcost-helmchart
```

---

## 🧪 Testing & Validation

| Area           | Command                       | Notes                        |
| -------------- | ----------------------------- | ---------------------------- |
| Backend (Rust) | `cargo test`                  | All logic and API tests      |
| Frontend (TS)  | `npm run test`                | Jest / React Testing Library |
| Helm           | `helm lint` + `helm template` | Validate manifests           |
| Integration    | Docker Compose / Minikube     | Coming soon                  |

All PRs must pass CI checks (build, lint, test).

---

## 🗂️ Issues and Pull Requests

- Check for duplicates before opening new issues
- Use labels like: `bug`, `enhancement`, `good first issue`, `help wanted`, and scope labels (`core`, `dashboard`, `hub`, `helm`, `site`)
- Keep PRs small and focused
- Reference related issues (`Closes #...`)
- Reviewers aim to respond within 3–5 days

---

## 🤝 Communication

- Discussions: https://github.com/orgs/rustcost/discussions
- Bugs: open an issue in the correct repository
- Architecture/design: open an issue tagged `rfc`

---

## 🌱 Good First Issues

- Search issues labeled `good first issue`
- Comment “I’d like to take this” before starting
- Ask for clarification if setup isn’t clear — maintainers will help

---

## 🧾 Code of Conduct

Please review our `CODE_OF_CONDUCT.md`. We aim to foster a safe, inclusive, and respectful community.

---

## 📜 License

All RustCost repositories are licensed under the Apache 2.0 License. By contributing, you agree that your contributions are under the same license.

---

## 💬 Need Help?

- Discussions: https://github.com/orgs/rustcost/discussions
- Repositories: https://github.com/rustcost
- Docs site: https://rustcost.com

Thank you for helping improve RustCost! 🙏
