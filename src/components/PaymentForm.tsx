
import { UseFormReturn } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft } from "lucide-react";
import { CheckoutFormValues } from "./CheckoutForm";

interface PaymentFormProps {
  form: UseFormReturn<CheckoutFormValues>;
  onSubmit: (data: CheckoutFormValues) => void;
  onBack: () => void;
  isProcessing: boolean;
}

const PaymentForm = ({ form, onSubmit, onBack, isProcessing }: PaymentFormProps) => {
  return (
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
              onClick={onBack}
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
  );
};

export default PaymentForm;
