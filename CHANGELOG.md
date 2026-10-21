# Changelog

모든 주요 변경은 이 문서에 기록합니다.

## [Unreleased]

### Added

- `docs/agent-playbook.md` 에이전트 작업 진입/동기화 플레이북 추가
- `AGENTS.md` 에이전트 실행 가이드 추가
- `docs/development-guide.md` 개발/검증 가이드 추가
- `docs/api-contract.md` API 계약 문서 추가
- `src/app/api/health/route.ts` health 체크 엔드포인트 추가
- `.github/PULL_REQUEST_TEMPLATE.md` PR 템플릿 추가
- `.github/dependabot.yml` 의존성 자동 업데이트 설정 추가
- `.github/workflows/security-audit.yml` 보안 audit 워크플로우 추가

### Changed

- `docs/README.md`, `docs/development-guide.md`, `README.md`, `CLAUDE.md`의 에이전트 문서 진입 링크 정렬
- `next`를 `16.0.8`에서 `16.0.11`로 업데이트 (고위험 취약점 대응)
- `eslint-config-next`를 `16.0.8`에서 `16.0.11`로 업데이트
