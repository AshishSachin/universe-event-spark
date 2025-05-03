
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUniverse } from "@/context/UniverseContext";
import { generateRandomId } from "@/lib/utils";
import FloatingParticles from "@/components/FloatingParticles";

// Sign up form schema
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  srmEmail: z.string().email("Please enter a valid SRM email address").refine(val => val.endsWith("@srmist.edu.in"), {
    message: "Must be a valid SRM email ending with @srmist.edu.in"
  }),
  personalEmail: z.string().email("Please enter a valid personal email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  department: z.string().min(2, "Department is required"),
  section: z.string().min(1, "Section is required"),
  role: z.enum(["user", "organizer"])
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUniverse();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get preferred role from localStorage or default to "user"
  const preferredRole = localStorage.getItem("preferred_role") as "user" | "organizer" || "user";

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      srmEmail: "",
      personalEmail: "",
      password: "",
      phone: "",
      department: "",
      section: "",
      role: preferredRole
    }
  });

  function onSubmit(data: SignUpFormValues) {
    setIsLoading(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      // Create new user
      const newUser = {
        id: generateRandomId(),
        email: data.email,
        name: data.name,
        role: data.role,
        department: data.department,
        phone: data.phone,
        srmEmail: data.srmEmail,
        personalEmail: data.personalEmail,
        section: data.section
      };

      // Set current user
      setCurrentUser(newUser);
      
      // Show success message
      toast.success("Account created successfully!");
      
      // Redirect based on role
      if (data.role === "user") {
        navigate("/events");
      } else {
        navigate("/organizer/dashboard");
      }

      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative">
      <FloatingParticles count={15} />
      
      <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 shadow-lg relative z-10 animate-scale-up">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-universe-purple to-universe-pink flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center">
                <span className="text-sm font-bold text-universe-purple">U</span>
              </div>
            </div>
            <span className="text-xl font-bold text-gradient">UniVerse</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>I want to use UniVerse as a:</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="user" />
                        <label htmlFor="user" className="text-sm font-medium cursor-pointer">
                          General User - Discover and book event tickets
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organizer" id="organizer" />
                        <label htmlFor="organizer" className="text-sm font-medium cursor-pointer">
                          Event Organizer - Create and manage events
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="srmEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SRM Email ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ra2011003010000@srmist.edu.in" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Email ID</FormLabel>
                    <FormControl>
                      <Input placeholder="personal@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <FormControl>
                      <Input placeholder="C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient text-white mt-6" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-universe-purple hover:underline font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm text-muted-foreground relative z-10">
        <Link to="/" className="hover:text-universe-purple">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
