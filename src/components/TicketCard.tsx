import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Ticket, Event } from "@/context/UniverseContext";
import { formatDate } from "@/lib/utils";
import QRCode from "qrcode";

interface TicketCardProps {
  ticket: Ticket;
  event: Event;
}

const TicketCard = ({ ticket, event }: TicketCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

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

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrData = JSON.stringify({
          ticketId: ticket.id,
          eventId: ticket.eventId,
          userId: ticket.userId,
          eventTitle: event.title,
          attendee: ticket.userName,
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
    };

    if (ticket.status === "confirmed") {
      generateQRCode();
    }
  }, [ticket, event]);

  return (
    <>
      <Card className="overflow-hidden border-border hover:shadow-md transition-all duration-300 animate-scale-up">
        <div className="relative h-24 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
            <h3 className="text-white font-semibold line-clamp-1">
              {event.title}
            </h3>
          </div>
          <Badge
            className={`absolute top-3 right-3 ${getStatusColor(ticket.status)}`}
          >
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </Badge>
        </div>
        <CardContent className="p-4 pt-3">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Event Date</p>
              <p className="text-sm font-medium">{formatDate(event.date)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Ticket Price</p>
              <p className="text-sm font-medium">{event.price > 0 ? `₹${event.price}` : "Free"}</p>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-muted-foreground">Venue</p>
              <p className="text-sm font-medium">{event.venue}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Purchase Date</p>
              <p className="text-sm font-medium">{formatDate(ticket.purchaseDate)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setIsDialogOpen(true)}
          >
            <Eye size={16} className="mr-2" /> View Ticket
          </Button>
          {ticket.status === "confirmed" && (
            <Button
              variant="default"
              size="sm"
              className="w-full bg-universe-purple hover:bg-universe-dark-purple text-white"
            >
              <Download size={16} className="mr-2" /> Download
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
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
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
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
                    <p className="font-medium">{ticket.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Purchase Date</p>
                    <p className="font-medium">{formatDate(ticket.purchaseDate)}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-2">
                <p className="text-xs text-muted-foreground mb-1">Attendee Information</p>
                <p className="font-medium">{ticket.userName}</p>
                <p className="text-sm text-muted-foreground">{ticket.userDepartment}</p>
              </div>
              <div className="border-t border-border pt-2 flex justify-center">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">QR Code</p>
                  {qrCodeUrl && ticket.status === "confirmed" ? (
                    <img 
                      src={qrCodeUrl} 
                      alt="Ticket QR Code" 
                      className="mx-auto border border-border rounded"
                    />
                  ) : (
                    <div className="h-24 w-24 bg-muted border border-border rounded mx-auto flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">No QR Code</span>
                    </div>
                  )}
                  <p className="text-xs mt-2 font-medium">
                    {ticket.status === "confirmed" ? "Scan at the venue" : "Available when confirmed"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {ticket.status === "confirmed" && (
            <Button
              className="w-full bg-universe-purple hover:bg-universe-dark-purple text-white"
            >
              <Download size={16} className="mr-2" /> Download Ticket
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TicketCard;
