import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import type { User } from "@/lib/api/types";

interface MobileMenuProps {
  navLinks: { href: string; label: string }[];
  pathname: string;
  user?: User;
  initials: string;
  onClose: () => void;
}

const MobileMenu = ({
  navLinks,
  pathname,
  user,
  initials,
  onClose,
}: MobileMenuProps) => {
  return (
    <div className="md:hidden bg-white border-t border-border animate-slideDown">
      <div className="container py-4 flex flex-col gap-1">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "px-4 py-3 font-medium text-[15px] transition-colors",
                isActive ? "text-primary bg-primary/5" : "text-neutral-60",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
