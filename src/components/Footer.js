// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaClock, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="footer-container" id="contact">
      <Container>
        <Row className="footer-main">
          {/* Logo & Tagline */}
          <Col lg={4} md={6} className="footer-column">
            <div className="footer-brand">
              <img 
                src="/images/logo.png" 
                alt="Super Emas Logo" 
                className="footer-logo"
              />
              <p className="footer-tagline">
                Tempat Jual Emas Terbaik Di Indonesia
              </p>
            </div>
          </Col>

          {/* Navigasi */}
          <Col lg={3} md={6} className="footer-column">
            <h5 className="footer-title">NAVIGASI</h5>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Beranda</a></li>
              <li><a href="#prices" onClick={(e) => { e.preventDefault(); scrollToSection('prices'); }}>Harga Emas Hari Ini</a></li>
              <li><a href="#prices" onClick={(e) => { e.preventDefault(); scrollToSection('prices'); }}>Harga Jual Emas</a></li>
              <li><a href="#guide" onClick={(e) => { e.preventDefault(); scrollToSection('guide'); }}>Tentang Kami</a></li>
              <li><a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }}>Lokasi Toko</a></li>
              <li><a href="#guide" onClick={(e) => { e.preventDefault(); scrollToSection('guide'); }}>Panduan</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Kontak</a></li>
            </ul>
          </Col>

          {/* Jam Operasional */}
          <Col lg={2} md={6} className="footer-column">
            <h5 className="footer-title">JAM OPERASIONAL</h5>
            <div className="footer-hours">
              <FaClock className="footer-icon" />
              <span>Senin - Minggu</span>
              <span className="hours-time">09.00 - 18.00</span>
            </div>
          </Col>

          {/* Kontak */}
          <Col lg={3} md={6} className="footer-column">
            <h5 className="footer-title">KONTAK KAMI</h5>
            <div className="footer-contact">
              <a 
                href="https://api.whatsapp.com/send/?phone=%2B6285111205552&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-item"
              >
                <FaWhatsapp className="footer-icon" />
                <span>WhatsApp: 6285111205552</span>
              </a>
              <a 
                href="#location" 
                onClick={(e) => { e.preventDefault(); scrollToSection('location'); }}
                className="contact-item"
              >
                <FaMapMarkerAlt className="footer-icon" />
                <span>Lokasi Kami</span>
              </a>
            </div>
          </Col>
        </Row>

        {/* Legal Info Section */}
        <Row className="footer-legal">
          <Col md={6} className="legal-item">
            <span className="legal-label">Nama Pelaku Usaha:</span>
            <span className="legal-value">PT SUPER EMAS INDONESIA</span>
          </Col>
          <Col md={6} className="legal-item">
            <span className="legal-label">Email:</span>
            <a href="mailto:superemas24@gmail.com" className="legal-value legal-link">
              superemas24@gmail.com
            </a>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="footer-bottom">
          <Col className="text-center">
            <div className="footer-divider"></div>
            <small className="footer-copyright">
              © {new Date().getFullYear()} PT SUPER EMAS INDONESIA. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
