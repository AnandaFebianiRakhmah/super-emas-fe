import Link from "next/link";
import { notFound } from "next/navigation";
import { FaClock, FaExclamationTriangle, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import Footer from "../../../src/components/Footer";
import FloatingContact from "../../../src/components/FloatingContact";
import NextNavbar from "../../../components/NextNavbar";
import { getAllLocationSlugs, getLocationBySlug, locations } from "../../../src/data/locationData";
import { formatCurrency, getPriceData } from "../../../lib/priceApi";

const SITE_URL = "https://www.superemas.id";

export function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const location = getLocationBySlug(params.city);
  if (!location) return {};

  const canonical = `${SITE_URL}/harga-emas-hari-ini/${location.slug}`;
  return {
    title: location.seo.title,
    description: location.seo.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: location.seo.title,
      description: location.seo.metaDescription,
      url: canonical,
      siteName: "Super Emas Indonesia",
      images: [{ url: `${SITE_URL}${location.seo.ogImage}`, alt: location.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title: location.seo.title,
      description: location.seo.metaDescription,
      images: [`${SITE_URL}${location.seo.ogImage}`],
    },
    robots: { index: true, follow: true },
  };
}

function StructuredData({ location }) {
  const canonical = `${SITE_URL}/harga-emas-hari-ini/${location.slug}`;
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
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Harga Emas Hari Ini", item: `${SITE_URL}/#harga-cabang` },
          { "@type": "ListItem", position: 3, name: location.name, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: location.content.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function PriceTable({ priceData }) {
  if (!priceData.prices.length) {
    return (
      <div className="price-error">
        <FaExclamationTriangle />
        <p>Data harga sedang tidak tersedia</p>
        <a href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="contact-wa-btn">Hubungi Kami via WhatsApp</a>
      </div>
    );
  }

  return (
    <div className="price-table-card">
      <div className="price-table">
        {priceData.prices.map((item) => (
          <div key={item.karat} className="price-row">
            <div className="price-karat"><GiGoldBar className="gold-icon" /><span className="karat-label">{item.label}</span></div>
            <div className="price-amount"><span className="price-value">{formatCurrency(item.price)}</span><span className="price-unit">/gram</span></div>
          </div>
        ))}
      </div>
      <p className="price-note">* Cek harga emas terbaru di cabang Super Emas terdekat</p>
    </div>
  );
}

export default async function LocationPage({ params }) {
  const location = getLocationBySlug(params.city);
  if (!location) notFound();

  const priceData = await getPriceData();
  const updateDate = priceData.date || "Terbaru";
  const updateTime = priceData.latestUpdate ? `${priceData.latestUpdate} WIB` : "";

  return (
    <>
      <StructuredData location={location} />
      <NextNavbar />
      <main className="location-page">
        <div className="location-breadcrumb"><div className="container"><Link href="/" className="breadcrumb-link"><FaHome /> Home</Link><span className="breadcrumb-separator">/</span><Link href="/#harga-cabang" className="breadcrumb-link">Harga Emas Hari Ini</Link><span className="breadcrumb-separator">/</span><span className="breadcrumb-current">{location.name}</span></div></div>
        <section className="location-hero"><div className="container"><h1 className="location-h1">{location.seo.h1}</h1><p className="location-intro">{location.content.intro}</p></div></section>
        <section className="location-price-section"><div className="container"><div className="price-header"><h2>Daftar Harga Emas Terkini</h2><div className="price-update-badge"><FaClock /> Update: {updateDate} {updateTime}</div></div><PriceTable priceData={priceData} /></div></section>
        <section className="location-info-section"><div className="container"><h2>Informasi Cabang {location.name}</h2><div className="location-info-card"><div className="location-detail"><FaMapMarkerAlt className="location-icon" /><div><h3>{location.fullName}</h3><p>{location.address}</p><p className="service-area">{location.content.serviceArea}</p></div></div><a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="maps-button"><FaMapMarkerAlt /> Lihat di Google Maps</a></div></div></section>
        <section className="location-faq-section"><div className="container"><h2>Pertanyaan yang Sering Diajukan</h2><div className="faq-list">{location.content.faq.map((faq) => <div key={faq.question} className="faq-item"><h3 className="faq-question">{faq.question}</h3><p className="faq-answer">{faq.answer}</p></div>)}</div></div></section>
        <section className="location-cta-section"><div className="container"><h2>Siap Menjual Emas Anda?</h2><p>Hubungi kami atau kunjungi cabang {location.name} untuk transaksi emas Anda</p><div className="cta-buttons"><a href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="cta-btn cta-primary">Hubungi via WhatsApp</a><Link href="/#location" className="cta-btn cta-secondary">Lihat Cabang Lainnya</Link></div></div></section>
        <section className="location-related-section"><div className="container"><h2>Harga Emas di Cabang Lain</h2><div className="related-location-links">{locations.filter((item) => item.slug !== location.slug).map((item) => <Link key={item.slug} href={`/harga-emas-hari-ini/${item.slug}`}>Harga Emas {item.name}</Link>)}</div></div></section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
