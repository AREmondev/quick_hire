export const SIDEBAR_TABS = [
  { id: "basic", label: "Basic Info" },
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
];

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  return (
    <aside className="w-full lg:w-[220px] shrink-0">
      <div className="bg-white border border-border sticky top-[98px]">
        {SIDEBAR_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full px-5 py-3.5 text-left font-semibold text-[14px] transition-colors border-l-2 ${
              activeTab === tab.id
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-neutral-60 hover:text-neutral-100 hover:bg-light-gray"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
