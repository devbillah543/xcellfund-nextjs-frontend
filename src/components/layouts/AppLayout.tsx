import dynamic from "next/dynamic";
import React from "react";
import fetchApi from "@/services/ApiService";
import { shouldShow } from "@/utils/shouldShow";
import TopScroll from "@/components/top-scroll/TopScroll";

const Topbar = dynamic(() => import("@/components/common/Topbar"), {
  ssr: true,
  loading: () => <TopbarSkeleton contactsCount={2} socialsCount={3} />,
});
const TopbarSkeleton = dynamic(
  () => import("@/components/placeholder/TopbarSkeleton"),
  { ssr: true }
);

const Menu = dynamic(() => import("@/components/menu/Menu"), {
  ssr: true,
  loading: () => <MenuSkeleton />,
});
const MenuSkeleton = dynamic(
  () => import("@/components/placeholder/MenuSkeleton"),
  { ssr: true }
);

const Banner = dynamic(() => import("@/components/contact/Banner"), {
  ssr: true,
  loading: () => <ContactBannerSkeleton hasButton={true} />,
});
const ContactBannerSkeleton = dynamic(
  () => import("@/components/placeholder/ContactBannerSkeleton"),
  { ssr: true }
);

const Map = dynamic(() => import("@/components/common/Map"), {
  ssr: true,
  loading: () => <MapSkeleton />,
});
const MapSkeleton = dynamic(
  () => import("@/components/placeholder/MapSkeleton"),
  { ssr: true }
);

const Subscription = dynamic(() => import("@/components/common/Subscription"), {
  ssr: true,
  loading: () => <SubscriptionSkeleton socialsCount={3} />,
});
const SubscriptionSkeleton = dynamic(
  () => import("@/components/placeholder/SubscriptionSkeleton"),
  { ssr: true }
);

const Footer = dynamic(() => import("@/components/common/Footer"), {
  ssr: true,
  loading: () => <FooterSkeleton />,
});
const FooterSkeleton = dynamic(
  () => import("@/components/placeholder/FooterSkeleton"),
  { ssr: true }
);

const Copyright = dynamic(() => import("@/components/common/Copyright"), {
  ssr: true,
  loading: () => <CopyrightSkeleton />,
});
const CopyrightSkeleton = dynamic(
  () => import("@/components/placeholder/CopyrightSkeleton"),
  { ssr: true }
);

const HomeContact = dynamic(() => import("@/components/home/Contact"), {
  ssr: true,
  loading: () => <HomeContactSkeleton inputCount={5} />,
});
const HomeContactSkeleton = dynamic(
  () => import("@/components/placeholder/HomeContactSkeleton"),
  { ssr: true }
);

const ContactusContact = dynamic(
  () => import("@/components/contact-us/Contact"),
  {
    ssr: true,
    loading: () => <ContactusContactSkeleton inputCount={5} linkCount={2} />,
  }
);
const ContactusContactSkeleton = dynamic(
  () => import("@/components/placeholder/ContactusContactSkeleton"),
  { ssr: true }
);

export default async function AppLayout({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const globalData = await fetchApi("global");

  return (
    <>
      <TopScroll />
      <header className="w-full absolute z-50">
        <Topbar data={globalData?.data} />
        <Menu
          menus={globalData?.data?.mainmenu?.menus}
          brand={globalData?.data?.mainmenu?.brand}
        />
      </header>

      <main>{children}</main>

      <section>
        {pathname === "/contact-us" && (
          <ContactusContact
            input={globalData?.data?.contact_form?.input}
            button={globalData?.data?.contact_form?.button}
            address={{
              ...globalData?.data?.footer_section?.address,
              heading: "Our Location",
            }}
          />
        )}

        {shouldShow("contact-banner", pathname) && (
          <Banner
            title={globalData?.data?.contact_section?.title}
            subtitle={globalData?.data?.contact_section?.subtitle}
            link={globalData?.data?.contact_section?.link}
            background_image={globalData?.data?.contact_section?.background_image}
          />
        )}

        {pathname === "/" && (
          <HomeContact
            input={globalData?.data?.contact_form?.input}
            button={globalData?.data?.contact_form?.button}
          />
        )}

        {shouldShow("map", pathname) && (
          <Map
            embedLink={globalData?.data?.map?.embed_link}
            title="XCell Fund office location map"
          />
        )}

        <Subscription
          input={globalData?.data?.subscription_section?.input}
          button={globalData?.data?.subscription_section?.button}
          socials={globalData?.data?.topnav?.socials}
        />
      </section>

      <footer>
        <Footer
          address={globalData?.data?.footer_section?.address}
          branding={globalData?.data?.footer_section?.branding}
          quicklinks={globalData?.data?.footer_section?.quicklinks}
        />

        <Copyright
          copyright_text={globalData?.data?.footer_section?.copyright?.copyright_text}
          links={globalData?.data?.footer_section?.copyright?.links}
        />
      </footer>
    </>
  );
}
