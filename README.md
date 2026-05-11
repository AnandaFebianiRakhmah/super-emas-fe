# Super Emas - Frontend

Aplikasi frontend untuk Super Emas, platform jual beli emas terpercaya.

## 🚀 Teknologi

- React 18.2.0
- React Router 6.22.0
- React Bootstrap 2.10.10
- Axios 1.9.0
- React Icons 5.6.0

## 📦 Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm start

# Build untuk production
npm run build
```

## 🔧 Konfigurasi

### Backend API
Backend API dikonfigurasi di `package.json`:
```json
"proxy": "https://super-emas-be.onrender.com"
```

Untuk development lokal, ubah ke:
```json
"proxy": "http://localhost:5000"
```

### Environment Variables
Buat file `.env` untuk konfigurasi tambahan:
```
REACT_APP_API_BASE_URL=https://super-emas-be.onrender.com
```

## 🐛 Troubleshooting

### Error: Proxy error ECONNRESET

**Penyebab:**
- Backend server tidak aktif atau tidak dapat dijangkau
- Koneksi internet bermasalah
- Backend server sedang cold start (Render free tier)

**Solusi:**
1. **Periksa status backend:**
   - Buka https://super-emas-be.onrender.com di browser
   - Tunggu beberapa menit jika server sedang cold start

2. **Periksa koneksi internet:**
   - Pastikan koneksi internet stabil
   - Coba akses website lain untuk memastikan

3. **Gunakan data cache:**
   - Aplikasi akan otomatis menggunakan data dummy jika backend tidak tersedia
   - Data akan diperbarui otomatis ketika backend kembali online

4. **Development lokal:**
   ```bash
   # Install http-proxy-middleware jika belum
   npm install --save-dev http-proxy-middleware
   
   # Restart development server
   npm start
   ```

### Error: Timeout

**Solusi:**
- Timeout sudah dikonfigurasi 10 detik
- Jika masih timeout, periksa koneksi internet
- Backend mungkin sedang overload, tunggu beberapa saat

### Data tidak update

**Solusi:**
- Data direfresh otomatis setiap 30 detik
- Refresh manual dengan reload halaman (F5)
- Clear browser cache jika masalah berlanjut

## 📱 Fitur

### Landing Page
- Hero Section dengan CTA
- Daftar harga emas real-time
- Kalkulator harga emas
- Informasi tentang layanan
- Panduan cara jual emas
- Lokasi toko

### Dashboard (Admin)
- Manajemen pelanggan
- Manajemen transaksi
- Manajemen inventori
- Manajemen role & permission
- Laporan penjualan

## 🔐 Authentication

Aplikasi menggunakan cookie-based authentication:
- Login: `/login`
- Dashboard: `/dashboard` (protected)
- Logout: otomatis clear cookies

## 📝 Scripts

```bash
# Development
npm start                 # Jalankan dev server di port 3000

# Production
npm run build            # Build untuk production
npm test                 # Jalankan tests

# Linting
npm run lint             # Check code quality
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy otomatis

### Manual Build
```bash
npm run build
# Upload folder 'build' ke hosting
```

## 📄 License

© 2024 Super Emas. Hak cipta dilindungi.

## 🤝 Support

Untuk bantuan, hubungi:
- WhatsApp: +62 851-6888-8700
- Email: support@superemas.com
