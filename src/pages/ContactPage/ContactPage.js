// src/pages/ContactPage/ContactPage.js
import React from "react";
import { FaBuilding, FaMapMarkerAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Informasi Legal Perusahaan</h1>
          <div className="title-divider"></div>
        </div>

        <div className="contact-grid">
          {/* Nama PT */}
          <div className="contact-card">
            <div className="card-icon">
              <FaBuilding />
            </div>
            <div className="card-content">
              <h3 className="card-label">Nama PT</h3>
              <p className="card-value">PT SUPER EMAS INDONESIA</p>
            </div>
          </div>

          {/* Alamat Kantor */}
          <div className="contact-card full-width">
            <div className="card-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="card-content">
              <h3 className="card-label">Alamat Kantor</h3>
              <p className="card-value">
                Prosperity Tower SCBD Lantai 21F, Jalan Jenderal Sudirman Nomor 52-53, 
                Senayan, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="contact-card">
            <div className="card-icon">
              <FaWhatsapp />
            </div>
            <div className="card-content">
              <h3 className="card-label">Nomor WhatsApp</h3>
              <a 
                href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="card-value-link"
              >
                085111355020
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="contact-card">
            <div className="card-icon">
              <FaEnvelope />
            </div>
            <div className="card-content">
              <h3 className="card-label">Email</h3>
              <a 
                href="mailto:superemas24@gmail.com"
                className="card-value-link"
              >
                superemas24@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <p className="footer-note">
            Untuk informasi lebih lanjut, silakan hubungi kami melalui kontak di atas.
          </p>
        </div>
      </div>
    </div>
  );
}
