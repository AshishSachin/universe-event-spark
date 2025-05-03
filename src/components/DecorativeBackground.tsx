
import { useEffect, useState } from "react";

interface DecorativeBackgroundProps {
  variant?: "wave" | "grid" | "dots" | "circles";
  color?: string;
  intensity?: number;
}

const DecorativeBackground = ({ 
  variant = "wave", 
  color = "#8B5CF6", 
  intensity = 0.1 
}: DecorativeBackgroundProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const colorWithOpacity = `${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`;

  const renderBackground = () => {
    switch (variant) {
      case "grid":
        return (
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              backgroundImage: `linear-gradient(to right, ${colorWithOpacity} 1px, transparent 1px), 
                               linear-gradient(to bottom, ${colorWithOpacity} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        );
      case "dots":
        return (
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              backgroundImage: `radial-gradient(${colorWithOpacity} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
        );
      case "circles":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-[30%] -left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-radial from-[color:var(--circle-color)] to-transparent opacity-20 pulse-soft"
              style={{"--circle-color": color} as React.CSSProperties}></div>
            <div className="absolute -bottom-[40%] -right-[30%] w-[60%] h-[60%] rounded-full bg-gradient-radial from-[color:var(--circle-color)] to-transparent opacity-10 pulse-soft delay-1000"
              style={{"--circle-color": color, animationDelay: "1s"} as React.CSSProperties}></div>
          </div>
        );
      case "wave":
      default:
        return (
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="absolute bottom-0 left-0 w-full opacity-[0.15]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill={color}
                fillOpacity="1"
                d="M0,192L40,181.3C80,171,160,149,240,154.7C320,160,400,192,480,197.3C560,203,640,181,720,154.7C800,128,880,96,960,101.3C1040,107,1120,149,1200,165.3C1280,181,1360,171,1400,165.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                className="animate-pulse-soft"
                style={{ animationDuration: '10s' }}
              ></path>
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-full opacity-[0.1]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill={color}
                fillOpacity="1"
                d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,101.3C672,85,768,139,864,149.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className="animate-pulse-soft"
                style={{ animationDuration: '15s', animationDelay: '1s' }}
              ></path>
            </svg>
          </div>
        );
    }
  };

  return renderBackground();
};

export default DecorativeBackground;
