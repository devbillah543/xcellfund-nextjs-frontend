import "@styles/globals.css";
import { defaultSEO } from "@/config/seo.config";
import { ReactNode } from "react";
import { lato, prata, montserrat } from "@/fonts";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  authors: [{ name: defaultSEO.authors }],
  creator: defaultSEO.creator,
  publisher: defaultSEO.publisher,
  keywords: defaultSEO.keywords.split(", "),
  robots:
    "index, follow, max-snippet: -1, max-image-preview: large, max-video-preview: -1",
  canonical: defaultSEO.canonical,
  openGraph: {
    title: defaultSEO.title,
    description: defaultSEO.description,
    url: defaultSEO.canonical,
    siteName: defaultSEO.siteName,
    images: [
      {
        url: `${defaultSEO.canonical}${defaultSEO.og_image}`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: defaultSEO.creator,
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [`${defaultSEO.canonical}${defaultSEO.og_image}`],
  },
  additionalMetaTags: [
    { name: "pinterest-rich-pin", content: "true" },
    { name: "telegram-channel", content: defaultSEO.title },
  ],
  metadataBase: new URL(defaultSEO.canonical),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: metadata.title,
    description: metadata.description,
    url: metadata.metadataBase.href,
    publisher: {
      "@type": "Organization",
      name: metadata.publisher,
    },
  };

  return (
    <html
      lang="en"
      className={`${lato.variable} ${prata.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.authors[0].name} />
        <meta name="creator" content={metadata.creator} />
        <meta name="publisher" content={metadata.publisher} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="robots" content={metadata.robots} />
        <link rel="canonical" href={metadata.canonical} />

        {/* OpenGraph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        {/* Images primarily via same-origin /_next/image; CDN preconnect helps any direct assets */}
        <link rel="preconnect" href="https://xcellfund.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://xcellfund.com" />

        {/* Additional Meta */}
        {metadata.additionalMetaTags.map((tag) => (
          <meta key={tag.name} name={tag.name} content={tag.content} />
        ))}
      </head>
      <body suppressHydrationWarning>
        {children}
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
