import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { IMAGES } from "@/lib/constants";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Visual Element */}
        <div className="relative w-full max-w-[280px] mx-auto aspect-square animate-pulse-slow">
          <div className="absolute inset-0 bg-primary/5 rounded-full scale-110" />
          <div className="absolute inset-0 bg-primary/10 rounded-full scale-90" />
          <div className="relative flex items-center justify-center h-full">
            <span className="text-9xl font-black text-primary select-none opacity-20">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-primary rounded-2xl rotate-12 flex items-center justify-center shadow-lg shadow-primary/20">
                <svg
                  className="w-12 h-12 text-white -rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <Text variant="h2" className="text-neutral-100 font-bold">
            Oops! Page Not Found
          </Text>
          <Text variant="body_lg" className="text-neutral-60">
            We couldn't find the page you're looking for. It might have been
            moved, deleted, or never existed.
          </Text>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full px-8">Back to Home</Button>
          </Link>
          <Link href="/jobs" className="w-full sm:w-auto">
            <Button
              variant="transparent"
              className="w-full px-8 border border-neutral-20 h-[50px]"
            >
              Explore Jobs
            </Button>
          </Link>
        </div>

        {/* Branding */}
        <div className="pt-12 opacity-50">
          <Image
            src={IMAGES.LOGO}
            alt="QuickHire"
            width={100}
            height={32}
            className="mx-auto grayscale"
          />
        </div>
      </div>
    </div>
  );
}
