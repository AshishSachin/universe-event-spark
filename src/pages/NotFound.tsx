
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingParticles from "@/components/FloatingParticles";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Trigger animation sequence
    const timer1 = setTimeout(() => setAnimationStage(1), 300);
    const timer2 = setTimeout(() => setAnimationStage(2), 600);
    const timer3 = setTimeout(() => setAnimationStage(3), 900);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  const staggeredClass = (idx: number) => {
    return animationStage >= idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative text-center overflow-hidden">
      <FloatingParticles count={30} shapes={true} glow={true} speed={0.8} />
      
      <div className="relative z-10 max-w-md">
        <div className="text-9xl font-bold mb-4">
          <span className="text-gradient glitch-text" data-text="404">404</span>
        </div>
        
        <h1 className={`text-3xl font-bold mb-4 transition-all duration-700 ${staggeredClass(1)}`}>
          Page Not Found
        </h1>
        
        <p className={`text-lg text-muted-foreground mb-8 transition-all duration-700 ${staggeredClass(2)}`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${staggeredClass(3)}`}>
          <Button 
            variant="outline" 
            className="gap-2 hover-lift"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button 
            className="bg-gradient hover-glow text-white gap-2 shine-effect"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
        <div className={`mt-12 max-w-xs mx-auto transition-all duration-700 ${staggeredClass(3)}`}>
          <p className="text-sm text-muted-foreground mb-4">
            Looking for an event?
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-universe-purple transition-all duration-300 hover:shadow-md"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate('/events');
                }
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-universe-purple/10 rounded-full blur-3xl pulse-soft"></div>
        <div className="absolute bottom-1/3 -right-20 w-60 h-60 bg-universe-pink/10 rounded-full blur-3xl pulse-soft" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-2/3 left-1/4 w-32 h-32 bg-universe-blue/10 rounded-full blur-3xl pulse-soft" style={{ animationDelay: "0.5s" }}></div>
      </div>
      
      {/* 404 trace lines - decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-universe-purple/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-universe-pink/20 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-universe-blue/20 to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-transparent via-universe-purple/20 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-6 text-sm text-muted-foreground">
        &copy; 2025 UNIVERSE | SRM Institute of Science and Technology
      </div>
    </div>
  );
};

export default NotFound;
