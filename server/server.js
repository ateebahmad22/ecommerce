import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory Database initialized with default mock data
const DB_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const ORDERS_FILE = path.join(DB_DIR, 'orders.json');
const REVIEWS_FILE = path.join(DB_DIR, 'reviews.json');
const SUBSCRIBERS_FILE = path.join(DB_DIR, 'subscribers.json');

const defaultOrders = [
  {
    orderId: "INV-8924",
    trackingNumber: "TRK-FEDEX-884920",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "Sonic Transit",
    currentLocation: "Geneva Aviation Logistics Hub",
    estimatedDelivery: "Tomorrow, by 10:30 AM",
    customer: {
      name: "Marcus Vance",
      email: "marcus@futurist.io",
      address: "888 Silicon Boulevard, Suite 400",
      city: "San Francisco",
      country: "United States"
    },
    items: [
      {
        id: "prod-1",
        name: "QUANTUM SLIMBOOK",
        price: 1299.00,
        qty: 1,
        color: "Obsidian Cyber"
      }
    ],
    total: 1299.00,
    paymentMethod: "Apple Pay"
  }
];

const defaultReviews = [
  {
    id: "rev-1",
    name: "Julian Thorne",
    role: "GLOBAL INNOVATOR",
    rating: 5,
    quote: "The attention to detail and futuristic vision of this collection is unparalleled. A complete game-changer.",
    avatar: "/assets/avatar_julian.png",
    date: "2026-09-28"
  },
  {
    id: "rev-2",
    name: "Anya Volkov",
    role: "CHIEF DESIGNER",
    rating: 5,
    quote: "The attention to detail and futuristic vision of this collection is unparalleled. A complete game-changer.",
    avatar: "/assets/avatar_anya.png",
    date: "2026-10-02"
  },
  {
    id: "rev-3",
    name: "Kenji Tanaka",
    role: "CREATIVE DIRECTOR",
    rating: 5,
    quote: "The attention to detail and futuristic vision of this collection is unparalleled. A complete game-changer.",
    avatar: "/assets/avatar_kenji.png",
    date: "2026-10-09"
  }
];

function getOrders() {
  if (fs.existsSync(ORDERS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    } catch (e) {
      return defaultOrders;
    }
  }
  return defaultOrders;
}

function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function getReviews() {
  if (fs.existsSync(REVIEWS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
    } catch (e) {
      return defaultReviews;
    }
  }
  return defaultReviews;
}

function saveReviews(reviews) {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'INNOVATE Quantum Core API',
    version: '2.4.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Validate Coupon / Calculate Cart
app.post('/api/cart/calculate', (req, res) => {
  const { items = [], promoCode = '' } = req.body;
  const rawSubtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1), 0);

  let discountPercent = 0;
  let promoMessage = '';

  const cleanPromo = (promoCode || '').trim().toUpperCase();
  if (cleanPromo === 'INNOVATE20') {
    discountPercent = 20;
    promoMessage = '20% Special Innovator Discount Applied';
  } else if (cleanPromo === 'CYBER40') {
    discountPercent = 40;
    promoMessage = '40% Flash Sale Allocation Applied';
  } else if (cleanPromo === 'VIP') {
    discountPercent = 15;
    promoMessage = '15% VIP Concierge Access Applied';
  } else if (cleanPromo.length > 0) {
    promoMessage = 'Invalid or expired passkey code.';
  }

  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const total = Math.max(0, rawSubtotal - discountAmount);

  res.json({
    subtotal: rawSubtotal,
    discountPercent,
    discountAmount,
    shipping: 0, // Always complimentary
    total,
    promoMessage
  });
});

// 3. Checkout & Payment Endpoint
app.post('/api/checkout', (req, res) => {
  const { customer, items, paymentMethod, paymentDetails, promoCode } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Shopping bag is empty.' });
  }

  if (!customer || !customer.name || !customer.email) {
    return res.status(400).json({ error: 'Customer contact details required.' });
  }

  const rawSubtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1), 0);
  let discountPercent = 0;
  if ((promoCode || '').trim().toUpperCase() === 'INNOVATE20') discountPercent = 20;
  if ((promoCode || '').trim().toUpperCase() === 'CYBER40') discountPercent = 40;
  if ((promoCode || '').trim().toUpperCase() === 'VIP') discountPercent = 15;

  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const total = rawSubtotal - discountAmount;

  // Generate Unique Order and Tracking IDs
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const orderId = `INV-${randomNum}`;
  const trackingNumber = `TRK-SONIC-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder = {
    orderId,
    trackingNumber,
    date: new Date().toISOString(),
    status: "Confirmed & Prepared for Supersonic Transit",
    currentLocation: "Cupertino Precision Engineering Hub",
    estimatedDelivery: "Within 24-48 Hours",
    customer,
    items,
    paymentMethod: paymentMethod || "Apple Pay Biometric Passkey",
    subtotal: rawSubtotal,
    discountAmount,
    total,
    transactionHash: `0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}`
  };

  const orders = getOrders();
  orders.unshift(newOrder);
  saveOrders(orders);

  res.json({
    success: true,
    message: "Payment successfully authorized and order sealed.",
    order: newOrder
  });
});

// 4. Order Tracking
app.get('/api/orders/:trackingNumber', (req, res) => {
  const { trackingNumber } = req.params;
  const orders = getOrders();
  const order = orders.find(
    (o) =>
      o.trackingNumber.toLowerCase() === trackingNumber.toLowerCase() ||
      o.orderId.toLowerCase() === trackingNumber.toLowerCase()
  );

  if (!order) {
    return res.status(404).json({
      error: `No consignment located matching identifier '${trackingNumber}'. Try 'INV-8924'.`
    });
  }

  res.json(order);
});

// 5. Customer Reviews
app.get('/api/reviews', (req, res) => {
  res.json(getReviews());
});

app.post('/api/reviews', (req, res) => {
  const { name, role, quote, rating } = req.body;
  if (!name || !quote) {
    return res.status(400).json({ error: 'Name and testimonial text are required.' });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    name,
    role: role || 'VERIFIED INNOVATOR',
    rating: Number(rating) || 5,
    quote,
    avatar: '/assets/avatar_julian.png',
    date: new Date().toISOString().split('T')[0]
  };

  const reviews = getReviews();
  reviews.unshift(newReview);
  saveReviews(reviews);

  res.json({ success: true, review: newReview });
});

// 6. Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid futuristic email required.' });
  }

  res.json({
    success: true,
    message: 'Welcome to Innovate Elite. Your 20% discount code is INNOVATE20.',
    promoCode: 'INNOVATE20'
  });
});

// 7. Concierge / Contact Message
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  res.json({
    success: true,
    ticketId: `TKT-${Math.floor(10000 + Math.random() * 90000)}`,
    message: 'Your inquiry has reached our global senior concierge desk. Response scheduled within 2 hours.'
  });
});

// 8. 24/7 AI Concierge Live Chat
app.post('/api/concierge/chat', (req, res) => {
  const { message = '' } = req.body;
  const lower = message.toLowerCase();

  let reply = "Welcome to the Innovate Concierge. All our designs feature aerospace-grade titanium, neural feedback interfaces, and zero-gravity balance.";

  if (lower.includes('shipping') || lower.includes('delivery')) {
    reply = "We offer complimentary Supersonic Global Express across 180 countries. Orders arrive within 24–48 hours with insured white-glove courier handling.";
  } else if (lower.includes('return') || lower.includes('refund')) {
    reply = "We provide a 30-day effortless doorstep return policy with complimentary packaging restoration and immediate refund to your original payment method.";
  } else if (lower.includes('discount') || lower.includes('promo') || lower.includes('code') || lower.includes('sale')) {
    reply = "Use exclusive passkey code 'INNOVATE20' for 20% off your purchase, or shop the Limited-Time Offer for up to 40% off select pieces.";
  } else if (lower.includes('track') || lower.includes('order')) {
    reply = "You can track any order right from our Customer Services section using your Order ID (such as 'INV-8924') to see real-time transit telemetry.";
  } else if (lower.includes('payment') || lower.includes('pay') || lower.includes('apple pay') || lower.includes('crypto')) {
    reply = "We support Apple Pay Biometric Passkey, Visa, Mastercard, AMEX, PayPal, and Bitcoin quantum-encrypted crypto payments.";
  } else if (lower.includes('warranty') || lower.includes('craft')) {
    reply = "Every piece in the collection is accompanied by our 3-Year Global Titanium Heritage Warranty and micron-level craftsmanship certification.";
  }

  res.json({ reply, timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[INNOVATE BACKEND] Quantum Core API listening on port ${PORT}`);
});
