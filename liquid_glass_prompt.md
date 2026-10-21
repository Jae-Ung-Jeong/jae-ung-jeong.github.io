# Apple Liquid Glass Design System

iOS 26에서 도입된 Apple Liquid Glass 디자인 언어를 웹 프로젝트에 적용하기 위한 가이드입니다.

## 디자인 원칙

### 1. Hierarchy (계층)
- 컨트롤이 콘텐츠 위에 떠있는 레이어로 존재
- Glass 효과로 깊이감과 레이어 구분 표현
- 배경 콘텐츠가 비쳐 보이면서도 UI 요소는 명확하게 구분

### 2. Harmony (조화)
- 하드웨어, 콘텐츠, 컨트롤의 조화로운 균형
- 배경에 따라 동적으로 변화하는 유리 효과
- 브랜드 색상과 glass 효과의 자연스러운 조화

### 3. Consistency (일관성)
- 다크/라이트 모드에서 일관된 경험
- 모든 컴포넌트에 통일된 glass 스타일 적용
- 크로스 플랫폼 일관성 유지

---

## CSS 변수 정의

### Light Mode
```css
:root {
  /* Liquid Glass - Light Mode */
  --glass-bg: rgba(255, 255, 255, 0.4);
  --glass-bg-elevated: rgba(255, 255, 255, 0.6);
  --glass-bg-subtle: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.5);
  --glass-border-subtle: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.08);
  --glass-shadow-strong: rgba(0, 0, 0, 0.15);
  --glass-highlight: rgba(255, 255, 255, 0.6);
  --glass-refraction: rgba(255, 255, 255, 0.1);
  --glass-blur: 20px;
  --glass-blur-strong: 40px;
  --glass-blur-subtle: 10px;
  --glass-radius: 20px;
  --glass-radius-lg: 28px;
  --glass-radius-sm: 12px;
}
```

### Dark Mode
```css
.dark {
  /* Liquid Glass - Dark Mode */
  --glass-bg: rgba(30, 30, 40, 0.5);
  --glass-bg-elevated: rgba(40, 40, 55, 0.6);
  --glass-bg-subtle: rgba(25, 25, 35, 0.4);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-border-subtle: rgba(255, 255, 255, 0.08);
  --glass-shadow: rgba(0, 0, 0, 0.25);
  --glass-shadow-strong: rgba(0, 0, 0, 0.4);
  --glass-highlight: rgba(255, 255, 255, 0.15);
  --glass-refraction: rgba(255, 255, 255, 0.05);
}
```

---

## 유틸리티 클래스

### 1. `.liquid-glass` - 기본 유리 효과
카드, 컨테이너 등 일반적인 UI 요소에 사용

```css
.liquid-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow:
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}
```

### 2. `.liquid-glass-elevated` - 강화된 유리 효과
모달, 팝오버, 툴팁 등 떠있는 요소에 사용

```css
.liquid-glass-elevated {
  background: var(--glass-bg-elevated);
  backdrop-filter: blur(var(--glass-blur-strong));
  -webkit-backdrop-filter: blur(var(--glass-blur-strong));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius-lg);
  box-shadow:
    0 25px 50px -12px var(--glass-shadow-strong),
    0 12px 24px -8px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}
```

### 3. `.liquid-glass-subtle` - 미묘한 유리 효과
뱃지, 태그, 작은 버튼 등에 사용

```css
.liquid-glass-subtle {
  background: var(--glass-bg-subtle);
  backdrop-filter: blur(var(--glass-blur-subtle));
  -webkit-backdrop-filter: blur(var(--glass-blur-subtle));
  border: 1px solid var(--glass-border-subtle);
  border-radius: var(--glass-radius-sm);
}
```

### 4. `.liquid-glass-interactive` - 인터랙티브 유리 효과
호버 애니메이션이 포함된 클릭 가능한 요소에 사용

```css
.liquid-glass-interactive {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow:
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.liquid-glass-interactive:hover {
  background: var(--glass-bg-elevated);
  box-shadow:
    0 12px 40px var(--glass-shadow),
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight);
  transform: translateY(-2px);
}
```

### 5. `.glass-refraction` - 빛 굴절 효과
호버 시 빛이 굴절되는 효과 (glass 클래스와 함께 사용)

```css
.glass-refraction {
  position: relative;
  overflow: hidden;
}

.glass-refraction::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    125deg,
    transparent 0%,
    var(--glass-refraction) 25%,
    transparent 50%,
    var(--glass-refraction) 75%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
  border-radius: inherit;
}

.glass-refraction:hover::before {
  opacity: 1;
}
```

### 6. `.glass-glow` - 발광 효과
CTA 버튼, 강조 요소에 사용

```css
.glass-glow {
  box-shadow:
    0 0 30px color-mix(in srgb, var(--gradient-mid) 20%, transparent),
    0 8px 32px var(--glass-shadow);
}
```

---

## 컴포넌트 적용 가이드

### Card
```tsx
<div className="liquid-glass-interactive glass-refraction">
  {/* 카드 내용 */}
</div>
```

### Button (Glass Variant)
```tsx
// 기본 glass 버튼
<button className="liquid-glass hover:scale-[1.02] active:scale-[0.98] rounded-xl">
  버튼
</button>

// 발광 효과 버튼
<button className="liquid-glass glass-glow rounded-xl">
  CTA 버튼
</button>
```

### Badge
```tsx
<span className="liquid-glass-subtle rounded-full px-3 py-1 text-xs">
  태그
</span>

// 또는 glass variant
<span className="liquid-glass rounded-full px-3 py-1 text-xs">
  강조 태그
</span>
```

### Dialog/Modal
```tsx
// Overlay
<div className="bg-black/40 backdrop-blur-sm" />

// Content
<div className="liquid-glass-elevated">
  {/* 모달 내용 */}
</div>
```

### Header (플로팅 스타일)
```tsx
<header className="fixed top-0 left-0 right-0 z-50 p-4">
  <div className="liquid-glass-elevated mx-auto max-w-7xl">
    {/* 헤더 내용 */}
  </div>
</header>
```

### Tooltip
```tsx
<div className="liquid-glass-elevated px-3 py-2 text-xs">
  툴팁 내용
</div>
```

---

## 성능 최적화

### 모바일 블러 감소
모바일에서 성능을 위해 블러 값 감소

```css
@media (max-width: 768px) {
  :root {
    --glass-blur: 12px;
    --glass-blur-strong: 20px;
    --glass-blur-subtle: 8px;
  }
}
```

### Reduced Motion 지원
애니메이션 감소 선호 사용자를 위한 설정

```css
@media (prefers-reduced-motion: reduce) {
  .glass-refraction::before,
  .liquid-glass-interactive {
    transition: none !important;
  }

  .liquid-glass-interactive:hover {
    transform: none;
  }
}
```

---

## 애니메이션

### Glass Shimmer (빛 반짝임)
```css
@keyframes glass-shimmer {
  0% {
    transform: translateX(-100%) rotate(-45deg);
  }
  100% {
    transform: translateX(100%) rotate(-45deg);
  }
}

.animate-glass-shimmer {
  animation: glass-shimmer 4s ease-in-out infinite;
}
```

### Glass Pulse (박동 효과)
```css
@keyframes glass-pulse {
  0%, 100% {
    box-shadow: 0 0 20px var(--glass-shadow);
  }
  50% {
    box-shadow: 0 0 40px var(--glass-shadow), 0 0 60px var(--glass-shadow);
  }
}

.animate-glass-pulse {
  animation: glass-pulse 3s ease-in-out infinite;
}
```

---

## 사용 예시 조합

### 인터랙티브 카드 + 굴절 효과
```html
<div class="liquid-glass-interactive glass-refraction p-6">
  <h3>카드 제목</h3>
  <p>카드 내용...</p>
</div>
```

### 플로팅 헤더 + 네비게이션
```html
<header class="fixed top-0 p-4">
  <nav class="liquid-glass-elevated">
    <div class="liquid-glass-subtle rounded-xl p-1">
      <button class="hover:liquid-glass-subtle rounded-lg px-4 py-2">메뉴1</button>
      <button class="hover:liquid-glass-subtle rounded-lg px-4 py-2">메뉴2</button>
    </div>
  </nav>
</header>
```

### CTA 버튼 그룹
```html
<div class="flex gap-4">
  <button class="liquid-glass glass-glow px-6 py-3 rounded-xl">
    주요 액션
  </button>
  <button class="liquid-glass px-6 py-3 rounded-xl">
    보조 액션
  </button>
</div>
```

---

## 참고 자료

- [Apple Liquid Glass 공식 문서](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass)
- [Apple Design Gallery](https://developer.apple.com/design/new-design-gallery/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
