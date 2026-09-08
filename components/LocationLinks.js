import Link from "next/link";
import { locations } from "../src/data/locationData";

export default function LocationLinks() {
  return (
    <section className="gold-price-location-section" id="harga-cabang">
      <div className="gpl-container">
        <div className="gpl-header is-visible">
          <span className="gpl-badge">INFORMASI HARGA</span>
          <h2 className="gpl-title">Harga Emas per Cabang</h2>
          <p className="gpl-subtitle">Temukan informasi harga emas terbaru di cabang Super Emas pilihan Anda</p>
        </div>
        <div className="gpl-grid">
          {locations.map((location) => (
            <div key={location.id} className="gpl-card is-visible">
              <h3 className="gpl-card-title">Harga Emas {location.name} Hari Ini</h3>
              <p className="gpl-card-description">Lihat informasi harga emas terbaru hari ini sebelum menjual emas Anda di Super Emas {location.name}</p>
              <div className="gpl-button-wrapper">
                <Link href={`/harga-emas-hari-ini/${location.slug}`} className="gpl-button">Lihat Harga</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
