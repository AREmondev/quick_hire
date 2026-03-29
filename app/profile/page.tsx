"use client";
import { useMemo, useState, useEffect } from "react";
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

  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [saved, setSaved] = useState(false);

  // Sync server profile to local state for editing
  useEffect(() => {
    if (serverProfile) {
      setProfile(serverProfile);
    }
  }, [serverProfile]);

  const canSave = useMemo(
    () => !!(profile?.name && profile?.title && profile?.email),
    [profile],
  );

  const save = async () => {
    if (!profile) return;
    try {
      await updateProfileMutation.mutateAsync(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const onUploadResume = async (file: File) => {
    try {
      await uploadResumeMutation.mutateAsync(file);
    } catch (error) {
      console.error("Failed to upload resume:", error);
    }
  };

  const onRemoveResume = async () => {
    try {
      await deleteResumeMutation.mutateAsync();
    } catch (error) {
      console.error("Failed to remove resume:", error);
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
        onSave={save}
        canSave={canSave}
        saved={saved}
      />

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1 flex flex-col gap-6">
            {activeTab === "basic" && (
              <BasicInfoSection profile={profile} setProfile={setProfile} />
            )}
            {activeTab === "summary" && (
              <SummarySection profile={profile} setProfile={setProfile} />
            )}
            {activeTab === "skills" && (
              <SkillsSection profile={profile} setProfile={setProfile} />
            )}
            {activeTab === "experience" && (
              <ExperienceSection profile={profile} setProfile={setProfile} />
            )}
            {activeTab === "education" && (
              <EducationSection profile={profile} setProfile={setProfile} />
            )}
            {activeTab === "projects" && (
              <ProjectSection profile={profile} setProfile={setProfile} />
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
