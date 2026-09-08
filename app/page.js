import HomeClient from "../components/HomeClient";
import LocationLinks from "../components/LocationLinks";

export const metadata = {
  title: "Harga Emas Hari Ini dan Jual Emas Aman | Super Emas Indonesia",
  description:
    "Cek harga emas hari ini, harga buyback per gram, lokasi cabang Super Emas, dan layanan jual emas yang aman serta transparan.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeClient><LocationLinks /></HomeClient>;
}
