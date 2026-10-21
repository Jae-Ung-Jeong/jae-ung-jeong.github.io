# Residual Harness Remediation Plan (2026-03-03, Audit Refresh)

## 0) 현재 기준 점수

최신 Audit 결과:

- 종합 등급: **L4 (Optimized)**
- 종합 점수: **73.6 / 100**
- 목표: **L5 진입(80+)**

차원 점수:

| 차원 | 점수(/10) |
|---|---:|
| A. Documentation & Navigation | 7.75 |
| B. Enforcement & Consistency | 8.00 |
| C. Architecture & Knowledge | 6.67 |
| D. Operations & Maintenance | 6.50 |

체크리스트(84항목) 최신값:

| 카테고리 | 전체 | 통과 | 실패 | 통과율 |
|---|---:|---:|---:|---:|
| 1. Agent Entry Point | 15 | 15 | 0 | 100.0% |
| 2. 문서 구조 | 12 | 10 | 2 | 83.3% |
| 3. Invariant 강제 | 15 | 12 | 3 | 80.0% |
| 4. 아키텍처 | 12 | 7 | 5 | 58.3% |
| 5. Source of Truth | 10 | 8 | 2 | 80.0% |
| 6. 운영/유지보수 | 10 | 5 | 5 | 50.0% |
| 7. Agent 가독성 | 10 | 6 | 4 | 60.0% |
| **합계** | **84** | **63** | **21** | **75.0%** |

이전 기준(58/84, 69.0%) 대비 **+5 항목 개선**.

## 1) 잔여 갭 요약 (실패 항목 중심)

### 1. 문서 구조 (실패 2)

- 일부 의사결정 문서의 대안 비교가 약함 (`docs/adr/0001-quality-gates.md`)
- 실행 가능한 예제 밀도가 낮은 문서가 일부 존재

### 2. Invariant 강제 (실패 3)

- 커버리지 threshold + CI fail 조건 미설정
- 브랜치 보호 규칙은 레포 설정 영역이라 코드베이스만으로 증명 불가
- import 경계/아키텍처 룰 자동 강제가 부족

### 3. 아키텍처 (실패 5)

- 순환 의존성 자동 검증 도구 부재
- 모듈 경계(import boundary) 강제 부재
- 에러 처리/로깅 규약 표준화 부족
- 외부 의존성 추상화 계층이 부분 적용
- 대형 파일 중심 응집도 문제 지속 (`src/components/common/liquid-ether-engine.tsx`)

### 4. Source of Truth (실패 2)

- TODO 항목의 이슈 연결 정책 미정
- 외부 의존성 선택 이유를 ADR/문서에 일관되게 남기는 규칙이 약함

### 5. 운영/유지보수 (실패 5)

- dead code 탐지 자동화 미도입 (`knip` 등)
- stale dependency 식별 루틴 미도입
- 구조화 로깅 표준 미정
- 에러 모니터링 연동 미적용
- flaky test 관리 규칙 미정

### 6. Agent 가독성 (실패 4)

- 300줄 초과 파일 존재 (`src/components/common/liquid-ether-engine.tsx`, `src/components/common/ascii-text.tsx`)
- `any` 예외 잔존 (`src/components/sections/experience.tsx`)
- 일부 모듈 public API 경계가 암묵적
- 대형 파일의 내부 역할 분리가 약함

## 2) 실행 계획 (L5 목표 잔여 +6.4)

### Quick Wins (1~2주)

| 우선순위 | 액션 | 관련 카테고리 | Definition of Done | 예상 점수 향상 |
|---|---|---|---|---:|
| 1 | 테스트 커버리지 게이트 도입 | 3,6 | `pnpm test:coverage` + threshold + CI fail 조건 | +1.5 |
| 2 | dead code 검사(`knip`) CI 통합 | 6 | `pnpm knip` 스크립트 + CI 주기 실행 | +1.0 |
| 3 | 의존성/순환 검사(`madge`) 도입 | 4 | cycle check를 CI에 추가하고 실패 시 차단 | +1.5 |
| 4 | TODO 이슈 연동 규칙 문서화 | 5 | TODO에 이슈 ID 필수 규칙 + 기존 TODO 정리 | +0.5 |
| 5 | 대형 파일 1차 분해 | 4,7 | `liquid-ether-engine`/`ascii-text` 책임 분리 | +2.0 |

예상 합계: **+6.5** (목표 80.1, L5 최소선 도달)

진행 상태(2026-03-04):

- Quick Win 1~5 구현 완료
- 단기 과제 잔여: `liquid-ether-engine.tsx` 추가 분해(2차), `experience.tsx`의 `any` 제거

### 중기 개선 (1~2개월)

| 액션 | 관련 카테고리 | Definition of Done |
|---|---|---|
| import boundary lint 규칙 도입 | 3,4 | 아키텍처 위반 import를 lint 단계에서 차단 |
| 에러/로깅 표준 문서화 | 4,6 | `docs/`에 표준 추가 + 1개 이상 모듈 적용 |
| 외부 의존성 선정 ADR 템플릿화 | 2,5 | 신규 의존성 PR에 근거 섹션 필수화 |

### 장기 개선 (3개월+)

| 액션 | 관련 카테고리 | Definition of Done |
|---|---|---|
| 모듈별 테스트 대칭성 확장 | 4,6,7 | 핵심 모듈별 단위/통합 테스트 매트릭스 구성 |
| 관측(모니터링) 체계 확장 | 6 | 에러 모니터링 연동 + 운영 알람 기준 수립 |

## 3) 실행 루프 (반복)

1. 단일 개선 과제 1개를 스프린트 목표로 확정
2. 코드/문서 변경 후 `pnpm verify:harness` 실행
3. 결과를 `docs/harness/reports/`에 Maintenance 리포트로 누적
4. 84항목 체크리스트와 12원칙 점수를 재산정
5. 목표 점수(80+) 대비 갭을 다음 스프린트 백로그로 반영

## 4) 추적 지표

| 지표 | 현재 | 목표 |
|---|---:|---:|
| 종합 점수 | 79.3 | 80+ |
| 체크리스트 통과 | 66/84 | 70+/84 |
| 300줄 초과 파일 수 | 2 | 1 이하 |
| `any` 사용 지점 | 1+ | 0 |
| TODO-이슈 미연결 수 | 0 | 0 |

## 5) 작업 기준 브랜치

- `main` (2026-03-04 Audit refresh 기준)
