# Observability란 무엇인가?

## 1.Obervability는

![observability_hierarchy](/src/features/docs/content/images/ovservability_hierarchy.svg)

> ***“Observability is a system property that defines the degree to which the system can generate actionable insights. It allows users to understand a system’s state from these external outputs and take (corrective) action.”***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

'Observability'는 시스템이 실행 가능한 통찰력을 생성할 수 잇는 정도를 정의하는 시스템 속성입니다. 이를 통해 사용자는 이러한 외부 철력을 통해 시스템 상태를 파악하고(시정)조치를 취할 수 있습니다.

> ***"Computer systems are measured by observing low-level signals such as CPU time, memory, disk space, and higher-level and business signals, including API response times, errors, transactions per second, etc. These observable systems are observed (or monitored) through specialized tools, so-called observability tools."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

Computer System은 CPU시간, 메모리, 디스크 공간과 같은 저수준 신호와 API 응답시간, 오류, 초당 트랜랙션 수(TPS) 등의고수 준 및 비즈니스 신호를 관찰하여 측정합니다. 이러한 관찰 가능한 시스템은 관찰 도구라고 불리우는 통해 ***관찰***(또는 모너터링)됩니다. 

> ***"Observable systems yield meaningful, actionable data to their operators, allowing them to achieve favorable outcomes (faster incident response, increased developer productivity) and less toil and downtime."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

관찰 가능한 시스템은 운영자에게 의미 있고 실행 가능한 데이터를 제공하여 유리한 결과(더 빠른 사고 대응 개발자 생산성 증가)를 얻고 수고와 가동 중지 시간을 줄일 수 있습니다. 

> ***"Consequently, how observable a system is will significantly impact its operating and development costs."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

결과적으로, 시스템을 얼마나 관찰할 수 있는지에 따라 운영 및 개발 비용에 상당한 영향을 미칩니다. 

![observability_hierarchy](/src/features/docs/content/images/ovservability_hierarchy_detail.svg)

## 2. 4가지 중요요소

### 2.1 Telemetry Data Collection & instrumentation

시스템이 관찰 가능해지기 위한 첫단계는, 내부 상태를 외부 신호로 드러내는 계측(instrumentation)입니다. CNCF와 IBM은 관찰 가능성을 구성하는 핵심 요소로 Log, Metric, Trace를 명확히 정희하고 있으며, 이러한 신호들이 Telemetry Data Collection의 출발점이 됩니다.

> ***“Observability uses three pillars of telemetry data — metrics, logs and traces”***[observability-pillars_ibm.com](https://www.ibm.com/think/insights/observability-pillars)

> ***"Computer systems are measured by observing low-level signals such as CPU time, memory, disk space, and higher-level and business signals, including API response times, errors, transactions per second, etc."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

이 두 문구는 Telemetry가 Observability의 근간이며, 저수준(리소스), 고수준(비즈니스) 신호모두 계측 대상임을 명확히 보여줍니다. 

### 2.2. Monitoring System

Telemetry가 수집되면, 다음 단계는 시스템의 상태를 지속적으로 감시하고 이상을 탐지하는 Monitoring입니다. CNCF와 IBM문서는 '모니터링은 Oberservability의 일부이며, 동일한 텔레 메트리 데이터를 기반으로한다'고 정의 합니다. 

> ***“Both monitoring and observability use the same type of telemetry data… An observability platform takes monitoring a step further. … The three pillars are: Logs, Metrics, Traces.”***[observability-pillars_ibm.com](https://www.ibm.com/think/insights/observability-pillars)

> ***"These observable systems are observed (or monitored) through specialized tools, so-called observability tools."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

이 문장들은 Observability의 하위 기능이며 Telemetry data를 사용해 시스템을 관찰하는 단계임을 분명히 해줍니다.

### 2.3. Correlation & Context Analysis

단순 수집 및 모니터링을 넘어, Observability의 핵심 가치는 다양한 출력을 상관관계(Correlation)와 맥락(Context)속에서 해석하여 시스템 상태를 정확히 이해할 수 있게 해주는 단계에 있습니다. CNCF정의는 '시스템 상태를 파악하고(corrective action)시정 조치를 할 수 있게 한다'고 설명합니다.

> ***"It allows users to understand a system’s state from these external outputs and take (corrective) action."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

> ***"Observable systems yield meaningful, actionable data to their operators, allowing them to achieve favorable outcomes (faster incident response, increased developer productivity) and less toil and downtime."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

이 문장들은 Observability가 단순 모니터링이 아니라, 데이터를 해석하여 의미 있는 맥락을 도출하는 과정임을 명확히 뒷받침합니다. 

### 2.4. Root Cause Diagnosis/ Actionable Insight Generation

OIvservability의 최종 목적은 원인 분석과 실행 가능한 통찰력(actionable insights)을 도출하는 것입니다. CNCF는 Observability를 '실행 가능한 통찰력을 생성하는 능력'으로 정의하며, 운영 비용과 개발 효율성까지 직접적으로 영향을 준다고 강조합니다. 

> ***"Observability is a system property that defines the degree to which the system can generate actionable insights."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

> ***"Consequently, how observable a system is will significantly impact its operating and development costs."***[Oberservability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

이 두문구는 Obserbaility의 목적 = 문제 해결 능력 강화 + 운영개발 비용 절감임을 직접적으로 뒷받침합니다. 

또한 Observability 이러한 actionable insights를 실제로 만들어내는 과정은 Google SRE와 CNCF가 공통적으로 강조하는 6단계 Root-Cause Diagnosis 프로세스를 기반으로 합니다.

1. 증상(Symtom)탐지 - 알람, 대시보드를 통해 이상을 발견
2. 영향(Impact)평가 - 어떤 서비스/SLO에 영향이 있는지 파악
3. 신호(Drill-down) - Metric -> Logs -> Traces 순으로 범위를 좁힘.
4. 가설(Hypothesis)생성 - 가능한 원인을 나열
5. 검증(Verification) - telemetry 기반으로 가설을 제외, 확증
6. 근본 원인 확정 및 조치(Insight/Remediation)로 Actionable instights를 도출

[Waht is observabiliyty 2.0-CNCF](https://www.cncf.io/blog/2025/01/27/what-is-observability-2-0/?utm_source=chatgpt.com) \
[Effective Troubleshooting-sre.google](https://sre.google/sre-book/effective-troubleshooting/?utm_source=chatgpt.com)

이 프로세스를 반복적으로 수행함으로써 Obervability는 단순 'Monitoring'수준을 넘어서 실제 문제 해결 능력 강화와 운영, 개발 비용 절감이라는 목적을 달성하게 됩니다.

## Outlog

Observalibity는 단순히 데이터를 수집하고 대시보드를 구성하는 기술 요소의 집합이 아니다. CNCF와 Google SRE가 공통적으로 강조하듯, Observability는 ***시스템이 스스로 실행 가능한 통찰력(actionable insights)*** 를 생성할 수 있게 만드는 ***'시스템 속성(system property)'*** 이며, 이를 통해 운영자는 외부 신호만으로도 전체 시스템 상태를 이해하고 즉각적인 시정 조치를 취할 수 있는 능력을 얻게 된다.

Observability Hierachy는 Instrumentation -> Monitoring -> Correlation & Context -> Root-Cause Dianosis는 이러한 능력이 어떻게 기술적으로 구성되고, 어떤 순서로 "문제 해결 능력"을 실현하는지를 보여주는 구조적 모델이다.

특히, 마지막 단계인 Root-Cause Diagnosis와 Insight Generation은 Observability가 Monitoring을 넘어서는 지점이다. Google SRE와 Troubleshooting 프로세스와 CNCF의 Observability 정의가 만나는 곳이 바로 이 부분이며, 증상 탐지부터 영향평가, 신호 드릴다운, 가설생성 및 검증을 거쳐 ***근본원인을 찾아내고 실행 가능한 개선을 도출*** 하는 것이 Observability의 최종 목적이다.

결국, Observability가 성숙할수록 조직은 더 빠르게 문제를 해결하고, 더 적은 노력으로 더 안정적인서비스를 운영하며, 운영 개발 비용까지 실질적으로 줄어드는 구조적 이점을 얻게 된다. 이는 단순한 기술 채택의 문제가 아니라 비용구조, 엔지니어링 생산성, 서비스 품질을 결정하는 전략적 능력이다. 

따라서, Observability를 강화한다는 것은 곳, 우리 조직의 디지털 서비스가 복잡해질수록 필연적으로 증가하는 ***알 수 없는 문제(Unknown Unknowns)*** 를 빠르게 탐지 및 이해하고, 이를 즉각적으로 해결할 수 있는 지능적 운영 역량을 확보하는 것과 같다. Observaility는 더이상 선택이 아니라 신뢰성, 비용 효울성, 생산성을 좌우하는 핵심 경쟁력이다. 