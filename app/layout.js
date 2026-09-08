import "bootstrap/dist/css/bootstrap.min.css";
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

export const metadata = {
  metadataBase: new URL("https://www.superemas.id"),
  title: {
    default: "Super Emas Indonesia | Harga Emas Hari Ini",
    template: "%s | Super Emas",
  },
  description:
    "Cek harga emas hari ini dan jual emas dengan proses aman, transparan, dan terpercaya di Super Emas.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Super Emas Indonesia",
    title: "Super Emas Indonesia | Harga Emas Hari Ini",
    description:
      "Cek harga emas terbaru dan jual emas dengan proses aman, transparan, dan terpercaya di Super Emas.",
    url: "https://www.superemas.id/",
    images: [{ url: "/images/logo.png", alt: "Super Emas Indonesia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Super Emas Indonesia | Harga Emas Hari Ini",
    description:
      "Cek harga emas terbaru dan jual emas dengan proses aman, transparan, dan terpercaya di Super Emas.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
