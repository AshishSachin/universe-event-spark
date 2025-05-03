
import { useEffect, useState } from 'react';
import { DecorativeSVGProps } from './types';
import './animations.css';

const DotsSVG = ({
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

  // Create dot pattern
  const dots = [];
  const spacing = 20;
  const rows = 6;
  const cols = 12;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = 10 + j * spacing;
      const y = 10 + i * spacing;
      const dotColor = (i + j) % 2 === 0 ? color : secondaryColor;
      const delay = `${(i * cols + j) * 0.05}s`;
      
      dots.push(
        <circle 
          key={`dot-${i}-${j}`}
          cx={x} 
          cy={y} 
          r="2" 
          fill={dotColor}
          className={animated ? "draw-animation" : ""}
          style={{animationDelay: delay}}
        />
      );
    }
  }

  return (
    <svg 
      viewBox="0 0 250 130" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animationClass} ${transitionClass}`}
    >
      {dots}
    </svg>
  );
};

export default DotsSVG;
