import Link from "next/link";
import NextNavbar from "../../components/NextNavbar";
import Footer from "../../src/components/Footer";
import styles from "./terms.module.css";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0";

export const metadata = {
  title: { absolute: "Syarat & Ketentuan | Super Emas Indonesia" },
  description:
    "Baca Syarat & Ketentuan Super Emas Indonesia terkait penggunaan layanan, pemeriksaan emas, harga, transaksi, pembayaran, dan ketentuan lainnya.",
  alternates: {
    canonical: "https://superemas.id/syarat-dan-ketentuan",
  },
};

const sections = [
  {
    title: "Ketentuan Umum",
    content: (
      <>
        <p>
          Syarat dan Ketentuan ini mengatur penggunaan website, layanan, dan
          transaksi jual beli emas dengan Super Emas Indonesia. Ketentuan ini
          berlaku bagi setiap orang yang mengakses informasi, menghubungi kanal
          resmi, atau menggunakan layanan Super Emas.
        </p>
        <p>
          Dengan menggunakan website atau melanjutkan proses layanan, pelanggan
          dianggap telah membaca, memahami, dan menyetujui ketentuan yang
          berlaku. Pelanggan yang tidak menyetujui ketentuan ini dapat memilih
          untuk tidak melanjutkan penggunaan layanan atau transaksi.
        </p>
      </>
    ),
  },
  {
    title: "Definisi",
    content: (
      <ul>
        <li><strong>Super Emas</strong> berarti PT Super Emas Indonesia beserta kanal dan cabang layanan resminya.</li>
        <li><strong>Customer atau Pelanggan</strong> berarti setiap orang yang menggunakan website, menghubungi Super Emas, atau melakukan transaksi.</li>
        <li><strong>Emas</strong> berarti emas perhiasan atau barang berbahan emas yang dibawa pelanggan untuk diperiksa dan dinilai.</li>
        <li><strong>Logam Mulia</strong> berarti produk emas batangan atau bentuk logam mulia lain yang dapat diperiksa sesuai prosedur.</li>
        <li><strong>Transaksi</strong> berarti proses jual beli emas yang disetujui setelah pemeriksaan dan verifikasi selesai.</li>
        <li><strong>Harga Acuan</strong> berarti informasi harga yang ditampilkan sebagai referensi awal.</li>
        <li><strong>Harga Final</strong> berarti nilai transaksi yang disampaikan setelah emas diperiksa secara langsung.</li>
        <li><strong>Cabang Super Emas</strong> berarti lokasi layanan Super Emas yang tercantum atau dikonfirmasi melalui kanal resmi.</li>
      </ul>
    ),
  },
  {
    title: "Ketentuan Pelanggan",
    content: (
      <>
        <p>Pelanggan wajib:</p>
        <ul>
          <li>memberikan data dan informasi yang benar, lengkap, serta dapat diverifikasi;</li>
          <li>memberikan informasi yang diperlukan untuk pemeriksaan dan penyelesaian transaksi;</li>
          <li>memastikan memiliki hak atau kewenangan yang sah atas emas yang dijual; dan</li>
          <li>mengikuti prosedur pemeriksaan, verifikasi, dan transaksi yang berlaku di Super Emas.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Harga Emas",
    content: (
      <>
        <p>
          Harga emas yang ditampilkan pada website merupakan harga acuan dan
          dapat berubah sewaktu-waktu mengikuti kondisi pasar serta kebijakan
          operasional. Harga tersebut bukan jaminan nilai transaksi final.
        </p>
        <p>
          Nilai transaksi final ditentukan setelah emas diperiksa secara
          langsung dengan mempertimbangkan kadar, berat, jenis, kondisi, dan
          keasliannya. Simulasi harga, kalkulator, maupun informasi awal melalui
          media komunikasi tidak otomatis menjadi penawaran final yang mengikat.
        </p>
        <p className={styles.emphasis}>
          Harga final akan disampaikan kepada pelanggan setelah proses
          pemeriksaan emas dilakukan.
        </p>
      </>
    ),
  },
  {
    title: "Pemeriksaan dan Penilaian Emas",
    content: (
      <>
        <p>
          Emas diperiksa secara langsung di lokasi layanan. Pemeriksaan dapat
          meliputi penimbangan berat, pemeriksaan kadar dengan alat atau metode
          yang tersedia, pengecekan keaslian, serta penilaian kondisi fisik.
        </p>
        <p>
          Hasil pemeriksaan menjadi dasar penentuan nilai transaksi. Super Emas
          tidak menjamin seluruh barang akan diterima; keputusan bergantung pada
          hasil pemeriksaan dan verifikasi yang dilakukan.
        </p>
      </>
    ),
  },
  {
    title: "Transaksi Jual Emas",
    content: (
      <ol>
        <li>Pelanggan membawa emas ke cabang atau lokasi layanan Super Emas.</li>
        <li>Emas diperiksa dan ditimbang sesuai prosedur.</li>
        <li>Super Emas menyampaikan hasil pemeriksaan dan nilai transaksi.</li>
        <li>Pelanggan dapat menyetujui atau menolak penawaran tersebut.</li>
        <li>Jika disetujui, transaksi diproses sesuai verifikasi yang diperlukan.</li>
        <li>Pembayaran dilakukan melalui metode resmi yang ditentukan Super Emas.</li>
      </ol>
    ),
  },
  {
    title: "Kepemilikan dan Asal-Usul Emas",
    content: (
      <p>
        Pelanggan bertanggung jawab memastikan emas yang dijual merupakan
        miliknya atau berada dalam kewenangan yang sah, tidak berasal dari tindak
        pidana, tidak sedang dalam sengketa, dan tidak digunakan untuk tujuan
        yang melanggar hukum. Super Emas berhak menolak atau menghentikan
        transaksi apabila terdapat indikasi masalah terkait kepemilikan atau
        asal-usul barang.
      </p>
    ),
  },
  {
    title: "Pembayaran",
    content: (
      <>
        <p>
          Pembayaran dilakukan melalui metode pembayaran resmi yang ditentukan
          Super Emas setelah transaksi disetujui dan proses verifikasi selesai.
          Pelanggan wajib memastikan data rekening penerima yang diberikan sudah
          benar.
        </p>
        <p className={styles.emphasis}>
          Super Emas tidak akan meminta pelanggan melakukan transfer ke rekening
          pribadi atau rekening yang tidak tercantum sebagai rekening resmi
          perusahaan.
        </p>
        <p>
          Super Emas tidak bertanggung jawab atas transfer yang dilakukan
          pelanggan ke rekening yang bukan rekening resmi karena mengikuti
          instruksi pihak yang tidak resmi atau mengatasnamakan Super Emas.
        </p>
      </>
    ),
  },
  {
    title: "Penolakan atau Pembatalan Transaksi",
    content: (
      <>
        <p>Super Emas dapat menolak, menunda, atau menghentikan transaksi apabila:</p>
        <ul>
          <li>hasil pemeriksaan tidak dapat diverifikasi;</li>
          <li>terdapat ketidaksesuaian data atau dokumen;</li>
          <li>terdapat keraguan mengenai kepemilikan atau asal-usul emas;</li>
          <li>terdapat indikasi penipuan atau pelanggaran hukum;</li>
          <li>terjadi gangguan sistem atau kondisi operasional tertentu; atau</li>
          <li>hal tersebut diwajibkan oleh hukum atau kebijakan perusahaan.</li>
        </ul>
        <p>
          Pelanggan juga berhak menolak penawaran sebelum transaksi diselesaikan.
        </p>
      </>
    ),
  },
  {
    title: "Emas Rusak atau Kondisi Tidak Sempurna",
    content: (
      <p>
        Emas yang rusak, patah, penyok, atau memiliki kondisi fisik tertentu
        tetap dapat dibawa untuk diperiksa dan dinilai. Penerimaan dan nilai
        transaksinya tetap bergantung pada hasil pemeriksaan, kadar, berat, jenis,
        keaslian, dan kondisi emas. Super Emas tidak menjamin bahwa semua emas
        dalam kondisi apa pun pasti diterima.
      </p>
    ),
  },
  {
    title: "Penggunaan Website dan Layanan",
    content: (
      <>
        <p>Pelanggan dilarang:</p>
        <ul>
          <li>memberikan informasi palsu atau menggunakan identitas pihak lain tanpa hak;</li>
          <li>menyalahgunakan website atau mencoba memperoleh akses tanpa izin;</li>
          <li>melakukan tindakan yang mengganggu keamanan atau sistem website;</li>
          <li>menggunakan website untuk tindakan yang melanggar hukum; atau</li>
          <li>menggunakan nama atau logo Super Emas untuk menipu maupun meminta pembayaran dari pihak lain.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Pribadi dan Keamanan",
    content: (
      <p>
        Data pelanggan dapat digunakan untuk kebutuhan proses transaksi,
        verifikasi identitas, komunikasi layanan, keamanan transaksi, dan
        pemenuhan kewajiban hukum. Pelanggan bertanggung jawab menjaga keamanan
        perangkat, akun, dokumen, dan informasi transaksi serta tidak memberikan
        kode verifikasi atau data sensitif kepada pihak yang keasliannya tidak
        dapat dipastikan.
      </p>
    ),
  },
  {
    title: "Batasan Tanggung Jawab",
    content: (
      <p>
        Super Emas berupaya menyediakan informasi dan layanan dengan baik, namun
        tidak menjamin website selalu tersedia tanpa gangguan. Super Emas tidak
        bertanggung jawab atas gangguan jaringan atau sistem di luar kendali,
        kesalahan data yang diberikan pelanggan, kerugian akibat instruksi dari
        pihak yang bukan kanal resmi, atau keadaan lain di luar kendali wajar
        perusahaan. Ketentuan ini tidak mengurangi hak pelanggan yang tidak dapat
        dikesampingkan berdasarkan hukum yang berlaku.
      </p>
    ),
  },
  {
    title: "Keadaan Kahar (Force Majeure)",
    content: (
      <p>
        Super Emas dapat mengalami keterlambatan atau tidak dapat menjalankan
        sebagian layanan karena keadaan di luar kendali wajar, termasuk bencana
        alam, gangguan jaringan, gangguan sistem, kebijakan pemerintah, keadaan
        darurat, atau kondisi lain yang sejenis.
      </p>
    ),
  },
  {
    title: "Perubahan Syarat dan Ketentuan",
    content: (
      <p>
        Super Emas dapat memperbarui Syarat dan Ketentuan dari waktu ke waktu
        untuk menyesuaikan layanan, operasional, atau ketentuan hukum yang
        berlaku. Versi terbaru yang dipublikasikan di website berlaku sejak
        tanggal pembaruan yang tercantum pada halaman ini.
      </p>
    ),
  },
  {
    title: "Hukum dan Penyelesaian Sengketa",
    content: (
      <p>
        Syarat dan Ketentuan ini tunduk pada hukum yang berlaku di Republik
        Indonesia. Apabila terjadi perselisihan, para pihak akan mengupayakan
        penyelesaian terlebih dahulu secara musyawarah dengan komunikasi yang
        baik.
      </p>
    ),
  },
  {
    title: "Kontak Resmi",
    content: (
      <p>
        Untuk pertanyaan mengenai Syarat dan Ketentuan atau transaksi, pelanggan
        dapat menghubungi Super Emas melalui kanal resmi yang tercantum pada
        website, termasuk WhatsApp resmi Super Emas.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <NextNavbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Dokumen resmi Super Emas Indonesia</p>
            <h1>Syarat &amp; Ketentuan</h1>
            <p className={styles.lead}>
              Ketentuan yang berlaku dalam penggunaan layanan dan transaksi di
              Super Emas Indonesia.
            </p>
            <p className={styles.updated}>Terakhir diperbarui: September 2026</p>
          </header>

          <nav className={styles.contents} aria-label="Daftar isi">
            <p>Daftar isi</p>
            <ol>
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#pasal-${index + 1}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.sections}>
            {sections.map((section, index) => (
              <section className={styles.section} id={`pasal-${index + 1}`} key={section.title}>
                <p className={styles.sectionNumber}>Pasal {index + 1}</p>
                <h2>{section.title}</h2>
                <div className={styles.sectionBody}>{section.content}</div>
              </section>
            ))}
          </div>

          <section className={styles.cta} aria-label="Hubungi Super Emas">
            <h2>Punya emas yang ingin dijual?</h2>
            <p>Jual Beli Emas di Super Emas</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              Hubungi Super Emas
            </a>
          </section>

          <p className={styles.backLink}>
            <Link href="/">Kembali ke beranda</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}