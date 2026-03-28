import mongoose, { Schema, Document, Types } from "mongoose";

/* ----------------------------- */
/* Experience Bullets Schema */
/* ----------------------------- */

const ExperienceBulletSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

/* ----------------------------- */
/* Experience Schema */
/* ----------------------------- */

const ExperienceSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    startDate: {
      type: String,
    },

    endDate: {
      type: String,
    },

    bullets: [ExperienceBulletSchema],
  },
  { _id: true }
);

/* ----------------------------- */
/* Education Schema */
/* ----------------------------- */

const EducationSchema = new Schema(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      trim: true,
    },

    startDate: String,

    endDate: String,

    details: String,
  },
  { _id: true }
);

/* ----------------------------- */
/* Project Schema */
/* ----------------------------- */

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    link: {
      type: String,
    },

    description: {
      type: String,
    },

    tech: [
      {
        type: String,
      },
    ],
  },
  { _id: true }
);

/* ----------------------------- */
/* Resume File Schema */
/* ----------------------------- */

const ResumeSchema = new Schema({
  fileName: String,

  fileUrl: String,

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

/* ----------------------------- */
/* Profile Schema */
/* ----------------------------- */

interface IExperience extends Types.Subdocument {
  company: string;
  role: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  bullets: Types.DocumentArray<{ description: string }>;
}

interface IEducation extends Types.Subdocument {
  institution: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  details?: string;
}

interface IProject extends Types.Subdocument {
  name: string;
  link?: string;
  description?: string;
  tech: string[];
}

export interface ProfileDocument extends Document {
  user: Types.ObjectId;

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

  experiences: Types.DocumentArray<IExperience>;
  education: Types.DocumentArray<IEducation>;
  projects: Types.DocumentArray<IProject>;

  resume?: {
    fileName: string;
    fileUrl: string;
    uploadedAt: Date;
  };
}

const ProfileSchema = new Schema<ProfileDocument>(
  {
    /* ----------------------------- */
    /* Relation to User */
    /* ----------------------------- */

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    /* ----------------------------- */
    /* Basic Info */
    /* ----------------------------- */

    name: {
      type: String,
      trim: true,
      required: true,
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: String,

    location: String,

    /* ----------------------------- */
    /* Links */
    /* ----------------------------- */

    website: String,
    github: String,
    linkedin: String,
    portfolio: String,

    /* ----------------------------- */
    /* Summary */
    /* ----------------------------- */

    summary: String,

    /* ----------------------------- */
    /* Skills */
    /* ----------------------------- */

    skills: [
      {
        type: String,
      },
    ],

    technicalSkills: [
      {
        type: String,
      },
    ],

    tools: [
      {
        type: String,
      },
    ],

    /* ----------------------------- */
    /* Sections */
    /* ----------------------------- */

    experiences: [ExperienceSchema],

    education: [EducationSchema],

    projects: [ProjectSchema],

    /* ----------------------------- */
    /* Resume */
    /* ----------------------------- */

    resume: ResumeSchema,
  },
  {
    timestamps: true,
  }
);

export const Profile =
  mongoose.models.Profile ||
  mongoose.model<ProfileDocument>("Profile", ProfileSchema);
