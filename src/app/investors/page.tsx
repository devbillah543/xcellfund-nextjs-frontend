import Hero from "@/components/common/Hero";
import Form from "@/components/contact/Form";
import AppLayout from "@/components/layouts/AppLayout";
import fetchApi from "@/services/ApiService";
import appConfig from "@/config/app.config";
import { createMetadata } from "@/utils/generateMetadata";
import React from "react";
import Container from "@/components/common/Container";

export const generateMetadata = async () => {
  const data = await fetchApi("investors");
  return createMetadata(data?.data?.seo || {});
};

export default async function page() {
  const data = await fetchApi("investors");
  return (
    <AppLayout pathname="/investors">
      <Hero
        title={data?.data?.hero?.title}
        subtitle={data?.data?.hero?.subtitle}
        image={data?.data?.hero?.background_image}
      />
      <Container as="section" className="py-20">
        <h2 className="text-[#232325] text-3xl prata font-normal leading-10 sentence-case mb-5 text-center md:text-left">
          Investor Login
        </h2>
        <p className="text-[#333743] text-lg lato font-light mb-6 leading-[30px] text-left">
          View Your Account, Contracts, Yield and Profile Information
        </p>
        <Form
          button={data?.data?.form?.button}
          input={data?.data?.form?.input}
          variant="login"
          endpoint={`${appConfig.apiUrl}/api/auth/local`}
          withAuth={false}
          errorMessage="The username or password you entered is incorrect. Please try again."
          successMessage="Login successful!"
          loadingLabel="Signing in..."
          showCaptcha={Boolean(appConfig.recaptchaSiteKey)}
        />
      </Container>
    </AppLayout>
  );
}
