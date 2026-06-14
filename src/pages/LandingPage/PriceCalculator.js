// src/pages/LandingPage/PriceCalculator.js

import { useState, useEffect } from "react";
import { FaCalculator, FaWeight, FaMoneyBillWave } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import "./PriceCalculator.css";

export default function PriceCalculator({ priceData = [] }) {
  const [weight, setWeight] = useState("");
  const [karat, setKarat] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Debug: Log priceData setiap kali berubah
  useEffect(() => {
    console.log("PriceCalculator received priceData:", priceData);
    console.log("PriceData length:", priceData?.length || 0);
    console.log("PriceData items:", priceData);
  }, [priceData]);

  // Auto-calculate
  useEffect(() => {
    console.log("=== Calculation Debug ===");
    console.log("Weight:", weight);
    console.log("Karat:", karat);
    console.log("PriceData in calculation:", priceData);
    
    if (weight && karat && Array.isArray(priceData) && priceData.length > 0) {
      const cleanWeight = weight
        .toString()
        .replace(/[^\d.,]/g, "")
        .replace(",", ".");

      const weightNum = parseFloat(cleanWeight);
      console.log("Clean weight:", cleanWeight);
      console.log("Weight number:", weightNum);

      // Ambil harga dari priceData berdasarkan karat yang dipilih
      const selectedPrice = priceData.find(
        (item) => item.karat === karat
      );
      
      console.log("Selected price object:", selectedPrice);

      const pricePerGram = selectedPrice
        ? selectedPrice.price
        : 0;
      
      console.log("Price per gram:", pricePerGram);

      if (
        !isNaN(weightNum) &&
        weightNum > 0 &&
        pricePerGram > 0
      ) {
        // Hitung total: berat × harga per gram
        const total = weightNum * pricePerGram;
        console.log("Total calculated:", total);
        setTotalPrice(total);
      } else {
        console.log("Calculation failed - conditions not met");
        console.log("isNaN(weightNum):", isNaN(weightNum));
        console.log("weightNum > 0:", weightNum > 0);
        console.log("pricePerGram > 0:", pricePerGram > 0);
        setTotalPrice(0);
      }
    } else {
      console.log("Weight, Karat, or PriceData not ready");
      console.log("Has weight:", !!weight);
      console.log("Has karat:", !!karat);
      console.log("Has priceData:", Array.isArray(priceData) && priceData.length > 0);
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
          *Harga estimasi dapat berbeda dengan harga
          transaksi di toko
        </div>
      </div>
    </div>
  );
}