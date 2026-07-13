// src/pages/LandingPage/GoldChartSection.js
import React, { useEffect } from "react";
import { FaChartLine } from "react-icons/fa";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./GoldChartSection.css";

export default function GoldChartSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [chartRef, chartVisible] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    // Load GoldPrice.org widget script
    const script = document.createElement('script');
    script.src = 'https://www.goldprice.org/widget-gold-price.php?lang=id';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="gold-chart-section" id="chart">
      <div className="chart-container">
        <div 
          ref={headerRef}
          className={`section-header fade-in-down ${headerVisible ? 'is-visible' : ''}`}
        >
          <span className="section-badge">
            <FaChartLine /> GRAFIK HARGA
          </span>
          <h2 className="section-title">
            Grafik <span className="gradient-text">Harga Emas Dunia</span>
          </h2>
          <p className="section-subtitle">
            Pantau pergerakan harga emas dunia secara real-time untuk keputusan investasi terbaik
          </p>
        </div>

        <div 
          ref={chartRef}
          className={`chart-wrapper fade-in-up ${chartVisible ? 'is-visible' : ''}`}
        >
          <div className="chart-card">
            {/* GoldPrice.org Widget */}
            <div id="goldprice-widget" className="widget-container">
              <iframe 
                src="https://www.goldprice.org/id/gold-price-chart.html"
                title="Grafik Harga Emas Dunia"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="no"
                className="gold-chart-iframe"
              />
            </div>

            <div className="chart-footer">
              <p className="chart-note">
                <strong>Catatan:</strong> Data harga emas dunia diperbarui secara real-time dari{" "}
                <a 
                  href="https://goldprice.org/id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="chart-link"
                >
                  GoldPrice.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
