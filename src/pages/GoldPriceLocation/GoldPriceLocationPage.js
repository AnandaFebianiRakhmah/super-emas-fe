// src/pages/GoldPriceLocation/GoldPriceLocationPage.js
import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaExclamationTriangle, FaHome } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import axios from "axios";
import { getLocationBySlug } from "../../data/locationData";
import { generateStructuredData } from "../../utils/seoHelpers";
import SEOHead from "../../components/SEOHead";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingContact from "../../components/FloatingContact";
import "./GoldPriceLocationPage.css";

const API_BASE_URL = "https://super-emas-be.onrender.com";

export default function GoldPriceLocationPage() {
  const { location } = useParams();
  const locationData = getLocationBySlug(location);
  
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiDate, setApiDate] = useState(null);
  const [apiTime, setApiTime] = useState(null);

  useEffect(() => {
    if (!locationData) return;

    const fetchPriceData = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await axios.get(`${API_BASE_URL}/api/comparison-data?t=${timestamp}`, {
          timeout: 10000,
        });

        if (!response.data.priceData || typeof response.data.priceData !== 'object') {
          throw new Error("Format data harga tidak valid");
        }

        // Set date dan time dari API
        if (response.data.date) setApiDate(response.data.date);
        if (response.data.latestUpdate) setApiTime(response.data.latestUpdate);

        // Transform data
        const prices = Object.entries(response.data.priceData).map(([karat, priceObj]) => ({
          karat,
          label: String(karat ?? "").replace(/_/g, " ").replace(/\s+/g, " ").trim(),
          price: priceObj.buybackPrice || priceObj.price || 0
        }));

        setPriceData(prices);
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
    const interval = setInterval(fetchPriceData, 30000);
    return () => clearInterval(interval);
  }, [locationData]);

  // 404 handling
  if (!locationData) {
    return <Navigate to="/" replace />;
  }

  const formatCurrency = (value) => {
    if (!value) return "Rp 0";
    return `Rp ${Number(value).toLocaleString("id-ID")}`;
  };

  const getDisplayDate = () => {
    if (apiDate) return apiDate;
    return new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getDisplayTime = () => {
    if (apiTime) return apiTime;
    return new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://superemas.id';
  const canonicalUrl = `${siteUrl}/harga-emas-hari-ini/${locationData.slug}`;
  const structuredData = generateStructuredData(locationData);

  return (
    <>
      <SEOHead
        title={locationData.seo.title}
        description={locationData.seo.metaDescription}
        canonical={canonicalUrl}
        ogImage={locationData.seo.ogImage}
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <div className="location-page">
        {/* Breadcrumb */}
        <div className="location-breadcrumb">
          <div className="container">
            <Link to="/" className="breadcrumb-link">
              <FaHome /> Home
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Harga Emas {locationData.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="location-hero">
          <div className="container">
            <h1 className="location-h1">{locationData.seo.h1}</h1>
            <p className="location-intro">
              Lihat informasi harga emas di cabang Super Emas terdekat sebelum melakukan transaksi. Super Emas menerima berbagai jenis emas, mulai dari Logam Mulia hingga perhiasan, dalam kondisi apa pun—termasuk rusak, patah, sebelah, bahkan tanpa surat. Kami bantu proses jual emas dengan cepat, aman, dan transparan.
            </p>
          </div>
        </section>

        {/* Price Section */}
        <section className="location-price-section">
          <div className="container">
            <div className="price-header">
              <h2>Daftar Harga Emas Terkini</h2>
              {!error && !loading && (
                <div className="price-update-badge">
                  <FaClock /> Update: {getDisplayDate()} • {getDisplayTime()} WIB
                </div>
              )}
            </div>

            {loading ? (
              <div className="price-loading">
                <div className="spinner"></div>
                <p>Memuat data harga...</p>
              </div>
            ) : error || priceData.length === 0 ? (
              <div className="price-error">
                <FaExclamationTriangle />
                <p>Data harga sedang tidak tersedia</p>
                <a 
                  href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-wa-btn"
                >
                  Hubungi Kami via WhatsApp
                </a>
              </div>
            ) : (
              <div className="price-table-card">
                <div className="price-table">
                  {priceData.map((item, index) => (
                    <div key={index} className="price-row">
                      <div className="price-karat">
                        <GiGoldBar className="gold-icon" />
                        <span className="karat-label">{item.label || item.karat}</span>
                      </div>
                      <div className="price-amount">
                        <span className="price-value">{formatCurrency(item.price)}</span>
                        <span className="price-unit">/gram</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="price-note">
                  * Cek harga emas terbaru di cabang Super Emas terdekat
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Location Info Section */}
        <section className="location-info-section">
          <div className="container">
            <h2>Informasi Cabang {locationData.name}</h2>
            <div className="location-info-card">
              <div className="location-detail">
                <FaMapMarkerAlt className="location-icon" />
                <div>
                  <h3>{locationData.fullName}</h3>
                  <p>{locationData.address}</p>
                  <p className="service-area">{locationData.content.serviceArea}</p>
                </div>
              </div>
              <a
                href={locationData.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="maps-button"
              >
                <FaMapMarkerAlt /> Lihat di Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="location-faq-section">
          <div className="container">
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <div className="faq-list">
              {locationData.content.faq.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="location-cta-section">
          <div className="container">
            <h2>Siap Menjual Emas Anda?</h2>
            <p>Hubungi kami atau kunjungi cabang {locationData.name} untuk transaksi emas Anda</p>
            <div className="cta-buttons">
              <a
                href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-primary"
              >
                Hubungi via WhatsApp
              </a>
              <Link to="/#location" className="cta-btn cta-secondary">
                Lihat Cabang Lainnya
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <FloatingContact />
    </>
  );
}
