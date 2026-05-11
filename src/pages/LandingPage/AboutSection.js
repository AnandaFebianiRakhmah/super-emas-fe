// src/pages/LandingPage/AboutSection.js
import React from "react";
import { FaBolt, FaLock, FaGem, FaMapMarkerAlt } from "react-icons/fa";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./AboutSection.css";

export default function AboutSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  const features = [
    {
      icon: <FaBolt />,
      title: "Proses Cepat",
      description: "Transaksi selesai dalam hitungan menit"
    },
    {
      icon: <FaLock />,
      title: "Aman & Terpercaya",
      description: "Dijamin aman dengan sertifikat resmi"
    },
    {
      icon: <FaGem />,
      title: "Harga Terbaik",
      description: "Harga buyback tertinggi di pasaran"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Lokasi Strategis",
      description: "Tersebar di berbagai kota besar"
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div 
          ref={headerRef}
          className={`about-header fade-in-up ${headerVisible ? 'is-visible' : ''}`}
        >
          <span className="about-badge">TENTANG KAMI</span>
          <h2 className="about-title">
            Solusi Jual Emas <span className="gradient-text">Paling Super!</span>
          </h2>
          <p className="about-description">
            Super Emas adalah platform terpercaya untuk menjual emas Anda dengan harga terbaik. 
            Kami memberikan layanan yang cepat, aman, dan transparan untuk semua jenis emas.
          </p>
        </div>

        <div ref={gridRef} className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card scale-in ${gridVisible ? 'is-visible' : ''} delay-${(index + 1) * 100}`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
