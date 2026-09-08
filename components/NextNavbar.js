'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "../src/components/Navbar.css";

export default function NextNavbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top navbar-custom">
      <div className="container-fluid px-4">
        <Link href="/" className="navbar-brand">SUPER EMAS</Link>
        <div className="navbar-controls">
          <button className="theme-toggle-navbar" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <FaSun className="theme-icon-navbar" /> : <FaMoon className="theme-icon-navbar" />}
          </button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar-nav" aria-controls="main-navbar-nav" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="main-navbar-nav">
          <div className="navbar-nav ms-auto align-items-center">
            <a href="/#home" className="nav-link">Beranda</a>
            <a href="/#prices" className="nav-link">Harga Emas</a>
            <a href="/#harga-cabang" className="nav-link">Informasi Harga</a>
            <a href="/#about" className="nav-link">Tentang</a>
            <a href="/#location" className="nav-link">Lokasi</a>
            <a href="/#guide" className="nav-link">Panduan</a>
            <a href="/#contact" className="nav-link">Kontak</a>
            <a href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="nav-link-cta">Jual Sekarang</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
