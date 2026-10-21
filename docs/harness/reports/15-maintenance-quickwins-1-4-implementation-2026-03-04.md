# Harness Diagnostics Maintenance Report

- Date: 2026-03-04
- Scope: Quick Wins 1-4 implementation
- Related Plan: `docs/harness/residual-remediation-plan-2026-03-03.md`

## Implemented

1. Coverage gate
   - Added `test:coverage` script and `vitest.config.ts` thresholds
   - Added coverage step into `verify:harness`
2. Dead code gate
   - Added `knip` dependency and `knip.json`
   - Added `knip` step into `verify:harness`
3. Cycle gate
   - Added `deps:cycles` script using `madge`
   - Added cycle step into `verify:harness`
4. TODO issue-link policy
   - Added `todo:check` script (`scripts/check-todo-issue-links.mjs`)
   - Updated TODO comments to `TODO(#23): ...` in robots/sitemap
   - Synced policy docs (`AGENTS.md`, `docs/README.md`, `docs/development-guide.md`)

## Verification

- `pnpm lint`
- `pnpm typecheck`
- `pnpm format:check`
- `pnpm test`
- `pnpm test:coverage`
- `pnpm deps:cycles`
- `pnpm knip`
- `pnpm todo:check`
- `pnpm verify:harness`

## Notes

- `verify:harness` remains the single quality gate entry point for local and CI.
- Quick Win 5 is intentionally excluded from this maintenance step.
