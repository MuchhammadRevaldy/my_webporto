import React, { useEffect } from 'react';
import Lenis from 'lenis';
import GlobalBackground from './components/Three/GlobalBackground';
import Hero from './components/Sections/Hero';
import Experience from './components/Sections/Experience';
import Achievements from './components/Sections/Achievements';
import TechStack from './components/Sections/TechStack';
import Contact from './components/Sections/Contact';

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="relative w-full min-h-screen text-white">
      <GlobalBackground />
      <Hero />
      <Experience />
      <Achievements />
      <TechStack />
      <Contact />
    </main>
  );
}

export default App;
