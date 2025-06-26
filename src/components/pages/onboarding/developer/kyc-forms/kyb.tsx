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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CIcon } from "iconsax-react";
import { cn } from "@/lib/utils";
import { FileUploader } from "@/components/ui/file";
import { useRegistration } from '../../../../../context/RegistrationContext';
import { registrationApi } from '../../../../../api/registrationApi';
import { useNavigation } from '../../../../../utils/navigation';
import { ROUTES } from '../../../../../config/route';
import { formatDateForLaravel } from '../../../../../utils/string';
// import { FileUploader } from "@/components/ui/file-uploader";

const KYBSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  entityType: z.string().min(1, "Entity type is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  country: z.string().min(1, "Country is required"),
  incorporationDate: z.any(),
  //   incorporationDate: z
  //     .string()
  //     .min(1, "Date of incorporation is required")
  //     .refine(
  //       (value) => {
  //         const [day, month, year] = value.split("/").map(Number);
  //         const date = new Date(`${year}-${month}-${day}`);
  //         return (
  //           !isNaN(date.getTime()) &&
  //           day > 0 &&
  //           day <= 31 &&
  //           month > 0 &&
  //           month <= 12 &&
  //           year >= 1900
  //         );
  //       },
  //       {
  //         message: "Invalid date format (use dd/mm/yyyy)",
  //       }
  //     ),
  cacCertificate: z.any().refine((file) => file?.size <= 8000000, {
    message: "File size must be less than 8000KB",
  }),
});

const KYBForm = ({ onFinish, onPrevious }: { onFinish: () => void, onPrevious: () => void }) => {
  const { state, dispatch } = useRegistration();
  const { goTo } = useNavigation();
  const form = useForm<z.infer<typeof KYBSchema>>({
    resolver: zodResolver(KYBSchema),
    defaultValues: {
      companyName: "",
      entityType: "",
      registrationNumber: "",
      country: "",
      incorporationDate: "",
      cacCertificate: null,
    },
  });



  const onSubmit = async (formData: z.infer<typeof KYBSchema>) => {
    try {

      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const data = new FormData();
      data.append('name', formData.companyName);
      data.append('entity_type', formData.entityType);
      data.append('registration_number', formData.registrationNumber);
      data.append('country_incorporation', formData.country);

      if (formData.incorporationDate) {
        data.append('date_incorporation', formatDateForLaravel(formData.incorporationDate));
      }

      if (formData.cacCertificate && formData.cacCertificate) {
        // assuming it's an array from file input
        data.append('cac_certificate', formData.cacCertificate); // File object
      }

      const response = await registrationApi.submitStep2(state.userId!, data);

      if (response.success) {
        dispatch({ type: 'SET_STEP_DATA', payload: { step: 2, data: data } });
        dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
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
      <div className="text-center pb-10">
        <h2 className="text-2xl font-semibold mb-2">Business Identity (KYB)</h2>
        <p className="text-gray-500 text-sm mb-6">
          This helps us verify your business and comply with regulations
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name of asset" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="entityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Entity</FormLabel>
                  <FormControl>
                    <Input placeholder="Select entity type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country of Incorporation</FormLabel>
                  <FormControl>
                    <Input placeholder="Select country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incorporationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="bg-white">
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal rounded-xl py-5 border-gray-300",
                            !field.value && "text-gray-300"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CIcon
                            size={16}
                            color="#555555"
                            className="ml-auto h-4 w-4 opacity-50"
                          />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
                // <FormItem>
                //   <FormLabel>Date of Incorporation</FormLabel>
                //   <FormControl>
                //     <Input typ placeholder="dd/mm/yyyy" {...field} />
                //   </FormControl>
                //   <FormMessage />
                // </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cacCertificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload CAC Certificate</FormLabel>
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

          <div className="flex justify-end -mb-10">
            <Button type="submit" className=" rounded-full">
              Proceed
            </Button>
          </div>

        </form>

      </Form>
      {state.loading && <div>Loading...</div>}
      {state.error && <div className="error">{state.error}</div>}
    </div>
  );
};

export default KYBForm;
