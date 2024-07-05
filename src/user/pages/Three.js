import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Earth from '../components/Earth';

const Three = () => {
  const adjustEarthForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43]; // Default position
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [-5, -6.5, -43]; // Adjusted position for smaller screens
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43]; // Default position for larger screens
    }

    return [screenScale, screenPosition, rotation];
  };

  const [earthScale, setEarthScale] = useState([1, 1, 1]);
  const [earthPosition, setEarthPosition] = useState([0,50,0]);
  const [islandRotation, setIslandRotation] = useState([0.1, 4.7, 0]);

  useEffect(() => {
    const handleResize = () => {
      const [newScale, newPosition, newRotation] = adjustEarthForScreenSize();
      setEarthScale(newScale);
      setEarthPosition(newPosition);
      setIslandRotation(newRotation);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className='w-full h-screen p-0'>
      <Canvas className='w-2 h-2 bg-transparent' camera={{ near: 0.1, far: 1000 }}>
        <Suspense>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight />
          <Earth
            position={earthPosition}
            scale={earthScale}
            rotation={islandRotation}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Three;
