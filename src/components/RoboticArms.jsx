import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';

export default function RoboticArms({ isLoaded }) {
  const { scene } = useGLTF('/Two_highly_detailed_h_0531100815_texture.glb');
  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isLoaded) {
      // Initial animation sequence
      gsap.fromTo(
        groupRef.current.position,
        { x: -5 },
        { x: 0, duration: 2, ease: 'power2.out', delay: 0.5 }
      );
      gsap.fromTo(
        groupRef.current.rotation,
        { y: -Math.PI / 4 },
        { y: 0, duration: 2, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, [isLoaded]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth mouse parallax effect
    const targetX = (state.mouse.x * 0.2);
    const targetY = (state.mouse.y * 0.2);
    
    mouseRef.current.x += (targetX - mouseRef.current.x) * 0.1;
    mouseRef.current.y += (targetY - mouseRef.current.y) * 0.1;
    
    groupRef.current.rotation.y = mouseRef.current.x;
    groupRef.current.rotation.x = mouseRef.current.y;

    // Subtle floating animation
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t / 2) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
      <primitive object={scene} />
    </group>
  );
}