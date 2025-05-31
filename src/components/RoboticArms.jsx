import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function RoboticArms() {
  const { scene } = useGLTF('/Two_highly_detailed_h_0531100815_texture.glb');
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 4) * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
      <primitive object={scene} />
    </group>
  );
}