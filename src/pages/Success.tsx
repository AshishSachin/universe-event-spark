
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Download, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { useUniverse } from "@/context/UniverseContext";
import { formatDate } from "@/lib/utils";
import QRCode from "qrcode";

const Success = () => {
  const navigate = useNavigate();
  const { tickets, events } = useUniverse();
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

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

  // Generate QR code for the ticket
  useEffect(() => {
    const generateQRCode = async () => {
      if (latestTicket && event && latestTicket.status === "confirmed") {
        try {
          const qrData = JSON.stringify({
            ticketId: latestTicket.id,
            eventId: latestTicket.eventId,
            userId: latestTicket.userId,
            eventTitle: event.title,
            attendee: latestTicket.userName,
            date: event.date,
            venue: event.venue
          });
          const url = await QRCode.toDataURL(qrData, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          setQrCodeUrl(url);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQRCode();
  }, [latestTicket, event]);

  // Redirect if no ticket info is available
  useEffect(() => {
    if (!latestTicket && !event) {
      const timer = setTimeout(() => {
        navigate("/events");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [latestTicket, event, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

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
            Your ticket has been confirmed and is ready for download. Your QR code is now available!
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
                  <Badge className={`mt-2 ${getStatusColor(latestTicket.status)}`}>
                    {latestTicket.status.charAt(0).toUpperCase() + latestTicket.status.slice(1)}
                  </Badge>
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
                  variant="outline"
                  onClick={() => setIsTicketDialogOpen(true)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Ticket & QR Code
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
      
      {/* Ticket Details Dialog */}
      {latestTicket && event && (
        <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Your Ticket</DialogTitle>
              <DialogDescription>
                Event: {event.title}
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 border-2 border-dashed border-muted-foreground rounded-lg bg-muted/50">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                  </div>
                  <Badge className={getStatusColor(latestTicket.status)}>
                    {latestTicket.status.charAt(0).toUpperCase() + latestTicket.status.slice(1)}
                  </Badge>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Date & Time</p>
                      <p className="font-medium">{formatDate(event.date)} at {event.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Ticket Price</p>
                      <p className="font-medium">{event.price > 0 ? `₹${event.price}` : "Free"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Ticket ID</p>
                      <p className="font-medium">{latestTicket.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Purchase Date</p>
                      <p className="font-medium">{formatDate(latestTicket.purchaseDate)}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Attendee Information</p>
                  <p className="font-medium">{latestTicket.userName}</p>
                  <p className="text-sm text-muted-foreground">{latestTicket.userDepartment}</p>
                </div>
                <div className="border-t border-border pt-2 flex justify-center">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">QR Code</p>
                    {qrCodeUrl && latestTicket.status === "confirmed" ? (
                      <img 
                        src={qrCodeUrl} 
                        alt="Ticket QR Code" 
                        className="mx-auto border border-border rounded"
                      />
                    ) : (
                      <div className="h-24 w-24 bg-muted border border-border rounded mx-auto flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Generating QR Code...</span>
                      </div>
                    )}
                    <p className="text-xs mt-2 font-medium">
                      {latestTicket.status === "confirmed" ? "Scan at the venue" : "Available when confirmed"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {latestTicket.status === "confirmed" && (
              <Button
                className="w-full bg-universe-purple hover:bg-universe-dark-purple text-white"
              >
                <Download size={16} className="mr-2" /> Download Ticket
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
      
      <Footer />
    </div>
  );
};

export default Success;
