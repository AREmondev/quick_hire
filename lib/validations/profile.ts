import { z } from "zod";

export const experienceBulletSchema = z.object({
  description: z.string().trim().min(1, "Description is required"),
});

export const experienceSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  role: z.string().trim().min(1, "Role is required"),
  location: z.string().trim().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  bullets: z.array(experienceBulletSchema).optional(),
});

export const educationSchema = z.object({
  institution: z.string().trim().min(1, "Institution is required"),
  degree: z.string().trim().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  details: z.string().optional().or(z.literal("")),
});

export const projectSchema = z.object({
  name: z.string().trim().min(1, "Project name is required"),
  link: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  tech: z.array(z.string()).optional(),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  title: z.string().trim().min(1, "Professional title is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().optional().or(z.literal("")),
  summary: z.string().trim().optional().or(z.literal("")),
  website: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  portfolio: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  skills: z.array(z.string()).optional(),
  technicalSkills: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  experiences: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  projects: z.array(projectSchema).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
