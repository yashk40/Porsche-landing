import logo from './logo.svg';
import './App.css';
import ModelViewer from './Model';
import Navbar from './Navbar';
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';
import Loader from './Loader';
import SplitText from './Heading';
import Headingfirst from './Headingfirst';
import Hero from './Hero';

function App() {
 

  useEffect(() => {
    const lenis = new Lenis({
      duration: 5,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
    <Loader/>
      <Navbar/>
      <Hero/>
      <ModelViewer/>
    </>
  );
}

export default App;
