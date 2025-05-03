
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUniverse } from "@/context/UniverseContext";
import { Menu, X, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const { isAuthenticated, currentUser, logout } = useUniverse();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-universe-purple to-universe-pink flex items-center justify-center animate-pulse-glow">
            <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
              <span className="text-lg font-bold text-universe-purple">U</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-gradient">
            UniVerse
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/events" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-universe-purple",
              isActive("/events") ? "text-universe-purple" : "text-muted-foreground"
            )}
          >
            Events
          </Link>
          {isAuthenticated && currentUser?.role === "user" && (
            <Link 
              to="/dashboard" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-universe-purple",
                isActive("/dashboard") ? "text-universe-purple" : "text-muted-foreground"
              )}
            >
              My Tickets
            </Link>
          )}
          {isAuthenticated && currentUser?.role === "organizer" && (
            <>
              <Link 
                to="/organizer/dashboard" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-universe-purple",
                  isActive("/organizer/dashboard") ? "text-universe-purple" : "text-muted-foreground"
                )}
              >
                Dashboard
              </Link>
              <Link 
                to="/organizer/create-event" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-universe-purple",
                  isActive("/organizer/create-event") ? "text-universe-purple" : "text-muted-foreground"
                )}
              >
                Create Event
              </Link>
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-universe-purple flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium">{currentUser?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="text-sm"
              >
                Log In
              </Button>
              <Button 
                variant="default" 
                onClick={() => navigate("/signup")}
                className="bg-gradient text-white"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg p-4 shadow-lg animate-slide-down">
          <nav className="flex flex-col gap-4 mb-4">
            <Link
              to="/events"
              className={cn(
                "px-4 py-2 rounded-md hover:bg-muted transition-colors",
                isActive("/events") ? "bg-muted text-universe-purple" : ""
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            {isAuthenticated && currentUser?.role === "user" && (
              <Link
                to="/dashboard"
                className={cn(
                  "px-4 py-2 rounded-md hover:bg-muted transition-colors",
                  isActive("/dashboard") ? "bg-muted text-universe-purple" : ""
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                My Tickets
              </Link>
            )}
            {isAuthenticated && currentUser?.role === "organizer" && (
              <>
                <Link
                  to="/organizer/dashboard"
                  className={cn(
                    "px-4 py-2 rounded-md hover:bg-muted transition-colors",
                    isActive("/organizer/dashboard") ? "bg-muted text-universe-purple" : ""
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/organizer/create-event"
                  className={cn(
                    "px-4 py-2 rounded-md hover:bg-muted transition-colors",
                    isActive("/organizer/create-event") ? "bg-muted text-universe-purple" : ""
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Event
                </Link>
              </>
            )}
          </nav>

          <div className="border-t border-border pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="h-8 w-8 rounded-full bg-universe-purple flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                  <span className="font-medium">{currentUser?.name}</span>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-2"
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Log In
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
