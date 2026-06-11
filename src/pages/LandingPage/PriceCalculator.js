// src/pages/LandingPage/PriceCalculator.js
import { useState, useEffect } from "react";
import { FaCalculator, FaWeight } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import "./PriceCalculator.css";

export default function PriceCalculator() {
  const [priceData, setPriceData] = useState([]);
  const [weight, setWeight] = useState("");
  const [karat, setKarat] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Ambil data dari API
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(
          "https://super-emas-be.onrender.com/api/comparison-data"
        );

        const result = await response.json();

        // Sesuaikan dengan struktur response API
        const formattedData =
          result.data?.map((item) => ({
            karat: item.name,
            price: item.price,
          })) || [];

        setPriceData(formattedData);
      } catch (error) {
        console.error("Gagal mengambil data harga:", error);
      }
    };

    fetchPriceData();
  }, []);

  // Auto calculate
  useEffect(() => {
    if (weight && karat) {
      const cleanWeight = weight
        .toString()
        .replace(/[^\d.,]/g, "")
        .replace(",", ".");

      const weightNum = parseFloat(cleanWeight);

      const selectedPrice = priceData.find(
        (item) => item.karat === karat
      );

      const pricePerGram = selectedPrice
        ? Number(selectedPrice.price)
        : 0;

      if (!isNaN(weightNum) && weightNum > 0 && pricePerGram > 0) {
        setTotalPrice(weightNum * pricePerGram);
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
    })
      .format(value)
      .replace("IDR", "Rp");
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
          <div className="result-price">
            {formatCurrency(totalPrice)}
          </div>
        </div>

        <div className="disclaimer">
          *Harga estimasi dapat berbeda dengan harga transaksi di toko
        </div>
      </div>
    </div>
  );
}