
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Calendar, Image, Upload } from "lucide-react";
import { useUniverse } from "@/context/UniverseContext";
import { generateRandomId } from "@/lib/utils";
import FloatingParticles from "@/components/FloatingParticles";

// Create event form schema
const createEventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  details: z.string().min(30, "Details must be at least 30 characters"),
  category: z.enum(["hackathon", "ideathon", "workshop", "milan", "aarush", "roadshow"]),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  venue: z.string().min(5, "Venue must be at least 5 characters"),
  organizer: z.string().min(3, "Organizer name is required"),
  price: z.number().min(0, "Price must be positive"),
  tickets_available: z.number().min(1, "At least 1 ticket must be available"),
  registration_deadline: z.string().min(1, "Registration deadline is required"),
  image: z.string().min(1, "Image URL is required"),
  ticketType: z.enum(["paid", "free"])
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent, isAuthenticated, currentUser } = useUniverse();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [ticketType, setTicketType] = useState<"paid" | "free">("paid");
  
  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      details: "",
      category: "hackathon",
      date: "",
      time: "",
      venue: "",
      organizer: currentUser?.name || "",
      price: 0,
      tickets_available: 100,
      registration_deadline: "",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ticketType: "paid"
    }
  });

  // Check if user is authenticated and an organizer
  if (!isAuthenticated || currentUser?.role !== "organizer") {
    navigate("/login");
    return null;
  }

  // Sample image URLs
  const sampleImages = [
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  function onSubmit(data: CreateEventFormValues) {
    setIsSubmitting(true);

    // If ticket type is free, set price to 0
    if (data.ticketType === "free") {
      data.price = 0;
    }

    // Simulate API call with a timeout
    setTimeout(() => {
      try {
        // Create new event
        const newEvent = {
          id: generateRandomId(),
          title: data.title,
          description: data.description,
          details: data.details,
          category: data.category,
          date: data.date,
          time: data.time,
          venue: data.venue,
          organizer: data.organizer,
          price: data.price,
          tickets_available: data.tickets_available,
          registration_deadline: data.registration_deadline,
          image: data.image
        };

        // Add event
        addEvent(newEvent);
        
        // Show success toast
        toast.success("Event created successfully!");
        
        // Navigate to organizer dashboard
        navigate("/organizer/dashboard");
      } catch (error) {
        toast.error("Failed to create event. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  }

  const handleImageSelect = (url: string) => {
    form.setValue("image", url);
    setPreviewImage(url);
  };

  const handleTicketTypeChange = (value: "paid" | "free") => {
    setTicketType(value);
    form.setValue("ticketType", value);
    
    if (value === "free") {
      form.setValue("price", 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FloatingParticles count={15} />
      
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow relative z-10">
        <div className="flex items-center mb-6 animate-slide-right">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={() => navigate("/organizer/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Create New Event</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 mb-8 animate-slide-up">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Title</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Hackathon 2025" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hackathon">Hackathon</SelectItem>
                                <SelectItem value="ideathon">Ideathon</SelectItem>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="milan">Milan</SelectItem>
                                <SelectItem value="aarush">Aarush</SelectItem>
                                <SelectItem value="roadshow">Roadshow</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="organizer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organizer Name</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g., CodeClub SRM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief description of your event (will be shown in cards)" 
                              className="resize-none" 
                              rows={2}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide a detailed description of your event, including any specific rules or requirements" 
                              className="resize-none" 
                              rows={6}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator />
                
                {/* Date, Time & Venue */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Date, Time & Venue</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Tech Building, Block 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                {/* Ticket Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Ticket Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="ticketType"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Ticket Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => handleTicketTypeChange(value as "paid" | "free")}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="paid" id="paid" />
                              <label htmlFor="paid" className="text-sm">Paid Event</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="free" id="free" />
                              <label htmlFor="free" className="text-sm">Free Event</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ticket Price (₹)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              disabled={ticketType === "free"}
                              min={0}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter 0 for free events
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tickets_available"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Tickets Available</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="100" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              min={1}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="registration_deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                {/* Event Image */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Event Image</h2>
                  
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          {sampleImages.map((url, index) => (
                            <div 
                              key={index} 
                              className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                field.value === url ? 'border-universe-purple' : 'border-transparent'
                              }`}
                              onClick={() => handleImageSelect(url)}
                            >
                              <img 
                                src={url} 
                                alt={`Sample ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              {field.value === url && (
                                <div className="absolute inset-0 bg-universe-purple/20 flex items-center justify-center">
                                  <div className="h-5 w-5 rounded-full bg-universe-purple flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <Input {...field} placeholder="Or enter image URL" />
                          </FormControl>
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={() => setPreviewImage(field.value)}
                          >
                            Preview
                          </Button>
                        </div>
                        <FormDescription>
                          Choose a sample image or enter a URL
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient text-white mt-8" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Event..." : "Create Event"}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Preview Panel */}
          <div className="animate-slide-left">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Event Preview</h2>
              
              <div className="rounded-lg overflow-hidden mb-3">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Event Preview" 
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-muted flex items-center justify-center">
                    <Image className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {form.watch("title") || "Event Title"}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {form.watch("description") || "Event description will appear here"}
                </p>
                
                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>
                      {form.watch("date") 
                        ? new Date(form.watch("date")).toLocaleDateString() 
                        : "Event date"}
                    </span>
                  </div>
                  <span className="font-semibold">
                    {ticketType === "free" 
                      ? "Free"
                      : form.watch("price") 
                        ? `₹${form.watch("price")}`
                        : "₹0"
                    }
                  </span>
                </div>
              </div>
              
              <div className="border-t border-border mt-6 pt-6">
                <h4 className="font-medium mb-2">Publishing Checklist:</h4>
                <ul className="space-y-2 text-sm">
                  <ChecklistItem 
                    label="Basic details" 
                    completed={!!(form.watch("title") && form.watch("description") && form.watch("category"))} 
                  />
                  <ChecklistItem 
                    label="Date and venue" 
                    completed={!!(form.watch("date") && form.watch("time") && form.watch("venue"))} 
                  />
                  <ChecklistItem 
                    label="Ticket information" 
                    completed={form.watch("tickets_available") > 0 && !!form.watch("registration_deadline")} 
                  />
                  <ChecklistItem 
                    label="Event image" 
                    completed={!!form.watch("image")} 
                  />
                </ul>
                
                <div className="mt-6">
                  <Button 
                    variant="outline"
                    className="w-full flex gap-2 items-center justify-center"
                    type="button"
                  >
                    <Upload className="h-4 w-4" /> Save as Draft
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const ChecklistItem = ({ label, completed }: { label: string; completed: boolean }) => {
  return (
    <li className="flex items-center">
      <div className={`h-4 w-4 rounded-full mr-2 flex items-center justify-center ${
        completed ? 'bg-green-500' : 'bg-muted'
      }`}>
        {completed && (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
      <span className={completed ? 'text-foreground' : 'text-muted-foreground'}>
        {label}
      </span>
    </li>
  );
};

export default CreateEvent;
