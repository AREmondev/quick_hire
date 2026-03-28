import JobSearchBar from "@/components/features/JobSearchBar";
import { Text } from "@/components/ui/Text";
import { IMAGES } from "@/lib/constants";
import Image from "next/image";
import dynamic from "next/dynamic";

const DecorationLine = dynamic(() => import("@/components/ui/DecorationLine"), {
  ssr: true,
});

const Hero = () => {
  return (
    <div className="bg-light-gray relative overflow-hidden mt-[78px] ">
      <div className="container relative pt-[82px] pb-[103px] overflow-hidden">
        <div className="flex flex-col gap-[23px]">
          <div className="max-w-[533px]">
            <div className="flex flex-col gap-3">
              <Text
                variant={"h1"}
                fontFamily={"clash"}
                className="text-neutral-100"
              >
                Discover more than <br />{" "}
                <span className=" text-accent-blue">5000+ Jobs</span>
              </Text>
              <DecorationLine />
            </div>
          </div>
          <Text variant={"body_xl"} className="max-w-[521px]">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </Text>
          <JobSearchBar />
        </div>
        <div className="absolute lg:block hidden z-10 right-0  top-0 w-[500px] h-auto">
          <Image
            src={IMAGES.HERO_IMAGE}
            alt="hero"
            width={500}
            height={700}
            priority
          />
        </div>
      </div>
      <div className="absolute xl:block hidden right-0 z-1 top-0 w-[900px]">
        <Image
          src={IMAGES.HERO_PATTERN}
          alt="hero pattern"
          width={900}
          height={800}
          priority
        />
      </div>
      <div className="absolute 2xl:block hidden z-10 right-0 top-0 w-[280px] h-[700px] bg-[#F7F8FA] transform translate-y-[50%] rotate-[64deg]"></div>
    </div>
  );
};

export default Hero;
