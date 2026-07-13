// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container" id="contact">
      <Container>
        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <small className="footer-text">
              © 2025 PT SUPER EMAS INDONESIA. Hak cipta dilindungi.
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
