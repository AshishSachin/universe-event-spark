
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Ticket } from "lucide-react";

// Checkout form schema
const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  department: z.string().min(2, "Department is required"),
  quantity: z.number().min(1, "Quantity must be at least 1").max(10, "Maximum 10 tickets per transaction")
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  form: UseFormReturn<CheckoutFormValues>;
  onSubmit: (data: CheckoutFormValues) => void;
  onQuantityChange: (increment: number) => void;
}

const CheckoutForm = ({ form, onSubmit, onQuantityChange }: CheckoutFormProps) => {
  return (
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
                    onClick={() => onQuantityChange(-1)}
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
                    onClick={() => onQuantityChange(1)}
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
  );
};

export default CheckoutForm;
export { checkoutSchema };
