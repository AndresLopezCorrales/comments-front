const ui = {

  // FEED
  showLoader() {
    document.getElementById('commentsList').innerHTML = `
      <div class="flex items-center justify-center py-16">
        <div class="flex gap-1.5">
          <span class="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style="animation-delay:0s"></span>
          <span class="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style="animation-delay:.15s"></span>
          <span class="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style="animation-delay:.3s"></span>
        </div>
      </div>`;
  },

  showEmpty() {
    document.getElementById('commentsList').innerHTML = `
      <div class="text-center py-20">
        <div class="text-5xl mb-4 opacity-20">📌</div>
        <p class="font-display font-semibold text-2xl text-ash tracking-widest uppercase">No hay comentarios aún</p>
        <p class="font-mono text-ash/50 text-xs mt-2">Sé el primero en publicar algo</p>
      </div>`;
  },

  showConnectionError() {
    document.getElementById('commentsList').innerHTML = `
      <div class="text-center py-16">
        <p class="font-mono text-red text-sm">⚠ No se pudo conectar al servidor</p>
        <p class="font-mono text-ash/60 text-xs mt-2">Ha habido un problema al intentar conectarse al servidor. Por favor, inténtalo de nuevo más tarde.</p>
        <button onclick="loadComments()"
          class="mt-4 font-mono text-xs text-purple-500 hover:underline tracking-widest uppercase">
          Reintentar
        </button>
      </div>`;
  },

  renderComments(comments) {
    const sorted = [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));

    document.getElementById('headerCount').textContent =
      `${sorted.length} mensaje${sorted.length !== 1 ? 's' : ''}`;

    if (!sorted.length) { this.showEmpty(); return; }

    document.getElementById('commentsList').innerHTML = sorted.map((c, i) =>
      commentCard(c, i)
    ).join('');
  },

  removeCard(id) {
    const card = document.getElementById(`card-${id}`);
    if (!card) return;
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    card.style.opacity    = '0';
    card.style.transform  = 'translateX(20px)';
    setTimeout(() => {
      card.remove();
      const remaining = document.querySelectorAll('[id^="card-"]').length;
      document.getElementById('headerCount').textContent =
        `${remaining} mensaje${remaining !== 1 ? 's' : ''}`;
      if (remaining === 0) ui.showEmpty();
    }, 320);
  },

  enableCompose(username) {
    const form   = document.getElementById('composeForm');
    const dot    = document.getElementById('composeDot');
    const msg    = document.getElementById('inputMessage');
    const btn    = document.getElementById('btnPublish');
    const input  = document.getElementById('inputUsername');
    const banner = document.getElementById('authBanner');

    form.classList.remove('compose-disabled');
    msg.disabled      = false;
    btn.disabled      = false;
    input.value       = username;
    msg.placeholder   = 'Escribe algo para el tablón...';

    // Resetear className limpio — sin acumular clases residuales
    btn.className = 'w-full bg-purple-600 text-purple-200 font-display font-bold text-lg tracking-widest uppercase py-3 hover:bg-purple-700 active:scale-95 cursor-pointer transition-all duration-150';
    dot.className = 'w-2 h-2 rounded-full bg-purple-500 animate-pulse';

    banner.classList.add('hidden');
  },

  disableCompose() {
    const form   = document.getElementById('composeForm');
    const dot    = document.getElementById('composeDot');
    const msg    = document.getElementById('inputMessage');
    const btn    = document.getElementById('btnPublish');
    const input  = document.getElementById('inputUsername');
    const banner = document.getElementById('authBanner');

    form.classList.add('compose-disabled');
    msg.disabled      = true;
    btn.disabled      = true;
    input.value       = '';
    msg.value         = '';
    msg.placeholder   = 'Inicia sesión para escribir...';

    btn.className = 'w-full bg-purple-600 text-purple-200 font-display font-bold text-lg tracking-widest uppercase py-3 transition-all duration-150';
    dot.className = 'w-2 h-2 rounded-full bg-purple-500';

    banner.classList.remove('hidden');
    document.getElementById('charCount').textContent = '0 / 500';
  },

  setPublishLoading(loading) {
    const btn       = document.getElementById('btnPublish');
    btn.disabled    = loading;
    btn.textContent = loading ? 'Publicando...' : 'Publicar';
  },

  showPublishFeedback(msg, type) {
    const el = document.getElementById('publishFeedback');
    el.className = `mt-3 font-mono text-xs text-center py-2 px-3 ${
      type === 'success'
        ? 'text-purple-200 bg-purple-600 border border-purple-300'
        : 'text-red bg-red/10 border border-red/20'
    }`;
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 3000);
  },

  clearCompose() {
    document.getElementById('inputMessage').value = '';
    document.getElementById('charCount').textContent = '0 / 500';
    document.getElementById('errMessage').classList.add('hidden');
  },

  // Header
  showUserHeader(username) {
    document.getElementById('headerGuest').classList.add('hidden');
    const userEl = document.getElementById('headerUser');
    userEl.classList.remove('hidden');
    userEl.classList.add('flex');
    document.getElementById('headerAvatar').textContent   = username.charAt(0);
    document.getElementById('headerUsername').textContent = username;
  },

  showGuestHeader() {
    document.getElementById('headerUser').classList.add('hidden');
    document.getElementById('headerUser').classList.remove('flex');
    document.getElementById('headerGuest').classList.remove('hidden');
  },

  // AUTH MODAL
  showAuthError(msg) {
    const el = document.getElementById('authError');
    el.textContent = msg;
    el.classList.remove('hidden');
  },

  clearAuthError() {
    document.getElementById('authError').classList.add('hidden');
  },
};