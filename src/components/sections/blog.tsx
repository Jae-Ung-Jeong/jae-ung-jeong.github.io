import { getLocale, getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/lib/blog';
import { BlogCards } from './blog-cards';

export async function Blog() {
  const locale = await getLocale();
  const t = await getTranslations('blog');
  const posts = await getBlogPosts(4, locale);

  return (
    <section id='blog' className='py-20 md:py-32'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <BlogCards
            posts={posts}
            title={t('title')}
            subtitle={t('subtitle')}
            viewAll={t('viewAll')}
          />
        </div>
      </div>
    </section>
  );
}
