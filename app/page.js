import HomeClient from "../components/HomeClient";
import LocationLinks from "../components/LocationLinks";
import { getPriceData } from "../lib/priceApi";

export const metadata = {
  title: "Harga Emas Hari Ini dan Jual Emas Aman | Super Emas Indonesia",
  description:
    "Cek harga emas hari ini, harga buyback per gram, lokasi cabang Super Emas, dan layanan jual emas yang aman serta transparan.",
  alternates: { canonical: "/" },
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
