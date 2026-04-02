import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { FormInput, SectionCard } from "./FormComponents";

interface BasicInfoSectionProps {
  register: UseFormRegister<ProfileInput>;
  errors: FieldErrors<ProfileInput>;
}

export function BasicInfoSection({ register, errors }: BasicInfoSectionProps) {
  return (
    <SectionCard title="Basic Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput
          label="Full Name *"
          placeholder="e.g. John Doe"
          {...register("name")}
          error={errors.name?.message}
        />
        <FormInput
          label="Professional Title *"
          placeholder="e.g. Senior Frontend Engineer"
          {...register("title")}
          error={errors.title?.message}
        />
        <FormInput
          label="Email *"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <FormInput
          label="Phone"
          placeholder="+1 234 567 8900"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <FormInput
          label="Location"
          placeholder="e.g. San Francisco, CA"
          {...register("location")}
          error={errors.location?.message}
        />
        <FormInput
          label="Website"
          placeholder="https://yoursite.com"
          {...register("website")}
          error={errors.website?.message}
        />
        <FormInput
          label="GitHub"
          placeholder="https://github.com/username"
          {...register("github")}
          error={errors.github?.message}
        />
        <FormInput
          label="LinkedIn"
          placeholder="https://linkedin.com/in/username"
          {...register("linkedin")}
          error={errors.linkedin?.message}
        />
        <FormInput
          label="Portfolio"
          placeholder="https://portfolio.com"
          {...register("portfolio")}
          error={errors.portfolio?.message}
        />
      </div>
    </SectionCard>
  );
}
