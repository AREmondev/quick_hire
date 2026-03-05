import Link from "next/link";
import { Text } from "@/components/ui/Text";

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-60/20 bg-white">
      <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Text className="text-neutral-60" variant="body-sm">
          © {new Date().getFullYear()} QuickHire. All rights reserved.
        </Text>
        <div className="flex items-center gap-6">
          <Link href="#privacy">
            <Text className="text-neutral-60" variant="body-sm">
              Privacy
            </Text>
          </Link>
          <Link href="#terms">
            <Text className="text-neutral-60" variant="body-sm">
              Terms
            </Text>
          </Link>
          <Link href="#contact">
            <Text className="text-neutral-60" variant="body-sm">
              Contact
            </Text>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
