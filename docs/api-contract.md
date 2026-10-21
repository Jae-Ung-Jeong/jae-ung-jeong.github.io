# API Contract

이 프로젝트는 GitHub Pages 배포를 위해 정적 export(`output: 'export'`)로 빌드하므로 서버 라우트(API Route, 미들웨어)를 사용하지 않습니다.

- 새 API Route나 미들웨어를 추가하면 정적 export 빌드가 실패합니다.
- 서버 기능이 필요해지면 Vercel 등 Node 런타임 호스팅으로 옮긴 뒤 이 문서를 갱신합니다.
