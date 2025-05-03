
import { useEffect, useState } from 'react';
import { DecorativeSVGProps, SVGVariant } from './decorative/types';
import CircuitSVG from './decorative/CircuitSVG';
import WavesSVG from './decorative/WavesSVG';
import ConstellationSVG from './decorative/ConstellationSVG';
import AbstractSVG from './decorative/AbstractSVG';
import GeometricSVG from './decorative/GeometricSVG';
import BubbleSVG from './decorative/BubbleSVG';
import DotsSVG from './decorative/DotsSVG';
import GridSVG from './decorative/GridSVG';

const DecorativeSVG = ({ 
  variant = 'circuit', 
  className = '', 
  color = '#8B5CF6', 
  secondaryColor = '#EC4899',
  animated = true
}: DecorativeSVGProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const renderSVG = () => {
    const props = {
      className,
      color,
      secondaryColor,
      animated
    };

    switch (variant) {
      case 'circuit':
        return <CircuitSVG {...props} />;
      case 'waves':
        return <WavesSVG {...props} />;
      case 'constellation':
        return <ConstellationSVG {...props} />;
      case 'abstract':
        return <AbstractSVG {...props} />;
      case 'geometric':
        return <GeometricSVG {...props} />;
      case 'bubble':
        return <BubbleSVG {...props} />;
      case 'dots':
        return <DotsSVG {...props} />;
      case 'grid':
        return <GridSVG {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {renderSVG()}
    </div>
  );
};

export default DecorativeSVG;
