import { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

const MyRotatingBox: React.FC = () => {
  const myMesh = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (myMesh.current === null) return;
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh ref={myMesh}>
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
};

export default MyRotatingBox;
