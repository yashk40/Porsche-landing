import React, { useEffect } from 'react'
import SplitText from './Heading';
import gsap from 'gsap';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};



export default function Headingfirst() {


                
  return (
    <div id="heading" >
  <SplitText
    text="Porsche"
    className="text-center"
    delay={150}
    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
    easing="easeOutCubic"
    threshold={0.2}
    rootMargin="-50px"
    onLetterAnimationComplete={handleAnimationComplete}
  />
    </div>
  
  )
}
