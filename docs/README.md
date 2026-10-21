# Engineering Docs

## Agent Entry

에이전트는 아래 순서로 문서를 확인합니다.

1. `AGENTS.md`
2. `docs/agent-playbook.md`
3. `docs/development-guide.md`
4. `CLAUDE.md` (이력서 업데이트 작업일 때만)

## Quality Gates

프로젝트의 기본 품질 게이트는 아래 명령 하나로 확인합니다.

```bash
pnpm verify:harness
```

검증 순서:

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm format:check`
4. `pnpm test`
5. `pnpm test:coverage`
6. `pnpm deps:cycles`
7. `pnpm knip`
8. `pnpm todo:check`
9. `pnpm build`

## CI

- 파일: `.github/workflows/quality-gates.yml`
- `main` 브랜치 push와 `main` 대상 PR에서 `verify:harness`를 실행합니다.
- 보안 감사: `.github/workflows/security-audit.yml`에서 `pnpm audit:security`를 실행합니다.

## Pre-commit

Husky + lint-staged가 커밋 전에 아래를 자동 실행합니다.

1. `prettier --write` (staged 파일)
2. `eslint --fix` (staged 파일)
3. `pnpm typecheck`
4. `pnpm test`

## TODO Policy

- 코드 TODO는 `TODO(#<issue_id>): <description>` 형식을 사용합니다.
- 형식 검증은 `pnpm todo:check`로 실행됩니다.

## Harness Diagnostics Reports

진단 기록은 아래 경로에 누적합니다.

- `docs/harness/reports/`

## Additional Docs

- 에이전트 플레이북: `docs/agent-playbook.md`
- 개발 가이드: `docs/development-guide.md`
- API 계약: `docs/api-contract.md`
- ADR: `docs/adr/0001-quality-gates.md`
- 변경 이력: `CHANGELOG.md`
- 로드맵: `ROADMAP.md`
