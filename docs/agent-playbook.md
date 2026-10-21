# Agent Playbook

에이전트가 작업을 시작할 때 "어떤 요청이면 어떤 파일부터 볼지"를 빠르게 결정하기 위한 문서입니다.

## 1. 기본 진입 순서

1. `AGENTS.md`에서 전역 규칙/검증 명령 확인
2. 이 문서에서 요청 유형별 진입 경로 확인
3. `docs/development-guide.md` 기준으로 검증 실행
4. 변경된 문서는 `docs/README.md` 인덱스에 반영

## 2. 요청 유형별 진입 경로

| 요청 유형 | 우선 확인 문서/코드 | 비고 |
| --- | --- | --- |
| UI/섹션 수정 | `src/components/sections/*`, `src/components/layout/*` | 대형 파일(`liquid-ether-engine.tsx`) 수정 시 회귀 확인 필수 |
| i18n/콘텐츠 변경 | `src/i18n/messages/ko.json`, `src/i18n/messages/en.json`, `CLAUDE.md` | 한/영 동시 반영 |
| 품질 게이트/CI 수정 | `package.json`, `.github/workflows/*`, `docs/adr/0001-quality-gates.md` | 로컬/CI 커맨드 불일치 금지 |
| API/메타데이터 수정 | `src/app/api/*`, `src/app/robots.ts`, `src/app/sitemap.ts`, `docs/api-contract.md` | 계약 변경 시 CHANGELOG/ADR 동기화 |
| Harness 진단/정리 | `docs/harness/reports/*`, `docs/harness/residual-remediation-plan-2026-03-03.md` | 신규 진단 결과는 reports에 누적 |

## 3. 작업 전 체크리스트

- 범위가 문서인지 코드인지 먼저 확정했는가
- 기존 AGENTS/README/개발가이드와 충돌하지 않는가
- 업데이트가 필요한 연관 문서를 식별했는가

## 4. 작업 후 체크리스트

- `pnpm lint`, `pnpm typecheck`, `pnpm test` 최소 3개 검증을 실행했는가
- 품질 게이트 관련 변경이면 `pnpm verify:harness`까지 확인했는가
- 문서를 수정했으면 `docs/README.md` 링크 인덱스를 갱신했는가

