
import { useEffect, useState } from 'react';

type SVGVariant = 
  'circuit' | 
  'waves' | 
  'constellation' | 
  'abstract' | 
  'geometric';

interface DecorativeSVGProps {
  variant?: SVGVariant;
  className?: string;
  color?: string;
  secondaryColor?: string;
  animated?: boolean;
}

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
  
  const animationClass = animated && isVisible ? 'opacity-100' : 'opacity-0';
  const transitionClass = 'transition-opacity duration-1000 ease-in-out';

  const renderSVG = () => {
    switch (variant) {
      case 'circuit':
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
      case 'waves':
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
      case 'constellation':
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
      case 'abstract':
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
      case 'geometric':
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
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <style>
        {`
        @keyframes path-animation {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .path-animation {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: path-animation 2s forwards ease-out;
        }
        @keyframes wave-animation {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-20%); }
        }
        .wave-animation {
          animation: wave-animation 4s infinite alternate ease-in-out;
        }
        @keyframes draw-animation {
          to { stroke-dashoffset: 0; }
        }
        .draw-animation {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-animation 2s forwards;
        }
        @keyframes pulse-animation {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        .pulse-animation {
          animation: pulse-animation 2s infinite;
        }
        `}
      </style>
      {renderSVG()}
    </div>
  );
};

export default DecorativeSVG;
