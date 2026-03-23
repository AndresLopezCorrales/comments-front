
const API_BASE = 'http://localhost:3001';

// Estado de sesión compartido entre módulos
const state = {
  authToken:    sessionStorage.getItem('cw_token')    || null,
  authUsername: sessionStorage.getItem('cw_username') || null,
  authMode:     'login',         // 'login' | 'register'
  pendingDeleteId: null,
};
