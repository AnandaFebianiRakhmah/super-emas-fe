'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0";
const links = [
  ["Beranda", "/#home"],
  ["Harga Emas", "/#prices"],
  ["Cabang", "/#branches"],
  ["Tentang", "/#about"],
  ["Panduan", "/#guide"],
  ["Blog", "https://blog.superemas.id/", true],
  ["Kontak", "/#contact"],
];

export default function NextNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 24);
      setIsHidden(currentY > 140 && currentY > previousY + 4 && !menuOpen);
      if (currentY < 40 || currentY < previousY - 4) setIsHidden(false);
      previousY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("se-menu-open", menuOpen);
    return () => document.body.classList.remove("se-menu-open");
  }, [menuOpen]);

  return (
    <nav className={`se-navbar${isScrolled ? " is-scrolled" : ""}${isHidden ? " is-hidden" : ""}${menuOpen ? " menu-open" : ""}`} aria-label="Navigasi utama">
      <div className="se-navbar-inner">
        <Link href="/" className="se-wordmark" aria-label="Super Emas, beranda" onClick={() => setMenuOpen(false)}>
          <Image src="/images/super-emas-logo.png" alt="Super Emas" width={190} height={40} priority />
        </Link>
        <div className="se-nav-links">
          {links.map(([label, href, external], index) => <a href={href} key={label} className={index === 0 ? "active" : ""} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{label}</a>)}
        </div>
        <a className="se-nav-cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Konsultasi Sekarang <FaArrowRight aria-hidden="true" /></a>
        <button type="button" className="se-menu-toggle" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
      </div>
      <div className="se-mobile-menu" aria-hidden={!menuOpen}>
        {links.map(([label, href, external], index) => <a href={href} key={label} style={{ "--menu-order": index }} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={() => setMenuOpen(false)}>{label}<FaArrowRight aria-hidden="true" /></a>)}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Konsultasi Sekarang <FaArrowRight aria-hidden="true" /></a>
      </div>
    </nav>
  );
}
