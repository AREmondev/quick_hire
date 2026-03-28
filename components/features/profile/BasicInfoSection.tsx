import { Profile } from "@/services/types";
import { FormInput, SectionCard } from "./FormComponents";

interface BasicInfoSectionProps {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

export function BasicInfoSection({ profile, setProfile }: BasicInfoSectionProps) {
  return (
    <SectionCard title="Basic Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput
          label="Full Name *"
          placeholder="e.g. John Doe"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <FormInput
          label="Professional Title *"
          placeholder="e.g. Senior Frontend Engineer"
          value={profile.title}
          onChange={(e) => setProfile({ ...profile, title: e.target.value })}
        />
        <FormInput
          label="Email *"
          type="email"
          placeholder="john@example.com"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <FormInput
          label="Phone"
          placeholder="+1 234 567 8900"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />
        <FormInput
          label="Location"
          placeholder="e.g. San Francisco, CA"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        />
        <FormInput
          label="Website"
          placeholder="https://yoursite.com"
          value={profile.website || ""}
          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
        />
        <FormInput
          label="GitHub"
          placeholder="https://github.com/username"
          value={profile.github || ""}
          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
        />
        <FormInput
          label="LinkedIn"
          placeholder="https://linkedin.com/in/username"
          value={profile.linkedin || ""}
          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
        />
        <FormInput
          label="Portfolio"
          placeholder="https://portfolio.com"
          value={profile.portfolio || ""}
          onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
        />
      </div>
    </SectionCard>
  );
}
