
import { useEffect, useState } from 'react';
import { DecorativeSVGProps } from './types';
import './animations.css';

const CircuitSVG = ({
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
        d="M10,50 L40,50 C45,50 45,35 50,35 L80,35 C85,35 85,65 90,65 L120,65 C125,65 125,20 130,20 L160,20 L190,20"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={animated ? "path-animation" : ""}
      />
      <circle cx="40" cy="50" r="3" fill={secondaryColor} className={animated ? "pulse-animation" : ""} />
      <circle cx="80" cy="35" r="3" fill={secondaryColor} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.2s"}} />
      <circle cx="120" cy="65" r="3" fill={secondaryColor} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.4s"}} />
      <circle cx="160" cy="20" r="3" fill={secondaryColor} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.6s"}} />
      <path
        d="M10,80 L30,80 C35,80 35,65 40,65 L70,65"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={animated ? "path-animation" : ""}
        style={{animationDelay: "0.4s"}}
      />
    </svg>
  );
};

export default CircuitSVG;
