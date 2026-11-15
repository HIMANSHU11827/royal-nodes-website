import 'dotenv/config';

const id = process.env.RAZORPAY_KEY_ID;
const secret = process.env.RAZORPAY_KEY_SECRET;

if (!id || !secret) {
  console.log('MISSING: set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env');
  process.exit(1);
}

const auth = Buffer.from(`${id}:${secret}`).toString('base64');
const res = await fetch('https://api.razorpay.com/v1/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
  body: JSON.stringify({ amount: 100, currency: 'INR' })
});

const body = await res.json().catch(() => ({}));
console.log(`Key ID : ${id}`);
console.log(`Result : ${res.status} ${res.ok ? 'OK — keys are valid' : 'FAILED — ' + (body?.error?.description || 'invalid keys')}`);
