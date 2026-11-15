const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Could not load Razorpay checkout.'));
    document.body.appendChild(script);
  });
}

export async function gatewayStatus() {
  try {
    const res = await fetch('/api/pay/status', { cache: 'no-store' });
    if (!res.ok) return { enabled: false, keyId: KEY_ID || null };
    const data = await res.json();
    return { ...data, keyId: data.keyId || KEY_ID || null };
  } catch {
    return { enabled: false, keyId: KEY_ID || null };
  }
}

export async function createOrder({ amountPaise, receipt, plan }) {
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountPaise, currency: 'INR', receipt, plan })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not create the payment order.');
  return data;
}

export async function verifyPayment(response) {
  const res = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || 'Payment verification failed.');
  return data;
}

export const isTestKey = (key) => typeof key === 'string' && key.startsWith('rzp_test_');

export async function payWithRazorpay({ amountPaise, receipt, plan, user, onSuccess, onFailure, onDismiss }) {
  await loadRazorpay();
  const order = await createOrder({ amountPaise, receipt, plan });
  const testMode = isTestKey(order.key_id || KEY_ID);

  const options = {
    key: order.key_id || KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Royal Nodes',
    description: testMode ? `${plan} (TEST MODE)` : plan,
    order_id: order.order_id,
    prefill: { name: user?.name || '', email: user?.email || '', contact: user?.phone || '' },
    theme: { color: '#1769FF' },
    notes: { test_mode: testMode ? 'true' : 'false' },
    handler: async (response) => {
      try {
        const verified = await verifyPayment(response);
        onSuccess?.({ ...response, ...verified });
      } catch (err) {
        onFailure?.(err);
      }
    },
    modal: { ondismiss: () => onDismiss?.() }
  };

  const checkout = new window.Razorpay(options);
  checkout.on('payment.failed', (resp) => {
    onFailure?.(new Error(resp?.error?.description || 'Payment failed.'));
  });
  checkout.open();
  return order;
}
