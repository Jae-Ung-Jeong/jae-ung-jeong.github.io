# Agent Guide

이 문서는 에이전트/개발자가 동일한 기준으로 작업하기 위한 실행 가이드입니다.

## Project Snapshot

- 앱 유형: Next.js App Router 기반 포트폴리오 웹앱
- 핵심 스택: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest
- 품질 게이트: lint, typecheck, format, test, coverage, deps:cycles, knip, todo:check, build

## Agent Reading Order

작업 시작 시 아래 순서로 문서를 읽습니다.

1. `AGENTS.md` (전역 규칙/명령)
2. `docs/agent-playbook.md` (작업 유형별 문서/코드 진입점)
3. `docs/development-guide.md` (실행/검증 절차)
4. 필요 시 `CLAUDE.md` (이력서 업데이트 전용 컨텍스트)

## Setup

```bash
pnpm install
```

## Core Commands

```bash
# 개발 서버
pnpm dev

# 전체 품질 게이트 (로컬/CI 공통)
pnpm verify:harness

# 개별 검증
pnpm lint
pnpm typecheck
pnpm format:check
pnpm test
pnpm test:coverage
pnpm deps:cycles
pnpm knip
pnpm todo:check
pnpm build

# 단일 테스트 파일 실행
pnpm test:file src/lib/duration.test.ts
```

## Architecture Map

- `src/app/`: 라우팅, 메타데이터, 글로벌 스타일, HTTP 엔드포인트
- `src/components/`: UI/레이아웃/섹션/공용 컴포넌트
- `src/i18n/`: 다국어 메시지 및 네비게이션
- `src/lib/`: 순수 유틸리티/도메인 로직
- `docs/`: 운영 문서, ADR, harness 리포트

## Coding Conventions

- TypeScript `strict` 유지, `any` 추가 금지
- 컴포넌트 파일은 역할 단위로 분리하고 UI/로직을 과도하게 혼합하지 않음
- 공통 유틸은 `src/lib`에 배치, 경로 alias `@/*` 사용
- TODO는 `TODO(#<issue_id>): <내용>` 형식을 준수
- 커밋 전 `pre-commit` 훅(lint-staged, typecheck, test) 통과 필수

## Environment Notes

- RSS fetch 회피 빌드: `SKIP_RSS_FETCH=1 pnpm build`
- 프로덕션 도메인 반영 필요 위치: `src/app/robots.ts`, `src/app/sitemap.ts`
- GA 사용 시 `src/lib/gtag.ts`와 타입 선언(`src/types/gtag.d.ts`) 동시 관리

## Common Gotchas

- `liquid-ether-engine.tsx`는 대형 렌더링 로직 파일이라 변경 시 성능/시각 회귀 확인 필수
- `verify:harness`는 빌드까지 포함하므로 작업 중에는 `lint/typecheck/test`를 먼저 순차 실행 권장
- 문서 변경 시 `docs/README.md`의 링크 인덱스도 함께 업데이트

## Source of Truth

- 엔지니어링 문서 인덱스: `docs/README.md`
- 에이전트 작업 플레이북: `docs/agent-playbook.md`
- 품질 게이트 ADR: `docs/adr/0001-quality-gates.md`
- 진단 이력: `docs/harness/reports/`
- 협업 컨텍스트: `CLAUDE.md`
