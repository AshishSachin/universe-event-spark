
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import CheckoutForm, { CheckoutFormValues, checkoutSchema } from "@/components/CheckoutForm";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useUniverse } from "@/context/UniverseContext";
import { Event } from "@/context/UniverseContext";
import { generateRandomId } from "@/lib/utils";

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, currentUser, addTicket } = useUniverse();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Payment Details, 3: Confirmation

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      department: currentUser?.department || "",
      quantity: 1
    }
  });

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundEvent = events.find(e => e.id === id);
      setEvent(foundEvent || null);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, events]);

  useEffect(() => {
    // Update form with user data when it becomes available
    if (currentUser) {
      form.setValue("name", currentUser.name);
      form.setValue("email", currentUser.email);
      form.setValue("phone", currentUser.phone || "");
      form.setValue("department", currentUser.department || "");
    }
  }, [currentUser, form]);

  const onSubmit = (data: CheckoutFormValues) => {
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      // Move to confirmation step
      setStep(3);
      window.scrollTo(0, 0);
    } else {
      // Final confirmation - process payment
      if (!event) return;
      
      setIsProcessing(true);
      
      // Simulate payment processing delay
      setTimeout(() => {
        try {
          // Create a new ticket
          const ticket = {
            id: generateRandomId(),
            eventId: event.id,
            userId: currentUser?.id || generateRandomId(),
            purchaseDate: new Date().toISOString(),
            status: "confirmed" as const,
            price: event.price * data.quantity,
            userName: data.name,
            userDepartment: data.department,
          };
          
          // Add ticket
          addTicket(ticket);
          
          // Show success toast
          toast.success("Ticket purchased successfully!");
          
          // Navigate to success page
          navigate("/success");
        } catch (error) {
          toast.error("Failed to process payment. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      }, 2000);
    }
  };

  const handleQuantityChange = (increment: number) => {
    const currentQuantity = form.getValues("quantity");
    const newQuantity = Math.max(1, Math.min(10, currentQuantity + increment));
    form.setValue("quantity", newQuantity);
  };

  // Helper function to get form values with proper defaults
  const getAttendeeDetails = () => {
    const values = form.getValues();
    return {
      name: values.name || "",
      email: values.email || "",
      phone: values.phone || "",
      department: values.department || "",
      quantity: values.quantity || 1
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        <div className="flex items-center mb-6 animate-slide-right">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={() => {
              if (step === 1) {
                navigate(`/events/${event?.id}`);
              } else {
                setStep(step - 1);
              }
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {step === 1 ? "Checkout" : step === 2 ? "Payment" : "Confirm Purchase"}
          </h1>
        </div>
        
        {step === 3 ? (
          // Confirmation Step
          <PaymentConfirmation
            event={event!}
            attendeeDetails={getAttendeeDetails()}
            onConfirm={() => form.handleSubmit(onSubmit)()}
            onBack={() => setStep(2)}
            isProcessing={isProcessing}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 animate-slide-right">
              {step === 1 ? (
                <CheckoutForm
                  form={form}
                  onSubmit={onSubmit}
                  onQuantityChange={handleQuantityChange}
                />
              ) : (
                <PaymentForm
                  form={form}
                  onSubmit={onSubmit}
                  onBack={() => setStep(1)}
                  isProcessing={isProcessing}
                />
              )}
            </div>
            
            {/* Order Summary */}
            <div className="animate-slide-left">
              <OrderSummary
                event={event}
                quantity={form.getValues("quantity")}
                step={step}
              />
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
