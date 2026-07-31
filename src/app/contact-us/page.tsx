import AppLayout from "@/components/layouts/AppLayout";
import fetchApi from "@/services/ApiService";
import { createMetadata } from "@/utils/generateMetadata";
import React from "react";
import Hero from "@/components/common/Hero";;

export const generateMetadata = async () => {
  const data = await fetchApi("contactUs");
  return createMetadata(data?.data?.seo || {});
};

export default async function page() {
  const data = await fetchApi("contactUs");
  return (
    <AppLayout pathname="/contact-us">
      <Hero
        title={data?.data?.hero?.title}
        subtitle={data?.data?.hero?.subtitle}
        image={data?.data?.hero?.background_image}
      />
    </AppLayout>
  );
}
