import { defaultLocale } from '@/i18n/config';

const target = `/${defaultLocale}/`;

// 정적 export에는 미들웨어가 없으므로 루트(/)에서 기본 로케일로 이동
export default function RootPage() {
  return (
    <html lang={defaultLocale}>
      <head>
        <meta httpEquiv='refresh' content={`0; url=${target}`} />
        <link rel='canonical' href={target} />
      </head>
      <body>
        <a href={target}>{target}</a>
      </body>
    </html>
  );
}
