import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import earthScene from '../../assets/earth.glb';

const Earth = ({ position, ...props }) => {
  const earthRef = useRef();
  const { nodes, materials } = useGLTF(earthScene);

  // Use useFrame to rotate the Earth mesh
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
    }
  });

  return (
    <group ref={earthRef} position={position} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Material001_0.geometry}
        material={materials['Material.001']}
        rotation={[-Math.PI / 2, 0, -0.262]}
        scale={15}
      />
    </group>
  );
};

export default Earth;
