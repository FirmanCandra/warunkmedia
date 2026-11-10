const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Fetch tracking details for a specific order code from Laravel backend
 */
export async function fetchTrackingOrder(code) {
  try {
    const res = await fetch(`${API_BASE}/tracking/${encodeURIComponent(code)}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Error ${res.status}: Gagal memuat data`);
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API tracking fallback:', err.message);
    return null;
  }
}

/**
 * Fetch all orders from backend
 */
export async function fetchOrders(userId = null) {
  try {
    const url = userId ? `${API_BASE}/orders?user_id=${userId}` : `${API_BASE}/orders`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API orders fallback:', err.message);
    return null;
  }
}

/**
 * Create a new order in backend
 */
export async function createOrderApi(orderData) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Gagal membuat pesanan di server');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API create order fallback:', err.message);
    return null;
  }
}

/**
 * Update order stage and upload photos
 */
export async function updateStageApi(orderId, stageData, photoFiles = []) {
  try {
    const formData = new FormData();
    formData.append('stage_id', stageData.stage_id);
    if (stageData.notes) formData.append('notes', stageData.notes);
    if (stageData.stage_date) formData.append('stage_date', stageData.stage_date);
    
    photoFiles.forEach((file) => {
      formData.append('photos[]', file);
    });

    const res = await fetch(`${API_BASE}/orders/${orderId}/stage-update`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    if (!res.ok) throw new Error('Gagal update tahapan di server');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API stage update fallback:', err.message);
    return null;
  }
}

/**
 * Authenticate user with backend
 */
export async function loginApi(email, password) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || 'Login gagal.');
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('API login fallback:', err.message);
    return null;
  }
}
