"use client";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/constants";
export const footerMenu = [
  {
    title: "About",
    items: [
      {
        label: "Companies",
        href: "#companies",
        className: "text-neutral-20 hover:text-white",
      },
      {
        label: "Pricing",
        href: "#pricing",
        className: "text-neutral-60 hover:text-white",
      },
      {
        label: "Terms",
        href: "#terms",
        className: "text-neutral-60 hover:text-white",
      },
      {
        label: "Advice",
        href: "#advice",
        className: "text-neutral-60 hover:text-white",
      },
      {
        label: "Privacy Policy",
        href: "#privacy",
        className: "text-neutral-60 hover:text-white",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        label: "Help Docs",
        href: "#docs",
        className: "text-neutral-60 hover:text-white",
      },
      {
        label: "Guide",
        href: "#guide",
        className: "text-neutral-60 hover:text-white",
      },
      {
        label: "Updates",
        href: "#updates",
        className: "text-neutral-60 hover:text-white",
      },
      {
        label: "Contact Us",
        href: "#contact",
        className: "text-neutral-60 hover:text-white",
      },
    ],
  },
];
const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Image
                src={IMAGES.LOGO_WHITE}
                width={120}
                height={32}
                alt="QuickHire logo"
              />
            </div>
            <Text className="text-neutral-20 max-w-xs" variant="body_sm">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </Text>
          </div>
          {footerMenu.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <Text className=" text-neutral-0" variant="body_lg">
                {section.title}
              </Text>

              <ul className="flex flex-col gap-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>
                      <Text
                        className="text-neutral-20 hover:text-white transition-colors"
                        variant="body_sm"
                      >
                        {item.label}
                      </Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <Text className="text-neutral-0" variant="body_lg">
              Get job notifications
            </Text>
            <Text className="text-neutral-20" variant="body_sm">
              The latest job news, articles, sent to your inbox weekly.
            </Text>
            <form
              className="flex w-full gap-2 flex-col sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email Address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Email Address"
                className="h-12 flex-auto px-4 sm:min-w-[200px] text-black placeholder:text-neutral-60 w-full bg-white"
              />
              <Button className="h-12  bg-primary text-white" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container border-t border-neutral-60/20 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Text className="text-neutral-60" variant="body_sm">
          © {new Date().getFullYear()} QuickHire. All rights reserved.
        </Text>
        <div className="flex items-center gap-3">
          {[
            IMAGES.FACEBOOK,
            IMAGES.INSTAGRAM,
            IMAGES.LINKEDIN,
            IMAGES.TWITTER,
            IMAGES.DRIBBL,
          ].map((label) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-neutral-60/30 inline-flex items-center justify-center text-white hover:bg-primary transition-colors"
            >
              <Image src={label} width={10} height={10} alt="" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
