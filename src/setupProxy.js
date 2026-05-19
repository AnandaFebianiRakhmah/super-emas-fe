const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://super-emas-be.onrender.com',
      changeOrigin: true,
      secure: true,
      onProxyReq: (proxyReq, req, res) => {
        // Log proxy requests untuk debugging
        console.log(`[Proxy] ${req.method} ${req.path} -> ${proxyReq.path}`);
      },
      onError: (err, req, res) => {
        console.error('[Proxy Error]', err.message);
        res.status(500).json({
          error: 'Proxy Error',
          message: 'Tidak dapat terhubung ke server backend'
        });
      },
      timeout: 30000, // 30 detik timeout
    })
  );
};
