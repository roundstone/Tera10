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
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "iconsax-react";
import { useRegistration } from '../../../../../context/RegistrationContext';
import { registrationApi } from '../../../../../api/registrationApi';

// ✅ Correct schema matching the form fields
const ProjectReadinessSchema = z.object({
  project_specialization: z
    .string()
    .min(1, "Project specialization is required"),
    completed_project: z
    .number({ invalid_type_error: "Must be a number" })
    .min(1, "Must be at least 1")
    .max(10, "Cannot exceed 10"),
  portfolioDocument: z.any().refine((file) => file?.size <= 800000, {
    message: "File size must be less than 800KB",
  }),
  about: z.string().min(1, "Bio/About is required"),
  website: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Portfolio link is required"),
});

const ProjectReadinessForm = ({
  onFinish,
  onPrevious,
}: {
  onFinish: () => void;
  onPrevious: () => void;
}) => {
  const { state, dispatch } = useRegistration();
  const form = useForm<z.infer<typeof ProjectReadinessSchema>>({
    resolver: zodResolver(ProjectReadinessSchema),
    defaultValues: {
      project_specialization: "",
      completed_project: 1,
      portfolioDocument: null,
      about: "",
      website: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof ProjectReadinessSchema>) => {
    try {

      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const data = new FormData();
      data.append('project_specialization', formData.project_specialization);
      data.append('completed_project', formData.completed_project.toString());
      data.append('about', formData.about);
      data.append('website', formData.website);
      



      const response = await registrationApi.submitStep5(state.userId!, formData);

      if (response.success) {
        dispatch({ type: 'SET_STEP_DATA', payload: { step: 5, data: formData } });
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
        title="Project Readiness Profile"
        description="We use this to ensure that disbursed project funds reach the right entity"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="project_specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Specialization</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter specialization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="completed_project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Completed Projects</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="portfolioDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Upload (PDF or Zip file)</FormLabel>
                <FormControl>
                  <FileUploader
                    accept=".pdf,.zip"
                    onFileChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brief Bio/About the Developer</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website or Portfolio Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter website or portfolio URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between -mb-10">
            <Button variant={"link"} onClick={onPrevious} className="flex items-center gap-2">
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

export default ProjectReadinessForm;
