'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, Zap, ArrowUpRight } from 'lucide-react';
import { BusinessImpactModal } from './business-impact-modal';
import { SpotlightCard } from '@/components/common/spotlight-card';
import * as gtag from '@/lib/gtag';

interface ApproachItem {
  key: string;
  title: string;
  description: string;
  examples: string[];
  images: string[];
}

export function About() {
  const t = useTranslations('about');
  const [selectedApproach, setSelectedApproach] = useState<string | null>(null);

  const highlights = [
    {
      key: 'spot',
      logo: '/images/logos/dns_ever_logo.png',
      logoAlt: 'D&S Ever',
    },
    {
      key: 'p2p',
      logo: '/images/logos/dns_ever_logo.png',
      logoAlt: 'D&S Ever',
    },
    {
      key: 'seo',
      logo: '/images/logos/eazel.jpeg',
      logoAlt: 'Eazel',
    },
  ];

  return (
    <section id='about' className='py-20 md:py-32'>
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

        {/* Highlight Cards - Bento Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SpotlightCard className='h-full'>
                <Card className='h-full liquid-glass-interactive'>
                  <CardHeader>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='relative w-8 h-8 rounded-lg overflow-hidden liquid-glass-subtle'>
                        <Image
                          src={highlight.logo}
                          alt={highlight.logoAlt}
                          fill
                          sizes='32px'
                          className='object-contain'
                        />
                      </div>
                      <Badge variant='glass'>
                        {t(`highlights.${highlight.key}.company`)}
                      </Badge>
                    </div>
                    <CardTitle className='text-xl'>
                      {t(`highlights.${highlight.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground mb-4'>
                      {t(`highlights.${highlight.key}.description`)}
                    </p>
                    <ul className='space-y-2'>
                      {(
                        t.raw(`highlights.${highlight.key}.metrics`) as string[]
                      ).map((metric: string, i: number) => (
                        <li
                          key={i}
                          className='flex items-start gap-2 text-sm text-muted-foreground'
                        >
                          <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0' />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Development Approach Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className='mt-12'
        >
          <Card className='liquid-glass'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='p-2 rounded-lg liquid-glass-subtle'>
                  <Zap className='h-5 w-5 text-point' />
                </div>
                <CardTitle className='text-xl'>{t('approach.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {(t.raw('approach.items') as ApproachItem[]).map(
                  (item, index) => (
                    <SpotlightCard key={item.key}>
                      <div
                        className='p-4 liquid-glass-interactive cursor-pointer group h-full'
                        onClick={() => {
                          setSelectedApproach(item.key);
                          gtag.event({
                            action: 'open',
                            category: 'modal',
                            label: `business_impact_${item.key}`,
                          });
                        }}
                      >
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center gap-2'>
                            <div className='p-1.5 rounded-md liquid-glass-subtle'>
                              {index === 0 ? (
                                <TrendingUp className='h-4 w-4 text-point' />
                              ) : (
                                <BarChart3 className='h-4 w-4 text-point' />
                              )}
                            </div>
                            <h3 className='font-semibold group-hover:text-primary transition-colors'>
                              {item.title}
                            </h3>
                          </div>
                          <ArrowUpRight className='h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all' />
                        </div>
                        <p className='text-sm text-muted-foreground mb-3'>
                          {item.description}
                        </p>
                        <ul className='space-y-1.5'>
                          {item.examples.map((example: string, i: number) => (
                            <li
                              key={i}
                              className='flex items-start gap-2 text-sm text-muted-foreground'
                            >
                              <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-point shrink-0' />
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SpotlightCard>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Business Impact Modal */}
      <BusinessImpactModal
        itemKey={selectedApproach}
        open={!!selectedApproach}
        onOpenChange={(open) => !open && setSelectedApproach(null)}
      />
    </section>
  );
}
