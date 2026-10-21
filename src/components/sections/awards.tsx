'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

export function Awards() {
  const tCert = useTranslations('certifications');

  const certifications = tCert.raw('items') as Array<{
    name: string;
    org: string;
    date: string;
  }>;

  return (
    <section id='awards' className='py-20 md:py-32 scroll-mt-28'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className='flex items-center gap-3 mb-8'>
              <div className='p-2 rounded-lg liquid-glass-subtle'>
                <Award className='h-6 w-6 text-point' />
              </div>
              <h2 className='text-3xl md:text-4xl font-bold'>
                {tCert('title')}
              </h2>
            </div>

            <div className='space-y-0'>
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className='relative pl-6 pb-6 border-l-2 border-[var(--timeline-line)] last:pb-0'
                >
                  {/* Timeline dot */}
                  <div className='absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--timeline-dot-bg)] border-2 border-[var(--timeline-dot-border)] shadow-sm' />

                  {/* Content */}
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                    <div>
                      <h3 className='font-medium'>{cert.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {cert.org}
                      </p>
                    </div>
                    <Badge variant='glass' className='shrink-0 w-fit'>
                      {cert.date}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
