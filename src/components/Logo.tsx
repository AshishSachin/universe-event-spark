
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Logo = ({ 
  className = "", 
  showText = true, 
  size = "md",
  onClick
}: LogoProps) => {
  // Size mappings
  const sizeClasses = {
    sm: {
      container: "h-8 w-8",
      innerCircle: "h-6 w-6",
      text: "text-lg"
    },
    md: {
      container: "h-10 w-10",
      innerCircle: "h-8 w-8",
      text: "text-2xl"
    },
    lg: {
      container: "h-12 w-12",
      innerCircle: "h-10 w-10",
      text: "text-3xl"
    }
  };

  return (
    <Link 
      to="/"
      className={cn("flex items-center gap-2 group", className)}
      onClick={onClick}
    >
      <div className={cn(
        "rounded-full bg-gradient-to-br from-universe-purple to-universe-pink flex items-center justify-center animate-pulse-glow",
        sizeClasses[size].container
      )}>
        <div className={cn(
          "rounded-full bg-background flex items-center justify-center",
          sizeClasses[size].innerCircle
        )}>
          <span className="font-bold text-universe-purple">U</span>
        </div>
      </div>
      
      {showText && (
        <span className={cn(
          "font-bold text-gradient",
          sizeClasses[size].text
        )}>
          UniVerse
        </span>
      )}
    </Link>
  );
};

export default Logo;
