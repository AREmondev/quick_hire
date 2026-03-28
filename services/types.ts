export type Role = "candidate" | "employer" | "admin";

export interface JobType {
  id: string;
  name: string;
}

export interface ExperienceLevel {
  id: string;
  name: string;
}

export type ApplicationStatus =
  | "draft"
  | "assessment_pending"
  | "assessment_completed"
  | "submitted"
  | "under_review"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  companyId?: string;
  createdAt?: string;
}

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  location?: string;
  description?: string;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
  jobCount?: number;
}

export interface Job {
  id: string;
  slug: string;
  companyId: string;
  title: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  location: string;
  isRemote: boolean;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  categories: Category[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline?: string;
  isFeatured: boolean;
  isPublished?: boolean;
  isApplied?: boolean;
  applicationStatus?: ApplicationStatus;
  applicationId?: string;
  isSaved?: boolean;
  postedAt?: string;
  updatedAt?: string;
  company?: Pick<
    Company,
    "id" | "name" | "logoUrl" | "website" | "location" | "description"
  >;
  applicationsCount?: number;
  assessment?: Assessment;
}

export type QuestionType =
  | "multiple-choice"
  | "short-answer"
  | "true-false"
  | "problem-solve";

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  questionType: QuestionType;
  options: string[];
}

export interface Assessment {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  jobSlug: string;
  companyName: string;
  companyLogo: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  status: ApplicationStatus;
  assessmentRequired: boolean;
  resumeSource: "profile" | "pdf";
  resumeId: string | null;
  score: number | null;
  tags: string[];
  job: Job;
  assessment?: {
    score: number;
    total: number;
    answers: Record<string, string>;
  };
  profileSnapshot?: Profile;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  user: User;
  tokens: AuthTokens;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

// ---------- Candidate Profile & Resume ----------

export interface ExperienceBullet {
  description: string;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  bullets: ExperienceBullet[];
}

export interface Education {
  id?: string;
  institution: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  details?: string;
}

export interface Project {
  id?: string;
  name: string;
  link?: string;
  description?: string;
  tech: string[];
}

export interface Resume {
  id?: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface Profile {
  id: string;
  user: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  summary?: string;
  skills: string[];
  technicalSkills: string[];
  tools: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  resume?: Resume;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateRequest {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  summary?: string;
  skills?: string[];
  technicalSkills?: string[];
  tools?: string[];
  experiences?: Experience[];
  education?: Education[];
  projects?: Project[];
}

export interface ResumeUploadRequest {
  file: File;
}

export type GetMyProfileResponse = ApiSuccess<Profile>;
export type UpdateProfileRequest = ProfileUpdateRequest;
export type UpdateProfileResponse = ApiSuccess<Profile>;
export type UploadResumeResponse = ApiSuccess<Profile>;
export type DeleteResumeResponse = ApiSuccess<Profile>;

export interface ResumeUploadResponse {
  resumeId: string;
  url: string;
}
