// src/data/locationData.js
import { waLink } from "../lib/contact";

const branchDetails = {
  tangerang: {
    // draft: verifikasi owner
    access: 'Di kawasan pusat Kota Tangerang (Sukasari), tidak jauh dari area Pasar Anyar dan Stasiun KRL Tangerang.',
    // draft: verifikasi owner
    parking: null,
    // draft: verifikasi owner
    areaServed: 'Pelanggan kami berasal dari Sukasari, Tanah Tinggi, Babakan, Gerendeng, Cipondoh, dan wilayah Kecamatan Tangerang lainnya. Halaman ini menampilkan informasi untuk membantu warga sekitar membandingkan harga emas sebelum berkunjung ke cabang.',
  },
  depok: {
    // draft: verifikasi owner
    access: 'Di Jl. Arif Rahman Hakim (Depok Jaya) yang menghubungkan Jl. Margonda Raya dan kawasan Depok Lama. Dapat dijangkau dari Stasiun KRL Depok Baru.',
    // draft: verifikasi owner
    parking: null,
    // draft: verifikasi owner
    areaServed: 'Kami melayani Depok Jaya, Pancoran Mas, Depok Baru, kawasan Margonda, Beji, dan Mampang. Warga dari lingkungan sekitar dapat memeriksa harga pada halaman ini dan menghubungi cabang sebelum merencanakan kunjungan.',
  },
  bintaro: {
    // draft: verifikasi owner
    access: 'Di Jl. Jombang Raya (Ciputat, Tangerang Selatan), jalur penghubung kawasan Bintaro, Jombang, dan Ciputat. Stasiun KRL terdekat di jalur Rangkasbitung adalah Sudimara.',
    // draft: verifikasi owner
    parking: null,
    // draft: verifikasi owner
    areaServed: 'Area layanan mencakup Pondok Pucung, Jombang, Sawah Baru, Ciputat, Pondok Aren, dan Jurangmangu. Informasi harga di halaman ini dapat menjadi rujukan awal bagi warga sekitar sebelum bertanya lebih lanjut kepada tim cabang.',
  },
  cibubur: {
    // draft: verifikasi owner
    access: 'Di Jl. Alternatif Cibubur (Transyogi), Jatisampurna, jalur utama kawasan Cibubur–Cileungsi.',
    // draft: verifikasi owner
    parking: null,
    // draft: verifikasi owner
    areaServed: 'Kami melayani Jatisampurna, Jatiranggon, Jatiraden, Kranggan, Harjamukti, Cibubur, dan kawasan Cileungsi. Pengunjung dari wilayah tersebut dapat melihat harga emas terlebih dahulu melalui halaman ini sebelum menghubungi cabang.',
  },
  durenSawit: {
    // draft: verifikasi owner
    access: 'Di Jl. Pahlawan Revolusi, Pondok Bambu, Jakarta Timur, dekat kawasan Kalimalang dan Klender.',
    // draft: verifikasi owner
    parking: null,
    // draft: verifikasi owner
    areaServed: 'Cabang melayani warga Pondok Bambu, Duren Sawit, Klender, Pondok Kelapa, Malaka Jaya, serta lingkungan lain di Jakarta Timur. Informasi harga tersedia pada halaman ini sebagai panduan awal sebelum menghubungi tim atau datang ke cabang.',
  },
  bekasi: {
    // draft: verifikasi owner
    access: 'Di Jl. Caman Raya, Jatibening, Pondok Gede, dekat akses Tol Jatibening dan kawasan Kalimalang.',
    // draft: verifikasi owner
    parking: null,
    // draft: verifikasi owner
    areaServed: 'Kami melayani Jatibening, Jatibening Baru, Jatiwaringin, Pondok Gede, dan lingkungan Kalimalang. Warga di sekitar Bekasi dapat mengecek harga emas pada halaman ini serta memastikan informasi melalui WhatsApp sebelum berkunjung.',
  },
  kebonJeruk: {
    // draft: verifikasi owner
    access: 'Di Jl. Panjang, Kebon Jeruk, Jakarta Barat. Jalan ini dilalui layanan TransJakarta.',
    // draft: verifikasi owner
    parking: null,
    // draft: verifikasi owner
    areaServed: 'Area layanan mencakup Kebon Jeruk, Kedoya Utara, Kedoya Selatan, Duri Kepa, Sukabumi Utara, dan Palmerah. Halaman ini membantu warga Jakarta Barat melihat informasi harga sebelum menghubungi cabang untuk bertanya atau merencanakan kunjungan.',
  },
  bogor: {
    // draft: verifikasi owner
    access: 'Di Jl. Otto Iskandardinata (Otista), Bogor Tengah, di kawasan Pasar Bogor dan Kebun Raya Bogor, di pusat kota.',
    // draft: verifikasi owner
    parking: null,
    // draft: verifikasi owner
    areaServed: 'Pelanggan kami di Bogor datang dari Bogor Tengah, Baranangsiang, Pajajaran, Tanah Sareal, hingga Bogor Utara. Warga Babakan Pasar dan kawasan sekitar juga dapat memeriksa harga di halaman ini sebelum menghubungi cabang atau berkunjung.',
  },
};

const makeBranchFaq = (name) => [
  {
    question: `Jam berapa Super Emas ${name} buka?`,
    answer: `Super Emas ${name} buka setiap hari pukul 09.00–20.00.`,
  },
  {
    question: `Apakah Super Emas ${name} menerima emas tanpa surat?`,
    answer: `Ya, Super Emas ${name} menerima emas tanpa surat. Emas akan diperiksa untuk mengetahui karat, berat, dan kondisinya sebelum penawaran diberikan.`,
  },
];

const branchRecords = [
  {
    slug: 'tangerang',
    name: 'Tangerang',
    streetAddress: 'Jl. A. Damyati No.3, RT.006/RW.003, Sukasari, Kec. Tangerang',
    addressLocality: 'Kota Tangerang',
    addressRegion: 'Banten',
    postalCode: '15118',
    lat: -6.1777825,
    lng: 106.6305562,
    mapsUrl: 'https://maps.app.goo.gl/VNvLZ3AuAvempESQ9',
    photo: null,
    hours: '09.00–20.00',
    whatsapp: waLink('Halo Super Emas Tangerang, saya ingin cek harga emas'),
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2938.832041242645!2d106.6305562!3d-6.177782499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f9fdd3c2c701%3A0x38772dd6affebf2d!2sSUPER%20EMAS%20TANGERANG!5e1!3m2!1sid!2sid!4v1795489972039!5m2!1sid!2sid",
    ...branchDetails.tangerang,
    
    seo: {
      title: 'Harga Emas Tangerang Hari Ini Terkini | Super Emas',
      metaDescription: 'Cek harga emas terkini di Super Emas Tangerang. Informasi lengkap harga buyback emas, lokasi cabang, dan cara jual emas di Tangerang.',
      h1: 'Harga Emas Tangerang Hari Ini',
      ogImage: '/images/logo.png',
    },
    
    content: {
      intro: 'Super Emas cabang Tangerang berlokasi di Jl. A. Damyati No.3, Sukasari, melayani masyarakat Tangerang dan sekitarnya untuk transaksi jual beli emas. Harga yang ditampilkan adalah harga Super Emas yang berlaku secara nasional dan diperbarui secara real-time.',
      
      branchNarrative: [
        'Untuk warga yang beraktivitas di Sukasari dan pusat Kota Tangerang, cabang ini menyediakan tempat untuk menanyakan transaksi jual emas secara langsung. Alamat lengkap dan tautan Google Maps tersedia pada bagian lokasi. Sebelum berangkat, Anda dapat membuka tautan tersebut untuk memastikan rute yang sesuai dengan titik awal perjalanan.',
        'Harga pada halaman ini menjadi acuan awal untuk memahami nilai emas berdasarkan jenis dan kadar yang tersedia. Nilai akhir tetap mengikuti pemeriksaan emas di cabang, termasuk pengecekan karat, berat, dan kondisi. Jika masih ingin memastikan jenis emas atau informasi harga sebelum datang, hubungi tim Tangerang melalui WhatsApp dengan tombol yang tersedia di halaman ini.',
        'Dalam pesan kepada tim Tangerang, jelaskan jenis emas yang ingin ditanyakan dan tuliskan pertanyaan Anda secara ringkas. Bila mengetahui kadar karatnya, informasi tersebut dapat disampaikan sebagai gambaran awal, tetapi pemeriksaan langsung tetap diperlukan untuk memastikan hasilnya. Harga yang terlihat di situs dapat berubah mengikuti pembaruan, sehingga sebaiknya cek kembali pada hari rencana kunjungan. Anda dapat membawa emas dan KTP ke cabang untuk proses pemeriksaan.',
      ],
      goldIntro: 'Di Super Emas Tangerang, Anda dapat menanyakan penjualan berbagai bentuk emas, dari perhiasan sampai logam mulia. Cabang ini menerima emas K6–K24, termasuk barang rusak atau tanpa surat, untuk diperiksa sebelum nilai transaksi ditawarkan.',
      goldTypes: ['Perhiasan', 'Logam mulia Antam dan non-Antam', 'Emas rusak, patah, atau sebelah', 'Emas tanpa surat'],
      visitGuide: 'Cabang Tangerang buka setiap hari pukul 09.00–20.00. Bawa emas dan KTP saat berkunjung; untuk menanyakan harga terlebih dahulu, kirim pesan melalui WhatsApp dengan menyebutkan jenis emas yang ingin diperiksa.',
      
      whySuperEmas: [
        'Lokasi strategis di pusat Kota Tangerang',
        'Proses transaksi jual beli emas yang transparan',
        'Harga kompetitif sesuai harga pasar terkini'
      ],
      
      howToSellSteps: [
        {
          step: 1,
          title: 'Kunjungi Cabang Tangerang',
          description: 'Datang langsung ke cabang kami di Jl. A. Damyati No.3 dengan membawa emas yang ingin dijual.'
        },
        {
          step: 2,
          title: 'Pemeriksaan Emas',
          description: 'Tim kami akan memeriksa karat dan berat emas Anda.'
        },
        {
          step: 3,
          title: 'Penawaran Harga',
          description: 'Anda akan mendapatkan penawaran harga berdasarkan harga emas terkini.'
        },
        {
          step: 4,
          title: 'Transaksi',
          description: 'Jika setuju dengan harga, transaksi dapat segera diproses.'
        }
      ],
      
      faq: [
        {
          question: 'Apakah harga emas di Super Emas Tangerang berbeda dengan cabang lain?',
          answer: 'Tidak, harga emas yang ditampilkan adalah harga Super Emas yang berlaku untuk semua cabang. Harga diperbarui secara real-time sesuai harga pasar.'
        },
        {
          question: 'Dimana lokasi Super Emas Tangerang?',
          answer: 'Super Emas Tangerang berlokasi di Jl. A. Damyati No.3, RT.006/RW.003, Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118.'
        },
        {
          question: 'Bagaimana cara menjual emas di Super Emas Tangerang?',
          answer: 'Anda dapat datang langsung ke cabang kami dengan membawa emas. Tim kami akan melakukan pemeriksaan dan memberikan penawaran harga sesuai kondisi dan karat emas Anda.'
        }
      ]
    }
  },
  
  {
    slug: 'depok',
    name: 'Depok',
    streetAddress: 'Jl. Arif Rahman Hakim, Depok Jaya, Kec. Pancoran Mas',
    addressLocality: 'Kota Depok',
    addressRegion: 'Jawa Barat',
    postalCode: '16432',
    lat: -6.3889655,
    lng: 106.8145091,
    mapsUrl: 'https://maps.app.goo.gl/t5v6xfn43ciddeUF8',
    photo: null,
    hours: '09.00–20.00',
    whatsapp: waLink('Halo Super Emas Depok, saya ingin cek harga emas'),
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2937.6395926575224!2d106.8145091!3d-6.3889655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e9e0b207671b%3A0x93033a9703c24657!2sSUPER%20EMAS%20DEPOK!5e1!3m2!1sid!2sid!4v1795489994721!5m2!1sid!2sid",
    ...branchDetails.depok,
    
    seo: {
      title: 'Harga Emas Depok Hari Ini Terkini | Super Emas',
      metaDescription: 'Cek harga emas terkini di Super Emas Depok. Informasi lengkap harga buyback emas, lokasi cabang, dan cara jual emas di Depok.',
      h1: 'Harga Emas Depok Hari Ini',
      ogImage: '/images/logo.png',
    },
    
    content: {
      intro: 'Super Emas cabang Depok hadir di Jl. Arif Rahman Hakim, Depok Jaya, melayani kebutuhan jual beli emas untuk warga Depok dan sekitarnya. Harga yang ditampilkan merupakan harga Super Emas yang berlaku secara nasional.',
      
      branchNarrative: [
        'Cabang Depok berada di kawasan Depok Jaya, pada Jl. Arif Rahman Hakim. Informasi alamat dan peta di halaman ini dapat membantu pengunjung menentukan titik tujuan sebelum berangkat dari Margonda, Depok Lama, atau lingkungan lain di sekitarnya. Silakan gunakan tautan peta untuk melihat rute yang paling sesuai.',
        'Sebelum berkunjung, Anda dapat meninjau harga emas yang ditampilkan sebagai gambaran awal. Setiap emas yang dibawa tetap perlu diperiksa karat, berat, dan kondisinya agar tim dapat menyampaikan penawaran berdasarkan hasil pemeriksaan tersebut. Bila ada pertanyaan tentang jenis emas yang akan dijual, sampaikan melalui WhatsApp ke tim Depok terlebih dahulu.',
        'Saat menghubungi Super Emas Depok, sebutkan jenis barang yang ingin diperiksa dan hal yang ingin Anda pastikan. Jika kadar karat belum diketahui, tidak masalah; tim akan memeriksanya ketika emas dibawa ke cabang. Informasi harga dapat berubah seiring pembaruan, jadi periksa kembali sebelum kunjungan. Bawa emas dan KTP, lalu gunakan tautan peta di halaman ini untuk membuka petunjuk arah menuju alamat cabang.',
      ],
      goldIntro: 'Super Emas Depok menerima aneka emas untuk diperiksa, baik perhiasan sehari-hari maupun logam mulia Antam dan non-Antam. Cabang ini menerima kadar K6–K24, termasuk emas yang rusak, patah, sebelah, atau sudah tidak memiliki surat.',
      goldTypes: ['Perhiasan', 'Logam mulia Antam dan non-Antam', 'Emas rusak, patah, atau sebelah', 'Emas tanpa surat'],
      visitGuide: 'Jam operasional cabang Depok adalah setiap hari pukul 09.00–20.00. Bawalah emas dan KTP ketika datang, lalu cek harga lebih dahulu lewat WhatsApp bila ingin menanyakan informasi sebelum berkunjung.',
      
      whySuperEmas: [
        'Lokasi mudah diakses di area Depok Jaya',
        'Proses pemeriksaan emas yang profesional',
        'Harga transparan sesuai harga pasar'
      ],
      
      howToSellSteps: [
        {
          step: 1,
          title: 'Kunjungi Cabang Depok',
          description: 'Datang ke cabang kami di Jl. Arif Rahman Hakim dengan emas yang akan dijual.'
        },
        {
          step: 2,
          title: 'Pemeriksaan Emas',
          description: 'Emas Anda akan diperiksa untuk menentukan karat dan beratnya.'
        },
        {
          step: 3,
          title: 'Penawaran Harga',
          description: 'Kami akan memberikan penawaran harga berdasarkan hasil pemeriksaan.'
        },
        {
          step: 4,
          title: 'Transaksi',
          description: 'Transaksi dapat dilanjutkan jika Anda menyetujui harga yang ditawarkan.'
        }
      ],
      
      faq: [
        {
          question: 'Apakah harga di Super Emas Depok sama dengan cabang lain?',
          answer: 'Ya, harga emas di semua cabang Super Emas adalah sama karena menggunakan harga acuan yang berlaku secara nasional.'
        },
        {
          question: 'Dimana alamat lengkap Super Emas Depok?',
          answer: 'Alamat lengkap kami di Jl. Arif Rahman Hakim, Depok Jaya, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16432.'
        },
        {
          question: 'Apakah emas tanpa sertifikat bisa dijual?',
          answer: 'Ya, emas tanpa sertifikat tetap dapat dijual. Kami akan melakukan pemeriksaan untuk menentukan karat dan nilai emas Anda.'
        }
      ]
    }
  },
  
  {
    slug: 'bintaro',
    name: 'Bintaro',
    streetAddress: 'Jl. Jombang Raya No.71, Pd. Pucung, Kec. Ciputat',
    addressLocality: 'Kota Tangerang Selatan',
    addressRegion: 'Banten',
    postalCode: '15414',
    lat: -6.2941881,
    lng: 106.7085865,
    mapsUrl: 'https://maps.app.goo.gl/Bes9RNp5s3PjTW5p9',
    photo: null,
    hours: '09.00–20.00',
    whatsapp: waLink('Halo Super Emas Bintaro, saya ingin cek harga emas'),
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2938.179692219955!2d106.7085865!3d-6.2941881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbfd867c710b%3A0x2364f57de8f6471b!2sSUPER%20EMAS%20BINTARO!5e1!3m2!1sid!2sid!4v1795491278178!5m2!1sid!2sid",
    ...branchDetails.bintaro,
    
    seo: {
      title: 'Harga Emas Bintaro Hari Ini Terkini | Super Emas',
      metaDescription: 'Cek harga emas terkini di Super Emas Bintaro. Informasi lengkap harga buyback emas, lokasi cabang, dan cara jual emas di Bintaro.',
      h1: 'Harga Emas Bintaro Hari Ini',
      ogImage: '/images/logo.png',
    },
    
    content: {
      intro: 'Super Emas cabang Bintaro terletak di Jl. Jombang Raya No.71, Pondok Pucung, siap melayani transaksi emas untuk warga Bintaro dan Tangerang Selatan. Harga emas yang kami tampilkan adalah harga Super Emas yang berlaku untuk semua cabang.',
      
      branchNarrative: [
        'Bagi warga Bintaro, Jombang, dan Ciputat, alamat cabang serta peta pada halaman ini menjadi rujukan untuk merencanakan kunjungan ke Jl. Jombang Raya. Pengunjung dapat membuka petunjuk arah Google Maps untuk melihat lokasi tujuan. Informasi kawasan yang disebutkan menggambarkan area layanan, bukan penanda jarak atau waktu tempuh.',
        'Tabel harga dapat dilihat sebelum emas dibawa ke cabang, tetapi angka tersebut bukan penawaran final untuk setiap barang. Tim akan memeriksa kadar, berat, dan kondisi emas secara langsung, kemudian menjelaskan penawaran yang berlaku. Untuk bertanya mengenai emas tertentu atau mengecek informasi sebelum datang, hubungi tim Bintaro lewat WhatsApp.',
        'Pesan WhatsApp ke cabang Bintaro dapat memuat jenis emas dan pertanyaan yang ingin disampaikan, misalnya mengenai cara pemeriksaan atau harga yang tercantum pada halaman ini. Keterangan awal tidak menggantikan pemeriksaan barang. Bawalah emas dan KTP ketika datang, lalu gunakan alamat serta peta pada halaman ini untuk menuju cabang. Karena informasi harga diperbarui, pastikan kembali nilainya pada hari yang sama dengan rencana berkunjung.',
      ],
      goldIntro: 'Di Super Emas Bintaro, emas perhiasan maupun logam mulia dapat dibawa untuk diperiksa. Jenis yang diterima mencakup Antam dan non-Antam, emas rusak atau tidak lengkap, serta emas tanpa surat dengan rentang kadar K6–K24.',
      goldTypes: ['Perhiasan', 'Logam mulia Antam dan non-Antam', 'Emas rusak, patah, atau sebelah', 'Emas tanpa surat'],
      visitGuide: 'Super Emas Bintaro buka setiap hari pukul 09.00–20.00. Siapkan emas dan KTP untuk kunjungan; Anda juga dapat mengecek harga lebih dulu melalui WhatsApp menggunakan tombol kontak di halaman ini.',
      
      whySuperEmas: [
        'Lokasi strategis di area Bintaro',
        'Pelayanan transaksi emas yang profesional',
        'Update harga real-time'
      ],
      
      howToSellSteps: [
        {
          step: 1,
          title: 'Kunjungi Cabang Bintaro',
          description: 'Datang ke toko kami di Jl. Jombang Raya No.71 dengan emas Anda.'
        },
        {
          step: 2,
          title: 'Pemeriksaan Emas',
          description: 'Kami akan memeriksa karat dan berat emas untuk menentukan nilainya.'
        },
        {
          step: 3,
          title: 'Penawaran Harga',
          description: 'Anda akan mendapatkan penawaran harga sesuai dengan hasil pemeriksaan.'
        },
        {
          step: 4,
          title: 'Transaksi',
          description: 'Proses transaksi dapat diselesaikan setelah harga disepakati.'
        }
      ],
      
      faq: [
        {
          question: 'Apakah harga emas di Bintaro berbeda dengan cabang Super Emas lainnya?',
          answer: 'Tidak, harga emas berlaku sama untuk semua cabang Super Emas karena mengacu pada harga pasar yang sama.'
        },
        {
          question: 'Bagaimana cara ke Super Emas Bintaro?',
          answer: 'Cabang kami berlokasi di Jl. Jombang Raya No.71, Pd. Pucung, Kec. Ciputat. Anda dapat menggunakan maps untuk navigasi lebih mudah.'
        },
        {
          question: 'Jenis emas apa saja yang diterima?',
          answer: 'Kami menerima berbagai jenis emas termasuk emas batangan, perhiasan, dan emas dalam berbagai karat.'
        }
      ]
    }
  },
  
  {
    slug: 'cibubur',
    name: 'Cibubur',
    streetAddress: 'Jl. Transyogi, RT.001/RW.010, Jatisampurna, Kec. Jatisampurna',
    addressLocality: 'Kota Bekasi',
    addressRegion: 'Jawa Barat',
    postalCode: '17435',
    lat: -6.3810177,
    lng: 106.9238506,
    mapsUrl: 'https://maps.app.goo.gl/GnccP7fz1WLjZSqF7',
    photo: null,
    hours: '09.00–20.00',
    whatsapp: waLink('Halo Super Emas Cibubur, saya ingin cek harga emas'),
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2937.685192873033!2d106.9238506!3d-6.3810177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6995009f8def4f%3A0x9c4892aad2b5c09c!2sSUPER%20EMAS%20CIBUBUR!5e1!3m2!1sid!2sid!4v1795491280667!5m2!1sid!2sid",
    ...branchDetails.cibubur,
    
    seo: {
      title: 'Harga Emas Cibubur Hari Ini Terkini | Super Emas',
      metaDescription: 'Cek harga emas terkini di Super Emas Cibubur. Informasi lengkap harga buyback emas, lokasi cabang, dan cara jual emas di Cibubur.',
      h1: 'Harga Emas Cibubur Hari Ini',
      ogImage: '/images/logo.png',
    },
    
    content: {
      intro: 'Super Emas cabang Cibubur berada di Jl. Transyogi, Jatisampurna, melayani kebutuhan jual beli emas di wilayah Cibubur dan Bekasi. Harga yang kami tampilkan adalah harga Super Emas yang update secara real-time.',
      
      branchNarrative: [
        'Cabang Cibubur beralamat di Jl. Transyogi, Jatisampurna, pada jalur utama kawasan Cibubur–Cileungsi. Pengunjung dari lingkungan sekitar dapat menggunakan alamat dan peta di halaman ini sebagai panduan menuju titik cabang. Buka petunjuk arah sebelum perjalanan agar tujuan yang dipilih sesuai dengan cabang Cibubur.',
        'Informasi harga yang tersedia membantu Anda melihat acuan berdasarkan kadar emas, sedangkan nilai transaksi ditentukan setelah pemeriksaan barang. Prosesnya mencakup pengecekan karat dan berat sebelum tim menyampaikan penawaran. Jika ingin mengonfirmasi informasi sebelum datang, kirim pesan ke WhatsApp Super Emas Cibubur melalui tombol pada halaman.',
        'Untuk memulai percakapan dengan tim Cibubur, sampaikan jenis emas yang akan dijual serta informasi yang ingin ditanyakan. Jika Anda belum tahu kadar atau beratnya, pemeriksaan di cabang akan membantu menentukan data tersebut. Cek harga kembali sebelum berangkat karena informasi dapat berubah setelah pembaruan. Bawa emas dan KTP, lalu buka tautan Google Maps di halaman ini untuk melihat panduan menuju Jl. Transyogi.',
        'Untuk melengkapi pertanyaan awal, Anda dapat menyebutkan apakah barang berupa perhiasan atau logam mulia serta apakah suratnya masih tersedia. Keterangan tersebut membantu menjelaskan kebutuhan Anda, tetapi tidak menggantikan pemeriksaan emas di cabang. Tabel harga dapat menjadi panduan saat melihat kadar yang tersedia, sedangkan WhatsApp berguna untuk bertanya sebelum perjalanan.',
      ],
      goldIntro: 'Di Super Emas Cibubur, perhiasan maupun logam mulia Antam atau non-Antam dapat dibawa untuk diperiksa. Cabang ini menerima emas K6–K24, termasuk yang patah, rusak, sebelah, ataupun tidak disertai surat.',
      goldTypes: ['Perhiasan', 'Logam mulia Antam dan non-Antam', 'Emas rusak, patah, atau sebelah', 'Emas tanpa surat'],
      visitGuide: 'Jam buka cabang Cibubur adalah setiap hari pukul 09.00–20.00. Bawa emas dan KTP saat datang. Untuk memperoleh informasi awal atau mengecek harga sebelum perjalanan, hubungi tim cabang melalui WhatsApp.',
      
      whySuperEmas: [
        'Akses mudah dari area Cibubur dan Jatisampurna',
        'Transaksi emas yang aman dan terpercaya',
        'Informasi harga yang transparan'
      ],
      
      howToSellSteps: [
        {
          step: 1,
          title: 'Kunjungi Cabang Cibubur',
          description: 'Kunjungi toko kami di Jl. Transyogi dengan membawa emas yang akan dijual.'
        },
        {
          step: 2,
          title: 'Pemeriksaan Emas',
          description: 'Tim kami akan melakukan pengecekan karat dan berat emas Anda.'
        },
        {
          step: 3,
          title: 'Penawaran Harga',
          description: 'Harga akan ditawarkan berdasarkan kondisi dan karat emas.'
        },
        {
          step: 4,
          title: 'Transaksi',
          description: 'Transaksi dapat diselesaikan setelah kesepakatan harga tercapai.'
        }
      ],
      
      faq: [
        {
          question: 'Apakah harga di Super Emas Cibubur sama dengan cabang lain?',
          answer: 'Ya, harga emas di semua cabang Super Emas menggunakan acuan harga yang sama dan berlaku secara nasional.'
        },
        {
          question: 'Dimana lokasi Super Emas Cibubur?',
          answer: 'Kami berlokasi di Jl. Transyogi, RT.001/RW.010, Jatisampurna, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435.'
        },
        {
          question: 'Apa saja yang perlu dibawa saat menjual emas?',
          answer: 'Anda cukup membawa emas yang akan dijual. Untuk emas bersertifikat, Anda dapat membawa sertifikatnya sebagai referensi.'
        }
      ]
    }
  },
  
  {
    slug: 'duren-sawit',
    name: 'Duren Sawit',
    streetAddress: 'Jl. Pahlawan Revolusi No.22A, RT.2/RW.2, Pd. Bambu, Kec. Duren Sawit',
    addressLocality: 'Jakarta Timur',
    addressRegion: 'DKI Jakarta',
    postalCode: '13430',
    lat: -6.2268377,
    lng: 106.8986703,
    mapsUrl: 'https://maps.app.goo.gl/uQzjL4rA9N6ApsNJ8',
    photo: null,
    hours: '09.00–20.00',
    whatsapp: waLink('Halo Super Emas Duren Sawit, saya ingin cek harga emas'),
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2938.558609525047!2d106.89867029999999!3d-6.2268377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f37573628943%3A0x25f802665f31ff22!2sSUPER%20EMAS%20DUREN%20SAWIT!5e1!3m2!1sid!2sid!4v1795491283251!5m2!1sid!2sid",
    ...branchDetails.durenSawit,
    
    seo: {
      title: 'Harga Emas Duren Sawit Hari Ini Terkini | Super Emas',
      metaDescription: 'Cek harga emas terkini di Super Emas Duren Sawit. Informasi lengkap harga buyback emas, lokasi cabang, dan cara jual emas di Duren Sawit.',
      h1: 'Harga Emas Duren Sawit Hari Ini',
      ogImage: '/images/logo.png',
    },
    
    content: {
      intro: 'Super Emas cabang Duren Sawit berlokasi di Jl. Pahlawan Revolusi 22 A, Pondok Bambu, melayani transaksi jual beli emas untuk masyarakat Jakarta Timur. Harga yang ditampilkan merupakan harga Super Emas yang berlaku untuk semua cabang.',
      
      branchNarrative: [
        'Berlokasi di Jl. Pahlawan Revolusi, Pondok Bambu, cabang ini melayani kebutuhan jual emas bagi warga Duren Sawit dan area Jakarta Timur. Alamat dan peta yang tertera membantu Anda menentukan tujuan ketika akan berkunjung. Pengunjung dapat membuka tautan Google Maps untuk melihat lokasi cabang secara langsung.',
        'Gunakan informasi harga pada halaman ini sebagai gambaran awal, lalu bawa emas ke cabang agar karat, berat, dan kondisinya dapat diperiksa. Setelah pemeriksaan, tim menyampaikan penawaran yang dapat Anda pertimbangkan. Jika ingin bertanya sebelum berangkat dari Pondok Bambu, Klender, atau kawasan lain, hubungi tim Duren Sawit melalui WhatsApp.',
        'Ketika mengirim pesan kepada tim Duren Sawit, cantumkan jenis emas yang ingin diperiksa dan pertanyaan yang perlu dijawab sebelum kunjungan. Informasi kadar atau berat boleh disampaikan jika sudah diketahui, namun keduanya tetap perlu dipastikan melalui pemeriksaan. Harga yang ditampilkan dapat berubah mengikuti pembaruan, jadi lihat kembali informasi pada hari kunjungan. Bawa emas dan KTP ke cabang, dan gunakan tombol petunjuk arah untuk membuka Google Maps.',
      ],
      goldIntro: 'Di Super Emas Duren Sawit, berbagai bentuk emas dapat diperiksa, termasuk perhiasan dan logam mulia Antam maupun non-Antam. Cabang ini menerima emas K6–K24; emas rusak, patah, sebelah, serta tanpa surat juga diterima.',
      goldTypes: ['Perhiasan', 'Logam mulia Antam dan non-Antam', 'Emas rusak, patah, atau sebelah', 'Emas tanpa surat'],
      visitGuide: 'Super Emas Duren Sawit beroperasi setiap hari pukul 09.00–20.00. Bawa emas dan KTP saat berkunjung. Anda dapat menghubungi cabang melalui WhatsApp untuk mengecek harga lebih dulu atau menanyakan hal yang perlu disiapkan.',
      
      whySuperEmas: [
        'Lokasi di pusat area Duren Sawit',
        'Pelayanan transaksi yang profesional',
        'Harga sesuai harga pasar terkini'
      ],
      
      howToSellSteps: [
        {
          step: 1,
          title: 'Kunjungi Cabang Duren Sawit',
          description: 'Datang ke cabang kami di Jl. Pahlawan Revolusi 22 A dengan emas Anda.'
        },
        {
          step: 2,
          title: 'Pemeriksaan Emas',
          description: 'Emas akan diperiksa untuk mengetahui karat dan beratnya.'
        },
        {
          step: 3,
          title: 'Penawaran Harga',
          description: 'Kami memberikan penawaran harga berdasarkan hasil pemeriksaan.'
        },
        {
          step: 4,
          title: 'Transaksi',
          description: 'Transaksi dapat diproses setelah harga disepakati.'
        }
      ],
      
      faq: [
        {
          question: 'Apakah harga emas di Duren Sawit sama dengan cabang lain?',
          answer: 'Ya, harga emas di semua cabang Super Emas mengikuti harga yang sama dan berlaku secara nasional.'
        },
        {
          question: 'Alamat lengkap Super Emas Duren Sawit?',
          answer: 'Kami berlokasi di Jl. Pahlawan Revolusi.22 A, RT.2/RW.2, Pd. Bambu, Kec. Duren Sawit, Kota Jakarta Timur, DKI Jakarta 13430.'
        },
        {
          question: 'Apakah perlu membuat janji terlebih dahulu?',
          answer: 'Anda dapat langsung datang ke cabang kami tanpa perlu membuat janji terlebih dahulu.'
        }
      ]
    }
  },
  
  {
    slug: 'bekasi',
    name: 'Bekasi',
    streetAddress: 'Jl. Caman Raya No.60, RT.007/RW.001, Jatibening, Kec. Pd. Gede',
    addressLocality: 'Kota Bekasi',
    addressRegion: 'Jawa Barat',
    postalCode: '17412',
    lat: -6.2534589,
    lng: 106.9518885,
    mapsUrl: 'https://maps.app.goo.gl/BUTZqKHXwoQxh2yi7',
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2938.4093223419018!2d106.9518885!3d-6.2534589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698daf99bddb99%3A0x489673589465a0b8!2sSUPER%20EMAS%20BEKASI!5e1!3m2!1sid!2sid!4v1795491249067!5m2!1sid!2sid",
    photo: null,
    ...branchDetails.bekasi,
    hours: '09.00–20.00',
    whatsapp: waLink('Halo Super Emas Bekasi, saya ingin cek harga emas'),
    
    seo: {
      title: 'Harga Emas Bekasi Hari Ini Terkini | Super Emas',
      metaDescription: 'Cek harga emas terkini di Super Emas Bekasi. Informasi lengkap harga buyback emas, lokasi cabang, dan cara jual emas di Bekasi.',
      h1: 'Harga Emas Bekasi Hari Ini',
      ogImage: '/images/logo.png',
    },
    
    content: {
      intro: 'Super Emas cabang Bekasi hadir di Jl. Caman Raya No.60, Jatibening, siap melayani kebutuhan transaksi emas Anda di wilayah Bekasi. Harga yang ditampilkan adalah harga Super Emas yang berlaku secara nasional.',
      
      branchNarrative: [
        'Super Emas Bekasi berada di Jl. Caman Raya, Jatibening, wilayah Pondok Gede. Pengunjung dari area sekitar dapat memakai alamat lengkap dan tautan peta di halaman ini untuk merencanakan kunjungan. Lokasi pada peta menunjukkan cabang yang dimaksud; silakan buka petunjuk arah untuk melihat rute sesuai titik keberangkatan Anda.',
        'Harga emas yang terlihat di halaman ini merupakan informasi awal sebelum pemeriksaan di cabang. Tim akan melihat karat, berat, dan kondisi emas, lalu menyampaikan penawaran berdasarkan hasilnya. Warga Jatibening dan Kalimalang dapat mengirim pertanyaan melalui WhatsApp Super Emas Bekasi untuk mengecek harga atau memastikan informasi sebelum datang.',
        'Sebelum menuju cabang Bekasi, Anda dapat mengirim pesan dengan menyebutkan jenis emas dan pertanyaan yang ingin disampaikan. Kadar atau berat bisa diinformasikan jika sudah diketahui, tetapi hasil akhirnya tetap dikonfirmasi saat barang diperiksa. Harga dapat berubah setelah pembaruan, sehingga sebaiknya cek lagi pada hari kunjungan. Bawa emas dan KTP, kemudian buka tautan petunjuk arah untuk melihat rute ke Jl. Caman Raya.',
      ],
      goldIntro: 'Di Super Emas Bekasi, berbagai emas dapat dibawa untuk diperiksa, dari perhiasan hingga logam mulia Antam dan non-Antam. Cabang ini menerima emas K6–K24, termasuk barang rusak, patah, sebelah, dan emas tanpa surat.',
      goldTypes: ['Perhiasan', 'Logam mulia Antam dan non-Antam', 'Emas rusak, patah, atau sebelah', 'Emas tanpa surat'],
      visitGuide: 'Cabang Bekasi buka setiap hari pukul 09.00–20.00. Siapkan emas dan KTP saat berkunjung. Sebelum menuju Jatibening, cek harga atau tanyakan informasi melalui tombol WhatsApp yang mengirim pesan kepada tim Bekasi.',
      
      whySuperEmas: [
        'Lokasi strategis di Jatibening, Bekasi',
        'Transaksi emas yang transparan',
        'Update harga secara real-time'
      ],
      
      howToSellSteps: [
        {
          step: 1,
          title: 'Kunjungi Cabang Bekasi',
          description: 'Kunjungi cabang kami di Jl. Caman Raya No.60 dengan emas yang akan dijual.'
        },
        {
          step: 2,
          title: 'Pemeriksaan Emas',
          description: 'Kami akan memeriksa karat dan kondisi emas Anda.'
        },
        {
          step: 3,
          title: 'Penawaran Harga',
          description: 'Harga akan ditawarkan sesuai dengan hasil pemeriksaan emas.'
        },
        {
          step: 4,
          title: 'Transaksi',
          description: 'Transaksi dapat diselesaikan setelah harga disepakati bersama.'
        }
      ],
      
      faq: [
        {
          question: 'Apakah harga emas di Bekasi berbeda dengan cabang Super Emas lainnya?',
          answer: 'Tidak, harga emas di semua cabang Super Emas adalah sama dan mengacu pada harga pasar yang berlaku.'
        },
        {
          question: 'Dimana lokasi Super Emas Bekasi?',
          answer: 'Super Emas Bekasi berlokasi di Jl. Caman Raya No.60, RT.007/RW.001, Jatibening, Kec. Pd. Gede, Kota Bekasi, Jawa Barat 17412.'
        },
        {
          question: 'Apa saja jenis emas yang dapat dijual?',
          answer: 'Kami menerima berbagai jenis emas termasuk emas perhiasan, emas batangan, dan emas dengan berbagai karat.'
        }
      ]
    }
  },
  
  {
    slug: 'kebon-jeruk',
    name: 'Kebon Jeruk',
    // TODO: konfirmasi nomor alamat dengan owner (No.16 atau No.167).
    streetAddress: 'Jl. Panjang No.16, RT.7/RW.1, Kb. Jeruk, Kec. Kb. Jeruk',
    addressLocality: 'Jakarta Barat',
    addressRegion: 'DKI Jakarta',
    postalCode: '11530',
    lat: -6.1975043,
    lng: 106.7687641,
    mapsUrl: 'https://maps.app.goo.gl/3AME3mLe8Y3F9MaL9',
    photo: null,
    hours: '09.00–20.00',
    whatsapp: waLink('Halo Super Emas Kebon Jeruk, saya ingin cek harga emas'),
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5004946059116!2d106.7687641!3d-6.197504299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f75d17f9ac71%3A0xc16dfbc664d7d599!2sSUPER%20EMAS%20KEBON%20JERUK!5e0!3m2!1sid!2sid!4v1795489929174!5m2!1sid!2sid",
    ...branchDetails.kebonJeruk,
    
    seo: {
      title: 'Harga Emas Kebon Jeruk Hari Ini Terkini | Super Emas',
      metaDescription: 'Cek harga emas terkini di Super Emas Kebon Jeruk. Informasi lengkap harga buyback emas, lokasi cabang, dan cara jual emas di Kebon Jeruk.',
      h1: 'Harga Emas Kebon Jeruk Hari Ini',
      ogImage: '/images/logo.png',
    },
    
    content: {
      intro: 'Super Emas cabang Kebon Jeruk berada di Jl. Panjang, melayani transaksi jual beli emas untuk masyarakat Jakarta Barat. Harga yang kami tampilkan adalah harga Super Emas yang berlaku untuk semua cabang di Indonesia.',
      
      branchNarrative: [
        'Cabang Kebon Jeruk berada di Jl. Panjang, Jakarta Barat. Pengunjung dari Kebon Jeruk dan lingkungan yang disebutkan pada area layanan dapat memakai tautan peta untuk membuka lokasi dan menyiapkan perjalanan. Alamat lengkap cabang tercantum di halaman ini agar tujuan dapat diperiksa sebelum berangkat.',
        'Sebelum menjual, lihat informasi harga emas yang tersedia sebagai acuan awal. Pemeriksaan langsung tetap diperlukan untuk mengetahui karat, berat, dan kondisi barang yang dibawa, lalu tim akan memberikan penawaran. Anda dapat bertanya kepada tim Kebon Jeruk lewat WhatsApp, termasuk untuk mengecek harga terlebih dahulu sebelum datang.',
        'Untuk pertanyaan melalui WhatsApp Kebon Jeruk, tuliskan jenis emas yang ingin diperiksa dan informasi yang Anda perlukan sebelum berkunjung. Anda boleh menyertakan kadar atau berat jika mengetahuinya, tetapi nilai tersebut tetap perlu diperiksa di cabang. Harga dapat berubah mengikuti pembaruan, jadi periksa kembali pada hari rencana datang. Bawa emas dan KTP, lalu gunakan peta pada halaman ini untuk membuka petunjuk arah ke Jl. Panjang.',
      ],
      goldIntro: 'Super Emas Kebon Jeruk melayani pemeriksaan emas perhiasan dan logam mulia, baik Antam maupun non-Antam. Cabang ini menerima emas K6–K24, termasuk yang rusak, patah, sebelah, atau tanpa surat.',
      goldTypes: ['Perhiasan', 'Logam mulia Antam dan non-Antam', 'Emas rusak, patah, atau sebelah', 'Emas tanpa surat'],
      visitGuide: 'Jam operasional cabang Kebon Jeruk adalah setiap hari pukul 09.00–20.00. Bawalah emas dan KTP. Bila ingin mengetahui harga atau bertanya sebelum mengunjungi cabang di Jl. Panjang, gunakan WhatsApp melalui tombol kontak.',
      
      whySuperEmas: [
        'Lokasi mudah diakses di area Kebon Jeruk',
        'Proses transaksi yang transparan',
        'Informasi harga yang akurat dan real-time'
      ],
      
      howToSellSteps: [
        {
          step: 1,
          title: 'Kunjungi Cabang Kebon Jeruk',
          description: 'Datang ke cabang Kebon Jeruk di Jl. Panjang dengan membawa emas yang ingin diperiksa.'
        },
        {
          step: 2,
          title: 'Pemeriksaan Emas',
          description: 'Emas Anda akan diperiksa untuk menentukan karat dan nilainya.'
        },
        {
          step: 3,
          title: 'Penawaran Harga',
          description: 'Kami akan memberikan penawaran harga berdasarkan kondisi emas.'
        },
        {
          step: 4,
          title: 'Transaksi',
          description: 'Transaksi dapat diselesaikan setelah kesepakatan harga tercapai.'
        }
      ],
      
      faq: [
        {
          question: 'Apakah harga di Super Emas Kebon Jeruk sama dengan cabang lain?',
          answer: 'Ya, harga emas di semua cabang Super Emas menggunakan acuan harga yang sama dan berlaku secara nasional.'
        },
        {
          question: 'Dimana alamat Super Emas Kebon Jeruk?',
          answer: 'Alamat lengkap Super Emas Kebon Jeruk tercantum pada bagian lokasi di halaman ini.'
        },
        {
          question: 'Bagaimana cara mengetahui harga emas terkini?',
          answer: 'Anda dapat melihat harga emas terkini di website kami yang diperbarui secara real-time, atau langsung menghubungi cabang kami.'
        }
      ]
    }
  },
  
  {
    slug: 'bogor',
    name: 'Bogor',
    streetAddress: 'Jl. Otto Iskandardinata No.42, Babakan Pasar, Kec. Bogor Tengah',
    addressLocality: 'Kota Bogor',
    addressRegion: 'Jawa Barat',
    postalCode: '16126',
    lat: -6.6025955,
    lng: 106.8012338,
    mapsUrl: 'https://maps.app.goo.gl/aKzoNWdBhAo1rzFA6',
    photo: null,
    hours: '09.00–20.00',
    whatsapp: waLink('Halo Super Emas Bogor, saya ingin cek harga emas'),
    embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d253654.78921261418!2d106.5210824!3d-6.6025955!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5a94b371393%3A0xf81315ab971df75d!2sSUPER%20EMAS%20BOGOR!5e0!3m2!1sid!2sid!4v1795489853795!5m2!1sid!2sid",
    ...branchDetails.bogor,
    
    seo: {
      title: 'Harga Emas Bogor Hari Ini Terkini | Super Emas',
      metaDescription: 'Cek harga emas terkini di Super Emas Bogor. Informasi lengkap harga buyback emas, lokasi cabang, dan cara jual emas di Bogor.',
      h1: 'Harga Emas Bogor Hari Ini',
      ogImage: '/images/logo.png',
    },
    
    content: {
      intro: 'Super Emas cabang Bogor berlokasi di Jl. Otto Iskandardinata (Otista) No.42, Babakan Pasar, Bogor Tengah, siap melayani transaksi jual beli emas untuk masyarakat Bogor dan sekitarnya. Harga yang ditampilkan adalah harga Super Emas yang berlaku secara nasional dan diperbarui secara real-time.',
      
      branchNarrative: [
        'Cabang Bogor berada di Jl. Otto Iskandardinata (Otista), Bogor Tengah, pada kawasan pusat kota. Alamat dan tautan peta tersedia untuk membantu pengunjung menuju lokasi cabang. Warga dari Babakan Pasar, Baranangsiang, Pajajaran, Tanah Sareal, dan Bogor Utara dapat menggunakan informasi tersebut untuk merencanakan kunjungan.',
        'Harga yang ditampilkan di halaman ini membantu Anda mengenali acuan nilai sebelum datang, namun hasil transaksi bergantung pada pemeriksaan emas. Tim akan menimbang dan mengecek kadar karat serta kondisi barang, kemudian menyampaikan penawaran. Jika ingin bertanya tentang emas yang akan dibawa atau mengecek harga terlebih dahulu, hubungi tim Bogor lewat WhatsApp.',
        'Saat menghubungi tim Bogor, jelaskan jenis emas yang ingin dijual dan pertanyaan yang ingin dipastikan sebelum datang. Informasi kadar atau berat dapat disampaikan jika tersedia, namun tetap perlu dikonfirmasi melalui pemeriksaan. Karena harga dapat berubah setelah pembaruan, cek kembali pada hari kunjungan. Bawa emas dan KTP ke cabang, lalu gunakan tautan peta untuk melihat petunjuk arah menuju Jl. Otto Iskandardinata.',
      ],
      goldIntro: 'Di Super Emas Bogor, perhiasan dan logam mulia Antam maupun non-Antam dapat dibawa untuk diperiksa. Penerimaan mencakup emas K6–K24, termasuk barang patah, rusak, sebelah, serta emas yang tidak memiliki surat.',
      goldTypes: ['Perhiasan', 'Logam mulia Antam dan non-Antam', 'Emas rusak, patah, atau sebelah', 'Emas tanpa surat'],
      visitGuide: 'Cabang Bogor buka setiap hari pukul 09.00–20.00. Bawa emas dan KTP saat datang. Anda dapat mengecek harga lebih dahulu dan mengirim pertanyaan melalui WhatsApp dengan pesan otomatis untuk tim Bogor.',
      
      whySuperEmas: [
        'Lokasi strategis di pusat Kota Bogor',
        'Proses transaksi jual beli emas yang transparan dan aman',
        'Harga kompetitif sesuai harga pasar terkini'
      ],
      
      howToSellSteps: [
        {
          step: 1,
          title: 'Kunjungi Cabang Bogor',
          description: 'Datang langsung ke cabang kami di Jl. Otto Iskandardinata No.42 dengan membawa emas yang ingin dijual.'
        },
        {
          step: 2,
          title: 'Pemeriksaan Emas',
          description: 'Tim kami akan memeriksa karat dan menimbang berat emas Anda secara transparan.'
        },
        {
          step: 3,
          title: 'Penawaran Harga',
          description: 'Anda akan mendapatkan penawaran harga terbaik berdasarkan harga emas hari ini.'
        },
        {
          step: 4,
          title: 'Transaksi',
          description: 'Jika setuju dengan penawaran, proses transaksi dan pencairan dana langsung diselesaikan di tempat.'
        }
      ],
      
      faq: [
        {
          question: 'Apakah harga emas di Super Emas Bogor berbeda dengan cabang lain?',
          answer: 'Tidak, harga emas yang ditampilkan adalah harga Super Emas yang berlaku sama untuk semua cabang secara nasional dan diperbarui secara real-time.'
        },
        {
          question: 'Dimana alamat lengkap Super Emas Bogor?',
          answer: 'Super Emas Bogor beralamat di Jl. Otto Iskandardinata No.42, Babakan Pasar, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16126.'
        },
        {
          question: 'Bagaimana cara menjual emas di Super Emas Bogor?',
          answer: 'Anda cukup datang langsung ke cabang kami dengan membawa emas perhiasan atau logam mulia. Tim kami akan melakukan penimbangan, pengecekan kadar karat, dan memberikan penawaran harga terbaik.'
        }
      ]
    }
  }
];

export const locations = branchRecords.map((location) => ({
  ...location,
  fullName: `Super Emas ${location.name}`,
  address: `${location.streetAddress}, ${location.addressLocality}, ${location.addressRegion} ${location.postalCode}`,
  faq: [...location.content.faq, ...makeBranchFaq(location.name)],
}));

// Helper functions
export const getLocationBySlug = (slug) => {
  return locations.find(loc => loc.slug === slug);
};

export const getAllLocationSlugs = () => {
  return locations.map(loc => loc.slug);
};
