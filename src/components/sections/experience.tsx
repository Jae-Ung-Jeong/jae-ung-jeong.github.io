'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Building2, Calendar, ChevronDown, Users } from 'lucide-react';
import { SpotlightCard } from '@/components/common/spotlight-card';
import { formatDuration, getPeriodDuration } from '@/lib/duration';

interface Position {
  team: string;
  period: string;
  teamSize?: string;
  projects: string[];
  details?: Record<string, string[]>;
}

interface Org {
  name: string;
  type: string;
  period: string;
  positions: Record<string, Position>;
}

function DetailsCollapsible({
  details,
  showLabel,
  hideLabel,
}: {
  details?: Record<string, string[]>;
  showLabel: string;
  hideLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const groups = Object.values(details ?? {}).filter(
    (items) => Array.isArray(items) && items.length > 0
  );
  if (groups.length === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='mt-3'>
      <CollapsibleTrigger className='flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer'>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
        <span>{isOpen ? hideLabel : showLabel}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-3 p-3 liquid-glass-subtle space-y-3'>
        {groups.map((items, groupIndex) => (
          <div
            key={groupIndex}
            className='pl-3 border-l border-[var(--timeline-line)] space-y-1'
          >
            {items.map((item, i) => (
              <p key={i} className='text-xs text-muted-foreground'>
                • {item}
              </p>
            ))}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Experience() {
  const t = useTranslations('experience');
  const locale = useLocale();

  const orgs = Object.entries(t.raw('orgs') as Record<string, Org>);

  return (
    <section id='activities' className='py-20 md:py-32'>
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
          <p className='text-xl text-muted-foreground'>{t('subtitle')}</p>
        </motion.div>

        {/* Timeline */}
        <div className='max-w-4xl mx-auto space-y-8'>
          {orgs.map(([orgKey, org], orgIndex) => (
            <motion.div
              key={orgKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: orgIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <SpotlightCard>
                <Card className='overflow-hidden liquid-glass-interactive'>
                  {/* Org Header */}
                  <CardHeader className='bg-gradient-to-r from-primary/5 to-transparent'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                      <div className='flex items-center gap-3'>
                        <div className='p-2 rounded-lg liquid-glass-subtle'>
                          <Building2 className='h-5 w-5 text-point' />
                        </div>
                        <div>
                          <CardTitle className='text-xl'>{org.name}</CardTitle>
                          <p className='text-sm text-muted-foreground'>
                            {org.type}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Calendar className='h-4 w-4' />
                        <span>{org.period}</span>
                        <Badge variant='glass'>
                          {formatDuration(
                            getPeriodDuration(org.period),
                            locale
                          )}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Positions */}
                  <CardContent className='pt-6'>
                    <div className='space-y-6'>
                      {Object.entries(org.positions).map(
                        ([positionKey, position]) => (
                          <div
                            key={positionKey}
                            className='relative pl-6 border-l-2 border-[var(--timeline-line)]'
                          >
                            {/* Timeline dot */}
                            <div className='absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--timeline-dot-bg)] border-2 border-[var(--timeline-dot-border)] shadow-sm' />

                            <div className='mb-2'>
                              <h3 className='font-semibold'>{position.team}</h3>
                              <p className='text-sm text-muted-foreground'>
                                {position.period}
                              </p>
                              {position.teamSize && (
                                <div className='flex items-center gap-1 mt-1 text-xs text-muted-foreground'>
                                  <Users className='h-3 w-3' />
                                  <span>{position.teamSize}</span>
                                </div>
                              )}
                            </div>

                            <ul className='space-y-2'>
                              {position.projects.map((project, i) => (
                                <li
                                  key={i}
                                  className='flex items-start gap-2 text-sm text-muted-foreground'
                                >
                                  <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0' />
                                  <span>{project}</span>
                                </li>
                              ))}
                            </ul>

                            <DetailsCollapsible
                              details={position.details}
                              showLabel={t('showDetails')}
                              hideLabel={t('hideDetails')}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
