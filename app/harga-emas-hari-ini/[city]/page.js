import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import LocationPageClient from "../../../components/LocationPageClient";
import { getAllLocationSlugs, getLocationBySlug } from "../../../src/data/locationData";
import { getPriceData } from "../../../lib/priceApi";
import { PHONE_E164 } from "../../../src/lib/contact";

const SITE_URL = "https://www.superemas.id";

export function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const location = getLocationBySlug(params.city);
  if (!location) return {};

  const priceData = await getPriceData();
  const updateDate = priceData.date || new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  const cityName = location.name.toLowerCase();
  const title = `Harga Emas ${location.name} Hari Ini | Update ${updateDate}`;
  const description = `Cek harga emas ${cityName} hari ini untuk emas batangan dan perhiasan. Lihat harga buyback terbaru per gram, lalu kunjungi Super Emas untuk menjual emas Anda.`;
  const canonical = `${SITE_URL}/harga-emas-hari-ini/${location.slug}`;
  return {
    title: { absolute: title },
    description,
    keywords: [
      `harga emas ${cityName} hari ini`,
      `jual emas ${cityName} hari ini`,
      `harga emas hari ini di ${cityName}`,
      `harga buyback emas ${cityName}`,
      `toko emas ${cityName}`,
      `toko emas ${cityName} terdekat`,
      `toko emas ${cityName} terpercaya`,
      `tempat jual emas ${cityName}`
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: "Super Emas Indonesia",
      images: [{ url: `${SITE_URL}${location.seo.ogImage}`, alt: location.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${location.seo.ogImage}`],
    },
    robots: { index: true, follow: true },
  };
}

function getStructuredData({ location }) {
  const canonical = `${SITE_URL}/harga-emas-hari-ini/${location.slug}`;
  const [opens, closes] = location.hours.split("–").map((hour) => hour.replace(".", ":"));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: location.seo.h1,
        description: location.seo.metaDescription,
        url: canonical,
      },
      {
        "@type": "JewelryStore",
        name: location.fullName,
        telephone: PHONE_E164,
        image: "https://www.superemas.id/logo.png",
        url: canonical,
        hasMap: location.mapsUrl,
        priceRange: "$$",
        parentOrganization: {
          "@type": "Organization",
          name: "PT Super Emas Indonesia",
          url: SITE_URL,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: location.streetAddress,
          addressLocality: location.addressLocality,
          addressRegion: location.addressRegion,
          postalCode: location.postalCode,
          addressCountry: "ID",
        },
        areaServed: location.areaServed,
        sameAs: [
          "https://www.instagram.com/superemasid/",
          "https://www.tiktok.com/@superemasid",
          location.mapsUrl,
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.lat,
          longitude: location.lng,
        },
        openingHoursSpecification: [{
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens,
          closes,
        }],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Harga Emas Hari Ini", item: `${SITE_URL}/#harga-cabang` },
          { "@type": "ListItem", position: 3, name: location.name, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: location.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return schema;
}

export default async function LocationPage({ params }) {
  const location = getLocationBySlug(params.city);
  if (!location) notFound();

  const priceData = await getPriceData();
  const updateDate = priceData.date || "Terbaru";
  const updateTime = priceData.latestUpdate ? `${priceData.latestUpdate} WIB` : "";
  const structuredData = getStructuredData({ location });

  return (
    <>
      <JsonLd data={structuredData} />
      <LocationPageClient location={location} priceData={priceData} updateText={[updateDate, updateTime].filter(Boolean).join(" • ")} />
    </>
  );
}
