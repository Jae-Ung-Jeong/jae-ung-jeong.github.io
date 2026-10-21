import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://junheedot.com'),
  title: {
    default: '이준희 | Frontend Developer',
    template: '%s | 이준희',
  },
  description:
    '4년차 프론트엔드 개발자 이준희입니다. 비즈니스 임팩트 중심의 개발과 레거시 시스템 현대화 경험을 바탕으로 사용자 경험과 서비스 성장에 기여합니다.',
  keywords: [
    '프론트엔드',
    '개발자',
    'React',
    'Next.js',
    'TypeScript',
    '포트폴리오',
    '이준희',
  ],
  authors: [{ name: '이준희' }],
  creator: '이준희',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    siteName: '이준희 Portfolio',
    title: '이준희 | Frontend Developer',
    description:
      '4년차 프론트엔드 개발자 이준희입니다. 비즈니스 임팩트 중심의 개발과 레거시 시스템 현대화 경험을 바탕으로 사용자 경험과 서비스 성장에 기여합니다.',
    images: [
      {
        url: '/title_image.png',
        width: 1200,
        height: 630,
        alt: '이준희 Frontend Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이준희 | Frontend Developer',
    description: '4년차 프론트엔드 개발자 포트폴리오',
    images: ['/title_image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
