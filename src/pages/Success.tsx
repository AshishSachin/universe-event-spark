
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { useUniverse } from "@/context/UniverseContext";

const Success = () => {
  const navigate = useNavigate();
  const { tickets, events } = useUniverse();

  // Get the most recent ticket
  const latestTicket = tickets.length > 0 
    ? tickets.reduce((latest, ticket) => {
        return new Date(ticket.purchaseDate) > new Date(latest.purchaseDate) ? ticket : latest;
      })
    : null;

  // Find the corresponding event
  const event = latestTicket 
    ? events.find(e => e.id === latestTicket.eventId)
    : null;

  // Redirect if no ticket info is available
  useEffect(() => {
    if (!latestTicket && !event) {
      const timer = setTimeout(() => {
        navigate("/events");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [latestTicket, event, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FloatingParticles count={20} />
      
      <main className="flex-grow flex items-center justify-center relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-12 text-center animate-scale-up">
          <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400 animate-pulse-glow" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your ticket has been confirmed and is ready for download.
          </p>
          
          {latestTicket && event && (
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm max-w-xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left flex-grow">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {event.time}</span>
                  </div>
                  <p className="mt-2">{event.venue}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  View My Tickets
                </Button>
                <Button 
                  className="bg-gradient text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Ticket
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="mx-auto"
              onClick={() => navigate("/events")}
            >
              Browse More Events
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;
