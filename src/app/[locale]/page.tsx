import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { PersonalProjects } from '@/components/sections/personal-projects';
import { Skills } from '@/components/sections/skills';
import { Education } from '@/components/sections/education';
import { Blog } from '@/components/sections/blog';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/layout/footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className='min-h-screen'>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <PersonalProjects />
      <Skills />
      <Education />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
