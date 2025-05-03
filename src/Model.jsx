import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, AccumulativeShadows, RandomizedLight, Environment, ContactShadows } from '@react-three/drei';
import { AdaptiveDpr, AdaptiveEvents, BakeShadows } from '@react-three/drei';
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
        modelRef.current.position.z = 3.5;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = -1.6;
      modelRef.current.position.y = 0.98;
      
      // Get the Lenis instance from the window object
      const lenis = window.lenis;
      
      // Update ScrollTrigger to work with Lenis
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
      }
      
      gsap.to(modelRef.current.rotation, {
        y: 2 * Math.PI,
        scrollTrigger: {
          trigger: "#model-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          markers: false,
        },
      });
    }
  }, []);

  return <primitive ref={modelRef} object={scene} scale={1} castShadow receiveShadow />;
}

// Loading component
function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      zIndex: 1000
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <h2 style={{
        color: '#3498db',
        fontFamily: 'Arial, sans-serif',
        margin: 0
      }}>Loading 3D Model...</h2>
    </div>
  );
}

export default function ModelViewer() {
  return (
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
          style={{ background: '#f0f0f0' , position:'absolute'}}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          shadows={{ type: 'PCFSoft', enabled: true }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <BakeShadows />
          
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize={[512, 512]}
            shadow-bias={-0.001}
          />
          <directionalLight
            position={[2, 5, 8]}
            intensity={4}
            color="#ffffff"
          />
          <pointLight position={[3, 2, 8]} intensity={0.4} color="#ffffff" />
          <pointLight position={[-3, 0, 3]} intensity={0.3} color="#ffffff" />
          
          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={0.75}
            scale={10}
            blur={2.5}
            far={4}
            resolution={256}
          />

          <Environment preset="city" />

          <Suspense fallback={<LoadingScreen />}>
            <Model modelPath="/Porsche.glb" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/Porsche.glb");
