'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel';

interface ApproachItem {
  key: string;
  title: string;
  description: string;
  examples: string[];
  images: string[];
}

interface BusinessImpactModalProps {
  itemKey: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getAltFromFilename(imagePath: string, title: string): string {
  const filename =
    imagePath
      .split('/')
      .pop()
      ?.replace(/\.(gif|png|jpg|jpeg|webp)$/i, '') || '';
  const readable = filename.replace(/[_-]/g, ' ');
  return `${title} - ${readable}`;
}

export function BusinessImpactModal({
  itemKey,
  open,
  onOpenChange,
}: BusinessImpactModalProps) {
  const t = useTranslations('about');

  if (!itemKey) return null;

  const items = t.raw('approach.items') as ApproachItem[];
  const item = items.find((i) => i.key === itemKey);

  if (!item) return null;

  const hasImages = item.images && item.images.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>{item.title}</DialogTitle>
        </DialogHeader>

        {/* Image Carousel */}
        {hasImages && (
          <div className='mt-4'>
            <Carousel className='w-full'>
              <CarouselContent>
                {item.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className='relative aspect-video rounded-lg overflow-hidden bg-muted'>
                      <Image
                        src={image}
                        alt={getAltFromFilename(image, item.title)}
                        fill
                        sizes='(max-width: 768px) 100vw, 600px'
                        className='object-contain'
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <CarouselDots />
            </Carousel>
          </div>
        )}

        {/* Description */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
            <span className='w-1 h-5 bg-primary rounded-full' />
            설명
          </h3>
          <p className='text-muted-foreground leading-relaxed'>
            {item.description}
          </p>
        </div>

        {/* Examples */}
        <div className='mt-4'>
          <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
            <span className='w-1 h-5 bg-primary rounded-full' />
            주요 성과
          </h3>
          <ul className='space-y-2'>
            {item.examples.map((example, index) => (
              <li
                key={index}
                className='flex items-start gap-3 text-muted-foreground'
              >
                <span className='mt-2 w-1.5 h-1.5 rounded-full bg-point shrink-0' />
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
