
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TicketCard from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarX2, Calendar, Ticket } from "lucide-react";
import { useUniverse } from "@/context/UniverseContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, tickets, events } = useUniverse();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  // Filter tickets based on active tab
  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === "all") return true;
    return ticket.status === activeTab;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-slide-right">
            <h1 className="text-3xl font-bold">My Tickets</h1>
            <Button
              className="bg-gradient text-white"
              onClick={() => navigate("/events")}
            >
              <Calendar className="mr-2 h-4 w-4" /> Browse Events
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="animate-slide-up">
            <TabsList className="mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-universe-purple data-[state=active]:text-white">
                All Tickets
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="data-[state=active]:bg-universe-purple data-[state=active]:text-white">
                Confirmed
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-universe-purple data-[state=active]:text-white">
                Pending
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="data-[state=active]:bg-universe-purple data-[state=active]:text-white">
                Cancelled
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <TicketsList 
                isLoading={isLoading} 
                tickets={filteredTickets} 
                events={events} 
                navigate={navigate}
              />
            </TabsContent>
            <TabsContent value="confirmed" className="mt-0">
              <TicketsList 
                isLoading={isLoading} 
                tickets={filteredTickets} 
                events={events} 
                navigate={navigate}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              <TicketsList 
                isLoading={isLoading} 
                tickets={filteredTickets} 
                events={events} 
                navigate={navigate}
              />
            </TabsContent>
            <TabsContent value="cancelled" className="mt-0">
              <TicketsList 
                isLoading={isLoading} 
                tickets={filteredTickets} 
                events={events} 
                navigate={navigate}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface TicketsListProps {
  isLoading: boolean;
  tickets: any[];
  events: any[];
  navigate: any;
}

const TicketsList = ({ isLoading, tickets, events, navigate }: TicketsListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-64 rounded-xl" />
        ))}
      </div>
    );
  }
  
  if (tickets.length === 0) {
    return (
      <div className="py-12 text-center animate-fade-in">
        <div className="mb-4">
          <div className="inline-block p-5 rounded-full bg-muted">
            <CalendarX2 className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">No tickets found</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          You haven't booked any tickets yet. Browse our events and book tickets to get started.
        </p>
        <Button
          className="bg-gradient text-white"
          onClick={() => navigate("/events")}
        >
          <Ticket className="mr-2 h-4 w-4" /> Browse Events
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tickets.map((ticket) => {
        const event = events.find(e => e.id === ticket.eventId);
        if (!event) return null;
        
        return (
          <TicketCard key={ticket.id} ticket={ticket} event={event} />
        );
      })}
    </div>
  );
};

export default Dashboard;
