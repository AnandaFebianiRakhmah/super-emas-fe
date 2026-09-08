# Deployment Guide

## Next.js Runtime

Aplikasi sekarang menggunakan Next.js App Router. Jalankan secara lokal dengan:

```bash
npm install
npm run dev
```

Untuk menguji hasil production:

```bash
npm run build
npm start
```

### Production (Vercel)

Vercel akan mendeteksi Next.js dari script `build` dan `start`. Rewrite API yang dipertahankan di `vercel.json` adalah:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://super-emas-be.onrender.com/api/:path*"
    }
  ]
}
```

## Environment Variables

Harga pada halaman kota diambil server-side menggunakan `API_BASE_URL` dengan fallback ke backend production:

```env
API_BASE_URL=https://super-emas-be.onrender.com
```

Set variable ini di Vercel jika backend berbeda. Jangan menggunakan `NEXT_PUBLIC_` karena URL ini tidak perlu diekspos sebagai konfigurasi publik.

## Deployment ke Vercel

1. Push code ke GitHub:
   ```bash
   git add .
   git commit -m "Update proxy configuration"
   git push origin main
   ```

2. Vercel akan otomatis detect dan deploy

3. Set `API_BASE_URL` di Vercel bila ingin mengganti backend default

## Existing API Calls

Endpoint backend yang dipertahankan:

```javascript
GET /api/comparison-data
GET/POST /api/auth/*
GET/POST/PUT/DELETE /api/customers
GET/POST/PUT/DELETE /api/transactions/initialization
GET/POST /api/admin/roles dan /api/admin/permissions
```

## Troubleshooting

### API calls gagal di production

1. Cek `vercel.json` - pastikan `destination` URL benar
2. Cek Network tab di browser - pastikan request ke `/api/*` berhasil
3. Cek Vercel logs untuk error details

### CORS errors

Pastikan backend (super-emas-be) sudah configure CORS untuk allow origin dari Vercel domain Anda.

### Cache issues

Halaman kota menggunakan Next.js revalidation setiap 300 detik untuk harga server-rendered. Komponen legacy tetap melakukan refresh client-side setiap 30 detik agar UI existing tetap real-time.
