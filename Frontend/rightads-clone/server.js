import express from 'express';
import cors from 'cors';
import http from 'http';

const app = express();

const FASTAPI_URL =
  process.env.FASTAPI_URL || 'https://right-ads-api.onrender.com';

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://right-ads-ten.vercel.app'
    ]
  })
);

const BUSINESS_API_PREFIXES = [
  '/api/contact',
  '/api/leads',
  '/api/careers',
  '/api/internships',
  '/api/certificates',
  '/api/admin',
  '/api/health',
];

function proxyToFastAPI(req, res) {
  const targetUrl = new URL(req.originalUrl, FASTAPI_URL);

  const headers = {
    ...req.headers,
    host: new URL(FASTAPI_URL).host,
  };

  delete headers.connection;

  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error('FastAPI proxy error:', err.message);

    if (!res.headersSent) {
      res.status(502).json({
        error: 'Backend service unavailable',
      });
    }
  });

  req.pipe(proxyReq, { end: true });
}

BUSINESS_API_PREFIXES.forEach((prefix) => {
  app.use(prefix, (req, res) => proxyToFastAPI(req, res));
});

app.use('/api/chat', express.json());

app.post('/api/chat', async (req, res) => {
  console.log('📩 Chat request received');

  try {
    const { contents } = req.body;

    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        error: 'Gemini API key missing',
      });
    }

    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 350,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Gateway active on port ${PORT}`);
  console.log(`Business API proxied to ${FASTAPI_URL}`);
});
