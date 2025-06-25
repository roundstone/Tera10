"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const ProjectReviewSchema = z.object({
  deliveryQuality: z.boolean(),
  milestoneAlignment: z.boolean(),
  timelineConsistency: z.boolean(),
  completionRate: z.string(),
  amountPayable: z.string(),
  amountPaid: z.string(),
  amountDue: z.string(),
  note: z.string().optional(),
});

const defaultValues = {
  deliveryQuality: true,
  milestoneAlignment: false,
  timelineConsistency: true,
  completionRate: "100%",
  amountPayable: "12,980,291",
  amountPaid: "12,980,291",
  amountDue: "12,980,291",
  note: "",
};

const ProjectReviewForm = () => {
  const form = useForm<z.infer<typeof ProjectReviewSchema>>({
    resolver: zodResolver(ProjectReviewSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof ProjectReviewSchema>) {
    toast.success("Review submitted!");
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Completion Rate & Amount Payable */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="completionRate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-gray-600">
                  Completion Rate
                </FormLabel>
                <FormControl>
                  <Input readOnly className="mt-1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amountPayable"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-gray-600">
                  Amount Payable
                </FormLabel>
                <FormControl>
                  <Input readOnly className="mt-1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Amount Paid & Due */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="amountPaid"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-gray-600">
                  Amount Paid
                </FormLabel>
                <FormControl>
                  <Input readOnly className="mt-1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amountDue"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-gray-600">
                  Amount Due (based on Milestone)
                </FormLabel>
                <FormControl>
                  <Input readOnly className="mt-1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Note */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-gray-600">Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us the activities involved for this project/Milestone"
                  className="mt-1"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Delivery Quality */}
        <FormField
          control={form.control}
          name="deliveryQuality"
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-2 rounded-lg items-center text-sm">
              <div className="font-medium">Delivery Quality</div>
              <div>{field.value ? "Passed" : "Failed"}</div>
              <div className="flex justify-end">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </div>
          )}
        />

        {/* Milestone Alignment */}
        <FormField
          control={form.control}
          name="milestoneAlignment"
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-2 rounded-lg items-center text-sm">
              <div className="font-medium">Milestone Alignment</div>
              <div>{field.value ? "Satisfactory" : "Not satisfactory"}</div>
              <div className="flex justify-end">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </div>
          )}
        />

        {/* Timeline Consistency */}
        <FormField
          control={form.control}
          name="timelineConsistency"
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-2 rounded-lg items-center text-sm">
              <div className="font-medium">Timeline Consistency</div>
              <div>{field.value ? "Passed" : "Failed"}</div>
              <div className="flex justify-end">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </div>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="border-gray-300 text-gray-700 rounded-full"
            onClick={() => toast.error("Request rejected")}
          >
            Reject
          </Button>
          <Button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full"
          >
            Approve
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectReviewForm;
