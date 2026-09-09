import { Header } from '@/components/Header';
import { Contact } from '@/components/Contact';
import {
  About,
  FaqSection,
  Footer,
  Hero,
  Pricing,
  Services,
  Team,
  Testimonials,
  Trust,
  Work,
} from '@/components/Sections';

export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <div className="wrap">
          <Trust />
          <About />
          <Services />
          <Pricing />
          <Work />
          <Team />
          <Testimonials />
          <FaqSection />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
