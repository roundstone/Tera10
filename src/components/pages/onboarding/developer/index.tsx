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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigation } from "@/utils/navigation";
import { useForm } from "react-hook-form";
import IMAGES from "@/assets/images";
import { ROUTES } from "@/config/route";
import { useRegistration } from '../../../../context/RegistrationContext';
import { registrationApi } from '../../../../api/registrationApi';
import { data } from "react-router-dom";

const EmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const DeveloperOnboarding = () => {
  const { goTo } = useNavigation();
  const { state, dispatch } = useRegistration();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });


  const onSubmit = async (formData: z.infer<typeof EmailSchema>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await registrationApi.submitStep1(formData.email);
      console.log("response>>", response.data?.data?.user_id);

      if (response.success) {
        dispatch({ type: 'SET_STEP_DATA', payload: { step: 1, data: formData } });
        dispatch({ type: 'SET_CURRENT_STEP', payload: 2 });
        if (response.data?.data?.user_id) {
          dispatch({ type: 'SET_USER_ID', payload: response.data?.data?.user_id });
        }
        goTo(ROUTES.ONBOARDING.DEVELOPER.VERIFY_EMAIL);
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full border border[#E7E9F1] p-24 h-[673px] z-10 ">
      <p className="text-sm text-gray-500 uppercase font-normal mb-2">
        Welcome to Tera 10
      </p>
      <h2 className="text-2xl md:text-3xl font- mb-8">Ease to build and own</h2>
      <div className="border-b border-gray-200 mb-20" />

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-1/3 mt-40"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please Enter your email</FormLabel>
                <p className="text-sm text-gray-500 mb-1">
                  Provide your active email address to continue
                </p>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            {!state.loading ? (
              <Button
                type="submit"
                className="rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Proceed
              </Button>
            ) : (
              <Button
                disabled
                className="rounded-full bg-gray-400 text-white cursor-not-allowed"
              >
                Loading...
              </Button>
            )}
          </div>
        </form>
      </Form>
      
      {state.error && <div className="text-[#ff0000]">{state.error}</div>}

      <div className="hidden md:flex  absolute -bottom-30 right-5">
        <img
          src={IMAGES.Building}
          alt="Building with crane"
          className="h-[600px] object-contain"
        />
      </div>
    </div>
  );
};

export default DeveloperOnboarding;
