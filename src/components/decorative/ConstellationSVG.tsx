
import { useEffect, useState } from 'react';
import { DecorativeSVGProps } from './types';
import './animations.css';

const ConstellationSVG = ({
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
      <circle cx="50" cy="30" r="2" fill={color} className={animated ? "pulse-animation" : ""} />
      <circle cx="30" cy="60" r="2" fill={color} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.2s"}} />
      <circle cx="80" cy="70" r="2" fill={color} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.4s"}} />
      <circle cx="120" cy="40" r="2" fill={color} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.6s"}} />
      <circle cx="160" cy="70" r="2" fill={color} className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.8s"}} />
      <circle cx="140" cy="20" r="2" fill={color} className={animated ? "pulse-animation" : ""} style={{animationDelay: "1s"}} />
      
      <line x1="50" y1="30" x2="30" y2="60" stroke={secondaryColor} strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="60" x2="80" y2="70" stroke={secondaryColor} strokeWidth="1" opacity="0.5" />
      <line x1="80" y1="70" x2="120" y2="40" stroke={secondaryColor} strokeWidth="1" opacity="0.5" />
      <line x1="120" y1="40" x2="140" y2="20" stroke={secondaryColor} strokeWidth="1" opacity="0.5" />
      <line x1="120" y1="40" x2="160" y2="70" stroke={secondaryColor} strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export default ConstellationSVG;
