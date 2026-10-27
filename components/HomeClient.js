'use client';

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MotionConfig, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaBalanceScale,
  FaCheck,
  FaChevronDown,
  FaClock,
  FaExternalLinkAlt,
  FaGem,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { locations } from "../src/data/locationData";
import { formatCurrency } from "../lib/priceApi";
import NextNavbar from "./NextNavbar";
import SmoothScroll from "./SmoothScroll";
import FloatingContact from "../src/components/FloatingContact";

const LeafletBranchMap = dynamic(() => import("./LeafletBranchMap"), {
  ssr: false,
  loading: () => <div className="se-map-loading se-bento-map-loading" role="status">Memuat peta cabang…</div>,
});

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0";
// TODO: ganti dengan versi resolusi tinggi (sumber saat ini 736 x 736).
const heroPhoto = "/images/hero-jewelry.jpg";
const heroStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } };
const heroReveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

const features = [
  { icon: FaClock, title: "Proses Cepat", copy: "Transaksi selesai dalam hitungan menit." },
  { icon: FaShieldAlt, title: "Aman & Terpercaya", copy: "Pemeriksaan dan penawaran dilakukan secara transparan." },
  { icon: FaGem, title: "Harga Terbaik", copy: "Nilai buyback mengikuti kadar dan harga terkini." },
  { icon: FaMapMarkerAlt, title: "Lokasi Strategis", copy: "Delapan cabang hadir di Jabodetabek." },
];

const footerNavLinks = [
  ["Beranda", "/#home"],
  ["Harga Emas", "/#prices"],
  ["Cabang", "/#branches"],
  ["Tentang", "/#about"],
  ["Panduan", "/#guide"],
  ["Kontak", "/#contact"],
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/superemasid/", icon: FaInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@superemas_id", icon: FaTiktok },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: FaWhatsapp },
];

function FooterAccordion({ title, children, isMobile }) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="se-footer-column se-footer-accordion"
      open={isMobile ? open : true}
      onToggle={(event) => {
        if (isMobile) setOpen(event.currentTarget.open);
      }}
    >
      <summary><h2>{title}</h2><FaChevronDown aria-hidden="true" /></summary>
      <div className="se-footer-accordion-content"><div>{children}</div></div>
    </details>
  );
}

const steps = [
  { title: "Hubungi Kami", copy: "Hubungi kami melalui WhatsApp atau datang langsung ke toko terdekat.", icon: FaWhatsapp },
  { title: "Timbang & Cek Karat", copy: "Tim kami akan menimbang dan mengecek karat emas Anda secara profesional.", icon: FaBalanceScale },
  { title: "Dapatkan Penawaran", copy: "Kami memberikan penawaran sesuai karat dan berat emas.", icon: FaGem },
  { title: "Terima Pembayaran", copy: "Setelah sepakat, pembayaran dapat diterima tunai atau transfer.", icon: FaMoneyBillWave },
];

const faqs = [
  {
    question: "Apakah emas tanpa surat tetap diterima?",
    answer: "Kami menerima emas tanpa surat untuk diperiksa. Nilai transaksi ditentukan setelah kadar, berat, jenis, dan kondisi emas diperiksa langsung.",
  },
  {
    question: "Bagaimana harga emas ditentukan?",
    answer: "Harga mengikuti acuan buyback yang diperbarui dan hasil pemeriksaan kadar serta berat emas Anda di cabang.",
  },
  {
    question: "Berapa lama proses jual emas?",
    answer: "Pemeriksaan dan transaksi dilakukan langsung di cabang. Lama proses bergantung pada jenis dan kondisi emas yang diperiksa.",
  },
  {
    question: "Pembayaran dapat dilakukan dengan cara apa?",
    answer: "Pembayaran dapat dilakukan secara tunai atau transfer setelah Anda menyetujui penawaran.",
  },
  {
    question: "Kapan cabang Super Emas buka?",
    answer: "Cabang Super Emas beroperasi setiap hari pukul 09.00–20.00.",
  },
  {
    question: "Apakah Super Emas melayani pembelian logam mulia?",
    answer: "Super Emas juga menyediakan pilihan logam mulia untuk Anda yang ingin membeli dan berinvestasi emas. Hubungi cabang untuk informasi ketersediaan.",
  },
];

function SectionLabel({ children, light = false }) {
  return <p className={`se-eyebrow${light ? " se-eyebrow-light" : ""}`}><span aria-hidden="true">•</span> {children}</p>;
}

function getBranchMapPreviewUrl(branch) {
  if (!branch.coordinates) {
    const query = encodeURIComponent(`${branch.fullName}, ${branch.address}`);
    return `https://maps.google.com/maps?q=${query}&output=embed`;
  }

  const { lat, lng } = branch.coordinates;
  const delta = 0.008;
  const bounds = [lng - delta, lat - delta, lng + delta, lat + delta]
    .map((coordinate) => coordinate.toFixed(6))
    .join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bounds}&layer=mapnik&marker=${lat}%2C${lng}`;
}

function PriceCalculator({ prices }) {
  const [karat, setKarat] = useState(prices[0]?.karat || "");
  const [weight, setWeight] = useState("");
  const currentPrice = prices.find((price) => price.karat === karat)?.price || 0;
  const estimate = currentPrice * (Number(weight) || 0);

  return (
    <aside className="se-calculator" aria-labelledby="se-calculator-title">
      <div className="se-calculator-heading">
        <span className="se-icon-square"><FaBalanceScale aria-hidden="true" /></span>
        <div>
          <p className="se-small-label">PERKIRAAN TRANSAKSI</p>
          <h3 id="se-calculator-title">Kalkulator harga</h3>
        </div>
      </div>
      <label className="se-field-label" htmlFor="se-karat">Jenis emas</label>
      <select id="se-karat" value={karat} onChange={(event) => setKarat(event.target.value)} disabled={!prices.length}>
        {prices.length ? prices.map((price) => (
          <option value={price.karat} key={price.karat}>{price.label || price.karat}</option>
        )) : <option value="">Harga belum tersedia</option>}
      </select>
      <label className="se-field-label" htmlFor="se-weight">Berat (gram)</label>
      <input id="se-weight" type="number" min="0" step="0.01" inputMode="decimal" placeholder="Contoh: 5" value={weight} onChange={(event) => setWeight(event.target.value)} />
      <div className="se-estimate">
        <span>Estimasi harga</span>
        <strong>{formatCurrency(estimate)}</strong>
        <small>Nilai akhir mengikuti hasil pemeriksaan di cabang.</small>
      </div>
    </aside>
  );
}

function Accordion({ items }) {
  const [openQuestion, setOpenQuestion] = useState(0);
  return (
    <div className="se-faq-list">
      {items.map((item, index) => {
        const isOpen = index === openQuestion;
        const panelId = `se-faq-panel-${index}`;
        return (
          <article className={`se-faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenQuestion(isOpen ? -1 : index)}>
                <span>{item.question}</span><span className="se-faq-toggle" aria-hidden="true">{isOpen ? "×" : "+"}</span>
              </button>
            </h3>
            <div className="se-faq-answer" id={panelId} hidden={!isOpen}><p>{item.answer}</p></div>
          </article>
        );
      })}
    </div>
  );
}

function CountUp({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const node = countRef.current;
    if (!node) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setCount(value);
      return undefined;
    }

    let frameId;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 900;
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - ((1 - progress) ** 4);
        setCount(Math.round(value * eased));
        if (progress < 1) frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <>
      <span className="se-stat-count" ref={countRef}>{count.toLocaleString("id-ID")}</span>
      {suffix && <span className="se-stat-suffix">{suffix}</span>}
    </>
  );
}

export default function HomeClient({ initialPriceData = [], initialPriceDate, initialPriceTime, worldGoldPrice }) {
  const [category, setCategory] = useState("Semua");
  const [carouselProgress, setCarouselProgress] = useState(0);
  const [faqData] = useState(faqs);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mobileQuery.matches);
    updateViewport();
    mobileQuery.addEventListener("change", updateViewport);
    return () => mobileQuery.removeEventListener("change", updateViewport);
  }, []);

  const sortedPrices = useMemo(() => [...initialPriceData].sort((a, b) => {
    const rank = (price) => {
      const label = `${price.label} ${price.karat}`.toLowerCase();
      if (label.includes("antam") || label.includes("logam")) return 0;
      const match = label.match(/k\s?(\d+)/);
      return match ? 100 - Number(match[1]) : 50;
    };
    return rank(a) - rank(b);
  }), [initialPriceData]);

  const filteredPrices = sortedPrices.filter((price) => {
    if (category === "Semua") return true;
    const isBullion = /antam|logam|non antam/i.test(`${price.label} ${price.karat}`);
    return category === "Logam Mulia" ? isBullion : !isBullion;
  });

  useEffect(() => {
    const elements = document.querySelectorAll("[data-se-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("se-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("se-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function moveCarousel(direction) {
    carouselRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  }

  function updateCarouselProgress() {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    setCarouselProgress(maxScroll > 0 ? carousel.scrollLeft / maxScroll : 0);
  }

  const updateText = [initialPriceDate, initialPriceTime && `${initialPriceTime} WIB`].filter(Boolean).join(" • ");
  const worldGoldUpdatedAt = worldGoldPrice?.updatedAt
    ? new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(worldGoldPrice.updatedAt))
    : null;
  const worldGoldUpdatedTime = worldGoldPrice?.updatedAt
    ? new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(new Date(worldGoldPrice.updatedAt))
    : null;
  const structuredFaq = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      ...locations.map((branch) => ({
        "@type": "JewelryStore",
        name: branch.fullName,
        url: `https://www.superemas.id/harga-emas-hari-ini/${branch.slug}`,
        address: { "@type": "PostalAddress", streetAddress: branch.address, addressCountry: "ID" },
        openingHours: "Mo-Su 09:00-20:00",
        sameAs: branch.mapUrl,
        ...(branch.coordinates ? { geo: { "@type": "GeoCoordinates", latitude: branch.coordinates.lat, longitude: branch.coordinates.lng } } : {}),
      })),
    ],
  };

  return (
    <MotionConfig reducedMotion="user">
    <>
    <SmoothScroll />
    <NextNavbar />
    <div className="se-site-frame">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredFaq) }} />
      <header className="se-hero" id="home">
        <Image src={heroPhoto} alt="Koleksi perhiasan emas berupa cincin, gelang, kalung, dan anting" fill priority sizes="100vw" quality={85} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9k=" className="se-hero-photo" />
        <div className="se-hero-tint" />
        <div className="se-hero-overlay" />
        <motion.div className="se-hero-content" variants={heroStagger} initial="hidden" animate="visible">
          <motion.p className="se-hero-kicker" variants={heroReveal}>SUPER EMAS INDONESIA <span /> 8 CABANG • JABODETABEK</motion.p>
          <motion.h1 variants={heroReveal}>Solusi Jual Emas<br /><span>Paling Super.</span></motion.h1>
          <motion.p className="se-hero-copy" variants={heroReveal}>Kami membeli emas Anda dalam kondisi apa pun — perhiasan, logam mulia, rusak, patah, hingga tanpa surat — dengan harga terbaik.</motion.p>
          <motion.div className="se-hero-actions" variants={heroReveal}>
            <a href="#prices" className="se-button se-button-gold">Cek Harga Hari Ini <FaArrowRight aria-hidden="true" /></a>
            <a href="#branches" className="se-button se-button-ghost">Cari Cabang Terdekat <FaArrowDown aria-hidden="true" /></a>
          </motion.div>
        </motion.div>
        <div className="se-hero-footnote"><span><FaCheck aria-hidden="true" /> 25.000+ pelanggan terlayani</span><a href="#prices">Scroll to explore <FaArrowDown aria-hidden="true" /></a></div>
        <motion.div className="se-hero-price" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}>
          <span>Harga emas dunia <small>· IDR/gram</small></span>
          <strong>{worldGoldPrice ? formatCurrency(worldGoldPrice.pricePerGram) : "Belum tersedia"}</strong>
          <small className="se-hero-price-source">{worldGoldPrice ? `Spot XAU/USD · Kurs USD/IDR · Update ${worldGoldUpdatedAt} WIB` : "Data harga spot global sedang tidak tersedia."}</small>
          <small className="se-hero-price-mobile-update">{worldGoldUpdatedTime ? `Update ${worldGoldUpdatedTime} WIB` : "Harga spot global belum tersedia"}</small>
        </motion.div>
      </header>

      <main>
        <section className="se-section se-about" id="about">
          <div className="se-section-heading" data-se-reveal>
            <div><SectionLabel>TENTANG KAMI</SectionLabel><h2>Berpengalaman.<br /><span>Terpercaya.</span></h2></div>
            <p>Super Emas Indonesia hadir sebagai solusi terpercaya untuk kebutuhan emas Anda. Kami menerima perhiasan, logam mulia, emas rusak, patah, sebelah, hingga emas tanpa surat. Semua proses dilakukan dengan cepat, aman, transparan, dan harga yang kompetitif.</p>
          </div>
          <div className="se-bento">
            <div className="se-bento-photo se-bento-branch-map" data-se-reveal>
              <LeafletBranchMap branches={locations} overview />
              <div className="se-bento-photo-shade" />
              <div className="se-glass-stat"><strong>8</strong><span>Cabang di<br />Jabodetabek</span></div>
              <p className="se-photo-caption">Peta cabang · 7 lokasi terverifikasi</p>
            </div>
            <div className="se-bento-right">
              <button type="button" className="se-map-card" onClick={() => document.querySelector("#branches")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="se-card-label">JANGKAUAN KAMI</span><strong>Lebih dekat,<br />di sekitar Anda.</strong>
                <div className="se-dotted-map" aria-hidden="true">
                  {locations.filter((branch) => branch.coordinates).map((branch) => {
                    const minLat = -6.61;
                    const maxLat = -6.17;
                    const minLng = 106.62;
                    const maxLng = 106.94;
                    const left = 10 + ((branch.coordinates.lng - minLng) / (maxLng - minLng)) * 78;
                    const top = 9 + ((maxLat - branch.coordinates.lat) / (maxLat - minLat)) * 78;
                    return <span className="se-map-point" style={{ left: `${left}%`, top: `${top}%` }} key={branch.slug} />;
                  })}
                </div>
                <span className="se-card-link">Lihat semua cabang <FaArrowRight /></span>
              </button>
              <div className="se-market-card">
                <div><span className="se-card-label">HARGA BUYBACK</span><strong>Transparan<br />dan terbarui.</strong></div>
                <div className="se-market-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
                <p>Harga diperbarui sesuai data terkini. Lihat harga per jenis emas.</p>
                <a href="#prices">Lihat daftar harga <FaArrowRight /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="se-stats" aria-label="Super Emas dalam angka" data-se-reveal>
          <div><strong><CountUp value={25000} suffix="+" /></strong><p>Pelanggan terlayani</p></div>
          <div><strong><CountUp value={8} /></strong><p>Cabang di Jabodetabek</p></div>
          <div><strong className="se-hours-stat">09.00–20.00</strong><p>Buka setiap hari</p></div>
          <div><strong>4</strong><p>Langkah transaksi mudah</p></div>
        </section>

        <section className="se-section se-prices" id="prices">
          <div className="se-section-heading se-price-heading" data-se-reveal>
            <div className="se-price-heading-title"><SectionLabel>HARGA BUYBACK</SectionLabel><h2>Harga kami beli<br /><span>emas Anda.</span></h2></div>
            <div className="se-price-update"><span className="se-live-dot" /> Pembaruan terakhir <strong>{updateText || "Menunggu data harga"}</strong></div>
          </div>
          <div className="se-price-layout" data-se-reveal>
            <div className="se-price-table">
              <div className="se-price-tabs" role="tablist" aria-label="Filter jenis emas">
                {["Semua", "Logam Mulia", "Perhiasan"].map((item) => (
                  <button type="button" role="tab" aria-selected={category === item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>
                ))}
              </div>
              <div className="se-price-column-head"><span>JENIS EMAS</span><span>HARGA / GRAM</span></div>
              {filteredPrices.length ? filteredPrices.map((item) => (
                <div className="se-price-row" key={item.karat}>
                  <span><i className="se-price-mark" />{item.label || item.karat}</span>
                  <strong>{formatCurrency(item.price)}</strong>
                </div>
              )) : <p className="se-no-prices">Data harga belum tersedia. Silakan hubungi kami untuk informasi terkini.</p>}
              <p className="se-price-note">* Harga akhir ditentukan setelah pemeriksaan kondisi emas di cabang.</p>
            </div>
            <PriceCalculator prices={sortedPrices} />
          </div>
        </section>

        <section className="se-section se-features">
          <div className="se-section-heading" data-se-reveal>
            <div><SectionLabel>KEUNGGULAN KAMI</SectionLabel><h2>Nilai yang kami<br /><span>jaga setiap hari.</span></h2></div>
            <p>Setiap transaksi ditangani dengan perhatian, keterbukaan, dan layanan yang menghargai waktu Anda.</p>
          </div>
          <div className="se-feature-list">
            {features.map(({ icon: Icon, title, copy }, index) => (
              <article className="se-feature-row" data-se-reveal key={title}>
                <span className="se-feature-number">0{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p><FaArrowRight className="se-feature-arrow" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="se-steps-section" id="guide">
          <div className="se-steps-inner">
            <div className="se-steps-intro" data-se-reveal>
              <SectionLabel light>PANDUAN</SectionLabel><h2>Cara jual emas<br />di Super Emas.</h2><p>Empat langkah sederhana dengan penawaran yang jelas di setiap prosesnya.</p>
              <a className="se-button se-button-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Tanya melalui WhatsApp <FaArrowRight /></a>
            </div>
            <div className="se-steps-list">
              {steps.map(({ title, copy, icon: Icon }, index) => (
                <article className="se-step-card" data-se-reveal key={title}>
                  <span className="se-step-no">0{index + 1}</span><span className="se-step-icon"><Icon aria-hidden="true" /></span>
                  <div><h3>{title}</h3><p>{copy}</p></div><FaArrowRight className="se-step-arrow" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="se-section se-branches" id="branches">
          <div className="se-section-heading" data-se-reveal>
            <div><SectionLabel>LOKASI</SectionLabel><h2>Kunjungi toko<br /><span>kami.</span></h2></div>
            <p>Temukan cabang Super Emas di sekitar Anda. Kami buka setiap hari pukul 09.00–20.00.</p>
          </div>
          <div className="se-branch-carousel" ref={carouselRef} onScroll={updateCarouselProgress}>
            {locations.map((branch, index) => (
              <article className={`se-branch-card${index % 2 ? " se-branch-card-purple" : ""}`} key={branch.slug}>
                <div className="se-branch-image">
                  <iframe
                    src={getBranchMapPreviewUrl(branch)}
                    title={`Pratinjau peta cabang Super Emas ${branch.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <span>SUPER EMAS • {branch.name.toUpperCase()}</span>
                </div>
                <div className="se-branch-content">
                  <div className="se-branch-title"><span>0{index + 1}</span><h3>{branch.name}</h3></div>
                  <p>{branch.address}</p><small><FaClock aria-hidden="true" /> Setiap hari, {branch.hours}</small>
                  <div className="se-branch-actions"><Link href={`/harga-emas-hari-ini/${branch.slug}`}>Lihat harga <FaArrowRight aria-hidden="true" /></Link><a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">Petunjuk arah <FaExternalLinkAlt aria-hidden="true" /></a></div>
                </div>
              </article>
            ))}
          </div>
          <div className="se-carousel-controls">
            <div><span className="se-carousel-line"><i style={{ width: `${Math.max(14, carouselProgress * 100)}%` }} /></span><small>{String(Math.round(carouselProgress * (locations.length - 1)) + 1).padStart(2, "0")} / {String(locations.length).padStart(2, "0")}</small></div>
            <div><button type="button" aria-label="Cabang sebelumnya" onClick={() => moveCarousel(-1)}><FaArrowLeft /></button><button type="button" aria-label="Cabang berikutnya" onClick={() => moveCarousel(1)}><FaArrowRight /></button></div>
          </div>
        </section>

        <section className="se-section se-faq" id="faq">
          <div className="se-faq-heading" data-se-reveal>
            <SectionLabel>INFORMASI</SectionLabel><h2>Yang sering<br /><span>ditanyakan.</span></h2>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="se-button se-button-dark">Tanya langsung <FaArrowRight /></a>
          </div>
          <Accordion items={faqData} />
        </section>

        <section className="se-cta-banner" data-se-reveal>
          <div className="se-cta-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="se-cta-model"><Image src="/images/super-emas-model-transparan.png" alt="Model Super Emas memeriksa perhiasan" fill sizes="(max-width: 760px) 65vw, 38vw" style={{ objectFit: "contain", objectPosition: "center bottom" }} /></div>
          <div className="se-cta-copy"><SectionLabel light>WAKTU YANG TEPAT</SectionLabel><h2>Siap menjual emas<br className="se-cta-desktop-break" /> Anda hari ini?</h2><p>Kami siap membantu Anda dengan proses yang jelas dan nyaman.</p></div>
          <a className="se-button se-button-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Hubungi via WhatsApp <FaArrowRight /></a>
        </section>
      </main>

      <footer className="se-footer" id="contact">
        <div className="se-footer-content">
          <div className="se-footer-brand">
            <Link href="/" className="se-wordmark" aria-label="Super Emas, beranda"><Image src="/images/super-emas-logo.png" alt="Super Emas" width={190} height={40} /></Link>
            <p>Melayani kebutuhan jual beli emas Anda dengan aman, transparan, dan terpercaya.</p>
          </div>
          <FooterAccordion title="Navigasi" isMobile={isMobileViewport}>
            <nav aria-label="Navigasi footer">
              {footerNavLinks.map(([label, href]) => <a href={href} key={label}>{label}<FaArrowRight aria-hidden="true" /></a>)}
            </nav>
          </FooterAccordion>
          <FooterAccordion title="Cabang Super Emas" isMobile={isMobileViewport}>
            {locations.map((branch) => <Link href={`/harga-emas-hari-ini/${branch.slug}`} key={branch.slug}>{branch.name}<FaArrowRight aria-hidden="true" /></Link>)}
          </FooterAccordion>
          <div className="se-footer-column se-footer-social">
            <h2>Ikuti & hubungi kami</h2>
            <div className="se-footer-social-links">
              {socialLinks.map(({ label, href, icon: Icon }) => <a href={href} key={label} aria-label={label} target="_blank" rel="noopener noreferrer"><Icon aria-hidden="true" /><span>{label}</span><FaArrowRight aria-hidden="true" /></a>)}
            </div>
          </div>
        </div>
        <div className="se-footer-bottom"><p>© {new Date().getFullYear()} PT Super Emas Indonesia. Hak cipta dilindungi.</p><Link href="/syarat-dan-ketentuan">Syarat & Ketentuan</Link></div>
      </footer>
    </div>
    <FloatingContact />
    </>
    </MotionConfig>
  );
}
