
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
import { useUniverse } from "@/context/UniverseContext";
import FloatingParticles from "@/components/FloatingParticles";

// Login form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUniverse();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      const role = Math.random() > 0.5 ? "user" : "organizer";

      // Sample user data
      const user = {
        id: Math.random().toString(36).substring(2, 15),
        email: data.email,
        name: data.email.split('@')[0],
        role: role as "user" | "organizer",
        department: "Computer Science",
        phone: "9876543210",
        srmEmail: "sample@srmist.edu.in",
        personalEmail: data.email,
        section: "C"
      };

      // Set current user
      setCurrentUser(user);
      
      // Show success message
      toast.success("Logged in successfully!");
      
      // Redirect based on role
      if (role === "user") {
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
        
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="flex justify-end">
              <Link to="#" className="text-sm text-universe-purple hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient text-white mt-4" 
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-universe-purple hover:underline font-medium">
              Sign Up
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

export default Login;
