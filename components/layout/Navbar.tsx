import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Text, textVariants } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Navbar = () => {

  return (
    <header className="w-full fixed top-0 bg-light-gray py-[14px]">
      <div className="container flex  items-center justify-between">
        <div className="flex w-full justify-between gap-10">
           <div className="flex items-center gap-12">
              <Link href="/" className="flex items-center gap-2">
                <Image src={IMAGES.LOGO} alt="logo" width={100} height={100} />
              </Link>
              <div className="flex items-center gap-4 ">
                <Link href="/company" className={cn(textVariants({ variant: "body_md" }))}>
                  Find Jobs
                </Link>
                <Link href="/company" className={cn(textVariants({ variant: "body_md" }))}>
                  Browse Companies
                </Link>
              </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant={"transparent"}>Login</Button>
            <div className="h-full w-px bg-neutral-20"></div>
            <Button>Sign Up</Button>
          </div>
       </div>

     
      </div>
    </header>
  );
};

export default Navbar;
