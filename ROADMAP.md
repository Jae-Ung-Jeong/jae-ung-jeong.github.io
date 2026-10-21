# Roadmap

## 기준선 (2026-03-04 Audit Refresh)

- 종합 등급/점수: **L4 / 79.3**
- 체크리스트: **66/84 (78.6%)**
- 목표: **L5(80+) 진입**

## 단기 (1~2주)

- [x] 테스트 커버리지 게이트 도입 (`pnpm test:coverage` + threshold + CI fail)
- [x] dead code 검사(`knip`) CI 통합
- [x] 순환 의존성 검사(`madge`) CI 통합
- [x] TODO-이슈 연동 규칙 문서화 (`src/app/robots.ts`, `src/app/sitemap.ts` TODO 포함)
- [x] `liquid-ether-engine.tsx`, `ascii-text.tsx` 1차 분해 (파일/역할 경계 축소)

## 중기 (1~2개월)

- [ ] import boundary lint 규칙 도입 (아키텍처 위반 import 차단)
- [ ] 에러 처리/로깅 패턴 표준화
- [ ] 신규 의존성 선정 근거 ADR 템플릿화

## 장기 (3개월+)

- [ ] 모듈별 테스트 대칭성 확장 (핵심 모듈 단위/통합 테스트 매트릭스)
- [ ] 배포/런타임 모니터링 고도화
- [ ] 문서-코드 동기화 자동 검증 (drift detector)
