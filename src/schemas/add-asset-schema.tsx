import { z } from "zod";

export const pricingSchema = z.object({
  price: z.coerce.number().min(0, "Price must be at least 0"),
  unitAvailable: z.coerce.number().min(1, "At least 1 unit must be available"),
  maxPerIndividual: z.coerce
    .number()
    .min(1, "Must allow at least 1 per person"),
  valuation: z.object({
    entry: z.coerce.number().min(0),
    mid: z.coerce.number().min(0),
    exit: z.coerce.number().min(0),
  }),
});

export const basicSchema = z.object({
  propertyType: z.any().optional(), // z.string().min(1, "Property type is required"),
  propertyName: z.string().min(1, "Property name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  mediaFiles: z.any().optional(),
});

export const milestoneSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "A end date is required.",
  }),
  images: z.any().optional(), // Can enhance this for specific file validations
  activities: z.string().min(1, "Activities are required"),
});

export const milestonesFormSchema = z.object({
  milestones: z.array(milestoneSchema),
  finish: z.boolean().optional()
});
