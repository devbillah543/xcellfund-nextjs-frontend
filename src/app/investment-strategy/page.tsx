import AppLayout from "@/components/layouts/AppLayout";
import RichtextContent from "@/components/rich-text-content/RichtextContent";
import fetchApi from "@/services/ApiService";
import { createMetadata } from "@/utils/generateMetadata";
import React from "react";
import Hero from "@/components/common/Hero";
import Container from "@/components/common/Container";
import "./style.css";

export const generateMetadata = async () => {
  const data = await fetchApi("investmentStrategy");
  return createMetadata(data?.data?.seo || {});
};

export default async function page() {
  const data = await fetchApi("investmentStrategy");
  return (
    <AppLayout pathname="/investment-strategy">
      <Hero
        title={data?.data?.hero?.title}
        subtitle={data?.data?.hero?.subtitle}
        image={data?.data?.hero?.background_image}
      />
      <Container as="section" className="investment-strategy-page py-10">
        <RichtextContent content={data?.data?.content} />
      </Container>
    </AppLayout>
  );
}
