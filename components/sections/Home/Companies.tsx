import { Text } from "@/components/ui/Text";
import { IMAGES } from "@/lib/constants";
import { getCompanies } from "@/services/serverApi";
import Image from "next/image";
import React from "react";

const Companies = async () => {
  const companies = await getCompanies();

  console.log("companies", companies);
  return (
    <section className="w-ull overflow-hidden py-12">
      <div className="container">
        <div className="flex flex-col gap-8">
          <Text variant="body_lg" className="text-black/50">
            Companies we helped grow
          </Text>
          <div className="flex  w-full items-cneter justify-center  md:justify-between flex-wrap gap-10 items-center">
            {companies.map(
              (item) =>
                item.logoUrl && (
                  <Image
                    key={item.name}
                    width={200}
                    height={30}
                    src={item.logoUrl || ""}
                    alt={item.name}
                    className=" w-auto "
                  />
                ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;
