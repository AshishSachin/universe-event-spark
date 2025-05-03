
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUniverse } from "@/context/UniverseContext";
import { Event } from "@/context/UniverseContext";
import { Calendar, Ticket } from "lucide-react";

const Events = () => {
  const navigate = useNavigate();
  const { events, isAuthenticated } = useUniverse();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter events
    let filtered = [...events];
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(event => event.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        event => 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  }, [events, activeCategory, searchQuery]);

  const handleFilterChange = (category: string, search: string) => {
    setActiveCategory(category);
    setSearchQuery(search);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-universe-purple/10 to-universe-pink/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="animate-slide-right">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Events</h1>
              <p className="text-muted-foreground">
                Discover and book tickets for exciting events at SRM
              </p>
            </div>
            
            {isAuthenticated ? (
              <Button 
                className="bg-gradient text-white animate-slide-left"
                onClick={() => navigate("/dashboard")}
              >
                <Ticket className="mr-2 h-4 w-4" /> My Tickets
              </Button>
            ) : (
              <Button 
                className="bg-gradient text-white animate-slide-left"
                onClick={() => navigate("/signup")}
              >
                <Calendar className="mr-2 h-4 w-4" /> Create Account
              </Button>
            )}
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-8 flex-grow">
        <div className="container mx-auto px-4">
          <EventFilters onFilterChange={handleFilterChange} />
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mb-4">
                <div className="inline-block p-4 bg-muted rounded-full">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">No Events Found</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                {searchQuery.trim() 
                  ? `No events match your search for "${searchQuery}"` 
                  : `No ${activeCategory !== "all" ? activeCategory : ""} events are currently available`
                }. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;
