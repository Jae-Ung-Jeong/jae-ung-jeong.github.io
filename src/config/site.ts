/**
 * 사이트 전역 개인 정보 설정.
 * 이 파일만 고치면 메타데이터, 링크, GA, 블로그 RSS가 함께 바뀝니다.
 * 빈 문자열('')로 두면 해당 링크/기능은 화면에서 숨겨집니다.
 * 섹션 본문(경력, 프로젝트 등)은 src/i18n/messages/{ko,en}.json에서 관리합니다.
 */
export const siteConfig = {
  // 배포 도메인 (sitemap, robots, canonical, OG에 사용)
  url: 'https://jae-ung-jeong.github.io',

  name: '정재웅',
  role: 'AI 서비스 기획자',
  description:
    '흐름을 설계하고, 숫자로 검증하는 AI 서비스 기획자 정재웅입니다. 반도체 공학과 컴퓨터공학을 거쳐 사람이 믿고 쓸 수 있는 AI 서비스를 기획합니다.',
  keywords: [
    'AI 서비스 기획',
    'PM',
    'LLM',
    'RAG',
    'AI 에이전트',
    'SKALA',
    '포트폴리오',
  ],

  // public/ 기준 경로. 예: public/resume/resume.pdf → '/resume/resume.pdf'
  resumePath: '',

  // Google Analytics 4 측정 ID (예: 'G-XXXXXXXXXX'). 비우면 GA 스크립트를 넣지 않음
  gaId: '',

  // 블로그 RSS 주소 (예: 'https://<id>.tistory.com/rss'). 비우면 블로그 섹션 숨김
  blogRssUrl: '',

  links: {
    email: 'dnd2sla@gmail.com',
    github: {
      url: 'https://github.com/Jae-Ung-Jeong',
      username: 'Jae-Ung-Jeong',
    },
    linkedin: { url: '', username: '' },
    tistory: { url: '', username: '' },
    velog: { url: '', username: '' },
  },
};
