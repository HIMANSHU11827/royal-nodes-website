# Royal Nodes — Website

Marketing site and payment backend for **Royal Nodes**, a hosting platform (shared hosting, VPS, managed agents, OpenClaw, Hermes Agent).

- `app/` — frontend. React 19 + Vite 8 + Tailwind 3, multi-page build (home, pricing, agent, managed-openclaw, managed-hermes-agent).
- `server/` — payments API. Express 4 + Razorpay (order creation and HMAC signature verification).

## Requirements

- Node.js 20+
- A Razorpay account (test keys are enough for local work)

## Frontend

```bash
cd app
npm install
npm run dev       # vite dev server, proxies /api -> http://localhost:8790
npm run build     # static build into app/dist
npm run preview   # serve the built output
```

The build emits five HTML entry points: `index.html`, `pricing/`, `agent/`, `managed-openclaw/`, `managed-hermes-agent/`.

## Payments backend

```bash
cd server
npm install
cp .env.example .env    # then fill in the keys
npm start
```

| Variable | Purpose |
| --- | --- |
| `RAZORPAY_KEY_ID` | Razorpay key id, also returned to the client so checkout can open |
| `RAZORPAY_KEY_SECRET` | Used to sign and verify orders. Server-side only, never shipped to the browser |
| `PORT` | Listen port, default `8787` (the Vite dev proxy expects `8790`) |

Endpoints:

- `GET /api/health` — liveness check
- `GET /api/pay/status` — whether Razorpay is configured, plus the public key id
- `POST /api/create-order` — body `{ amount (paise, min 100), currency, receipt, plan }`
- `POST /api/verify-payment` — body `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`, verified with `crypto.timingSafeEqual`

If the keys are missing the server still starts, but order creation returns `401` and `/api/pay/status` reports `enabled: false`.

## Frontend env

`app/.env` holds `VITE_RAZORPAY_KEY_ID` — the public key id only. Anything prefixed `VITE_` ends up in the browser bundle, so no secrets there.

## Security notes

- `.env` files are gitignored; only `.env.example` is tracked.
- The payment secret never reaches the client — signature verification happens in `server/index.js`.
- Rotate the Razorpay keys before going live with a production account.

## Layout

```
app/
  index.html, pricing/, agent/, managed-openclaw/, managed-hermes-agent/   # entry points
  src/
    App.jsx, main.jsx, *-main.jsx      # per-entry roots
    pages/                             # Home, Pricing, Checkout, Billing, Account, Admin, Deals, ...
    components/                        # Header, Footer, Cart/Checkout/Intelligence modals, Motion
    data/catalog.js                    # plan and product catalog
    lib/                               # auth, payments, store, specs
server/
  index.js                             # Express + Razorpay
```
