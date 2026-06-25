// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container" id="contact">
      <Container>
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
