import LinkButton from "@/components/ui/LinkButton";
import { Text } from "@/components/ui/Text";
import React from "react";
import { BsLaptop, BsDatabase } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa";
import type { IconType } from "react-icons";
import { FcSalesPerformance } from "react-icons/fc";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  MdOutlineAttachMoney,
  MdOutlineCampaign,
  MdOutlineDesignServices,
  MdOutlineEngineering,
} from "react-icons/md";

import { Category as CategoryType } from "@/services/types";
import { getCategories } from "@/services/serverApi";

const categoryIconMap: Record<string, IconType> = {
  design: MdOutlineDesignServices,
  sales: FcSalesPerformance,
  marketing: MdOutlineCampaign,
  finance: MdOutlineAttachMoney,
  technology: BsLaptop,
  engineering: MdOutlineEngineering,
  business: FaBusinessTime,
  "human-resource": HiOutlineUserGroup,
  "human-resources": HiOutlineUserGroup,
  "software-development": BsLaptop,
  "data-science": BsDatabase,
  "customer-success": FaBusinessTime,
  "product-management": MdOutlineCampaign,
};

const Category = async () => {
  const categories = await getCategories();

  return (
    <section className="w-full overflow-hidden pt-18">
      <div className="container">
        <div className=" flex flex-col gap-6 md:gap-12">
          <div className="flex flex-wrap items-end gap-10 justify-between">
            <Text variant={"h2"} fontFamily={"clash"}>
              Explore by <span className="text-accent-blue">category</span>
            </Text>
            <LinkButton className="hidden sm:block" href="/jobs">
              Show all jobs
            </LinkButton>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((item) => (
              <CtgCard key={item.id} category={item} />
            ))}
          </div>
          <LinkButton className="block sm:hidden" href="/jobs">
            Show all jobs
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

const CtgCard = ({ category }: { category: CategoryType }) => {
  const Icon = categoryIconMap[category.slug] || MdOutlineCampaign;

  return (
    <div className="group justify-between flex flex-row sm:flex-col gap-8 p-8 border border-neutral-20 hover:bg-primary transition-colors cursor-pointer">
      <Icon className="text-[48px] text-primary group-hover:text-white" />
      <div className="flex flex-col gap-3">
        <Text
          variant={"title_lg"}
          fontFamily={"clash"}
          className="text-neutral-100 group-hover:text-white"
        >
          {category.name}
        </Text>

        <div className="flex items-center gap-4">
          <Text
            variant={"body_lg"}
            className="text-neutral-60 group-hover:text-white"
          >
            {category.jobCount || 0} jobs available
          </Text>

          <span className="text-neutral-100 hidden sm:block group-hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.75 11.7261L4.75 11.7261"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.7002 5.70149L19.7502 11.7255L13.7002 17.7505"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <span className="text-neutral-100 block sm:hidden group-hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19.75 11.7261L4.75 11.7261"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.7002 5.70149L19.7502 11.7255L13.7002 17.7505"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default Category;
