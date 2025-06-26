import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploader } from "@/components/ui/file";
import KYCFormHeader from "./form-header";
import { ArrowLeft } from "iconsax-react";
import { useRegistration } from '../../../../../context/RegistrationContext';
import { registrationApi } from '../../../../../api/registrationApi';

const KYBSchema = z.object({
  companyAddress: z.string().min(1, "Company address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal/Zip Code is required"),
  country: z.string().min(1, "Country is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccountNumber: z.string().min(1, "Bank account number is required"),
  bvn: z
    .string()
    .length(10, "BVN must be exactly 10 digits")
    .regex(/^\d+$/, "BVN must be numeric"),
  accountType: z.string().min(1, "Account type is required"),
  governmentIssuedId: z.any().refine((file) => file?.size <= 800000, {
    message: "File size must be less than 800KB",
  }),
});

const BusinessAddressForm = ({
  onFinish,
  onPrevious,
}: {
  onFinish: () => void;
  onPrevious: () => void;
}) => {
  const { state, dispatch } = useRegistration();
  const form = useForm<z.infer<typeof KYBSchema>>({
    resolver: zodResolver(KYBSchema),
    defaultValues: {
      companyAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      bankName: "",
      bankAccountNumber: "",
      bvn: "",
      accountType: "",
      governmentIssuedId: null,
    },
  });

  const onSubmit = async (formData: z.infer<typeof KYBSchema>) => {
    try {

      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const data = new FormData();
      data.append('address', formData.companyAddress);
      data.append('city', formData.city);
      data.append('state', formData.state);
      data.append('postcode', formData.postalCode);
      data.append('country', formData.country);
      data.append('bank_name', formData.bankName);
      data.append('bank_account_number', formData.bankAccountNumber);
      data.append('bvn', formData.bvn);
      data.append('account_type', formData.accountType);
      

      if (formData.governmentIssuedId) {
        data.append('business_id', formData.governmentIssuedId);
      }


      const response = await registrationApi.submitStep4(state.userId!, data);

      if (response.success) {
        dispatch({ type: 'SET_STEP_DATA', payload: { step: 4, data: data } });
        dispatch({ type: 'SET_CURRENT_STEP', payload: 5 });
        //goTo(ROUTES.ONBOARDING.DEVELOPER.VERIFY_EMAIL);
        onFinish();
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      console.log("error>>", error);
      dispatch({ type: 'SET_ERROR', payload: 'An error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="py-10">
      <KYCFormHeader
        title={"Business Address & Banking Information"}
        description={
          "We use this to ensure that disbursed project funds reach the right entity"
        }
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="companyAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter state or province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal/Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter postal or zip code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h4 className="text- font-bold">Banking Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bank account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bvn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Verification Number (BVN)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 10-digit BVN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="governmentIssuedId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Government Issued ID</FormLabel>
                <FormControl>
                  <FileUploader
                    accept=".png,.jpg,.jpeg,.svg,.gif"
                    onFileChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between -mb-10">
            <Button
              variant={"link"}
              onClick={onPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft color="#000" />
              <span>Go back</span>
            </Button>
            <Button type="submit" className="rounded-full">
              Proceed
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessAddressForm;
