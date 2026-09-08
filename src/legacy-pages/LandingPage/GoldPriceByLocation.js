// src/pages/LandingPage/GoldPriceByLocation.js
import React from "react";
import { Link } from "react-router-dom";
import { locations } from "../../data/locationData";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./GoldPriceByLocation.css";

export default function GoldPriceByLocation() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="gold-price-location-section" id="harga-cabang">
      <div className="gpl-container">
        <div 
          ref={headerRef}
          className={`gpl-header fade-in-up ${headerVisible ? 'is-visible' : ''}`}
        >
          <span className="gpl-badge">INFORMASI HARGA</span>
          <h2 className="gpl-title">Harga Emas per Cabang</h2>
          <p className="gpl-subtitle">
            Temukan informasi harga emas terbaru di cabang Super Emas pilihan Anda
          </p>
        </div>

        <div ref={gridRef} className="gpl-grid">
          {locations.map((location, index) => (
            <div 
              key={location.id}
              className={`gpl-card zoom-in ${gridVisible ? 'is-visible' : ''} delay-${(index + 1) * 100}`}
            >
              <h3 className="gpl-card-title">Harga Emas {location.name} Hari Ini</h3>
              <p className="gpl-card-description">
                Lihat informasi harga emas terbaru hari ini sebelum menjual emas Anda di Super Emas {location.name}
              </p>

              <div className="gpl-button-wrapper">
                <Link 
                  to={`/harga-emas-hari-ini/${location.slug}`}
                  className="gpl-button"
                >
                  Lihat Harga
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
