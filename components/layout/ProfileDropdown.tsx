import Link from "next/link";
import { signOut } from "next-auth/react";
import { BsPerson, BsBriefcase, BsBoxArrowRight } from "react-icons/bs";
import { Text } from "@/components/ui/Text";
import type { User } from "@/lib/api/types";

interface ProfileDropdownProps {
  user: User;
  onClose: () => void;
}

const ProfileDropdown = ({ user, onClose }: ProfileDropdownProps) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-border rounded-lg shadow-xl overflow-hidden py-2 animate-slideDown">
      <div className="px-4 py-3 border-b border-border bg-light-gray/30">
        <Text variant="body_sm" className="text-neutral-60 block">
          Logged in as
        </Text>
        <Text variant="body_md" className="text-neutral-100 font-bold truncate">
          {user.email}
        </Text>
      </div>

      <Link
        href="/profile"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 text-neutral-60 hover:text-primary hover:bg-primary/5 transition-colors"
      >
        <BsPerson className="text-lg" />
        <span className="font-medium">My Profile</span>
      </Link>

      <Link
        href="/applications"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 text-neutral-60 hover:text-primary hover:bg-primary/5 transition-colors"
      >
        <BsBriefcase className="text-lg" />
        <span className="font-medium">My Applications</span>
      </Link>

      <div className="h-px bg-border my-1" />

      <button
        onClick={() => {
          onClose();
          signOut({ callbackUrl: "/" });
        }}
        className="w-full flex items-center gap-3 px-4 py-3 text-accent-red hover:bg-accent-red/5 transition-colors text-left"
      >
        <BsBoxArrowRight className="text-lg" />
        <span className="font-bold">Logout</span>
      </button>
    </div>
  );
};

export default ProfileDropdown;
