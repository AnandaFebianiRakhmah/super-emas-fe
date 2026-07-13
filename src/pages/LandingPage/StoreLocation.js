// src/pages/LandingPage/StoreLocation.js
import React from "react";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./StoreLocation.css";

export default function StoreLocation() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  const stores = [
    {
      name: "Super Emas Tangerang",
      subtitle: "Lokasi Cabang",
      address: "Jl. A. Damyati No.3, RT.006/RW.003, Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118",
      mapUrl: "https://maps.app.goo.gl/VNvLZ3AuAvempESQ9",
    },
    {
      name: "Super Emas Depok",
      subtitle: "Lokasi Cabang",
      address: "Jl. Arif Rahman Hakim, Depok Jaya, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16432",
      mapUrl: "https://maps.app.goo.gl/t5v6xfn43ciddeUF8",
    },
    {
      name: "Super Emas Bintaro",
      subtitle: "Lokasi Cabang",
      address: "Jl. Jombang Raya No.71, Pd. Pucung, Kec. Ciputat, Kota Tangerang Selatan, Banten 15414",
      mapUrl: "https://maps.app.goo.gl/Bes9RNp5s3PjTW5p9",
    },
    {
      name: "Super Emas Cibubur",
      subtitle: "Lokasi Cabang",
      address: "Jl. Transyogi, RT.001/RW.010, Jatisampurna, Kec. Jatisampurna, Kota Bks, Jawa Barat 17435",
      mapUrl: "https://maps.app.goo.gl/GnccP7fz1WLjZSqF7",
    },
    {
      name: "Super Emas Duren Sawit",
      subtitle: "Lokasi Cabang",
      address: "Jl. Pahlawan Revolusi.22 A, RT.2/RW.2, Pd. Bambu, Kec. Duren Sawit, Kota Jakarta Timur, DKI Jakarta 13430",
      mapUrl: "https://maps.app.goo.gl/uQzjL4rA9N6ApsNJ8",
    },
    {
      name: "Super Emas Bekasi",
      subtitle: "Lokasi Cabang",
      address: "Jl. Caman Raya No.60, RT.007/RW.001, Jatibening, Kec. Pd. Gede, Kota Bks, Jawa Barat 17412",
      mapUrl: "https://share.google/mhYXO0kZ56vJ7tTma",
    }
  ];

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
          {stores.map((store, index) => (
            <div 
              key={index} 
              className={`store-card zoom-in ${gridVisible ? 'is-visible' : ''} delay-${(index + 1) * 100}`}
            >
              <div className="store-card-header">
                <div className="store-icon">
                  <FaStore />
                </div>
                <div className="store-info">
                  <h3 className="store-name">{store.name}</h3>
                  <p className="store-subtitle">{store.subtitle}</p>
                </div>
              </div>

              <p className="store-address">{store.address}</p>

              <a 
                href={store.mapUrl} 
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
