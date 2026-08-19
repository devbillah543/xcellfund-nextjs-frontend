import Hero from "@/components/common/Hero";
import AppLayout from "@/components/layouts/AppLayout";
import RichtextContent from "@/components/rich-text-content/RichtextContent";
import fetchApi from "@/services/ApiService";
import { createMetadata } from "@/utils/generateMetadata";
import React from "react";
import Container from "@/components/common/Container";

export const generateMetadata = async () => {
  const data = await fetchApi("saasSolution");
  return createMetadata(data?.data?.seo || {});
};

export default async function page() {
  const data = await fetchApi("saasSolution");
  return (
    <AppLayout pathname="/saas-solutions">
      <Hero
        title={data?.data?.hero?.title}
        subtitle={data?.data?.hero?.subtitle}
        image={data?.data?.hero?.background_image}
      />
      <Container as="section" className="py-10">
        <RichtextContent content={data?.data?.content} />
      </Container>
    </AppLayout>
  );
}
