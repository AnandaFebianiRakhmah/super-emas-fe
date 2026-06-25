// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaBuilding } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container" id="contact">
      <Container>
        <Row className="footer-content">
          <Col lg={6} md={12} className="footer-left">
            <div className="company-info">
              <div className="company-logo">
                <span className="logo-text">SUPER EMAS</span>
              </div>
              <p className="company-tagline">
                Solusi jual emas paling super dengan harga terbaik
              </p>
            </div>
          </Col>
          
          <Col lg={6} md={12} className="footer-right">
            <div className="legal-info">
              <h5 className="footer-title">Informasi Perusahaan</h5>
              <div className="info-item">
                <FaBuilding className="info-icon" />
                <div className="info-text">
                  <span className="info-label">Nama Pelaku Usaha</span>
                  <span className="info-value">PT SUPER EMAS INDONESIA</span>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div className="info-text">
                  <span className="info-label">Email</span>
                  <a href="mailto:superemas24@gmail.com" className="info-value info-link">
                    superemas24@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="footer-bottom">
          <Col className="text-center">
            <div className="footer-divider"></div>
            <small className="footer-text">
              © {new Date().getFullYear()} PT SUPER EMAS INDONESIA. Hak cipta dilindungi.
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
