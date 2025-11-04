# 개요

![RustCost 로고](/logo.webp)

## RustCost: 조용하지만 충분한 FinOps Observability

> **“비용을 ‘정의’하는 것이 아니라, 비용을 ‘이해하고 개선’하기 위한 도구.”**

---

## 소개

Kubernetes 환경에서의 Observability는 이제 단순히 **시스템을 ‘보는’ 일**을 넘어, **운영 비용을 이해하고 개선하는 일**로 확장되고 있습니다.
하지만 이를 위해 꼭 복잡한 FinOps 플랫폼이 필요한 것은 아닙니다.

**RustCost**는 대규모 플랫폼 없이도 **가볍고 투명한 비용 관측(Observability)** 을 가능하게 하는 **경량 FinOps 도구**입니다.

RustCost는 단순한 모니터링을 넘어 **클러스터 단위의 리소스 사용량과 비용 구조를 직관적으로 이해**하도록 설계되었습니다.
이는 두 가지 FinOps 접근 모델을 지원하는 철학 위에 서 있습니다:

- **Showback** — 각 팀과 서비스의 리소스 소비 현황을 투명하게 공개하여 비용 인식을 높이는 것
- **Chargeback** — 실제 비용 청구 구조를 통해 책임 있는 리소스 사용을 유도하는 것

RustCost는 이 두 모델을 모두 지원하기 위해 **정확성(Accuracy)** 과 **효율성(Efficiency)** 의 균형을 유지하는 설계를 따릅니다.
Rust(Axum) 기반의 고성능 백엔드, React 기반의 직관적인 UI, 그리고 외부 DB가 필요 없는 **파일 기반 스토리지 구조**를 통해
약 10MB 수준의 메모리만으로도 충분히 동작하는 초경량 아키텍처를 구현했습니다.

결국 RustCost는 복잡한 FinOps 플랫폼을 대체하기보다,
운영자가 비용을 **“정의”** 하는 대신 **“이해하고 개선”** 하도록 돕는 **조용하지만 강력한 관측 도구**입니다.

---

## 공식 링크

- [공식 사이트](https://rustcost.com) — Lightweight FinOps for Kubernetes
  _Monitor, analyze, and optimize your Kubernetes costs with RustCost — a modern, efficient open-source FinOps solution._

- [GitHub 저장소](https://github.com/rustcost/rustcost) —
  _Fast, secure Kubernetes cost insights powered by Rust._

---

## 왜 RustCost인가

### 단순한 모니터링을 넘어 — ‘이해’로

RustCost는 단순히 데이터를 수집하는 도구가 아닙니다.
운영자가 스스로 클러스터의 비용 구조를 **이해하고 판단할 수 있는 감각**을 기르도록 돕습니다.

**실제 활용 시나리오**

- 클러스터별·팀별 리소스 소비 경향 분석
- 서비스 단위의 비용 비중 파악 및 최적화 방향 도출
- 대규모 클라우드 환경에서의 FinOps 실험 및 내부 비용 인식 개선

---

## RustCost의 철학

RustCost는 항상 세 가지 균형점을 고려합니다.

1. **정확성 (Accuracy)** — 너무 과하지도, 너무 느슨하지도 않게
2. **지속 가능성 (Sustainability)** — 시스템에 부담을 주지 않도록
3. **명확성 (Clarity)** — 인사이트는 짧고, 명확하게

RustCost는 마치 파리가 동물 위에 앉아도 눈치채기 어려운 것처럼,
운영 환경에 부담을 주지 않으면서 조용히 필요한 관측을 수행합니다.

---

## 아키텍처와 확장성

RustCost는 외부 데이터베이스 없이 동작하는 **파일 기반 TSDB 구조**를 사용합니다.
이를 통해 설치와 운영이 단순하며, 확장이나 커스터마이징이 자유롭습니다.

**주요 기술 특징**

- **Kubernetes 네이티브 통합** — Metrics API, cAdvisor, Node Exporter 등
- **파일 기반 TSDB** — 외부 DB 의존성 없이 경량·확장성 확보
- **Helm Chart 배포 지원** — 멀티 클러스터 설치 및 관리 용이
- **Rust + React 스택** — 성능, 안정성, 생산성의 조화

---

## 향후 확장 계획

- GPU·Network·Volume 단위 비용 분석
- 멀티 클러스터 연합(Federation) 구조 지원
- 사용자 정의 단가 및 알림(Alerts) 기능
- Helm 기반 멀티 클러스터 설치 자동화

---

## RustCost의 비전

RustCost는

> **“모든 조직이 복잡한 FinOps 툴 없이도 운영 비용을 직관적으로 이해할 수 있는 세상”**
> 을 꿈꿉니다.

이는 곧 **FinOps의 민주화 (Democratization of FinOps)** —
누구나 쉽게, 가볍게, 그리고 신뢰할 수 있게.

장기적으로는 **CNCF 커뮤니티와 함께**
“**Lightweight FinOps Observability**”라는 새로운 오픈소스 표준을 만들어 가는 것을 목표로 합니다.

---

## 오픈소스 커뮤니티 기여

RustCost는 **Apache License 2.0** 기반의 완전한 오픈소스 프로젝트입니다.
누구나 자유롭게 참여할 수 있으며, 코드·문서·디자인 등 다양한 형태로 기여가 가능합니다.

**기여 가능한 영역**

- Rust 모듈 개발 (Collector, Exporter, Scheduler 등)
- Helm Chart 개선 및 배포 자동화
- React UI 및 시각화 컴포넌트 추가
- Alert 등 외부 모듈 연동 템플릿 제공
- 문서화, 번역, 튜토리얼 작성

[GitHub에서 기여하기 →](https://github.com/rustcost/rustcost)
