"use client";
import { useMemo, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileInput } from "@/lib/validations";
import { getErrorMessage } from "@/lib/utils";
import { Text } from "@/components/ui/Text";
import {
  useMyProfileQuery,
  useUpdateProfileMutation,
  useUploadResumeMutation,
  useDeleteResumeMutation,
} from "@/hooks/profile";
import type { Profile } from "@/services/types";
import { ProfileHeader } from "@/components/features/profile/ProfileHeader";
import Loading from "@/components/ui/Loading";
import { ProfileSidebar } from "@/components/features/profile/ProfileSidebar";
import { BasicInfoSection } from "@/components/features/profile/BasicInfoSection";
import { SummarySection } from "@/components/features/profile/SummarySection";
import { SkillsSection } from "@/components/features/profile/SkillsSection";
import { ExperienceSection } from "@/components/features/profile/ExperienceSection";
import { EducationSection } from "@/components/features/profile/EducationSection";
import { ProjectSection } from "@/components/features/profile/ProjectSection";
import { ResumeSection } from "@/components/features/profile/ResumeSection";

export default function ProfilePage() {
  const { data: serverProfile, isLoading } = useMyProfileQuery();
  const updateProfileMutation = useUpdateProfileMutation();
  const uploadResumeMutation = useUploadResumeMutation();
  const deleteResumeMutation = useDeleteResumeMutation();

  const [activeTab, setActiveTab] = useState("basic");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  // Sync server profile to form
  useEffect(() => {
    if (serverProfile) {
      setProfile(serverProfile);
      reset({
        name: serverProfile.name,
        title: serverProfile.title,
        email: serverProfile.email,
        phone: serverProfile.phone || "",
        location: serverProfile.location || "",
        summary: serverProfile.summary || "",
        website: serverProfile.website || "",
        github: serverProfile.github || "",
        linkedin: serverProfile.linkedin || "",
        portfolio: serverProfile.portfolio || "",
        skills: serverProfile.skills || [],
        technicalSkills: serverProfile.technicalSkills || [],
        tools: serverProfile.tools || [],
        experiences: serverProfile.experiences || [],
        education: serverProfile.education || [],
        projects: serverProfile.projects || [],
      });
    }
  }, [serverProfile, reset]);

  const profileData = watch();

  const canSave = useMemo(
    () =>
      isDirty && !!(profileData.name && profileData.title && profileData.email),
    [isDirty, profileData],
  );

  const onSubmit = async (data: ProfileInput) => {
    if (!profile) return;
    setError("");
    try {
      await updateProfileMutation.mutateAsync({
        ...profile,
        ...data,
      } as any);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      reset(data); // Mark as not dirty after save
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const onUploadResume = async (file: File) => {
    setError("");
    try {
      await uploadResumeMutation.mutateAsync(file);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const onRemoveResume = async () => {
    setError("");
    try {
      await deleteResumeMutation.mutateAsync();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (isLoading || !profile) {
    return (
      <main className="min-h-screen bg-light-gray pt-[78px]">
        <Loading variant="section" text="Loading your profile..." />
      </main>
    );
  }

  // Profile completeness
  const fields = [
    profile.name,
    profile.title,
    profile.email,
    profile.phone,
    profile.summary,
    profile.location,
  ];
  const filled = fields.filter(Boolean).length;
  const completeness = Math.round((filled / fields.length) * 100);

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      <ProfileHeader
        completeness={completeness}
        onSave={handleSubmit(onSubmit)}
        canSave={canSave}
        saved={saved}
      />

      <div className="container py-10">
        {error ? (
          <div className="mb-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-none">
            {error}
          </div>
        ) : null}
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1 flex flex-col gap-6">
            {activeTab === "basic" && (
              <BasicInfoSection register={register} errors={errors} />
            )}
            {activeTab === "summary" && (
              <SummarySection register={register} errors={errors} />
            )}
            {activeTab === "skills" && (
              <SkillsSection
                setValue={setValue}
                skills={profileData.skills || []}
                technicalSkills={profileData.technicalSkills || []}
                tools={profileData.tools || []}
              />
            )}
            {activeTab === "experience" && (
              <ExperienceSection
                register={register}
                errors={errors}
                fields={experienceFields}
                append={appendExperience}
                remove={removeExperience}
              />
            )}
            {activeTab === "education" && (
              <EducationSection
                register={register}
                errors={errors}
                fields={educationFields}
                append={appendEducation}
                remove={removeEducation}
              />
            )}
            {activeTab === "projects" && (
              <ProjectSection
                register={register}
                errors={errors}
                fields={projectFields}
                append={appendProject}
                remove={removeProject}
              />
            )}
            {activeTab === "resume" && (
              <ResumeSection
                profile={profile}
                onUpload={onUploadResume}
                onRemove={onRemoveResume}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
