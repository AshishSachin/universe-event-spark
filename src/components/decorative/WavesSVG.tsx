
import { useEffect, useState } from 'react';
import { DecorativeSVGProps } from './types';
import './animations.css';

const WavesSVG = ({
  className = '', 
  color = '#8B5CF6', 
  secondaryColor = '#EC4899',
  animated = true
}: Omit<DecorativeSVGProps, 'variant'>) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const animationClass = animated && isVisible ? 'opacity-100' : 'opacity-0';
  const transitionClass = 'transition-opacity duration-1000 ease-in-out';

  return (
    <svg 
      viewBox="0 0 200 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animationClass} ${transitionClass}`}
    >
      <path
        d="M0,50 C30,30 70,70 100,50 C130,30 170,70 200,50"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={animated ? "wave-animation" : ""}
      />
      <path
        d="M0,70 C30,50 70,90 100,70 C130,50 170,90 200,70"
        stroke={secondaryColor}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={animated ? "wave-animation" : ""}
        style={{animationDelay: "0.2s"}}
      />
      <path
        d="M0,30 C30,10 70,50 100,30 C130,10 170,50 200,30"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
        className={animated ? "wave-animation" : ""}
        style={{animationDelay: "0.4s"}}
      />
    </svg>
  );
};

export default WavesSVG;
