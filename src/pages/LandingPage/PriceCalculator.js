// src/pages/LandingPage/PriceCalculator.js
import { useState, useEffect } from "react";
import { FaCalculator, FaWeight, FaMoneyBillWave } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import "./PriceCalculator.css";

export default function PriceCalculator({ priceData }) {
  const [weight, setWeight] = useState("");
  const [karat, setKarat] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Auto-calculate
  useEffect(() => {
    if (weight && karat) {
      const cleanWeight = weight.toString().replace(/[^\d.,]/g, '').replace(',', '.');
      const weightNum = parseFloat(cleanWeight);
      
      // Ambil harga dari priceData berdasarkan karat yang dipilih
      const selectedPrice = priceData.find(item => item.karat === karat);
      const pricePerGram = selectedPrice ? selectedPrice.price : 0;

      if (!isNaN(weightNum) && weightNum > 0 && pricePerGram > 0) {
        // Hitung total: berat × harga per gram
        // Tidak perlu dikali faktor karat karena harga sudah final
        const total = weightNum * pricePerGram;
        setTotalPrice(total);
      } else {
        setTotalPrice(0);
      }
    } else {
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
    }).format(value).replace("IDR", "Rp");
  };

  // Get price per gram for selected karat
  const getSelectedPrice = () => {
    if (!karat) return "Rp 0";
    const selectedPrice = priceData.find(item => item.karat === karat);
    return selectedPrice ? formatCurrency(selectedPrice.price) : "Rp 0";
  };

  return (
    <div className="calculator-card">
      <div className="calculator-header">
        <FaCalculator className="calculator-icon" />
        <h3 className="calculator-title">Kalkulator Harga</h3>
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
            {priceData.map((item, index) => (
              <option key={index} value={item.karat}>
                {item.karat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priceDisplay">
            <FaMoneyBillWave className="label-icon" /> Harga per Gram
          </label>
          <div className="price-display">
            {getSelectedPrice()}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="weight">
            <FaWeight className="label-icon" /> Berat (gram)
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
          <div className="result-label">Estimasi Harga</div>
          <div className="result-price">{formatCurrency(totalPrice)}</div>
        </div>

        <div className="disclaimer">
          *Harga dapat berubah sewaktu-waktu mengikuti harga pasar
        </div>
      </div>
    </div>
  );
}
