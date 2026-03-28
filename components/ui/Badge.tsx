import React from "react";
import { Text } from "./Text";

interface BadgeProps {
  label: string;
  color: string;
}

export const Badge = ({ label, color }: BadgeProps) => {
  const bgColor = `${color}1A`;
  console.log(bgColor, label);
  return (
    <div
      className="flex items-center justify-center h-[30px] px-4 rounded-full"
      style={{
        color: color,
        backgroundColor: bgColor,
      }}
    >
      <Text
        as="span"
        variant="body_sm"
        className="font-semibold line-clamp-1 text-[14px]"
        style={{ color }}
        title={label.toString()}
      >
        {label.toString()}
      </Text>
    </div>
  );
};
export const OutlineBadge = ({ label, color }: BadgeProps) => {
  console.log("OutlineBadge", label, color);
  return (
    <div
      className="flex items-center justify-center h-[34px] px-4 rounded-full border"
      style={{
        color: color,
        borderColor: color,
        backgroundColor: "transparent",
      }}
    >
      <Text
        as="span"
        variant="body_sm"
        className="font-semibold text-[14px]"
        style={{ color }}
      >
        {label.toString()}
      </Text>
    </div>
  );
};
