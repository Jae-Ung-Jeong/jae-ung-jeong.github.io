# API Contract

이 프로젝트는 Next.js 서버 라우트를 최소한으로 사용하며, 현재 공개 계약은 health 체크 엔드포인트입니다.

## GET `/api/health`

- 목적: 런타임 상태 확인 (liveness probe)
- 구현: `src/app/api/health/route.ts`

### Response

```json
{
  "status": "ok",
  "service": "my-dev-portfolio",
  "timestamp": "2026-03-03T00:00:00.000Z"
}
```

### Status Codes

- `200 OK`: 정상 응답

## 변경 정책

- 응답 필드 변경 시 `docs/adr/`에 결정 배경을 기록
- breaking change 시 `CHANGELOG.md`에 명시
