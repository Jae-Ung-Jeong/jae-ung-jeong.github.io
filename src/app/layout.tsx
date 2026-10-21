import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import './globals.css';

const title = `${siteConfig.name} | ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords, siteConfig.name],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    siteName: `${siteConfig.name} Portfolio`,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary',
    title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
