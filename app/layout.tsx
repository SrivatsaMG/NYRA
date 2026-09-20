import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { siteConfig } from "@/lib/site-config";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const title =
  "NYRA Constructions Mysuru | Residential & Commercial Building Contractor";
const description =
  "NYRA Constructions is a building contractor in J P Nagar, Mysuru handling residential and commercial construction, renovation, and structural (RCC) work. Call 95352 77149.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  keywords: [
    "NYRA Constructions",
    "construction company Mysuru",
    "construction company Mysore",
    "building contractor Mysuru",
    "house construction Mysuru",
    "commercial construction Mysuru",
    "renovation Mysuru",
    "RCC contractor Mysuru",
    "civil contractor Mysuru",
    "JP Nagar construction company",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title,
    description,
    url: siteConfig.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Mysuru",
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#152238",
};

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteConfig.name,
    image: `${siteConfig.url}/opengraph-image.png`,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: { "@type": "City", name: "Mysuru" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    makesOffer: [
      "Residential construction",
      "Commercial construction",
      "Renovation & interiors",
      "Structural & RCC work",
      "Site development & civil works",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${barlow.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body>
        <div className="grid-overlay" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
