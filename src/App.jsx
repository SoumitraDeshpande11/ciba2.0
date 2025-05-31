import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RoboticArms from './components/RoboticArms';
import ChessBoard from './components/ChessBoard';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [letterAnimations, setLetterAnimations] = useState([false, false, false, false]);
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    // Initial loading sequence
    setTimeout(() => setIsLoaded(true), 1000);
    
    // Animate letters sequentially
    "CIBA".split('').forEach((_, index) => {
      setTimeout(() => {
        setLetterAnimations(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 2500 + (index * 400));
    });
  }, []);

  const handleLetterClick = (index) => {
    setLetterAnimations(prev => {
      const newState = [...prev];
      newState[index] = false;
      setTimeout(() => {
        setLetterAnimations(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 50);
      return newState;
    });
  };

  return (
    <div className="bg-black text-white">
      {/* Initial fade-in overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <Canvas className="absolute inset-0">
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <RoboticArms isLoaded={isLoaded} />
          </Suspense>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 1, delay: 2 }}
            className="relative"
          >
            <h1 className="text-8xl font-bold hero-title">
              {"CIBA".split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="letter inline-block cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: letterAnimations[index] ? 1 : 0,
                    y: letterAnimations[index] ? 0 : 20,
                    scale: letterAnimations[index] ? 1 : 0.8,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLetterClick(index)}
                  style={{
                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 4, duration: 1 }}
            className="text-xl mt-4 text-gray-300"
          >
            Chess Infused with Bionic Augmentation
          </motion.p>
        </div>
      </section>

      {/* Interactive Chessboard Section */}
      <section ref={ref} className="h-screen relative">
        <Canvas className="absolute inset-0">
          <PerspectiveCamera makeDefault position={[0, 2, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <ChessBoard inView={inView} />
          </Suspense>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </section>

      {/* Feature Sections */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center mb-32"
          >
            <div className="w-1/2 pr-8">
              <h2 className="text-4xl font-bold mb-4">AI-powered gameplay</h2>
              <p className="text-gray-400">Experience chess like never before with our advanced AI system that adapts to your play style and skill level.</p>
            </div>
            <div className="w-1/2 bg-gray-800 h-64 rounded-lg"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center mb-32 flex-row-reverse"
          >
            <div className="w-1/2 pl-8">
              <h2 className="text-4xl font-bold mb-4">Realistic robotic arm movement</h2>
              <p className="text-gray-400">Precision-engineered robotic arms that move with grace and accuracy, bringing your chess game into the physical world.</p>
            </div>
            <div className="w-1/2 bg-gray-800 h-64 rounded-lg"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center mb-32"
          >
            <div className="w-1/2 pr-8">
              <h2 className="text-4xl font-bold mb-4">Classic wooden chess aesthetics</h2>
              <p className="text-gray-400">Traditional craftsmanship meets modern technology with our premium wooden chess pieces and board.</p>
            </div>
            <div className="w-1/2 bg-gray-800 h-64 rounded-lg"></div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-8">Challenge CIBA to a Match</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          >
            Play Now
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2025 CIBA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;