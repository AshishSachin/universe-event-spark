
import { useEffect, useState } from 'react';
import { DecorativeSVGProps } from './types';
import './animations.css';

const AbstractSVG = ({
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
        d="M20,50 C60,20 80,80 120,50 L180,50 C180,50 160,80 130,80 C100,80 90,20 60,20 C30,20 20,50 20,50 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className={animated ? "draw-animation" : ""}
      />
      <path
        d="M40,30 C60,10 140,10 160,30"
        stroke={secondaryColor}
        strokeWidth="2"
        fill="none"
        className={animated ? "draw-animation" : ""}
        style={{animationDelay: "0.5s"}}
      />
      <circle cx="60" cy="20" r="3" fill={secondaryColor} className={animated ? "pulse-animation" : ""} />
      <circle cx="130" cy="80" r="3" fill={secondaryColor} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.3s"}} />
    </svg>
  );
};

export default AbstractSVG;
