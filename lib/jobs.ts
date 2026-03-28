export const categoryColors: Record<string, string> = {
  Design: "#FFB836",
  Business: "#4640DE",
  Technology: "#FF6550",
  Marketing: "#56CDAD",
  Finance: "#26A4FF",
  Healthcare: "#56CDAD",
  Engineering: "#FF6550",
  Sales: "#FFB836",
};

const CATEGORY_ICONS: Record<string, string> = {
  Design: "🎨",
  Business: "💼",
  Technology: "💻",
  Marketing: "📣",
  Finance: "💰",
  Engineering: "⚙️",
  Healthcare: "🏥",
  Sales: "🤝",
};

export const CATEGORIES = Object.keys(categoryColors).map((name) => {
  return {
    name,
    count: 0,
    icon: CATEGORY_ICONS[name] || "",
    color: categoryColors[name],
  };
});