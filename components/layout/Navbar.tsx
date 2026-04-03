"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Text, textVariants } from "@/components/ui/Text";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import type { User } from "@/lib/api/types";
import { BsChevronDown, BsList, BsX } from "react-icons/bs";
import dynamic from "next/dynamic";

const ProfileDropdown = dynamic(() => import("./ProfileDropdown"), {
  ssr: false,
});
const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

const NAV_LINKS = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/applications", label: "My Applications" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRefDesktop = useRef<HTMLDivElement>(null);
  const profileRefMobile = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  const initials = useMemo(() => {
    const name = user?.name || "";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    return (first + last).toUpperCase() || "U";
  }, [user]);

  const toggleProfile = useCallback(() => setProfileOpen((prev) => !prev), []);
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);
  const closeProfile = useCallback(() => setProfileOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close dropdowns on navigation
  useEffect(() => {
    setProfileOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideDesktop =
        !profileRefDesktop.current ||
        !profileRefDesktop.current.contains(event.target as Node);
      const isOutsideMobile =
        !profileRefMobile.current ||
        !profileRefMobile.current.contains(event.target as Node);

      if (isOutsideDesktop && isOutsideMobile) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border py-[14px]">
      <div className="container flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src={IMAGES.LOGO}
              alt="QuickHire logo"
              width={120}
              height={40}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    textVariants({ variant: "body_md" }),
                    "px-4 py-2 transition-colors font-medium",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-neutral-60 hover:text-neutral-100",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button
                  variant="transparent"
                  className="text-neutral-60 hover:text-primary"
                >
                  Login
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={profileRefDesktop}>
              <button
                onClick={toggleProfile}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold shadow-sm group-hover:bg-primary-dark transition-colors text-sm">
                  {initials}
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span
                    className={cn(
                      textVariants({ variant: "body_md" }),
                      "text-neutral-100 hidden lg:inline font-bold",
                    )}
                  >
                    {user.name}
                  </span>
                  <span className="text-[12px] text-neutral-60 hidden lg:inline">
                    Candidate
                  </span>
                </div>
                <BsChevronDown
                  className={cn(
                    "text-neutral-40 transition-transform",
                    profileOpen && "rotate-180",
                  )}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <ProfileDropdown user={user} onClose={closeProfile} />
              )}
            </div>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center gap-3">
          {!user ? (
            <Link href="/auth/login">
              <Button className="h-9 px-4 text-[13px]">Login</Button>
            </Link>
          ) : (
            <div className="relative" ref={profileRefMobile}>
              <button
                onClick={toggleProfile}
                className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold shadow-sm text-xs"
              >
                {initials}
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2">
                  <ProfileDropdown user={user} onClose={closeProfile} />
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleMobile}
            className="w-9 h-9 flex items-center justify-center text-neutral-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <BsX size={28} /> : <BsList size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <MobileMenu
          navLinks={NAV_LINKS}
          pathname={pathname}
          user={user}
          initials={initials}
          onClose={closeMobile}
        />
      )}
    </header>
  );
};

export default Navbar;
