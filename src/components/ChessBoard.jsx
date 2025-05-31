import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';

export default function ChessBoard({ inView }) {
  const { scene } = useGLTF('/a_robotics_chessboard_0531100037_texture.glb');
  const groupRef = useRef();
  const rotationRef = useRef(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (inView) {
      // Animate in when in view
      gsap.fromTo(
        groupRef.current.position,
        { y: -5 },
        { y: 0, duration: 1.5, ease: 'power2.out' }
      );
      gsap.fromTo(
        groupRef.current.rotation,
        { y: Math.PI * 2 },
        { y: 0, duration: 2, ease: 'power2.out' }
      );
    }
  }, [inView]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    
    // Smooth rotation
    if (inView) {
      const targetRotation = hoverRef.current ? Math.sin(t / 4) * 0.5 : Math.sin(t / 8) * 0.2;
      rotationRef.current += (targetRotation - rotationRef.current) * 0.1;
      groupRef.current.rotation.y = rotationRef.current;
    }

    // Subtle floating animation
    groupRef.current.position.y += Math.sin(t / 2) * 0.001;
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]} 
      scale={[1.5, 1.5, 1.5]}
      onPointerEnter={() => (hoverRef.current = true)}
      onPointerLeave={() => (hoverRef.current = false)}
    >
      <primitive object={scene} />
    </group>
  );
}