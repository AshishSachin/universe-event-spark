
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CreditCard, Ticket, CheckCircle, AlertCircle } from "lucide-react";
import { useUniverse } from "@/context/UniverseContext";
import { Event } from "@/context/UniverseContext";
import { formatDate, generateRandomId } from "@/lib/utils";

// Checkout form schema
const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  department: z.string().min(2, "Department is required"),
  quantity: z.number().min(1, "Quantity must be at least 1").max(10, "Maximum 10 tickets per transaction")
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

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
                <div className="bg-card border border-border rounded-xl p-6 mb-8">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Ticket className="h-5 w-5 mr-2 text-universe-purple" />
                    Attendee Information
                  </h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ticket Quantity</FormLabel>
                            <div className="flex items-center space-x-3">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(-1)}
                                disabled={field.value <= 1}
                              >
                                -
                              </Button>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  className="w-20 text-center"
                                  min={1}
                                  max={10}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                      field.onChange(Math.max(1, Math.min(10, value)));
                                    }
                                  }}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(1)}
                                disabled={field.value >= 10}
                              >
                                +
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Maximum 10 tickets per transaction
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="bg-gradient text-white"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-6 mb-8 animate-slide-up">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-universe-purple" />
                    Payment Details
                  </h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234 5678 9012 3456" />
                          </FormControl>
                        </FormItem>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" />
                            </FormControl>
                          </FormItem>
                          
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input placeholder="123" />
                            </FormControl>
                          </FormItem>
                        </div>
                        
                        <FormItem>
                          <FormLabel>Cardholder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" />
                          </FormControl>
                        </FormItem>
                      </div>
                      
                      <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setStep(1)}
                          disabled={isProcessing}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> 
                          Back
                        </Button>
                        
                        <Button 
                          type="submit" 
                          className="bg-gradient text-white"
                          disabled={isProcessing}
                        >
                          Review Order
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="animate-slide-left">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <img 
                    src={event?.image} 
                    alt={event?.title} 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{event?.title}</h3>
                    <p className="text-sm text-muted-foreground">{event ? formatDate(event.date) : ''} at {event?.time}</p>
                    <p className="text-sm text-muted-foreground">{event?.venue.split(',')[0]}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket Price</span>
                    <span>{event && event.price > 0 ? `₹${event.price}` : "Free"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{form.getValues("quantity")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking Fee</span>
                    <span>₹0</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>{event && event.price > 0 ? `₹${event.price * form.getValues("quantity")}` : "Free"}</span>
                </div>

                {step >= 2 && (
                  <div className="bg-muted rounded-lg p-3 text-sm flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p>Your ticket will be available to download or view immediately after successful payment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
