
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, CheckCircle, Clock } from "lucide-react";
import { Event } from "@/context/UniverseContext";
import { formatDate } from "@/lib/utils";

interface PaymentConfirmationProps {
  event: Event;
  attendeeDetails: {
    name: string;
    email: string;
    phone: string;
    department: string;
    quantity: number;
  };
  onConfirm: () => void;
  onBack: () => void;
  isProcessing: boolean;
}

const PaymentConfirmation = ({ 
  event, 
  attendeeDetails, 
  onConfirm, 
  onBack, 
  isProcessing 
}: PaymentConfirmationProps) => {
  const totalAmount = event.price * attendeeDetails.quantity;

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <Card className="border-2 border-universe-purple/20">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-universe-purple/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-universe-purple" />
            </div>
          </div>
          <CardTitle className="text-2xl">Confirm Your Purchase</CardTitle>
          <p className="text-muted-foreground">
            Please review your order details before proceeding with payment
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Event Details */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDate(event.date)} at {event.time}
              </p>
              <p className="text-sm text-muted-foreground">{event.venue}</p>
            </div>
          </div>

          {/* Attendee Information */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Attendee Information
            </h4>
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium">{attendeeDetails.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{attendeeDetails.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">{attendeeDetails.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="font-medium">{attendeeDetails.department}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h4 className="font-semibold mb-3">Order Summary</h4>
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket Price</span>
                <span>{event.price > 0 ? `₹${event.price}` : "Free"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <Badge variant="secondary">{attendeeDetails.quantity}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Fee</span>
                <span>₹0</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span className="text-universe-purple">
                  {totalAmount > 0 ? `₹${totalAmount}` : "Free"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              disabled={isProcessing}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Edit
            </Button>
            
            <Button 
              onClick={onConfirm}
              disabled={isProcessing}
              className="flex-1 bg-gradient text-white"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                <>
                  Confirm & Pay {totalAmount > 0 ? `₹${totalAmount}` : ""}
                </>
              )}
            </Button>
          </div>

          {totalAmount === 0 && (
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">
                This is a free event. Click confirm to complete your registration.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfirmation;
