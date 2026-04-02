import { useFormContext } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { FormInput, SectionCardWithFooter } from "./FormComponents";
import { Button } from "@/components/ui/Button";
import { useUpdateBasicInfoMutation } from "@/hooks/profile";
import { useToast } from "@/hooks/useToast";

export function BasicInfoSection() {
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useFormContext<ProfileInput>();

  const updateBasicInfoMutation = useUpdateBasicInfoMutation();
  const { show } = useToast();

  const isDirty = !!Object.keys(dirtyFields).length;

  const onSave = async (data: ProfileInput) => {
    try {
      // Only send basic info fields
      const basicInfo = {
        name: data.name,
        title: data.title,
        email: data.email,
        phone: data.phone,
        location: data.location,
        website: data.website,
        github: data.github,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
      };

      await updateBasicInfoMutation.mutateAsync(basicInfo);
      show("Your basic information has been saved successfully.", "success");
    } catch (error: any) {
      show(error.message || "Failed to update basic information.", "error");
    }
  };

  return (
    <SectionCardWithFooter
      title="Basic Information"
      footer={
        <Button
          onClick={handleSubmit(onSave)}
          isLoading={updateBasicInfoMutation.isPending}
          disabled={!isDirty}
        >
          Save Changes
        </Button>
      }
    >
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
    </SectionCardWithFooter>
  );
}
