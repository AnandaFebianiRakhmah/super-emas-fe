'use client';

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { locations } from "../src/data/locationData";
import { formatCurrency } from "../lib/priceApi";
import NextNavbar from "./NextNavbar";
import SmoothScroll from "./SmoothScroll";
import FloatingContact from "../src/components/FloatingContact";

const LeafletBranchMap = dynamic(() => import("./LeafletBranchMap"), {
  ssr: false,
  loading: () => <div className="se-map-loading" role="status">Memuat peta cabang…</div>,
});

const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9k=";

export default function LocationPageClient({ location, priceData, updateText }) {
  const [karat, setKarat] = useState(priceData.prices[0]?.karat || "");
  const [weight, setWeight] = useState("");
  const price = priceData.prices.find((item) => item.karat === karat)?.price || 0;
  const estimate = price * (Number(weight) || 0);
  const coords = location.coordinates;
  const otherLocations = locations.filter((item) => item.slug !== location.slug);

  return (
    <>
      <SmoothScroll />
      <NextNavbar />
      <main className="se-location-page">
        <div className="se-location-breadcrumb"><div><Link href="/">Beranda</Link><span>/</span><Link href="/#branches">Cabang</Link><span>/</span><span>{location.name}</span></div></div>
        <section className="se-location-hero">
          <Image src={location.photo} alt={`Foto placeholder cabang Super Emas ${location.name}`} fill priority sizes="100vw" placeholder="blur" blurDataURL={blurDataURL} />
          <div className="se-location-hero-overlay" />
          <div className="se-location-hero-content">
            <p className="se-eyebrow se-eyebrow-light">SUPER EMAS • {location.name.toUpperCase()}</p>
            <h1>{location.seo.h1}</h1>
            <p>{location.content.intro}</p>
            <div className="se-location-hero-meta"><span><FaClock /> Setiap hari, 09.00–20.00</span><a href={location.mapUrl} target="_blank" rel="noopener noreferrer">Petunjuk arah <FaArrowRight /></a></div>
          </div>
        </section>

        <section className="se-location-price">
          <div className="se-location-section-head">
            <div><p className="se-eyebrow"><span>•</span> HARGA BUYBACK {location.name.toUpperCase()}</p><h2>Harga emas<br /><span>hari ini.</span></h2></div>
            <p className="se-price-update"><span className="se-live-dot" /> Pembaruan terakhir<br /><strong>{updateText || "Menunggu data harga"}</strong></p>
          </div>
          <div className="se-location-price-grid">
            <div className="se-location-price-table">
              <div className="se-price-column-head"><span>JENIS EMAS</span><span>HARGA / GRAM</span></div>
              {priceData.prices.length ? priceData.prices.map((item) => (
                <div className="se-price-row" key={item.karat}><span><i className="se-price-mark" />{item.label || item.karat}</span><strong>{formatCurrency(item.price)}</strong></div>
              )) : <p className="se-no-prices">Data harga sedang tidak tersedia. Silakan hubungi kami untuk informasi terkini.</p>}
              <p className="se-price-note">* Harga akhir ditentukan setelah pemeriksaan kondisi emas di cabang.</p>
            </div>
            <aside className="se-calculator">
              <div className="se-calculator-heading"><span className="se-icon-square"><FaMapMarkerAlt /></span><div><p className="se-small-label">PERKIRAAN TRANSAKSI</p><h3>Kalkulator harga</h3></div></div>
              <label className="se-field-label" htmlFor="branch-karat">Jenis emas</label>
              <select id="branch-karat" value={karat} onChange={(event) => setKarat(event.target.value)} disabled={!priceData.prices.length}>
                {priceData.prices.map((item) => <option value={item.karat} key={item.karat}>{item.label || item.karat}</option>)}
              </select>
              <label className="se-field-label" htmlFor="branch-weight">Berat (gram)</label>
              <input id="branch-weight" type="number" min="0" step="0.01" inputMode="decimal" placeholder="Contoh: 5" value={weight} onChange={(event) => setWeight(event.target.value)} />
              <div className="se-estimate"><span>Estimasi harga</span><strong>{formatCurrency(estimate)}</strong><small>Nilai akhir mengikuti hasil pemeriksaan di cabang.</small></div>
            </aside>
          </div>
        </section>

        <section className="se-location-info">
          <div className="se-location-section-head">
            <div><p className="se-eyebrow"><span>•</span> INFORMASI CABANG</p><h2>Temui kami<br /><span>di {location.name}.</span></h2></div>
            <p>{location.content.serviceArea}</p>
          </div>
          <div className="se-location-map-layout">
            <div className="se-location-address">
              <span className="se-icon-square"><FaMapMarkerAlt /></span>
              <h3>{location.fullName}</h3>
              <p>{location.address}</p>
              <span className="se-branch-hours"><FaClock /> Setiap hari, 09.00–20.00</span>
              <a className="se-button se-button-dark" href={location.mapUrl} target="_blank" rel="noopener noreferrer">Petunjuk arah <FaArrowRight /></a>
            </div>
            {coords ? <div className="se-map-frame"><LeafletBranchMap branches={[location]} selectedBranch={location} /><a href={location.mapUrl} target="_blank" rel="noopener noreferrer">Buka Google Maps <FaArrowRight /></a></div> : <div className="se-map-missing"><FaMapMarkerAlt /><p>Koordinat cabang belum tersedia.</p><a href={location.mapUrl} target="_blank" rel="noopener noreferrer">Buka petunjuk di Google Maps <FaArrowRight /></a></div>}
          </div>
        </section>

        <section className="se-location-faq">
          <div><p className="se-eyebrow"><span>•</span> PERTANYAAN</p><h2>Tentang cabang<br /><span>{location.name}.</span></h2></div>
          <div>{location.content.faq.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div>
        </section>

        <section className="se-location-other">
          <div className="se-location-section-head"><div><p className="se-eyebrow"><span>•</span> CABANG LAIN</p><h2>Temukan Super Emas<br /><span>di sekitar Anda.</span></h2></div><Link href="/#branches" className="se-button se-button-dark">Semua cabang <FaArrowRight /></Link></div>
          <div className="se-location-other-list">{otherLocations.map((item) => <Link href={`/harga-emas-hari-ini/${item.slug}`} key={item.slug}><span>{item.name}</span><FaArrowRight /></Link>)}</div>
        </section>
        <section className="se-cta-banner se-location-cta"><div><p className="se-eyebrow se-eyebrow-light">SUPER EMAS {location.name.toUpperCase()}</p><h2>Siap menjual emas<br />Anda hari ini?</h2><p>Kunjungi cabang kami atau hubungi tim Super Emas.</p></div><a className="se-button se-button-gold" href={location.whatsapp} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> Hubungi via WhatsApp</a></section>
      </main>
      <footer className="se-footer"><div className="se-footer-bottom"><Link href="/" className="se-wordmark" aria-label="Super Emas, beranda"><Image src="/images/super-emas-logo.png" alt="Super Emas" width={170} height={36} /></Link><p>© {new Date().getFullYear()} PT Super Emas Indonesia. Hak cipta dilindungi.</p><Link href="/syarat-dan-ketentuan">Syarat & Ketentuan</Link></div></footer>
      <FloatingContact />
    </>
  );
}
