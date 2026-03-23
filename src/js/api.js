const api = {

  //COMMENTS
  async getComments() {
    const res = await fetch(`${API_BASE}/comments`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  },

  async createComment(message) {
    const res = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.authToken}`,
      },
      body: JSON.stringify({
        message,
        date: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Error ${res.status}`);
    }
    return res.json();
  },

  async deleteComment(id) {
    const res = await fetch(`${API_BASE}/comments/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${state.authToken}` },
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
  },

  
  //AUTH
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Credenciales incorrectas');
    return data;
  },

  async register(username, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'No se pudo crear la cuenta');
    return data;
  },
};
