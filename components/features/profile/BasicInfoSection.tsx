import { useFormContext } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { FormInput, SectionCardWithFooter } from "./FormComponents";
import { Button } from "@/components/ui/Button";

export function BasicInfoSection() {
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useFormContext<ProfileInput>();

  const isDirty = !!Object.keys(dirtyFields).length;

  const onSave = (data: ProfileInput) => {
    // Here you would trigger an API call to save the basic info
    console.log("Saving basic info:", data);
  };

  return (
    <SectionCardWithFooter
      title="Basic Information"
      footer={
        isDirty && (
          <Button onClick={handleSubmit(onSave)} isLoading={false}>
            Save Changes
          </Button>
        )
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
