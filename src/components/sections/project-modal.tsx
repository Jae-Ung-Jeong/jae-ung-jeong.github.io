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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Briefcase, Users } from 'lucide-react';

interface ProjectModalProps {
  projectKey: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Generate descriptive alt text from image filename
 * e.g., "/images/projects/spot/spot_sell_coin.gif" → "SPOT Exchange - spot sell coin"
 */
function getAltFromFilename(imagePath: string, projectTitle: string): string {
  const filename =
    imagePath
      .split('/')
      .pop()
      ?.replace(/\.(gif|png|jpg|jpeg|webp)$/i, '') || '';
  const readable = filename.replace(/_/g, ' ');
  return `${projectTitle} - ${readable}`;
}

export function ProjectModal({
  projectKey,
  open,
  onOpenChange,
}: ProjectModalProps) {
  const t = useTranslations('projects');

  if (!projectKey) return null;

  const title = t(`items.${projectKey}.title`);
  const role = t(`items.${projectKey}.role`);
  const period = t(`items.${projectKey}.period`);
  const tech = t.raw(`items.${projectKey}.tech`) as string[];
  const achievements = t.raw(`items.${projectKey}.achievements`) as string[];
  const overview = t(`items.${projectKey}.detail.overview`);
  const tasks = t.raw(`items.${projectKey}.detail.tasks`) as string[];
  const images = t.raw(`items.${projectKey}.images`) as string[];

  // Get teamSize if exists
  let teamSize: string | null = null;
  try {
    teamSize = t(`items.${projectKey}.teamSize`);
  } catch {
    teamSize = null;
  }

  const hasImages = images && images.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
          <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2'>
            <div className='flex items-center gap-2'>
              <Briefcase className='h-4 w-4' />
              <span>{role}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span>{period}</span>
            </div>
            {teamSize && (
              <div className='flex items-center gap-2'>
                <Users className='h-4 w-4' />
                <span>{teamSize}</span>
              </div>
            )}
          </div>
        </DialogHeader>

        {/* Image Carousel */}
        {hasImages && (
          <div className='mt-4'>
            <Carousel className='w-full'>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className='relative aspect-video rounded-lg overflow-hidden bg-muted'>
                      <Image
                        src={image}
                        alt={getAltFromFilename(image, title)}
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

        {/* Overview */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
            <span className='w-1 h-5 bg-primary rounded-full' />
            {t('modal.overview')}
          </h3>
          <p className='text-muted-foreground leading-relaxed'>{overview}</p>
        </div>

        <Separator className='my-4' />

        {/* Key Tasks */}
        <div>
          <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
            <span className='w-1 h-5 bg-primary rounded-full' />
            {t('modal.tasks')}
          </h3>
          <ul className='space-y-2'>
            {tasks.map((task, index) => (
              <li
                key={index}
                className='flex items-start gap-3 text-muted-foreground'
              >
                <span className='mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0' />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className='my-4' />

        {/* Tech Stack */}
        <div>
          <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
            <span className='w-1 h-5 bg-primary rounded-full' />
            {t('modal.techStack')}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {tech.map((item) => (
              <Badge key={item} variant='secondary' className='text-sm'>
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className='my-4' />

        {/* Achievements */}
        <div>
          <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
            <span className='w-1 h-5 bg-primary rounded-full' />
            {t('modal.achievements')}
          </h3>
          <ul className='space-y-2'>
            {achievements.map((achievement, index) => (
              <li
                key={index}
                className='flex items-start gap-3 text-muted-foreground'
              >
                <span className='mt-2 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0' />
                <span className='font-medium text-foreground'>
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
