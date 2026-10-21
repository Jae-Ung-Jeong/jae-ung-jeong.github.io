# ADR 0001: Unified Quality Gates for Agent-Friendly Workflow

- Status: Accepted
- Date: 2026-03-03

## Context

코드베이스는 lint/typecheck/format/test/build 검증이 분산되어 있었고,
CI 및 pre-commit 자동화가 없어 에이전트/개발자 협업 시 drift가 쉽게 발생했다.

## Decision

1. 단일 검증 엔트리로 `pnpm verify:harness`를 도입한다.
2. CI에서 `verify:harness`를 강제한다.
3. pre-commit에서 lint-staged + typecheck + test를 강제한다.
4. 변경 단계별로 harness-diagnostics Maintenance 리포트를 남긴다.

## Consequences

### Positive

- 동일한 품질 기준이 로컬/CI 모두에서 재현된다.
- 에이전트 작업 결과 검증이 자동화되어 리뷰 비용이 감소한다.
- 변경 이력이 진단 리포트에 누적되어 drift 추적이 쉬워진다.

### Negative

- pre-commit 시간이 증가한다.
- 테스트/빌드 비용이 커질 수 있어 점진적 최적화가 필요하다.

## Follow-up

- 대형 컴포넌트(`liquid-ether`)를 모듈화하여 lint 경고와 유지보수 비용을 낮춘다.
- 테스트 범위를 `src/lib` 외 주요 UI 로직으로 확장한다.
