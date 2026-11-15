import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import 'dotenv/config';
import Razorpay from 'razorpay';

const app = express();
app.use(cors());
app.use(express.json());

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const rzp = KEY_ID && KEY_SECRET ? new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET }) : null;

app.get('/api/pay/status', (_req, res) => {
  res.json({ enabled: Boolean(rzp), provider: 'razorpay', keyId: KEY_ID || null });
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/create-order', async (req, res) => {
  if (!rzp) {
    return res.status(401).json({ error: 'Razorpay keys are not configured on the server.' });
  }

  const amount = Math.round(Number(req.body?.amount));
  const currency = req.body?.currency || 'INR';
  const receipt = String(req.body?.receipt || `rn_${Date.now()}`).slice(0, 40);

  if (!Number.isFinite(amount) || amount < 100) {
    return res.status(400).json({ error: 'Amount must be at least 100 paise.' });
  }

  try {
    const order = await rzp.orders.create({
      amount,
      currency,
      receipt,
      notes: { plan: String(req.body?.plan || '').slice(0, 200) }
    });
    res.json({ order_id: order.id, amount: order.amount, currency: order.currency, key_id: KEY_ID });
  } catch (err) {
    const status = err?.statusCode === 401 ? 401 : 500;
    console.error('create-order failed:', err?.error || err?.message || err);
    res.status(status).json({
      error: status === 401
        ? 'Razorpay rejected the API keys (authentication failed). The keys are invalid or were rotated — update RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET in server/.env and restart the payment server.'
        : 'Could not create the Razorpay order. Please try again.'
    });
  }
});

app.post('/api/verify-payment', (req, res) => {
  if (!KEY_SECRET) {
    return res.status(401).json({ ok: false, error: 'Razorpay keys are not configured on the server.' });
  }

  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body || {};
  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ ok: false, error: 'Missing razorpay_order_id, razorpay_payment_id or razorpay_signature.' });
  }

  const expected = crypto.createHmac('sha256', KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');
  const valid = expected.length === signature.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  if (!valid) {
    return res.status(400).json({ ok: false, error: 'Payment signature verification failed.' });
  }

  res.json({ ok: true, orderId, paymentId });
});

const port = Number(process.env.PORT) || 8787;
app.listen(port, () => {
  console.log(`Royal Nodes payments listening on http://localhost:${port}`);
  console.log(rzp ? 'Razorpay: configured' : 'Razorpay: MISSING KEYS (set RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET)');
});
