function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Escape cierra cualquier modal abierto
    if (e.key === 'Escape') {
      closeAuthModal();
      state.pendingDeleteId = null;
      document.getElementById('deleteModal').classList.add('hidden');
    }

    // Enter en el textarea publica (Shift+Enter = nueva línea)
    if (e.key === 'Enter' && !e.shiftKey && document.activeElement.id === 'inputMessage') {
      e.preventDefault();
      handlePublish();
    }

    // Enter en los campos del modal de auth envía el formulario
    if (
      e.key === 'Enter' &&
      (document.activeElement.id === 'authUsername' ||
      document.activeElement.id === 'authPassword')
    ) {
      e.preventDefault();
      handleAuth();
    }
  });
}

function init() {
  // Restaurar sesión desde sessionStorage si existe
  if (state.authToken && state.authUsername) {
    ui.showUserHeader(state.authUsername);
    ui.enableCompose(state.authUsername);
  } else {
    ui.disableCompose();
  }

  initDeleteModal();
  initKeyboardShortcuts();
  initPublish();         
  initDeleteButtons();

  // Cargar comentarios iniciales
  loadComments();
}

function initPublish() {
  const btn = document.getElementById('btnPublish');

  btn.addEventListener('click', (e) => {
  e.preventDefault();
  handlePublish(e);
});
}

function initDeleteButtons() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.delete-btn')) {
      const btn = e.target.closest('.delete-btn');
      const id = btn.dataset.id;
      handleDelete(Number(id));
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
