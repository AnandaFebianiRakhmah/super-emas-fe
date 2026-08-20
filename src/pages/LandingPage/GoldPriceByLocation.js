// src/pages/LandingPage/GoldPriceByLocation.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import axios from "axios";
import { locations } from "../../data/locationData";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./GoldPriceByLocation.css";

const API_BASE_URL = "https://super-emas-be.onrender.com";

export default function GoldPriceByLocation() {
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [apiDate, setApiDate] = useState(null);
  const [apiTime, setApiTime] = useState(null);
  
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const timestamp = new Date().getTime();
        
        // Fetch dari showprice API (3 karat untuk display)
        const response = await axios.get(`${API_BASE_URL}/api/showprice?t=${timestamp}`, {
          timeout: 10000,
        });
        
        if (!response.data.priceData || typeof response.data.priceData !== 'object') {
          throw new Error("Format data harga tidak valid");
        }
        
        // Transform data
        const prices = Object.entries(response.data.priceData).map(([karat, price]) => ({
          karat,
          price
        }));
        
        setPriceData(prices);
        setLastUpdate(new Date());
        
        // Set date dan time jika ada
        if (response.data.date) setApiDate(response.data.date);
        if (response.data.latestUpdate) setApiTime(response.data.latestUpdate);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching price data:', err);
        setError(err.message);
        setPriceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
    const interval = setInterval(fetchPriceData, 30000); // Refresh setiap 30 detik
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) => {
    if (!value) return "Rp 0";
    return `Rp ${Number(value).toLocaleString("id-ID")}`;
  };

  const getDisplayDate = () => {
    if (apiDate) return apiDate;
    const date = lastUpdate || new Date();
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getDisplayTime = () => {
    if (apiTime) return apiTime;
    const date = lastUpdate || new Date();
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
          {!error && !loading && (
            <div className="gpl-update-info">
              <FaClock /> Update: {getDisplayDate()} • {getDisplayTime()} WIB
            </div>
          )}
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

              {loading ? (
                <div className="gpl-loading">
                  <div className="spinner-small"></div>
                  <p>Memuat harga...</p>
                </div>
              ) : (error || priceData.length === 0) ? null : (
                <div className="gpl-price-list">
                  {priceData.map((item, idx) => (
                    <div key={idx} className="gpl-price-item">
                      <div className="gpl-price-karat">
                        <GiGoldBar className="gold-icon-small" />
                        <span>{item.karat}</span>
                      </div>
                      <div className="gpl-price-value">
                        {formatCurrency(item.price)}
                        <span className="gpl-price-unit">/gram</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="gpl-button-wrapper">
                <Link 
                  to={`/harga-emas-${location.slug}`}
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
