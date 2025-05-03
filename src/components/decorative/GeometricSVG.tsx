
import { useEffect, useState } from 'react';
import { DecorativeSVGProps } from './types';
import './animations.css';

const GeometricSVG = ({
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
      <polygon 
        points="50,10 90,30 70,70 30,50" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
        className={animated ? "draw-animation" : ""}
      />
      <polygon 
        points="120,20 160,40 140,80 100,60" 
        stroke={secondaryColor} 
        strokeWidth="2" 
        fill="none"
        className={animated ? "draw-animation" : ""}
        style={{animationDelay: "0.3s"}}
      />
      <line x1="90" y1="30" x2="100" y2="60" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="70" x2="140" y2="80" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="10" r="3" fill={secondaryColor} className={animated ? "pulse-animation" : ""} />
      <circle cx="160" cy="40" r="3" fill={color} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.3s"}} />
    </svg>
  );
};

export default GeometricSVG;
