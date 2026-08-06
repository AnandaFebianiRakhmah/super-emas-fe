// src/pages/LandingPage/GuideSection.js
import React from "react";
import { FaWhatsapp, FaBalanceScale, FaHandshake, FaMoneyBillWave } from "react-icons/fa";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./GuideSection.css";

export default function GuideSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [stepsRef, stepsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.2 });

  const steps = [
    {
      number: "01",
      icon: <FaWhatsapp />,
      title: "Hubungi Kami",
      description: "Hubungi kami melalui WhatsApp atau datang langsung ke toko terdekat"
    },
    {
      number: "02",
      icon: <FaBalanceScale />,
      title: "Timbang & Cek Karat",
      description: "Tim kami akan menimbang dan mengecek karat emas Anda secara profesional"
    },
    {
      number: "03",
      icon: <FaHandshake />,
      title: "Dapatkan Penawaran",
      description: "Kami akan memberikan penawaran harga terbaik sesuai karat dan berat emas"
    },
    {
      number: "04",
      icon: <FaMoneyBillWave />,
      title: "Terima Pembayaran",
      description: "Setelah deal, Anda langsung menerima pembayaran tunai atau transfer"
    }
  ];

  return (
    <section className="guide-section" id="guide">
      <div className="guide-container">
        <div 
          ref={headerRef}
          className={`guide-header fade-in-down ${headerVisible ? 'is-visible' : ''}`}
        >
          <span className="guide-badge">PANDUAN</span>
          <h2 className="guide-title">Cara Jual Emas di Super Emas</h2>
          <p className="guide-subtitle">
            Proses mudah dan cepat dalam 4 langkah sederhana
          </p>
        </div>

        <div ref={stepsRef} className="steps-grid">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`step-card fade-in-up ${stepsVisible ? 'is-visible' : ''} delay-${(index + 1) * 100}`}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="step-arrow">→</div>
              )}
            </div>
          ))}
        </div>

        <div 
          ref={ctaRef}
          className={`guide-cta scale-in ${ctaVisible ? 'is-visible' : ''}`}
        >
          <p className="cta-text">Siap untuk menjual emas Anda?</p>
          <a 
            href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button"
          >
            <FaWhatsapp className="cta-icon" />
            Hubungi Kami Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
