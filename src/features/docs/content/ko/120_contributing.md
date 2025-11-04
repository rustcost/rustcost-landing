# RustCost에 기여하기

RustCost에 관심을 가져 주셔서 감사합니다! 이 문서는 조직 내 여러 저장소에서 일관된 방식으로 기여하는 절차와 코딩 표준을 안내합니다.

---

## 🧩 저장소 개요

| 저장소 | 설명 | 주요 기술 |
|-------|------|----------|
| **rustcost-core** | 핵심 서비스: API, Collector, Processor | Rust |
| **rustcost-hub** | 멀티 노드 코디네이션/오케스트레이션 | Rust |
| **rustcost-dashboard** | 대시보드/시각화/프론트엔드 UI | TypeScript / React |
| **rustcost-site** | 문서/웹사이트 | TypeScript / Vite + React |
| **rustcost-helmchart** | Helm 배포 구성 | YAML |
| **.github** | 조직 공통 워크플로/템플릿/액션 | YAML / Markdown |

특별한 언급이 없는 한 모든 저장소는 동일한 협업 프로세스를 따릅니다.

---

## 🚀 기여 방법

1. 기여하려는 저장소를 **Fork** 합니다 (예: `rustcost-core`, `rustcost-dashboard`).
2. 로컬에 **Clone** 합니다:

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

3. **브랜치 생성**:

```bash
git checkout -b feat/my-feature
```

4. 아래 코딩 가이드를 따라 변경사항을 구현합니다.
5. 테스트/포맷/린트를 실행합니다.
6. 명확한 커밋 메시지를 사용합니다:

```
feat(core): add new cost aggregation logic
fix(dashboard): resolve null pointer on chart load
```

7. 원 저장소의 `main` 브랜치로 PR을 작성합니다.
8. PR 본문에 변경 내용/이유/관련 이슈(예: “Closes #42”)와 UI 변경 시 스크린샷을 포함합니다.

---

## 🧠 코딩 표준

### 🦀 Rust (Core / Hub)

- Rust 1.80+ 사용
- 다음을 실행:

```bash
cargo fmt --all
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

- 모듈은 작고 응집력 있게 유지
- 신규 기능에는 단위 테스트 추가/업데이트
- 프로덕션 경로에서는 panic 지양

### ⚛️ TypeScript (Dashboard / Site)

- Node 20+ 사용
- 커밋 전 실행:

```bash
npm run lint
npm run test
npm run build
```

- 함수형 컴포넌트(React Hooks) 선호
- 각 저장소의 ESLint + Prettier 설정 준수
- 접근성(a11y) 고려

### 🧢 Helm Chart

- Helm 베스트 프랙티스 준수
- 다음을 실행:

```bash
helm lint ./charts/rustcost
```

- `kind` 또는 `minikube`로 값 검증

---

## 🧩 개발 환경

각 저장소에는 별도의 README가 있으며 공통 의존성은 다음과 같습니다.

- Rust 툴체인 (`rustup`)
- Node.js (프론트엔드/문서)
- Docker & Kubernetes (로컬 클러스터 테스트)
- Helm (배포)

여러 저장소를 한 번에 작업하려면:

```bash
gh repo clone rustcost/rustcost-core
gh repo clone rustcost/rustcost-hub
gh repo clone rustcost/rustcost-dashboard
gh repo clone rustcost/rustcost-site
gh repo clone rustcost/rustcost-helmchart
```

---

## 🧪 테스트 & 검증

| 영역 | 명령 | 비고 |
|-----|-----|-----|
| 백엔드(Rust) | `cargo test` | 로직/API 테스트 |
| 프론트엔드(TS) | `npm run test` | Jest / RTL |
| Helm | `helm lint` + `helm template` | 매니페스트 검증 |
| 통합 | Docker Compose / Minikube | 준비 중 |

모든 PR은 CI(빌드/린트/테스트)를 통과해야 합니다.

---

## 🗂️ 이슈 & PR 가이드

- 중복 이슈가 없는지 먼저 확인
- 라벨 예시: `bug`, `enhancement`, `good first issue`, `help wanted`, 범위 라벨(`core`, `dashboard`, `hub`, `helm`, `site`)
- PR은 작고 명확하게
- 관련 이슈 참조(`Closes #...`)
- 리뷰 SLA: 보통 3–5일 내 응답

---

## 🤝 커뮤니케이션

- Discussions: https://github.com/orgs/rustcost/discussions
- 버그: 해당 저장소에 Issue 등록
- 아키텍처/디자인: `rfc` 라벨로 이슈 제안

---

## 🌱 처음 기여하시나요?

- `good first issue` 라벨을 확인하세요
- 시작 전 “작업하겠습니다”라고 댓글 남기기
- 설정이 불명확하면 질문하세요 — 메인터이너가 도와드립니다

---

## 🧾 행동 강령(Code of Conduct)

`CODE_OF_CONDUCT.md`를 확인해 주세요. 안전하고 포용적인 커뮤니티를 지향합니다.

---

## 📜 라이선스

모든 RustCost 저장소는 Apache 2.0 라이선스를 따릅니다. 기여 시 동일한 라이선스에 동의하는 것으로 간주됩니다.

---

## 💬 도움이 필요하신가요?

- Discussions: https://github.com/orgs/rustcost/discussions
- Repositories: https://github.com/rustcost
- Docs: https://rustcost.com

기여해 주셔서 감사합니다! 🙏

