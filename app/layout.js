import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import "../src/index.css";
import "../src/components/Navbar.css";
import "../src/components/Footer.css";
import "../src/components/FloatingContact.css";
import "../src/legacy-pages/LandingPage/HeroSection.css";
import "../src/legacy-pages/LandingPage/TableSection.css";
import "../src/legacy-pages/LandingPage/PriceCalculator.css";
import "../src/legacy-pages/LandingPage/AboutSection.css";
import "../src/legacy-pages/LandingPage/GuideSection.css";
import "../src/legacy-pages/LandingPage/GoldPriceByLocation.css";
import "../src/legacy-pages/LandingPage/StoreLocation.css";
import "../src/legacy-pages/GoldPriceLocation/GoldPriceLocationPage.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://www.superemas.id"),
  title: {
    default: "Super Emas - Jual Beli Emas Aman, Cepat, Terpercaya | Cek Harga Semua Cabang",
    template: "%s | Super Emas",
  },
  description:
    "Pusat jual beli emas resmi, aman, cepat, dan terpercaya di Indonesia. Dapatkan penawaran harga buyback terbaik dan cek informasi harga emas hari ini di seluruh cabang Super Emas terdekat di kota Anda.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Super Emas Indonesia",
    title: "Super Emas - Jual Beli Emas Aman, Cepat, Terpercaya | Cek Harga Semua Cabang",
    description:
      "Pusat jual beli emas resmi, aman, cepat, dan terpercaya di Indonesia. Dapatkan penawaran harga buyback terbaik dan cek informasi harga emas hari ini di seluruh cabang Super Emas terdekat di kota Anda.",
    url: "https://www.superemas.id/",
    images: [{ url: "/images/logo.png", alt: "Super Emas Indonesia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Super Emas - Jual Beli Emas Aman, Cepat, Terpercaya | Cek Harga Semua Cabang",
    description:
      "Pusat jual beli emas resmi, aman, cepat, dan terpercaya di Indonesia. Dapatkan penawaran harga buyback terbaik dan cek informasi harga emas hari ini di seluruh cabang Super Emas terdekat di kota Anda.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
