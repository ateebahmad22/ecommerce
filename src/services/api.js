const API_BASE = 'http://127.0.0.1:5001/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (e) {
    return { status: 'offline', error: e.message };
  }
}

export async function calculateCart(items, promoCode) {
  try {
    const res = await fetch(`${API_BASE}/cart/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, promoCode }),
    });
    return await res.json();
  } catch (e) {
    // Fallback calculation
    const rawSubtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1), 0);
    return {
      subtotal: rawSubtotal,
      discountPercent: 0,
      discountAmount: 0,
      shipping: 0,
      total: rawSubtotal,
      promoMessage: ''
    };
  }
}

export async function submitCheckout(payload) {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Checkout failed');
  }
  return await res.json();
}

export async function trackOrder(trackingNumber) {
  const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(trackingNumber)}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Tracking lookup failed');
  }
  return await res.json();
}

export async function fetchReviews() {
  try {
    const res = await fetch(`${API_BASE}/reviews`);
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function postReview(reviewData) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  return await res.json();
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return await res.json();
}

export async function submitContact(contactData) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  return await res.json();
}

export async function sendConciergeMessage(message) {
  const res = await fetch(`${API_BASE}/concierge/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return await res.json();
}
