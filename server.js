const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    name: 'MAi Bot AI Server',
    status: 'online',
    endpoints: ['/health', '/api/chat', '/api/image-understanding', '/api/crypto-analysis', '/api/trading-signal']
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

function requireField(body, field) {
  return body && body[field] !== undefined && body[field] !== null && String(body[field]).trim() !== '';
}

app.post('/api/chat', (req, res) => {
  const { message, conversation = [] } = req.body || {};

  if (!requireField(req.body, 'message')) {
    return res.status(400).json({ error: 'The message field is required.' });
  }

  // Replace this response with the model provider integration used by MAi Bot.
  res.json({
    response: `MAi Bot received: ${String(message).trim()}`,
    message: String(message).trim(),
    conversationLength: Array.isArray(conversation) ? conversation.length : 0,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/image-understanding', (req, res) => {
  const { image, imageUrl, prompt = 'Describe this image.' } = req.body || {};

  if (!image && !imageUrl) {
    return res.status(400).json({ error: 'Provide an image or imageUrl.' });
  }

  // Replace this response with vision-model integration.
  res.json({
    description: 'Image received and ready for analysis.',
    prompt,
    source: imageUrl ? 'url' : 'base64',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/crypto-analysis', (req, res) => {
  const { symbol, timeframe = '1d' } = req.body || {};

  if (!requireField(req.body, 'symbol')) {
    return res.status(400).json({ error: 'The symbol field is required.' });
  }

  // Replace this response with live market-data and analysis integration.
  res.json({
    symbol: String(symbol).toUpperCase(),
    timeframe,
    analysis: 'Insufficient live market data for a reliable analysis.',
    recommendation: ' wait',
    confidence: 0,
    disclaimer: 'This is not financial advice.',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/trading-signal', (req, res) => {
  const { symbol, timeframe = '1d', price } = req.body || {};

  if (!requireField(req.body, 'symbol')) {
    return res.status(400).json({ error: 'The symbol field is required.' });
  }

  // Replace this response with the strategy/model used to generate signals.
  res.json({
    symbol: String(symbol).toUpperCase(),
    timeframe,
    price: price ?? null,
    signal: 'HOLD',
    confidence: 0,
    reason: 'No live market data or configured trading strategy is available.',
    disclaimer: 'Trading involves risk. This is not financial advice.',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`MAi Bot AI server listening on port ${PORT}`);
});

module.exports = app;
