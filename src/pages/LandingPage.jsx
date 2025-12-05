import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Plans from '../components/landing/Plans';
import Contact from '../components/landing/Contact';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-0">
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="plans">
        <Plans />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
