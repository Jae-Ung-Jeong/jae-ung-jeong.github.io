# Collaboration Context (Resume Update)

이 문서는 이력서 기반 콘텐츠 업데이트 작업에 필요한 컨텍스트만 다룹니다.
일반 개발/검증 명령은 `AGENTS.md`, `docs/agent-playbook.md`, `docs/development-guide.md`를 기준으로 사용합니다.

## 작업 목적

- 새 이력서(PDF) 기준으로 포트폴리오 콘텐츠를 최신화
- 다국어 메시지(`ko.json`, `en.json`) 동기화
- 필요 시 관련 섹션 컴포넌트 업데이트

## 업데이트 워크플로우

1. `resume/` 폴더의 최신 PDF 확인
2. `src/i18n/messages/ko.json`, `src/i18n/messages/en.json`과 diff 분석
3. 변경/추가 항목 정리
4. 사용자 확인 후 메시지 파일 반영
5. UI 노출 변경이 있으면 관련 섹션 컴포넌트 수정

## 업데이트 체크포인트

- 경력/프로젝트/기술스택/교육/자격증 변경 여부
- 수치 기반 성과(기간, 지표) 누락 여부
- 한/영 번역 정합성
- 다운로드용 이력서 경로 최신화 여부

## 주요 경로

- 이력서 원본: `resume/이준희 이력서-YYMMDD.pdf`
- 다운로드용 이력서: `public/resume/resume-YYMMDD.pdf`
- 한글 메시지: `src/i18n/messages/ko.json`
- 영어 메시지: `src/i18n/messages/en.json`
- 관련 섹션: `src/components/sections/`
