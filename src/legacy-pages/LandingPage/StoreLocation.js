// src/pages/LandingPage/StoreLocation.js
import React from "react";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { locations } from "../../data/locationData";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./StoreLocation.css";

export default function StoreLocation() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="store-location-section" id="location">
      <div className="store-container">
        <div 
          ref={headerRef}
          className={`store-header fade-in-up ${headerVisible ? 'is-visible' : ''}`}
        >
          <span className="store-badge">LOKASI</span>
          <h2 className="store-title">Kunjungi Toko Kami</h2>
        </div>

        <div ref={gridRef} className="store-grid">
          {locations.map((store, index) => (
            <div 
              key={store.slug}
              className={`store-card zoom-in ${gridVisible ? 'is-visible' : ''} delay-${(index + 1) * 100}`}
            >
              <div className="store-card-header">
                <div className="store-icon">
                  <FaStore />
                </div>
                <div className="store-info">
                  <h3 className="store-name">{store.fullName}</h3>
                  <p className="store-subtitle">Lokasi Cabang</p>
                </div>
              </div>

              <p className="store-address">{store.address}</p>

              <a 
                href={store.mapsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="store-button"
              >
                <FaMapMarkerAlt className="button-icon" />
                Cek Lokasi
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
