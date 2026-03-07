import BillBord from "@/components/sections/Home/BillBord";
import Category from "@/components/sections/Home/Category";
import Companies from "@/components/sections/Home/Companies";
import FeaturedJobs from "@/components/sections/Home/FeaturedJobs";
import Hero from "@/components/sections/Home/Hero";
import LatestJobs from "@/components/sections/Home/LatestJobs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickHire — Discover 5000+ Jobs",
  description:
    "Great platform for job seekers passionate about startups. Find your dream job easier with QuickHire.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <Category />
      <BillBord />
      <FeaturedJobs />
      <LatestJobs />
    </>
  );
}
