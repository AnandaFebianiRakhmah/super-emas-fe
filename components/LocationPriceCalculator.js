'use client';

import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { formatCurrency } from "../lib/priceApi";

export default function LocationPriceCalculator({ prices }) {
  const [karat, setKarat] = useState(prices[0]?.karat || "");
  const [weight, setWeight] = useState("");
  const price = prices.find((item) => item.karat === karat)?.price || 0;
  const estimate = price * (Number(weight) || 0);

  return (
    <aside className="se-calculator">
      <div className="se-calculator-heading"><span className="se-icon-square"><FaMapMarkerAlt /></span><div><p className="se-small-label">PERKIRAAN TRANSAKSI</p><h3>Kalkulator harga</h3></div></div>
      <label className="se-field-label" htmlFor="branch-karat">Jenis emas</label>
      <select id="branch-karat" value={karat} onChange={(event) => setKarat(event.target.value)} disabled={!prices.length}>
        {prices.map((item) => <option value={item.karat} key={item.karat}>{item.label || item.karat}</option>)}
      </select>
      <label className="se-field-label" htmlFor="branch-weight">Berat (gram)</label>
      <input id="branch-weight" type="number" min="0" step="0.01" inputMode="decimal" placeholder="Contoh: 5" value={weight} onChange={(event) => setWeight(event.target.value)} />
      <div className="se-estimate"><span>Estimasi harga</span><strong>{formatCurrency(estimate)}</strong><small>Nilai akhir mengikuti hasil pemeriksaan di cabang.</small></div>
    </aside>
  );
}
