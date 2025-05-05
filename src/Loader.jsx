import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader() {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Store initial body styles
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollY = window.scrollY;

    // Disable scrolling more aggressively
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    const tl = gsap.timeline();
    
    // Initial pause
    tl.to(loaderRef.current, {
      delay: 2,
      width: "0%",
      duration: 2,
      ease: "power3.inOut",
    });

    // Fade out text as width decreases
    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }, "<"); // Start at the same time as width animation

    // After animation completes, set display to none and re-enable scrolling
    tl.set(loaderRef.current, {
      display: "none",
      onComplete: () => {
        // Re-enable scrolling and restore position
        document.body.style.overflow = originalStyle;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      }
    });

    // Cleanup function
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div 
      ref={loaderRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformOrigin: "right",
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <span 
        ref={textRef}
        style={{
          color: "black",
          fontSize: "24px",
          fontWeight: "500",
          letterSpacing: "2px",
        }}
      >
        Loading...
      </span>
    </div>
  )
}
