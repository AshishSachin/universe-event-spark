
import { useEffect, useState } from 'react';
import { DecorativeSVGProps } from './types';
import './animations.css';

const GridSVG = ({
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

  // Create grid lines
  const horizontalLines = [];
  const verticalLines = [];
  const spacing = 20;
  const width = 200;
  const height = 100;
  
  for (let i = 0; i <= height; i += spacing) {
    horizontalLines.push(
      <line 
        key={`h-${i}`}
        x1="0" 
        y1={i} 
        x2={width} 
        y2={i}
        stroke={i % 40 === 0 ? secondaryColor : color}
        strokeWidth={i % 40 === 0 ? "1.5" : "0.5"}
        opacity={i % 40 === 0 ? "0.8" : "0.3"}
        className={animated ? "draw-animation" : ""}
        style={{animationDelay: `${i * 0.01}s`}}
      />
    );
  }
  
  for (let i = 0; i <= width; i += spacing) {
    verticalLines.push(
      <line 
        key={`v-${i}`}
        x1={i} 
        y1="0" 
        x2={i} 
        y2={height}
        stroke={i % 40 === 0 ? secondaryColor : color}
        strokeWidth={i % 40 === 0 ? "1.5" : "0.5"}
        opacity={i % 40 === 0 ? "0.8" : "0.3"}
        className={animated ? "draw-animation" : ""}
        style={{animationDelay: `${i * 0.01}s`}}
      />
    );
  }

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animationClass} ${transitionClass}`}
    >
      {horizontalLines}
      {verticalLines}
    </svg>
  );
};

export default GridSVG;
