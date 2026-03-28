import Hero from "@/components/sections/Home/Hero";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Metadata } from "next";

const Companies = dynamic(() => import("@/components/sections/Home/Companies"));
const Category = dynamic(() => import("@/components/sections/Home/Category"));
const BillBord = dynamic(() => import("@/components/sections/Home/BillBord"));
const FeaturedJobs = dynamic(
  () => import("@/components/sections/Home/FeaturedJobs"),
);
const LatestJobs = dynamic(
  () => import("@/components/sections/Home/LatestJobs"),
);

export const metadata: Metadata = {
  title: "QuickHire — Discover 5000+ Jobs",
  description:
    "Great platform for job seekers passionate about startups. Find your dream job easier with QuickHire.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="h-20 animate-pulse bg-gray-100" />}>
        <Companies />
      </Suspense>
      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100" />}>
        <Category />
      </Suspense>
      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100" />}>
        <BillBord />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <FeaturedJobs />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <LatestJobs />
      </Suspense>
    </>
  );
}
