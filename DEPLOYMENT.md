# Deployment Guide

## API Proxy Configuration

Aplikasi ini menggunakan proxy untuk menghubungkan frontend dengan backend API.

### Development (Local)

Untuk development lokal, proxy dikonfigurasi di `package.json`:

```json
"proxy": "https://super-emas-be.onrender.com"
```

Semua request ke `/api/*` akan otomatis di-proxy ke backend.

### Production (Vercel)

Untuk production di Vercel, proxy dikonfigurasi di `vercel.json`:

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

Aplikasi ini tidak memerlukan environment variables untuk API URL karena menggunakan relative paths (`/api/*`) yang akan di-proxy.

Jika Anda perlu mengubah backend URL:

1. **Development**: Edit `proxy` di `package.json`
2. **Production**: Edit `destination` di `vercel.json`

## Deployment ke Vercel

1. Push code ke GitHub:
   ```bash
   git add .
   git commit -m "Update proxy configuration"
   git push origin main
   ```

2. Vercel akan otomatis detect dan deploy

3. Tidak perlu setup environment variables di Vercel dashboard

## Testing API Calls

Semua API calls menggunakan relative paths:

```javascript
// ✅ Correct - akan di-proxy
axios.get('/api/comparison-data')
axios.post('/api/auth/login')
axios.get('/api/customers')

// ❌ Wrong - jangan gunakan absolute URLs
axios.get('http://localhost:5000/api/...')
axios.get('https://super-emas-be.onrender.com/api/...')
```

## Troubleshooting

### API calls gagal di production

1. Cek `vercel.json` - pastikan `destination` URL benar
2. Cek Network tab di browser - pastikan request ke `/api/*` berhasil
3. Cek Vercel logs untuk error details

### CORS errors

Pastikan backend (super-emas-be) sudah configure CORS untuk allow origin dari Vercel domain Anda.

### Cache issues

API calls menggunakan cache busting dengan timestamp:
```javascript
axios.get(`/api/comparison-data?t=${new Date().getTime()}`)
```
