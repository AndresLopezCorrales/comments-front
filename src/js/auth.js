function openAuthModal(mode = 'login') {
  switchAuthTab(mode);
  document.getElementById('authModal').classList.remove('hidden');
  setTimeout(() => document.getElementById('authUsername').focus(), 50);
}

function closeAuthModal() {
  document.getElementById('authModal').classList.add('hidden');
  document.getElementById('authUsername').value = '';
  document.getElementById('authPassword').value = '';
  ui.clearAuthError();
}

function switchAuthTab(mode) {
  state.authMode   = mode;
  const isLogin    = mode === 'login';

  const tLogin    = document.getElementById('tabLogin');
  const tRegister = document.getElementById('tabRegister');

  tLogin.className = `font-mono text-xs uppercase tracking-widest px-4 py-1.5 transition-all duration-150 cursor-pointer ${
    isLogin ? 'bg-purple-600 text-purple-200' : 'text-ash hover:text-paper'
  }`;
  tRegister.className = `font-mono text-xs uppercase tracking-widest px-4 py-1.5 transition-all duration-150 cursor-pointer ${
    !isLogin ? 'bg-purple-600 text-purple-200' : 'text-ash hover:text-paper'
  }`;

  document.getElementById('authSubmitBtn').textContent = isLogin ? 'Entrar' : 'Crear cuenta';

  document.getElementById('authSwitch').innerHTML = isLogin
    ? `¿No tienes cuenta? <button onclick="switchAuthTab('register')" class="text-purple-500 hover:underline ml-1">Regístrate aquí</button>`
    : `¿Ya tienes cuenta? <button onclick="switchAuthTab('login')" class="text-purple-500 hover:underline ml-1">Inicia sesión</button>`;

  ui.clearAuthError();
}

async function handleAuth() {
  const username = document.getElementById('authUsername').value.trim();
  const password = document.getElementById('authPassword').value;

  if (!username || !password) return ui.showAuthError('Completa todos los campos');

  const btn       = document.getElementById('authSubmitBtn');
  btn.disabled    = true;
  btn.textContent = state.authMode === 'login' ? 'Entrando...' : 'Creando cuenta...';
  ui.clearAuthError();

  try {
    const data = state.authMode === 'login'
      ? await api.login(username, password)
      : await api.register(username, password);

    // Guardar sesión
    state.authToken    = data.access_token;
    state.authUsername = username;
    sessionStorage.setItem('cw_token',    state.authToken);
    sessionStorage.setItem('cw_username', state.authUsername);

    closeAuthModal();
    ui.showUserHeader(state.authUsername);
    ui.enableCompose(state.authUsername);
    await loadComments(); // Recargar comentarios para mostrar opciones de edición/borrado
  } catch (err) {
    ui.showAuthError(err.message);
  } finally {
    btn.disabled    = false;
    btn.textContent = state.authMode === 'login' ? 'Entrar' : 'Crear cuenta';
  }
}

function handleLogout() {
  state.authToken    = null;
  state.authUsername = null;
  sessionStorage.removeItem('cw_token');
  sessionStorage.removeItem('cw_username');
  ui.showGuestHeader();
  ui.disableCompose();
  loadComments();
}
