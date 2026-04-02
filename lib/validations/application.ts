import { z } from "zod";

export const applicationSchema = z.object({
  resumeSource: z.enum(["profile", "pdf"]),
  resumeId: z.string().optional().nullable(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
