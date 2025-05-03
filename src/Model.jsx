import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, AccumulativeShadows, RandomizedLight, Environment, ContactShadows } from '@react-three/drei';
import { AdaptiveDpr, AdaptiveEvents, BakeShadows, Preload } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath, true);
  const modelRef = useRef();

  // Handle responsive positioning
  useEffect(() => {
    const handleResize = () => {
      if (!modelRef.current) return;
      
      if (window.innerWidth <= 768 && window.innerWidth >= 460) {
        modelRef.current.position.z = 1;
      } else if(window.innerWidth <= 460) {
        modelRef.current.position.z = -2;
      } else {
        modelRef.current.position.z = 3;
      }
    };

    // Initial call
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (modelRef.current) {
      // Initial position
      modelRef.current.rotation.y = -1.6;
      modelRef.current.position.y = 1;
      
      // Create scroll-based animation
      gsap.to(modelRef.current.rotation, {
        y: 2 * Math.PI, // Full rotation
        scrollTrigger: {
          trigger: "#model-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
          markers: false,
        },
      });
    }
  }, []);

  return <primitive ref={modelRef} object={scene} scale={1} castShadow receiveShadow />;
}

export default function ModelViewer() {
  return (
    <>
      <div id="model-container" style={{ width: '100%', height: '200vh', justifyContent:"center" , alignItems:"center" }}>
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          width: '100%', 
          height: '100vh',
          overflow: 'hidden'
        }}>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 45 }}
            style={{ background: '#f0f0f0'}}
            dpr={[1, 1.5]} // Reduced max DPR for better mobile performance
            performance={{ min: 0.5 }}
            shadows={{ type: 'PCFSoft', enabled: true }}
          >
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <BakeShadows />
            
            {/* Optimized lighting setup */}
            <ambientLight intensity={0.3} />
            
            {/* Main directional light with optimized shadows */}
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              castShadow
              shadow-mapSize={[512, 512]}
              shadow-bias={-0.001}
            />

            {/* Accent lighting */}
            <directionalLight
              position={[2, 5, 8]}
              intensity={4}
              color="#ffffff"
            />

            {/* Optimized point lights */}
            <pointLight position={[3, 2, 8]} intensity={0.4} color="#ffffff" />
            <pointLight position={[-3, 0, 3]} intensity={0.3} color="#ffffff" />
            
            {/* Contact shadows for better performance */}
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.75}
              scale={10}
              blur={2.5}
              far={4}
              resolution={256}
            />

            {/* Environment map for shine */}
            <Environment preset="city" />

            <Suspense fallback={null}>
              <Model modelPath="/Porsche.glb" />
            </Suspense>

            <Preload all />
          </Canvas>
        </div>
      </div>
    </>
  );
}

useGLTF.preload("/Porsche.glb");
