import Hero from "@/components/common/Hero";
import AppLayout from "@/components/layouts/AppLayout";
import RichtextContent from "@/components/rich-text-content/RichtextContent";
import fetchApi from "@/services/ApiService";
import { createMetadata } from "@/utils/generateMetadata";
import React from "react";

export const generateMetadata = async () => {
  const data = await fetchApi("visionAndGoal");
  return createMetadata(data?.data?.seo || {});
};

export default async function page() {
  const data = await fetchApi("visionAndGoal");
  return (
    <AppLayout pathname="/vision-and-goals">
      <Hero
        title={data?.data?.hero?.title}
        subtitle={data?.data?.hero?.subtitle}
        image={data?.data?.hero?.background_image}
      />
      <section className="max-w-[1140px] mx-auto px-5 md:px-0 py-10">
        <RichtextContent content={data?.data?.content} />
      </section>
    </AppLayout>
  );
}
