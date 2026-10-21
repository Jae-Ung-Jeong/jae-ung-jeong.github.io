'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ASCIIText from '@/components/common/ascii-text';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center'>
      <div className='relative w-full max-w-2xl h-48 mb-8'>
        <ASCIIText
          text='404'
          asciiFontSize={10}
          textFontSize={300}
          planeBaseHeight={12}
          enableWaves={true}
        />
      </div>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            {t('title')}
          </h2>
          <p className='text-muted-foreground'>{t('description')}</p>
        </div>
        <Button asChild>
          <Link href={`/${locale}`}>
            <Home className='mr-2 h-4 w-4' />
            {t('backHome')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
