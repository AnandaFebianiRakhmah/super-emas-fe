// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PHONE_DISPLAY, PHONE_E164 } from "../lib/contact";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container" id="contact">
      <Container>
        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <a href="/harga-jual-emas-hari-ini" className="footer-terms-link">
              Harga Jual Emas Hari Ini
            </a>
            <a href={`tel:${PHONE_E164}`} className="footer-terms-link">
              {PHONE_DISPLAY}
            </a>
            <a href="/syarat-dan-ketentuan" className="footer-terms-link">
              Syarat &amp; Ketentuan
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
