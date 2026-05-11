// src/pages/LandingPage/HeroSection.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./HeroSection.css";

export default function HeroSection() {
  const [logoRef, logoVisible] = useScrollAnimation({ threshold: 0.3 });
  const [headingRef, headingVisible] = useScrollAnimation({ threshold: 0.3 });
  const [subtitleRef, subtitleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [buttonRef, buttonVisible] = useScrollAnimation({ threshold: 0.3 });
  return (
    <div id="home" className="hero-container">
      <Container className="hero-content">
        <Row className="justify-content-center">
          <Col md={8}>
            <div 
              ref={logoRef}
              className={`hero-logo-container fade-in-down ${logoVisible ? 'is-visible' : ''}`}
            >
              <img 
                src={require('./logo.png')} 
                alt="Super Emas Logo" 
                className="hero-logo"
              />
            </div>
            <h1 
              ref={headingRef}
              className={`hero-heading fade-in-down delay-100 ${headingVisible ? 'is-visible' : ''}`}
            >
              SUPER EMAS
            </h1>
            <p 
              ref={subtitleRef}
              className={`hero-subtitle fade-in-up delay-200 ${subtitleVisible ? 'is-visible' : ''}`}
            >
              SOLUSI JUAL EMAS{" "}
              <span style={{ color: "var(--gold)" }}>PALING SUPER!</span>
            </p>
            <div className="hero-stats fade-in-up delay-300">
              <span className="stats-icon">✨</span>
              <span className="stats-text">Sudah melayani 1000+ lebih customer</span>
              <span className="stats-icon">✨</span>
            </div>
            <Button
              ref={buttonRef}
              href="#prices"
              variant="warning"
              size="lg"
              className={`hero-button scale-in delay-400 ${buttonVisible ? 'is-visible' : ''}`}            >
              Lihat Harga Emas
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
