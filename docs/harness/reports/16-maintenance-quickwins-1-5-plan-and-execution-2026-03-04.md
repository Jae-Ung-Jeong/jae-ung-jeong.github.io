# Harness Diagnostics Maintenance Plan & Execution

- Date: 2026-03-04
- Scope: Quick Wins 1-5
- Source Report: `harness-diagnostics` Audit (L4, 79.3/100)

## 1) Plan v1

1. Update roadmap baseline with latest audit score and checklist ratio.
2. Re-validate Quick Wins 1-4 guardrails stay active:
   - `test:coverage`
   - `deps:cycles`
   - `knip`
   - `todo:check`
3. Implement Quick Win 5 first-stage modularization:
   - Split `ascii-text.tsx` into component/engine/style modules.
   - Split `liquid-ether-engine.tsx` into shader/types/config helper modules.
4. Sync harness documents:
   - Mark Quick Win 5 done in roadmap.
   - Add progress row and maintenance report.
5. Run `pnpm verify:harness`, then PR/merge.

## 2) Self-Evaluation of Plan v1

보완 필요 항목:

- Plan v1은 "분해 완료" 기준이 추상적이라 구현자가 판단해야 하는 여지가 있음.
- 모듈 분해 후 회귀 방지 기준(동일 export 계약, 빌드/검증 통과)이 명확히 숫자로 고정되지 않음.
- 문서 동기화 범위(`ROADMAP`, `progress`, 상세 리포트)의 완료 조건이 약함.

## 3) Plan v2 (Improved, Decision-Complete)

1. **Roadmap update**
   - `ROADMAP.md` baseline을 79.3/66-84로 갱신.
2. **Quick Win 5 decomposition target**
   - `ascii-text.tsx`에서 엔진 로직/셰이더/CSS 문자열을 분리:
     - `ascii-text-engine.ts`
     - `ascii-text-styles.ts`
   - `liquid-ether-engine.tsx`에서 셰이더/타입/설정 유틸을 분리:
     - `liquid-ether-shaders.ts`
     - `liquid-ether-types.ts`
     - `liquid-ether-utils.ts`
3. **Compatibility constraints**
   - 기존 public API 유지:
     - `liquid-ether.tsx`의 `LiquidEther` default export 유지
     - `LiquidEtherProps` 타입 재-export 유지
     - `ASCIIText` props 시그니처 유지
4. **Acceptance criteria**
   - `pnpm verify:harness` 통과
   - 순환 의존성(`deps:cycles`) 통과
   - TODO policy(`todo:check`) 통과
   - Quick Win 5 roadmap 체크 상태를 `[x]`로 반영
5. **Delivery**
   - 기능 브랜치에서 커밋
   - PR 생성
   - CI pass 확인 후 squash merge

## 4) Execution Log

- Completed roadmap baseline update (`ROADMAP.md`):
  - L4 / 79.3
  - 66/84 (78.6%)
- Revalidated Quick Wins 1-4 guardrails:
  - `test:coverage`, `deps:cycles`, `knip`, `todo:check`
- Implemented Quick Win 5 modularization:
  - `ascii-text.tsx` split into:
    - `ascii-text-engine.ts`
    - `ascii-text-styles.ts`
    - slimmed `ascii-text.tsx` component wrapper
  - `liquid-ether-engine.tsx` split into:
    - `liquid-ether-shaders.ts`
    - `liquid-ether-types.ts`
    - `liquid-ether-utils.ts`
- API compatibility preserved:
  - `LiquidEther` default export unchanged
  - `LiquidEtherProps` re-export moved to `liquid-ether-types.ts`
- Acceptance checks:
  - `pnpm verify:harness` passed
  - `pnpm deps:cycles` passed
  - `pnpm todo:check` passed
  - Roadmap Quick Win 5 marked done
