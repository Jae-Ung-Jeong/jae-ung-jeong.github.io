'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Code2, Database, Palette, Settings, Wrench } from 'lucide-react';

export function Skills() {
  const t = useTranslations('skills');

  const categories = [
    {
      key: 'core',
      icon: Code2,
    },
    {
      key: 'data',
      icon: Database,
    },
    {
      key: 'styling',
      icon: Palette,
    },
    {
      key: 'devops',
      icon: Settings,
    },
    {
      key: 'productivity',
      icon: Wrench,
    },
  ];

  return (
    <section id='skills' className='py-20 md:py-32'>
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

        {/* Skills Grid */}
        <div className='max-w-4xl mx-auto space-y-6'>
          {categories.map((category, index) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='flex flex-col md:flex-row md:items-center gap-4 p-4 liquid-glass glass-refraction'
            >
              {/* Category Label */}
              <div className='flex items-center gap-3 md:w-48 shrink-0'>
                <div className='p-2 rounded-xl liquid-glass-subtle'>
                  <category.icon className='h-5 w-5 text-point' />
                </div>
                <span className='font-medium'>
                  {t(`categories.${category.key}.title`)}
                </span>
              </div>

              {/* Skills Tags */}
              <div className='flex flex-wrap gap-2'>
                {(t.raw(`categories.${category.key}.items`) as string[]).map(
                  (skill: string) => (
                    <Badge
                      key={skill}
                      variant='glass'
                      className='hover:glass-glow transition-all cursor-default'
                    >
                      {skill}
                    </Badge>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
