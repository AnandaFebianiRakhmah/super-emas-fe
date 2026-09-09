import Link from "next/link";
import { FaClock, FaHome } from "react-icons/fa";
import Footer from "../../src/components/Footer";
import FloatingContact from "../../src/components/FloatingContact";
import NextNavbar from "../../components/NextNavbar";
import { locations } from "../../src/data/locationData";
import { formatCurrency, getPriceData } from "../../lib/priceApi";
import styles from "./page.module.css";

const SITE_URL = "https://www.superemas.id";
const PAGE_URL = `${SITE_URL}/harga-jual-emas-hari-ini`;

const priceOrder = [
  "Antam 2026 < 5gr",
  "Antam 2026 > 10gr",
  "Antam 2022-2025",
  "Non Antam 9999",
  "K24",
  "K23",
  "K22",
  "K21",
  "K20",
  "K19",
  "K18",
  "K17",
  "K16",
  "K15",
  "K14",
  "K13",
  "K12",
  "K11",
  "K10",
  "K9",
  "K8",
  "K7",
  "K6",
];

const faqs = [
  {
    question: "Berapa harga jual emas hari ini?",
    answer:
      "Harga jual emas mengikuti pembaruan harga buyback Super Emas. Nilai yang diterima customer juga dipengaruhi kadar dan berat emas setelah pemeriksaan.",
  },
  {
    question: "Berapa harga jual emas 24 karat per gram?",
    answer:
      "Harga jual emas 24 karat per gram dapat dilihat pada tabel harga di halaman ini. Harga tersebut merupakan acuan buyback dan harga final ditentukan setelah kadar serta berat diperiksa.",
  },
  {
    question: "Berapa harga jual emas 23 karat per gram?",
    answer:
      "Harga jual emas 23 karat per gram mengikuti data harga buyback Super Emas yang tampil pada tabel dan dapat berubah sesuai pembaruan harga.",
  },
  {
    question: "Berapa harga jual emas 22 karat per gram?",
    answer:
      "Harga jual emas 22 karat per gram tersedia pada tabel harga buyback. Nilai transaksi final tetap mengikuti hasil pemeriksaan langsung.",
  },
  {
    question: "Apakah harga jual emas sama dengan harga buyback?",
    answer:
      "Dalam konteks halaman ini, harga jual emas adalah harga yang diterima customer ketika menjual emas kepada Super Emas. Istilah ini digunakan sebagai harga buyback atau harga pembelian kembali oleh Super Emas.",
  },
  {
    question: "Apakah harga emas bisa berubah setiap hari?",
    answer:
      "Ya. Harga dapat berubah mengikuti kondisi pasar dan pembaruan harga Super Emas. Perhatikan waktu pembaruan yang tercantum pada tabel.",
  },
  {
    question: "Bagaimana cara mengetahui harga emas yang saya miliki?",
    answer:
      "Bawa emas ke cabang Super Emas. Tim akan menimbang dan memeriksa kadar serta kondisi emas sebelum memberikan penawaran.",
  },
  {
    question: "Apakah Super Emas menerima emas rusak atau tanpa surat?",
    answer:
      "Emas rusak, patah, sebelah, atau tanpa surat dapat dibawa untuk diperiksa dan dinilai. Penerimaan serta nilainya tetap bergantung pada hasil pemeriksaan kadar, berat, jenis, dan kondisi emas.",
  },
];

export const metadata = {
  title: { absolute: "Harga Jual Emas Hari Ini | Harga Buyback Emas | Super Emas" },
  description:
    "Cek harga jual emas hari ini per gram di Super Emas. Lihat harga buyback emas berdasarkan kadar, mulai dari emas 24K, 23K, 22K hingga kadar lainnya sebelum menjual emas Anda.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Harga Jual Emas Hari Ini",
        description: metadata.description,
        url: PAGE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Harga Jual Emas Hari Ini", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function sortPrices(prices) {
  return [...prices].sort((first, second) => {
    const firstIndex = priceOrder.findIndex((label) => first.label.toLowerCase() === label.toLowerCase());
    const secondIndex = priceOrder.findIndex((label) => second.label.toLowerCase() === label.toLowerCase());
    return (firstIndex === -1 ? priceOrder.length : firstIndex) - (secondIndex === -1 ? priceOrder.length : secondIndex);
  });
}

export default async function GoldSellPricePage() {
  const priceData = await getPriceData();
  const prices = sortPrices(priceData.prices);
  const updateText = [priceData.date, priceData.latestUpdate && `${priceData.latestUpdate} WIB`]
    .filter(Boolean)
    .join(" ") || "Menunggu pembaruan data";

  return (
    <>
      <StructuredData />
      <NextNavbar />
      <main className={styles.page}>
        <div className={styles.breadcrumb}>
          <div className={styles.container}>
            <Link href="/" className={styles.breadcrumbLink}><FaHome /> Beranda</Link>
            <span aria-hidden="true">&gt;</span>
            <span>Harga Jual Emas Hari Ini</span>
          </div>
        </div>

        <header className={`${styles.container} ${styles.hero}`}>
          <p className={styles.eyebrow}>Informasi harga buyback Super Emas</p>
          <h1>Harga Jual Emas Hari Ini</h1>
          <p>
            Cek harga jual emas hari ini di Super Emas sebelum menjual emas Anda.
            Harga yang ditampilkan merupakan harga buyback atau harga yang menjadi
            acuan saat Super Emas membeli emas dari customer, berdasarkan kadar dan
            berat emas.
          </p>
          <p>
            Harga emas dapat berubah mengikuti kondisi pasar dan pembaruan harga
            Super Emas. Harga final transaksi ditentukan setelah emas ditimbang dan
            kadar emas diperiksa.
          </p>
        </header>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Harga Jual Emas Hari Ini per Gram</h2>
            <div className={styles.update}><FaClock /> Update harga: {updateText}</div>
            {prices.length ? (
              <div className={styles.tableWrap}>
                <table>
                  <caption>Harga buyback emas Super Emas per gram</caption>
                  <thead><tr><th scope="col">Jenis atau kadar emas</th><th scope="col">Harga buyback per gram</th></tr></thead>
                  <tbody>{prices.map((item) => <tr key={item.karat}><th scope="row">{item.label}</th><td>{formatCurrency(item.price)} /gram</td></tr>)}</tbody>
                </table>
              </div>
            ) : (
              <p className={styles.notice}>Data harga sedang tidak tersedia. Silakan cek kembali dalam beberapa saat.</p>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Harga Jual Emas 24 Karat, 23 Karat, dan 22 Karat</h2>
            <p>
              Harga emas 24 karat, 23 karat, dan 22 karat per gram dapat dilihat
              pada tabel sesuai pembaruan data Super Emas. Harga jual emas per gram
              adalah acuan buyback; harga final ditentukan berdasarkan hasil
              pengecekan kadar dan berat emas yang dibawa customer.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Apa yang Dimaksud Harga Jual Emas?</h2>
            <p>
              Dalam konteks halaman ini, “harga jual emas” berarti harga yang
              diterima customer ketika menjual emas kepada Super Emas. Istilah ini
              juga dapat disebut harga buyback, bukan harga ketika Super Emas menjual
              emas kepada customer.
            </p>
            <p>
              Nilai transaksi dapat dipengaruhi oleh kadar emas, berat, jenis emas,
              kondisi barang, hasil pengecekan, dan harga yang berlaku saat transaksi.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Cara Mengetahui Harga Jual Emas Anda</h2>
            <ol className={styles.steps}>
              <li>Cek harga emas terbaru pada tabel di halaman ini.</li>
              <li>Bawa emas ke cabang Super Emas.</li>
              <li>Tim melakukan penimbangan dan pengecekan kadar.</li>
              <li>Customer mendapatkan penawaran berdasarkan hasil pengecekan.</li>
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Jual Emas Rusak, Patah, atau Tanpa Surat</h2>
            <p>
              Memiliki emas yang rusak, patah, sebelah, atau sudah tidak memiliki
              surat? Super Emas menerima berbagai kondisi emas untuk diperiksa dan
              dinilai berdasarkan kadar serta beratnya. Hasil pemeriksaan menentukan
              apakah barang dapat diproses dan berapa nilai transaksinya.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Temukan Harga Emas di Cabang Super Emas</h2>
            <div className={styles.locationLinks}>
              {locations.map((location) => <Link key={location.slug} href={`/harga-emas-hari-ini/${location.slug}`}>Harga Emas {location.name} Hari Ini</Link>)}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <div className={styles.faqList}>
              {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}