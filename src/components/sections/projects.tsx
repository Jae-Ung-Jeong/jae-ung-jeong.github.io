'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { ProjectModal } from './project-modal';
import { SpotlightCard } from '@/components/common/spotlight-card';
import * as gtag from '@/lib/gtag';

export function Projects() {
  const t = useTranslations('projects');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      key: 'spot',
      logo: '/images/logos/dns_ever_logo.png',
      logoAlt: 'D&S Ever',
      cardVariant: 'editorial' as const,
      spotlightColor: 'rgba(110, 140, 255, 0.16)',
    },
    {
      key: 'p2p',
      logo: '/images/logos/dns_ever_logo.png',
      logoAlt: 'D&S Ever',
      cardVariant: 'glass' as const,
      spotlightColor: 'rgba(110, 205, 255, 0.14)',
    },
    {
      key: 'kyc',
      logo: '/images/logos/dns_ever_logo.png',
      logoAlt: 'D&S Ever',
      cardVariant: 'solid' as const,
      spotlightColor: 'rgba(140, 230, 200, 0.14)',
    },
    {
      key: 'eazel',
      logo: '/images/logos/eazel.jpeg',
      logoAlt: 'Eazel',
      cardVariant: 'outline' as const,
      spotlightColor: 'rgba(246, 180, 120, 0.12)',
    },
  ];

  return (
    <section id='projects' className='py-20 md:py-32 scroll-mt-28'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{t('title')}</h2>
        </motion.div>

        {/* Projects Grid - Bento Style */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          {projects.map((project, index) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={index === 0 || index === 3 ? 'md:col-span-1' : ''}
            >
              <SpotlightCard
                className='h-full md:h-[520px]'
                spotlightColor={project.spotlightColor}
              >
                <Card
                  variant={project.cardVariant}
                  className='h-full group overflow-hidden cursor-pointer flex flex-col'
                  onClick={() => {
                    setSelectedProject(project.key);
                    gtag.event({
                      action: 'open',
                      category: 'modal',
                      label: `project_${project.key}`,
                    });
                  }}
                >
                  {/* Preview */}
                  <div className='relative h-44 md:h-48 overflow-hidden border-b border-white/10'>
                    {(t.raw(`items.${project.key}.images`) as string[]).length >
                    0 ? (
                      <Image
                        src={
                          (t.raw(`items.${project.key}.images`) as string[])[0]
                        }
                        alt={t(`items.${project.key}.title`)}
                        fill
                        sizes='(max-width: 768px) 100vw, 520px'
                        className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                        unoptimized
                      />
                    ) : (
                      <div className='h-full w-full gradient-bg opacity-30' />
                    )}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent' />
                    <div className='absolute bottom-3 left-4 right-4 flex items-center justify-between'>
                      <div className='inline-flex items-center gap-2 rounded-full bg-black/35 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-sm'>
                        <div className='relative h-5 w-5 overflow-hidden rounded-full ring-1 ring-white/30'>
                          <Image
                            src={project.logo}
                            alt={project.logoAlt}
                            fill
                            sizes='20px'
                            className='object-cover'
                          />
                        </div>
                        <span className='line-clamp-1'>
                          {t(`items.${project.key}.period`)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-lg leading-snug group-hover:text-primary transition-colors'>
                          {t(`items.${project.key}.title`)}
                        </CardTitle>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {t(`items.${project.key}.role`)}
                        </p>
                      </div>
                      <ArrowUpRight className='h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all' />
                    </div>
                  </CardHeader>

                  <CardContent className='flex-1 space-y-4'>
                    <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
                      {t(`items.${project.key}.description`)}
                    </p>

                    {/* Tech Stack */}
                    <div className='flex flex-wrap gap-2'>
                      {(t.raw(`items.${project.key}.tech`) as string[]).map(
                        (tech: string, techIndex: number) => (
                          <Badge
                            key={tech}
                            variant={
                              techIndex === 0
                                ? 'accent'
                                : techIndex < 3
                                  ? 'flat'
                                  : 'outline'
                            }
                            className='text-xs'
                          >
                            {tech}
                          </Badge>
                        )
                      )}
                    </div>

                    {/* Achievements */}
                    <ul className='space-y-2 border-l border-border/70 pl-3'>
                      {(t.raw(`items.${project.key}.achievements`) as string[])
                        .slice(0, 2)
                        .map((achievement: string, i: number) => (
                          <li
                            key={i}
                            className='flex items-start gap-2 text-xs text-muted-foreground leading-relaxed'
                          >
                            <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-point shrink-0' />
                            <span>{achievement}</span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        projectKey={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </section>
  );
}
