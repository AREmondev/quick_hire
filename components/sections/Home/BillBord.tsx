import { Button, buttonVariants } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BillBord = () => {
  return (
    <div className="flex overflow-hidden items-start py-18">
      <div className="container relative bg-primary">
        <div className="sm:h-[414px] justify-between py-20 w-full sm:px-10 lg:px-[70px] flex flex-col sm:flex-row gap-6 items-center">
          <div className="max-w-[364px] gap-4 sm:gap-6 h-full flex flex-col items-center sm:items-start justify-start  sm:justify-center">
            <Text
              variant={"h2"}
              fontFamily={"clash"}
              className="text-white text-center sm:text-left"
            >
              Start posting jobs today
            </Text>
            <Text variant={"body_md"} className="text-white">
              Start posting jobs for only $10.
            </Text>
            {/* <Button onClick={} className="w-fit" variant={"white"}>
              Sign Up For Free
            </Button> */}
            <Link
              href="/auth/register"
              className={cn(
                "w-full sm:w-fit",
                buttonVariants({ variant: "white" }),
              )}
            >
              Sign Up For Free
            </Link>
          </div>
          <Image
            src="/assets/images/bashboard.png"
            width={570}
            height={414}
            alt="billboard"
            className="md:-mb-20"
          />
        </div>
        {/* <div className="absolute hidden lg:block right-[70px] bottom-0">
          <Image
            src="/assets/images/bashboard.png"
            width={570}
            height={414}
            alt="billboard"
          />
        </div> */}
        <span className="absolute left-0 top-0 h-32 w-50 transform -rotate-35 bg-white translate-x-[-50%] translate-y-[-50%]"></span>
        <span className="absolute right-0 bottom-0 h-32 w-50 transform -rotate-35 bg-white -translate-x-[-50%] -translate-y-[-50%]"></span>
      </div>
    </div>
  );
};

export default BillBord;
