// src/pages/LandingPage/PriceCalculator.js

import { useState, useEffect } from "react";
import { FaCalculator, FaWeight, FaMoneyBillWave } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import "./PriceCalculator.css";
import axios from "axios";

const API_BASE_URL = "https://super-emas-be.onrender.com";

export default function PriceCalculator() {
  const [weight, setWeight] = useState("");
  const [karat, setKarat] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API comparison-data
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await axios.get(`${API_BASE_URL}/api/comparison-data?t=${timestamp}`, {
          timeout: 10000,
        });
        
        console.log("PriceCalculator API Response:", response.data);
        
        // Transform data dari struktur API
        let calcData = [];
        
        if (response.data.priceData && typeof response.data.priceData === 'object') {
          // Transform object ke array
          // Structure: { "K23": { "buyPrice": 0, "buybackPrice": 1963000 }, ... }
          calcData = Object.entries(response.data.priceData).map(([key, value]) => ({
            karat: key,
            price: value.buybackPrice || value.price || 0
          }));
        } else if (Array.isArray(response.data)) {
          calcData = response.data.map(item => ({
            karat: item.karat || item.karatage || item.type,
            price: item.buybackPrice || item.price || item.buyback_price || 0
          }));
        } else if (response.data.data && Array.isArray(response.data.data)) {
          calcData = response.data.data.map(item => ({
            karat: item.karat || item.karatage || item.type,
            price: item.buybackPrice || item.price || item.buyback_price || 0
          }));
        }
        
        console.log("Transformed calculator data:", calcData);
        
        setPriceData(calcData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching calculator data:", error);
        setPriceData([]);
        setLoading(false);
      }
    };

    fetchPriceData();
    
    // Refresh setiap 30 detik
    const interval = setInterval(fetchPriceData, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-calculate
  useEffect(() => {
    console.log("=== Calculation Debug ===");
    console.log("Weight:", weight);
    console.log("Karat:", karat);
    console.log("PriceData:", priceData);
    
    if (weight && karat && priceData.length > 0) {
      // Clean weight input
      const cleanWeight = weight
        .toString()
        .replace(/[^\d.,]/g, "")
        .replace(",", ".");

      const weightNum = parseFloat(cleanWeight);
      console.log("Weight number:", weightNum);

      // Cari harga berdasarkan karat yang dipilih
      const selectedPrice = priceData.find(item => item.karat === karat);
      console.log("Selected price object:", selectedPrice);

      if (selectedPrice && selectedPrice.price) {
        const pricePerGram = selectedPrice.price;
        console.log("Price per gram:", pricePerGram);

        if (!isNaN(weightNum) && weightNum > 0 && pricePerGram > 0) {
          // Hitung: berat × harga per gram
          const total = weightNum * pricePerGram;
          console.log("Total calculated:", total);
          setTotalPrice(total);
        } else {
          console.log("Invalid calculation inputs");
          setTotalPrice(0);
        }
      } else {
        console.log("Selected price not found or invalid");
        setTotalPrice(0);
      }
    } else {
      console.log("Missing required data");
      console.log("Has weight:", !!weight);
      console.log("Has karat:", !!karat);
      console.log("PriceData length:", priceData.length);
      setTotalPrice(0);
    }
  }, [weight, karat, priceData]);

  const formatCurrency = (value) => {
    if (value === 0) return "Rp 0";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace("IDR", "Rp");
  };

  // Get price per gram for selected karat
  const getSelectedPrice = () => {
    if (!karat) return "Rp 0";

    const selectedPrice = priceData.find(
      (item) => item.karat === karat
    );

    return selectedPrice
      ? formatCurrency(selectedPrice.price)
      : "Rp 0";
  };

  return (
    <div className="calculator-card">
      <div className="calculator-header">
        <FaCalculator className="calculator-icon" />
        <h3 className="calculator-title">
          Kalkulator Harga
        </h3>
      </div>

      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="karat">
            <GiGoldBar className="label-icon" /> Karat
          </label>

          <select
            id="karat"
            className="form-control"
            value={karat}
            onChange={(e) => setKarat(e.target.value)}
          >
            <option value="">Pilih karat</option>
            {priceData && priceData.length > 0 ? (
              priceData.map((item, index) => (
                <option key={index} value={item.karat}>
                  {item.karat}
                </option>
              ))
            ) : (
              <option value="" disabled>Memuat data...</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="weight">
            <FaWeight className="label-icon" />
            {" "}Berat (gram)
          </label>

          <input
            type="text"
            id="weight"
            className="form-control"
            placeholder="Masukkan berat"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="result-box">
          <div className="result-label">
            Estimasi Harga
          </div>

          <div className="result-price">
            {formatCurrency(totalPrice)}
          </div>
        </div>

        <div className="disclaimer">
          *Harga estimasi mengikuti estimasi harga pada hari ini tanggal 15 Juni 2026
        </div>
      </div>
    </div>
  );
}