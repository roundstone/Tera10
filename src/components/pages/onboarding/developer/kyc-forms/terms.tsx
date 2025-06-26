import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "iconsax-react";
import KYCFormHeader from "./form-header";
import { Checkbox } from "@/components/ui/checkbox";


const KYBSchema = z.object({
  developerAgreement: z.boolean().default(false)
    .refine((value) => value === true, {
      message: "You must accept our terms",
    }),
  accurateInformation: z.boolean().default(false)
    .refine((value) => value === true, {
      message: "Confirm you inputted accurate data"
    }),
  receiveNotification: z.boolean().default(false).optional(),
});

const terms = (
  <div className="space-y-6 text-sm leading-relaxed text-gray-500">
    <p className="font-medium">
      Welcome to Tera10, the milestone-based funding platform for real estate
      developers. By accessing or using our platform, you agree to be bound by
      these Terms of Use.
    </p>

    <div>
      <p className="font-bold">1. Account Registration and Security</p>
      <ul className="list-disc list-inside ml-4">
        <li>Providing accurate and complete information during registration</li>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>
          Promptly notifying Tera10 of any unauthorized access to your account
        </li>
        <li>
          Ensuring all activities conducted through your account comply with
          applicable laws
        </li>
      </ul>
    </div>

    <div>
      <p className="font-bold">2. Milestone-Based Funding</p>
      <ul className="list-disc list-inside ml-4">
        <li>
          Funding is disbursed based on verified completion of project
          milestones
        </li>
        <li>
          All project information provided must be accurate and verifiable
        </li>
        <li>
          Tera10 reserves the right to verify milestone completion through
          inspection or documentation
        </li>
        <li>
          Misrepresentation of milestone completion constitutes a material
          breach of these terms
        </li>
      </ul>
    </div>

    <div>
      <p className="font-bold">3. Fees and Payments</p>
      <ul className="list-disc list-inside ml-4">
        <li>
          Pay platform fees as outlined in the fee schedule provided during
          onboarding
        </li>
        <li>Accept that fees may be deducted from milestone disbursements</li>
        <li>Provide accurate banking information for fund transfers</li>
      </ul>
    </div>

    <div>
      <p className="font-bold">4. Compliance Requirements</p>
      <ul className="list-disc list-inside ml-4">
        <li>Comply with all applicable laws and regulations</li>
        <li>Maintain current business registrations and licenses</li>
        <li>
          Adhere to anti-money laundering (AML) and know-your-business (KYB)
          requirements
        </li>
        <li>Report any compliance concerns or violations promptly</li>
      </ul>
    </div>

    <div>
      <p className="font-bold">5. Platform Content and Intellectual Property</p>
      <ul className="list-disc list-inside ml-4">
        <li>
          All content uploaded to the platform must be owned by the developer or
          properly licensed
        </li>
        <li>
          Tera10 may use project information for marketing and platform
          improvement purposes
        </li>
        <li>Tera10 retains ownership of all platform intellectual property</li>
      </ul>
    </div>

    <div>
      <p className="font-bold">6. Termination</p>
      <ul className="list-disc list-inside ml-4">
        <li>
          Suspend or terminate developer accounts for violations of these terms
        </li>
        <li>
          Withhold pending disbursements in cases of suspected fraud or
          misrepresentation
        </li>
        <li>
          Remove developers from the platform for repeated compliance violations
        </li>
      </ul>
    </div>

    <div>
      <p className="font-bold">7. Limitation of Liability</p>
      <ul className="list-disc list-inside ml-4">
        <li>
          Tera10 is not liable for project delays, cost overruns, or
          construction defects
        </li>
        <li>
          The platform provides funding facilitation only and does not guarantee
          project success
        </li>
        <li>
          Developers will indemnify Tera10 against claims arising from their use
          of the platform
        </li>
      </ul>
    </div>

    <div>
      <p className="font-bold">8. Dispute Resolution</p>
      <ul className="list-disc list-inside ml-4">
        <li>Good faith negotiation as the first step</li>
        <li>Mediation if negotiation fails</li>
        <li>Binding arbitration as a final resort</li>
      </ul>
    </div>

    <div>
      <p className="font-bold">9. Modifications to Terms</p>
      <p>
        Tera10 may modify these terms at any time. Continued use of the platform
        constitutes acceptance of modified terms.
      </p>
    </div>
  </div>
);

const TermsForm = ({
  onFinish,
  onPrevious,
}: {
  onFinish: () => void;
  onPrevious: () => void;
}) => {
  const form = useForm<z.infer<typeof KYBSchema>>({
    resolver: zodResolver(KYBSchema),
    defaultValues: {
      developerAgreement: false,
      accurateInformation: false,
      receiveNotification: false,
    },
  });

  function onSubmit(data: z.infer<typeof KYBSchema>) {
    // toast.success("Business identity submitted successfully!");
    console.log(data);
    // goTo("/next-step");
    onFinish();
  }

  return (
    <div className="py-10">
      <KYCFormHeader
        title="Terms and Compliance Agreements"
        description="Please review and accept our terms to continue with your account steup"
      />

      <div className="border w-full">
        <div className="border-b p-3">Platform Terms</div>
        <div className="p-3 max-h-[449px] overflow-auto">
          <h2 className="text-lg font-bold text-gray-700">
            Tera 10 platform Term of Use
          </h2>
          <p className="text-gray-500 pb-5">Last updated: May 2nd, 2025</p>
          {terms}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-5">
          <FormField
            control={form.control}
            name="developerAgreement"
            render={({ field }) => (
              <>
                <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}

                    >
                      
                    </Checkbox>

                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-light">
                      I agree to Tera10's Developer Agreement and Terms of Use
                    </FormLabel>
                  </div>
                </FormItem>
                <FormMessage className="-mt-4 pl-7" />
              </>
            )}
          />

          <FormField
            control={form.control}
            name="accurateInformation"
            render={({ field }) => (
              <>
                <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-light">
                      I confirm that the information provided is accurate and
                      complete
                    </FormLabel>
                  </div>
                </FormItem>
                <FormMessage className="-mt-4 pl-7" />
              </>
            )}
          />

          <FormField
            control={form.control}
            name="receiveNotification"
            render={({ field }) => (
              <>
                <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-light">
                      I agree to receive important updates and notifications
                      about my account and projects
                    </FormLabel>
                  </div>
                </FormItem>
                <FormMessage className="-mt-4 pl-7" />
              </>
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
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TermsForm;
