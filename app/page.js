import HomeClient from "../components/HomeClient";
import LocationLinks from "../components/LocationLinks";
import { getPriceData } from "../lib/priceApi";

export const metadata = {
  title: {
    absolute: "Super Emas - Jual Beli Emas Aman, Cepat, Terpercaya | Cek Harga Semua Cabang",
  },
  description:
    "Pusat jual beli emas resmi, aman, cepat, dan terpercaya di Indonesia. Dapatkan penawaran harga buyback terbaik dan cek informasi harga emas hari ini di seluruh cabang Super Emas terdekat di kota Anda.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Super Emas - Jual Beli Emas Aman, Cepat, Terpercaya | Cek Harga Semua Cabang",
    description:
      "Pusat jual beli emas resmi, aman, cepat, dan terpercaya di Indonesia. Dapatkan penawaran harga buyback terbaik dan cek informasi harga emas hari ini di seluruh cabang Super Emas terdekat di kota Anda.",
    url: "https://www.superemas.id/",
  },
  twitter: {
    title: "Super Emas - Jual Beli Emas Aman, Cepat, Terpercaya | Cek Harga Semua Cabang",
    description:
      "Pusat jual beli emas resmi, aman, cepat, dan terpercaya di Indonesia. Dapatkan penawaran harga buyback terbaik dan cek informasi harga emas hari ini di seluruh cabang Super Emas terdekat di kota Anda.",
  },
};

export default async function HomePage() {
  const priceData = await getPriceData();

  return (
    <HomeClient
      initialPriceData={priceData.prices}
      initialPriceDate={priceData.date}
      initialPriceTime={priceData.latestUpdate}
    >
      <LocationLinks />
    </HomeClient>
  );
}
