
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { Event } from "@/context/UniverseContext";
import { formatDate } from "@/lib/utils";

interface OrderSummaryProps {
  event: Event | null;
  quantity: number;
  step: number;
}

const OrderSummary = ({ event, quantity, step }: OrderSummaryProps) => {
  if (!event) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-medium">{event.title}</h3>
          <p className="text-sm text-muted-foreground">{formatDate(event.date)} at {event.time}</p>
          <p className="text-sm text-muted-foreground">{event.venue.split(',')[0]}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ticket Price</span>
          <span>{event.price > 0 ? `₹${event.price}` : "Free"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Quantity</span>
          <span>{quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Booking Fee</span>
          <span>₹0</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>Total</span>
        <span>{event.price > 0 ? `₹${event.price * quantity}` : "Free"}</span>
      </div>

      {step >= 2 && (
        <div className="bg-muted rounded-lg p-3 text-sm flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p>Your ticket will be available to download or view immediately after successful payment.</p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
