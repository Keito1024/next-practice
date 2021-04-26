import { Canvas } from '@react-three/fiber';
import React from 'react';
import MyRotatingBox from '@/components/MyRotatingBox';

const Home: React.VFC = () => {
  return (
    <Canvas>
      <MyRotatingBox />
      <ambientLight intensity={0.1} />
      <directionalLight />
    </Canvas>
  );
};

export default Home;
