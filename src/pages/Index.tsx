
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingParticles from "@/components/FloatingParticles";
import { useUniverse } from "@/context/UniverseContext";
import { Calendar, MapPin, Ticket } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { events, isAuthenticated, userRole } = useUniverse();
  const [activeImage, setActiveImage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Images to cycle through
  const images = [
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  // Cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation mounting effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle role selection
  const handleRoleSelect = (role: "user" | "organizer") => {
    if (isAuthenticated) {
      if (role === "user") {
        navigate("/events");
      } else {
        navigate("/organizer/dashboard");
      }
    } else {
      localStorage.setItem("preferred_role", role);
      navigate("/signup");
    }
  };

  // Featured events
  const featuredEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/60 z-10"></div>
              <img
                src={img}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full container mx-auto px-4 text-white">
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center 
              transition-all duration-700 transform 
              ${isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <span className="text-gradient">UNIVERSE</span>
          </h1>
          <h2 
            className={`text-xl md:text-2xl font-medium mb-8 text-center
              transition-all duration-700 transform
              ${isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            SRM's Ultimate Event Hub
          </h2>
          
          <div 
            className={`flex flex-col md:flex-row gap-4 mb-12 w-full max-w-md
              transition-all duration-700 transform
              ${isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            style={{ transitionDelay: "0.6s" }}
          >
            <Button
              className="flex-1 h-12 bg-white text-universe-purple hover:bg-gray-100 border-2 border-white"
              onClick={() => handleRoleSelect("user")}
            >
              <Ticket className="mr-2 h-5 w-5" /> General User
            </Button>
            <Button
              className="flex-1 h-12 bg-transparent text-white hover:bg-white/10 border-2 border-white"
              onClick={() => handleRoleSelect("organizer")}
            >
              <Calendar className="mr-2 h-5 w-5" /> Event Organizer
            </Button>
          </div>
          
          <div 
            className={`text-center max-w-2xl mx-auto
              transition-all duration-700 transform
              ${isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            style={{ transitionDelay: "0.8s" }}
          >
            <p className="text-lg md:text-xl">
              Your One-Stop Destination for All Campus Events!
            </p>
            <p className="mt-4 text-gray-300">
              Browse through a dynamic list of all upcoming SRM events.
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float">
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      {/* Role Selection Section (for first-time visitors) */}
      <section className="py-16 container mx-auto px-4 relative z-20 animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-2">How would you like to use UNIVERSE?</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          UNIVERSE caters to both event attendees and organizers. Choose your role to get started.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* General User Card */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all hover:border-universe-purple/50 hover:-translate-y-1">
            <div className="w-20 h-20 mb-6 rounded-full bg-muted flex items-center justify-center animate-pulse-glow">
              <Ticket className="h-10 w-10 text-universe-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">General User</h3>
            <p className="text-muted-foreground mb-6">
              Discover and book tickets for exciting events happening at SRM
            </p>
            <ul className="text-left space-y-2 mb-6 w-full">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Browse upcoming events
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Book tickets easily
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Download e-tickets
              </li>
            </ul>
            <Button 
              className="w-full bg-gradient text-white"
              onClick={() => handleRoleSelect("user")}
            >
              Continue as User
            </Button>
          </div>
          
          {/* Organizer Card */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all hover:border-universe-purple/50 hover:-translate-y-1">
            <div className="w-20 h-20 mb-6 rounded-full bg-muted flex items-center justify-center animate-pulse-glow">
              <Calendar className="h-10 w-10 text-universe-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Event Organizer</h3>
            <p className="text-muted-foreground mb-6">
              Create and manage your events, track bookings and attendees
            </p>
            <ul className="text-left space-y-2 mb-6 w-full">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Create new events
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Manage ticket sales
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Generate custom tickets
              </li>
            </ul>
            <Button 
              className="w-full bg-gradient text-white"
              onClick={() => handleRoleSelect("organizer")}
            >
              Continue as Organizer
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-muted/50 container mx-auto px-4 rounded-3xl my-16 animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Events</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Check out these exciting events happening soon at SRM
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <div 
              key={event.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-universe-purple/50 hover:-translate-y-1"
              style={{ 
                animationDelay: `${0.2 * index}s` 
              }}
            >
              <div className="h-48 relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground text-sm mb-4">
                  {event.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{event.venue.split(',')[0]}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-gradient text-white"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/events")}
            className="hover:border-universe-purple/50"
          >
            View All Events
          </Button>
        </div>
      </section>

      {/* Call To Action */}
      <section className="relative py-20 animate-slide-up overflow-hidden">
        <div className="absolute inset-0 bg-universe-purple/10 z-0"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-universe-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-universe-pink/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience SRM's Best Events?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join UNIVERSE today and never miss out on campus events again. Book tickets, manage events, and connect with the SRM community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient text-white"
                onClick={() => isAuthenticated ? navigate("/events") : navigate("/signup")}
              >
                {isAuthenticated ? "Browse Events" : "Sign Up Now"}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/events")}
              >
                Explore Events
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function for date formatting
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default Index;
