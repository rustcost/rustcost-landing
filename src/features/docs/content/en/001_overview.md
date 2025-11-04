# Overview

![RustCost Logo](/logo.webp)

## RustCost: Quiet but Powerful FinOps Observability

> **“Not a tool to _define_ costs — but to _understand and improve_ them.”**

---

<br />

<br />

<br />

## Introduction

In Kubernetes environments, observability is no longer just about _seeing_ systems — it’s about **understanding and improving operational costs**.
Yet, achieving true cost awareness (Showback) and responsibility-driven management (Chargeback) shouldn’t require a massive FinOps platform.

**RustCost** was built to solve exactly that.
It’s not just another monitoring tool — it’s a **lightweight FinOps observability solution** that helps you **understand cluster-level resource usage and cost structures** intuitively.

RustCost is built upon two complementary FinOps principles:

- **Showback** — Increase cost awareness by transparently exposing resource consumption per team or service.
- **Chargeback** — Encourage responsible usage by mapping actual costs to usage when necessary.

To support both models, RustCost balances **accuracy** and **efficiency** through a simple yet robust design philosophy.
It combines a **high-performance Rust (Axum)** backend with a **clean React UI**, and replaces databases with a **file-based storage structure** — allowing it to run on as little as **10MB of memory**.

Ultimately, RustCost is not meant to replace complex FinOps platforms —
but to serve as a **quiet, efficient companion** that helps operators _understand_ and _optimize_ their costs.

---

## Official Links

- [Official Website](https://rustcost.com) — Lightweight FinOps for Kubernetes
  _Monitor, analyze, and optimize your Kubernetes costs with RustCost — a modern, efficient open-source FinOps solution._

- [GitHub Repository](https://github.com/rustcost/rustcost) —
  _Fast, secure Kubernetes cost insights powered by Rust._

---

## Why RustCost

### Beyond Monitoring — Toward Understanding

RustCost isn’t just about collecting metrics.
Its purpose is to help operators **develop an intuitive understanding** of how their clusters consume resources and accumulate costs.

**Practical Use Cases**

- Analyze resource consumption trends by cluster or team
- Identify and optimize cost distribution per service
- Improve internal FinOps awareness across large-scale cloud environments

---

## Philosophy

RustCost is guided by three key principles of balance:

1. **Accuracy** — Not too much, not too little
2. **Sustainability** — Never burdens the system it observes
3. **Clarity** — Insights that are short, sharp, and actionable

Just as a fly can land unnoticed on an animal’s back,
RustCost performs its observations silently, without disrupting operations.

---

## Architecture and Scalability

RustCost operates without any external database — using a **file-based time-series database (TSDB)** structure instead.
This enables **simplified deployment, easier maintenance, and flexible customization**.

**Key Technical Features**

- **Kubernetes-Native Integration** — Metrics API, cAdvisor, Node Exporter, and more
- **File-Based TSDB** — Lightweight and scalable with zero external dependencies
- **Helm Chart Support** — Simplified multi-cluster deployment and management
- **Rust + React Stack** — A balance of performance, reliability, and productivity

---

## Roadmap

- GPU, Network, and Volume-level cost analysis
- Multi-cluster federation support
- Custom pricing and alerting capabilities
- Automated Helm-based multi-cluster installation

---

## Vision

RustCost envisions a world where:

> **“Every organization can intuitively understand its operational costs — without complex FinOps platforms.”**

That’s the **Democratization of FinOps** —
accessible, lightweight, and trustworthy for everyone.

In the long term, RustCost aims to collaborate with the **CNCF community**
to define a new open-source standard for **Lightweight FinOps Observability**.

---

## Open Source Contribution

RustCost is a **fully open-source project under the Apache License 2.0**.
Anyone can contribute — through code, documentation, design, or community efforts.

**Areas for Contribution**

- Rust module development (Collector, Exporter, Scheduler, etc.)
- Helm Chart enhancements and deployment automation
- React UI and visualization components
- Alerting and external module integration templates
- Documentation, localization, and tutorials

[Contribute on GitHub →](https://github.com/rustcost/rustcost)
