import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RoboticArms from './components/RoboticArms';
import ChessBoard from './components/ChessBoard';

function App() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <Canvas className="absolute inset-0">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <RoboticArms />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            CIBA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl mt-4 text-gray-300"
          >
            Chess Infused with Bionic Augmentation
          </motion.p>
        </div>
      </section>

      {/* Interactive Chessboard Section */}
      <section ref={ref} className="h-screen relative">
        <Canvas className="absolute inset-0">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <ChessBoard inView={inView} />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </section>

      {/* Feature Sections */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* AI-powered gameplay */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-32"
          >
            <div className="w-1/2 pr-8">
              <h2 className="text-4xl font-bold mb-4">AI-powered gameplay</h2>
              <p className="text-gray-400">Experience chess like never before with our advanced AI system that adapts to your play style and skill level.</p>
            </div>
            <div className="w-1/2 bg-gray-800 h-64 rounded-lg"></div>
          </motion.div>

          {/* Realistic robotic arm movement */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center mb-32 flex-row-reverse"
          >
            <div className="w-1/2 pl-8">
              <h2 className="text-4xl font-bold mb-4">Realistic robotic arm movement</h2>
              <p className="text-gray-400">Precision-engineered robotic arms that move with grace and accuracy, bringing your chess game into the physical world.</p>
            </div>
            <div className="w-1/2 bg-gray-800 h-64 rounded-lg"></div>
          </motion.div>

          {/* Classic wooden chess aesthetics */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
      <section className="py-20 px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">Challenge CIBA to a Match</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors">
            Play Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2025 CIBA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;