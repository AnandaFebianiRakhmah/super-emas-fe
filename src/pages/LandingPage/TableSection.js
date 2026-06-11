// src/pages/LandingPage/TableSection.js
import React, { useState, useEffect } from "react";
import { GiGoldBar } from "react-icons/gi";
import { FaClock, FaExclamationTriangle } from "react-icons/fa";
import "./TableSection.css";
import PriceCalculator from "./PriceCalculator";
import { getComparisonData } from "../../services/comparisonService";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import axios from "axios";

const API_BASE_URL = "https://super-emas-be.onrender.com/api/showprice";

export default function TableSection() {
  const [priceData, setPriceData] = useState([]);
  const [calculatorPriceData, setCalculatorPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [apiDate, setApiDate] = useState(null);
  const [apiTime, setApiTime] = useState(null);
  
  // Scroll animations
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [tableRef, tableVisible] = useScrollAnimation({ threshold: 0.1 });
  const [calculatorRef, calculatorVisible] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        // Hanya set loading true saat initial load
        if (isInitialLoad) {
          setLoading(true);
        }
        
        // Fetch data untuk display list (API baru)
        const timestamp = new Date().getTime();
        const displayResponse = await axios.get(`${API_BASE_URL}/api/showprice?t=${timestamp}`, {
          timeout: 10000,
        });
        
        console.log("Display API Response:", displayResponse.data);
        
        // Transform data untuk display
        let displayData = [];
        if (Array.isArray(displayResponse.data)) {
          displayData = displayResponse.data.map(item => ({
            karat: item.karat || item.karatage || item.type,
            price: item.price || item.buyback_price || 0
          }));
        } else if (displayResponse.data.data && Array.isArray(displayResponse.data.data)) {
          displayData = displayResponse.data.data.map(item => ({
            karat: item.karat || item.karatage || item.type,
            price: item.price || item.buyback_price || 0
          }));
        }
        
        // Fetch data untuk calculator (API lama)
        const calculatorResponse = await axios.get(`${API_BASE_URL}/api/comparison-data?t=${timestamp}`, {
          timeout: 10000,
        });
        const apiResponse = calculatorResponse.data;
        
        console.log("Calculator API Response:", apiResponse);
        
        // Set date dan time dari API lama
        if (apiResponse.date) setApiDate(apiResponse.date);
        if (apiResponse.latestUpdate) setApiTime(apiResponse.latestUpdate);
        
        // Get calculator data
        const calcData = await getComparisonData();
        
        console.log("Calculator processed data:", calcData);
        
        // Transform calculator data
        const transformedCalcData = calcData.map(item => ({
          karat: item.karat || item.karatage || item.type,
          price: item.price || item.buyback_price || 0
        }));
        
        // Validasi data display
        if (!Array.isArray(displayData) || displayData.length === 0) {
          throw new Error("Data harga tidak tersedia saat ini");
        }
        
        setPriceData(displayData);
        setCalculatorPriceData(transformedCalcData);
        setLastUpdate(new Date());
        setError(null);
        
        // Set initial load false setelah load pertama
        if (isInitialLoad) {
          setIsInitialLoad(false);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching price data:', err);
        
        // Set pesan error yang lebih informatif
        let errorMessage = "Gagal memuat data harga";
        if (err.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        
        setPriceData([]);
        setCalculatorPriceData([]);
        
        if (isInitialLoad) {
          setIsInitialLoad(false);
          setLoading(false);
        }
      }
    };

    fetchPriceData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchPriceData, 30 * 1000);
    
    return () => clearInterval(interval);
  }, [isInitialLoad]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace("IDR", "Rp");
  };

  const getDisplayDate = () => {
    // Gunakan date dari API jika ada, jika tidak gunakan lastUpdate
    if (apiDate) return apiDate;
    
    const date = lastUpdate || new Date();
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getDisplayTime = () => {
    // Gunakan time dari API jika ada, jika tidak gunakan lastUpdate
    if (apiTime) return apiTime;
    
    const date = lastUpdate || new Date();
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="price-section" id="prices">
      <div className="price-container">
        <div 
          ref={headerRef}
          className={`section-header fade-in-down ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="section-title">
            <span className="gradient-text">Daftar Harga</span> Buyback Emas
          </h2>
          <p className="section-subtitle">
            Kami membeli emas Anda dalam kondisi apapun dengan harga tertinggi
          </p>
          {!error && (
            <div className="update-info">
              <span className="update-badge">
                <FaClock /> Pembaruan Terakhir: {getDisplayDate()} • {getDisplayTime()} WIB
              </span>
            </div>
          )}
        </div>

        <div className="price-grid">
          <div 
            ref={tableRef}
            className={`price-table-wrapper fade-in-left ${tableVisible ? 'is-visible' : ''}`}
          >
            <div className="table-card">
              <div className="table-header">
                <h3>Harga Saat Ini</h3>
              </div>
              {loading && isInitialLoad ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Memuat data harga...</p>
                </div>
              ) : error || priceData.length === 0 ? (
                <div className="error-state-inline">
                  <div className="error-content">
                    <FaExclamationTriangle className="error-icon-small" />
                    <div className="error-text">
                      <p className="error-title">
                        {error ? "Gagal memuat data harga" : "Data tidak tersedia"}
                      </p>
                      <p className="error-subtitle">
                        Untuk informasi harga terkini, silakan hubungi kami
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://wa.me/+6285168888700" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-button"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Hubungi Kami
                  </a>
                </div>
              ) : (
                <div className="price-list">
                  {priceData.map((item, index) => (
                    <div 
                      key={index} 
                      className={`price-item stagger-item ${tableVisible ? 'is-visible' : ''} delay-${(index + 1) * 100}`}
                    >
                      <div className="price-item-left">
                        <div className="karat-badge">
                          <GiGoldBar />
                        </div>
                        <div className="karat-info">
                          <span className="karat-label">{item.karat}</span>
                          <span className="karat-sublabel">Emas</span>
                        </div>
                      </div>
                      <div className="price-item-right">
                        <span className="price-value">{formatCurrency(item.price)}</span>
                        <span className="price-unit">/gram</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div 
            ref={calculatorRef}
            className={`fade-in-right ${calculatorVisible ? 'is-visible' : ''}`}
          >
            <PriceCalculator priceData={calculatorPriceData} />
          </div>
        </div>
      </div>
    </section>
  );
}
