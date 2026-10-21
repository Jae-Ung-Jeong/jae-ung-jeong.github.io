# Development Guide

## 1. 로컬 실행

```bash
pnpm install
pnpm dev
```

작업 시작 전 문서 진입 순서:

1. `AGENTS.md`
2. `docs/agent-playbook.md`
3. `docs/development-guide.md`

## 2. 품질 게이트

```bash
pnpm verify:harness
```

개별 실행:

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm test
pnpm test:coverage
pnpm deps:cycles
pnpm knip
pnpm todo:check
pnpm build
pnpm test:file src/lib/duration.test.ts
```

## 3. 작업 흐름

1. 브랜치 생성: `codex/*`
2. 코드/문서 변경
3. `pnpm verify:harness` 통과
4. PR 생성 후 CI 통과 확인

## 4. 환경 변수/설정 주의

- `SKIP_RSS_FETCH=1`를 사용하면 RSS 네트워크 의존 없이 빌드 검증 가능
- 배포 도메인 변경 시 `src/app/robots.ts`, `src/app/sitemap.ts` 동시 수정

## 5. 참고 문서

- 에이전트 플레이북: `docs/agent-playbook.md`
- 아키텍처 개요: `docs/api-contract.md`
- 품질 게이트 ADR: `docs/adr/0001-quality-gates.md`
- 진단 리포트: `docs/harness/reports/`

## 6. 문서 동기화 규칙

- `AGENTS.md`, `docs/development-guide.md`, `docs/README.md`의 명령/경로는 항상 동일하게 유지
- 새 문서를 만들거나 경로를 바꾸면 `docs/README.md` 인덱스를 즉시 갱신
- 코드 TODO는 `TODO(#<issue_id>): ...` 형식으로 작성하고 `pnpm todo:check`를 통과해야 함
- 계약/정책 변경 시 `CHANGELOG.md`와 필요한 `docs/adr/*`를 함께 업데이트
