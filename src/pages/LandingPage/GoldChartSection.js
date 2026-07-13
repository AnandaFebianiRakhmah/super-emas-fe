// src/pages/LandingPage/GoldChartSection.js
import React, { useState, useEffect } from "react";
import { FaChartLine, FaClock } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./GoldChartSection.css";

export default function GoldChartSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [chartRef, chartVisible] = useScrollAnimation({ threshold: 0.1 });
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('7days');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock data for gold price chart with realistic fluctuations
    const generateMockData = () => {
      const data = [];
      const basePrice = 2366880; // Base price from goldprice.org in IDR
      const now = new Date();
      
      let daysToGenerate = 7;
      if (timeframe === '30days') daysToGenerate = 30;
      if (timeframe === '90days') daysToGenerate = 90;
      
      for (let i = daysToGenerate; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Generate realistic price fluctuation
        // Gold prices typically fluctuate 0.5% - 3% daily
        const volatilityFactor = Math.random() * 0.03 - 0.015; // -1.5% to +1.5%
        const dailyChange = basePrice * volatilityFactor;
        
        // Add some trend (slight upward or downward movement)
        const trendFactor = Math.sin(i / daysToGenerate * Math.PI) * 0.01;
        const trendAdjustment = basePrice * trendFactor;
        
        // Add random spikes occasionally
        const spikeChance = Math.random();
        const spike = spikeChance > 0.9 ? basePrice * 0.02 : 0; // 10% chance of 2% spike
        
        // Calculate final price
        const price = basePrice + dailyChange + trendAdjustment + spike;
        
        data.push({
          date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
          fullDate: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
          price: Math.round(price),
          priceUSD: Math.round(price / 15500) // Mock USD conversion
        });
      }
      
      return data;
    };

    setLoading(true);
    setTimeout(() => {
      setChartData(generateMockData());
      setLoading(false);
    }, 500);
  }, [timeframe]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace("IDR", "Rp");
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{payload[0].payload.fullDate}</p>
          <p className="tooltip-price">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="tooltip-usd">
            ≈ ${payload[0].payload.priceUSD.toLocaleString('id-ID')} USD
          </p>
        </div>
      );
    }
    return null;
  };

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
            {/* Timeframe Selector */}
            <div className="chart-controls">
              <button 
                className={`timeframe-btn ${timeframe === '7days' ? 'active' : ''}`}
                onClick={() => setTimeframe('7days')}
              >
                7 Hari
              </button>
              <button 
                className={`timeframe-btn ${timeframe === '30days' ? 'active' : ''}`}
                onClick={() => setTimeframe('30days')}
              >
                30 Hari
              </button>
              <button 
                className={`timeframe-btn ${timeframe === '90days' ? 'active' : ''}`}
                onClick={() => setTimeframe('90days')}
              >
                90 Hari
              </button>
            </div>

            {/* Chart */}
            <div className="chart-area">
              {loading ? (
                <div className="chart-loading">
                  <div className="spinner"></div>
                  <p>Memuat data grafik...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffd700" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ffd700" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.1)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#a0a0a0"
                      style={{ fontSize: '0.875rem' }}
                      interval={timeframe === '90days' ? 10 : timeframe === '30days' ? 3 : 1}
                    />
                    <YAxis 
                      stroke="#a0a0a0"
                      style={{ fontSize: '0.875rem' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(2)}M`}
                      domain={['dataMin - 50000', 'dataMax + 50000']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="line"
                      formatter={() => 'Harga Emas (IDR/gram)'}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#ffd700" 
                      strokeWidth={3}
                      dot={{ fill: '#ffd700', r: 3 }}
                      activeDot={{ r: 6, fill: '#ffed4e' }}
                      fill="url(#colorPrice)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Chart Info */}
            <div className="chart-info">
              <div className="info-item">
                <FaClock className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Terakhir Diperbarui</span>
                  <span className="info-value">
                    {new Date().toLocaleString('id-ID', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="chart-footer">
              <p className="chart-note">
                <strong>Catatan:</strong> Data harga emas dunia untuk referensi. 
                Harga aktual dapat berbeda. Untuk informasi terkini, kunjungi{" "}
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
