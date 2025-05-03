
import { useEffect, useState } from 'react';
import { DecorativeSVGProps } from './types';
import './animations.css';

const BubbleSVG = ({
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
      <circle cx="40" cy="50" r="15" fill="none" stroke={color} strokeWidth="2" className={animated ? "pulse-animation" : ""} />
      <circle cx="80" cy="30" r="10" fill="none" stroke={secondaryColor} strokeWidth="2" className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.3s"}} />
      <circle cx="110" cy="60" r="20" fill="none" stroke={color} strokeWidth="2" className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.6s"}} />
      <circle cx="150" cy="40" r="12" fill="none" stroke={secondaryColor} strokeWidth="2" className={animated ? "pulse-animation" : ""} style={{animationDelay: "0.9s"}} />
      <circle cx="180" cy="70" r="8" fill="none" stroke={color} strokeWidth="2" className={animated ? "pulse-animation" : ""} style={{animationDelay: "1.2s"}} />
    </svg>
  );
};

export default BubbleSVG;
