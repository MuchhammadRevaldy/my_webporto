import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import GlobalBackground, { WarpStars } from './components/Three/GlobalBackground';
import Navbar from './components/UI/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Experience from './components/Sections/Experience';
import Portfolio from './components/Sections/Portfolio';
import Achievements from './components/Sections/Achievements';
import TechStack from './components/Sections/TechStack';
import Contact from './components/Sections/Contact';
import CVPreview from './components/UI/CVPreview';
import Magnetic from './components/UI/Magnetic';
import BubbleText from './components/UI/BubbleText';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    if (contentVisible) {
      const lenis = new Lenis();
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }, [contentVisible]);

  const handleStart = () => {
    setIsWarping(true);
    setTimeout(() => {
      setIntroFinished(true);
    }, 1500);
  };

  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">


      <AnimatePresence mode='wait' onExitComplete={() => setContentVisible(true)}>
        {!introFinished && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <WarpStars isWarping={isWarping} />
              </Canvas>
            </div>

            <motion.div
              className="relative z-10 flex flex-col items-center text-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
            >
              <BubbleText
                as="h1"
                text="Hi, welcome to my universe."
                className="text-4xl md:text-6xl font-thin tracking-widest text-white mb-4 font-display cursor-default"
                baseTextColor="text-white"
              />

              <BubbleText
                as="p"
                text="Do you want to see my portfolio?"
                className="text-xl md:text-2xl font-light tracking-wider text-gray-400 mb-12 cursor-default"
                baseTextColor="text-gray-400"
              />

              {!isWarping && (
                <Magnetic>
                  <button
                    onClick={handleStart}
                    className="px-8 py-4 bg-transparent border border-white/20 rounded-full text-white font-light tracking-widest hover:bg-brand-400/20 hover:border-brand-400 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] transition-all duration-500 backdrop-blur-sm group"
                  >
                    <span className="group-hover:tracking-[0.2em] transition-all duration-300">GET STARTED</span>
                  </button>
                </Magnetic>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {contentVisible && (
        <>
          <GlobalBackground />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Navbar />
            <Hero />
            <>
              <About />
              <Experience />
              <Achievements />
              <Portfolio />
              <TechStack />
              <Contact onOpenCV={() => setShowCV(true)} />
            </>
            <CVPreview isOpen={showCV} onClose={() => setShowCV(false)} />
          </motion.div>
        </>
      )}
    </main>
  );
}

export default App;
