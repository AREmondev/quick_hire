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
        {!user ? (
          <div className="flex gap-3 mt-4 pt-4 border-t border-border">
            <Link href="/auth/login" className="flex-1">
              <Button variant="transparent" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/auth/register" className="flex-1">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        ) : (
          <>
            <Link
              href="/profile"
              onClick={onClose}
              className="mt-4 pt-4 border-t border-border flex items-center gap-3 px-4 py-3"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                {initials}
              </div>
              <span className="text-neutral-100 font-semibold">{user.name}</span>
            </Link>
            <button
              onClick={() => {
                onClose();
                signOut({ callbackUrl: "/" });
              }}
              className="px-4 py-3 font-medium text-[15px] text-accent-red hover:bg-accent-red/5 transition-colors text-left"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
