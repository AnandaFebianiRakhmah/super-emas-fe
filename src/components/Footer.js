// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaBuilding, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container" id="contact">
      <Container>
        {/* Legal Information Section */}
        <Row className="footer-legal-section">
          <Col md={6} className="legal-item">
            <div className="legal-icon">
              <FaBuilding />
            </div>
            <div className="legal-content">
              <span className="legal-label">NAMA PELAKU USAHA:</span>
              <span className="legal-value">PT SUPER EMAS INDONESIA</span>
            </div>
          </Col>
          <Col md={6} className="legal-item">
            <div className="legal-icon">
              <FaEnvelope />
            </div>
            <div className="legal-content">
              <span className="legal-label">EMAIL:</span>
              <a href="mailto:superemas24@gmail.com" className="legal-value legal-link">
                superemas24@gmail.com
              </a>
            </div>
          </Col>
        </Row>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <small className="footer-text">
              © {new Date().getFullYear()} SUPER EMAS. Hak cipta dilindungi.
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
