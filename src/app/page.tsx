import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TherapyServices from '@/components/sections/TherapyServices';
import AreasOfSupport from '@/components/sections/AreasOfSupport';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import CTABanner from '@/components/sections/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TherapyServices />
      <AreasOfSupport />
      <Pricing />
      <Testimonials />
      <CTABanner />
      <Contact />
    </>
  );
}
