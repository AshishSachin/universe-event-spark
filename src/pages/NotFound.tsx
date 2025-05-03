
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingParticles from "@/components/FloatingParticles";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative text-center">
      <FloatingParticles count={20} />
      
      <div className="relative z-10 max-w-md">
        <div className="text-9xl font-bold text-gradient mb-4">404</div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button 
            className="bg-gradient text-white gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
        <div className="mt-12 max-w-xs mx-auto">
          <p className="text-sm text-muted-foreground mb-4">
            Looking for an event?
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-universe-purple"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate('/events');
                }
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-sm text-muted-foreground">
        &copy; 2025 UNIVERSE | SRM Institute of Science and Technology
      </div>
    </div>
  );
};

export default NotFound;
