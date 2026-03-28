import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export const FormInput = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">
      {label}
    </label>
    <input
      {...props}
      className={[
        "h-11 w-full border border-border bg-white px-4 text-neutral-100 text-[15px]",
        "placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors",
        props.className || "",
      ].join(" ")}
    />
  </div>
);

export const FormTextArea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">
      {label}
    </label>
    <textarea
      {...props}
      className={[
        "min-h-28 w-full border border-border bg-white p-4 text-neutral-100 text-[15px]",
        "placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors resize-none",
        props.className || "",
      ].join(" ")}
    />
  </div>
);

export const SectionCard = ({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-border">
    <div className="px-8 py-5 border-b border-border flex items-center justify-between">
      <Text variant="title_lg" className="text-neutral-100">
        {title}
      </Text>
      {action}
    </div>
    <div className="p-8">{children}</div>
  </div>
);

export const TagInput = ({
  label,
  tags,
  placeholder,
  onAdd,
  onRemove,
}: {
  label: string;
  tags: string[];
  placeholder: string;
  onAdd: (val: string) => void;
  onRemove: (val: string) => void;
}) => {
  const [input, setInput] = useState("");
  const handleAdd = () => {
    const v = input.trim();
    if (!v) return;
    onAdd(v);
    setInput("");
  };
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={placeholder}
          className="flex-1 h-11 border border-border bg-white px-4 text-neutral-100 text-[15px] placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors"
        />
        <Button onClick={handleAdd} type="button" className="h-11 px-5">
          Add
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onRemove(tag)}
              type="button"
              className="flex items-center gap-2 pl-3 pr-2 h-8 border border-border bg-light-gray text-neutral-80 text-[13px] font-medium hover:border-accent-red hover:text-accent-red transition-colors group"
            >
              {tag}
              <span className="text-neutral-60 group-hover:text-accent-red transition-colors">
                ×
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
