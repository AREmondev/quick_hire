"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Text, textVariants } from "@/components/ui/Text";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMemo, useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import type { User } from "@/lib/api/types";
import {
  BsChevronDown,
  BsBoxArrowRight,
  BsPerson,
  BsBriefcase,
} from "react-icons/bs";

const NAV_LINKS = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/applications", label: "My Applications" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  const initials = useMemo(() => {
    const name = user?.name || "";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    return (first + last).toUpperCase() || "U";
  }, [user]);

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
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

        {/* Right actions */}
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
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold shadow-sm group-hover:bg-primary-dark transition-colors">
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
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-border rounded-lg shadow-xl overflow-hidden py-2 animate-slideDown">
                  <div className="px-4 py-3 border-b border-border bg-light-gray/30">
                    <Text variant="body_sm" className="text-neutral-60 block">
                      Logged in as
                    </Text>
                    <Text
                      variant="body_md"
                      className="text-neutral-100 font-bold truncate"
                    >
                      {user.email}
                    </Text>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-neutral-60 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <BsPerson className="text-lg" />
                    <span className="font-medium">My Profile</span>
                  </Link>

                  <Link
                    href="/applications"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-neutral-60 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <BsBriefcase className="text-lg" />
                    <span className="font-medium">My Applications</span>
                  </Link>

                  <div className="h-px bg-border my-1" />

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-accent-red hover:bg-accent-red/5 transition-colors"
                  >
                    <BsBoxArrowRight className="text-lg" />
                    <span className="font-bold">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-neutral-100 transition-all ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-neutral-100 transition-all ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-neutral-100 transition-all ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border animate-slideDown">
          <div className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
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
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="mt-4 pt-4 border-t border-border flex items-center gap-3 px-4 py-3"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  {initials}
                </div>
                <span className="text-neutral-100 font-semibold">
                  {user.name}
                </span>
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="px-4 py-3 font-medium text-[15px] text-accent-red hover:bg-accent-red/5 transition-colors text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
