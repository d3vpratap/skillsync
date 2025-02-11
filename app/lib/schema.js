import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  subIndustry: z.string({
    required_error: "Please select a specialisation",
  }),
  bio: z.string().max(50).optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience atleast 0 year")
        .max(60, "Experience cannot exceed 60 years")
    ),
  skills: z
    .string()
    .transform((val) => {
      if (!val || val.trim() === "") {
        return []; // Return an empty array if no skills are entered
      }
      return val
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean); // Remove empty values
    }),
});
