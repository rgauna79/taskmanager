import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  dueDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }).optional(),
  priority: z.string({
    required_error: "priority is required",
  }),
  status: z.string().optional(),
});
