'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Github, Linkedin, FileText, ExternalLink } from 'lucide-react';
import { SpotlightCard } from '@/components/common/spotlight-card';
import * as gtag from '@/lib/gtag';
import { siteConfig } from '@/config/site';

export function Contact() {
  const t = useTranslations('contact');

  const links = [
    {
      icon: Mail,
      label: 'Email',
      href: siteConfig.links.email && `mailto:${siteConfig.links.email}`,
      username: siteConfig.links.email,
      color: 'hover:text-red-500',
      gtagLabel: 'email',
    },
    {
      icon: Github,
      label: t('links.github'),
      href: siteConfig.links.github.url,
      username: siteConfig.links.github.username,
      color: 'hover:text-gray-400',
      gtagLabel: 'github',
    },
    {
      icon: Linkedin,
      label: t('links.linkedin'),
      href: siteConfig.links.linkedin.url,
      username: siteConfig.links.linkedin.username,
      color: 'hover:text-blue-500',
      gtagLabel: 'linkedin',
    },
    {
      icon: FileText,
      label: t('links.tistory'),
      href: siteConfig.links.tistory.url,
      username: siteConfig.links.tistory.username,
      color: 'hover:text-orange-500',
      gtagLabel: 'blog_tistory',
    },
    {
      icon: FileText,
      label: t('links.velog'),
      href: siteConfig.links.velog.url,
      username: siteConfig.links.velog.username,
      color: 'hover:text-green-500',
      gtagLabel: 'blog_velog',
    },
  ].filter((link) => link.href);

  return (
    <section id='contact' className='py-20 md:py-32'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto text-center'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='mb-12'
          >
            <h2 className='text-3xl md:text-4xl font-bold'>{t('subtitle')}</h2>
          </motion.div>

          {/* Social Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {links.map((link, index) => (
                <SpotlightCard key={link.label} className='h-full'>
                  <motion.a
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                    className='h-full block'
                    onClick={() =>
                      gtag.event({
                        action: 'click',
                        category: 'link',
                        label: link.gtagLabel,
                      })
                    }
                  >
                    <Card className='h-full liquid-glass-interactive group'>
                      <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-lg liquid-glass-subtle group-hover:glass-glow transition-all'>
                              <link.icon
                                className={`h-5 w-5 text-muted-foreground transition-colors ${link.color}`}
                              />
                            </div>
                            <div className='text-left'>
                              <p className='font-medium group-hover:text-primary transition-colors'>
                                {link.label}
                              </p>
                              <p className='text-sm text-muted-foreground'>
                                {link.username}
                              </p>
                            </div>
                          </div>
                          <ExternalLink className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors' />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.a>
                </SpotlightCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
