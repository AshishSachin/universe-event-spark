
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Ticket,
  Share2,
  BookOpen,
  ArrowLeft
} from "lucide-react";
import { useUniverse } from "@/context/UniverseContext";
import { Event } from "@/context/UniverseContext";
import { formatDate, calculateTimeLeft } from "@/lib/utils";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, isAuthenticated } = useUniverse();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundEvent = events.find(e => e.id === id);
      setEvent(foundEvent || null);
      setIsLoading(false);
      
      if (foundEvent) {
        setTimeLeft(calculateTimeLeft(foundEvent.date));
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, events]);

  useEffect(() => {
    if (event) {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(event.date));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [event]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Category colors
  const categoryColors = {
    hackathon: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    ideathon: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
    workshop: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    milan: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300",
    aarush: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    roadshow: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  };

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      });
    } else if (event) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleBookTicket = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to book tickets", {
        action: {
          label: "Login",
          onClick: () => navigate("/login")
        }
      });
      return;
    }

    navigate(`/checkout/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-6 w-1/4 mb-2" />
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
            <div>
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12 flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold">Event Not Found</h1>
            <p className="text-muted-foreground max-w-md">
              The event you're looking for doesn't seem to exist. It may have been removed or you followed an incorrect link.
            </p>
            <Button 
              className="bg-gradient text-white mt-4"
              onClick={() => navigate("/events")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Browse Events
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div 
        className={`container mx-auto px-4 pt-24 pb-12 flex-grow
          transition-opacity duration-500 ease-in-out
          ${isMounted ? "opacity-100" : "opacity-0"}`}
      >
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl mb-8 animate-scale-up">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <Badge className={`mb-3 ${categoryColors[event.category]}`}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{event.title}</h1>
          </div>
        </div>
        
        {/* Event Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 order-2 md:order-1 animate-slide-right">
            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <p className="text-muted-foreground whitespace-pre-line mb-8">{event.details}</p>
            
            <h3 className="text-lg font-semibold mb-3">Event Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-universe-purple mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-universe-purple mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-universe-purple mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Venue</p>
                  <p className="text-muted-foreground">{event.venue}</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="h-5 w-5 text-universe-purple mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Organized by</p>
                  <p className="text-muted-foreground">{event.organizer}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                className="bg-gradient text-white"
                onClick={handleBookTicket}
              >
                <Ticket className="mr-2 h-5 w-5" /> 
                Book Tickets
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-5 w-5" /> 
                Share Event
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-1 md:order-2 animate-slide-left">
            {/* Ticket Card */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Ticket Price</h3>
                <span className="text-xl font-bold text-universe-purple">
                  {event.price > 0 ? `₹${event.price}` : "Free"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {event.tickets_available} tickets available
              </p>
              <Button
                className="w-full bg-gradient text-white"
                onClick={handleBookTicket}
              >
                <Ticket className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </div>
            
            {/* Countdown Timer */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold mb-4 text-center">Event Starts In</h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xl font-bold">{timeLeft.days}</span>
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">DAYS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xl font-bold">{timeLeft.hours}</span>
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">HOURS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xl font-bold">{timeLeft.minutes}</span>
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">MINS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xl font-bold">{timeLeft.seconds}</span>
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">SECS</span>
                </div>
              </div>
              <p className="text-xs text-center mt-4 text-muted-foreground">
                Registration closes on {formatDate(event.registration_deadline)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
