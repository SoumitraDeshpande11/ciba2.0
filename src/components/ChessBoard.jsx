import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function ChessBoard({ inView }) {
  const { scene } = useGLTF('/a_robotics_chessboard_0531100037_texture.glb');
  const groupRef = useRef();

  useFrame((state) => {
    if (inView) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t / 8) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
      <primitive object={scene} />
    </group>
  );
}