'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/providers/theme-provider';
import ASCIIText from '@/components/common/ascii-text';

export default function NotFound() {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
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
              Page Not Found
            </h2>
            <p className='text-muted-foreground'>
              The page you are looking for does not exist or may have been
              moved.
            </p>
          </div>
          <Button asChild>
            <Link href='/'>
              <Home className='mr-2 h-4 w-4' />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
