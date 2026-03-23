//carga comentarios
async function loadComments() {
  ui.showLoader();
  try {
    const comments = await api.getComments();
    ui.renderComments(comments);
  } catch (err) {
    ui.showConnectionError();
    console.error('loadComments:', err);
  }
}

//Publicar comentario 
async function handlePublish(e) {

  if (e?.preventDefault) e.preventDefault();

  console.log('handlePublish llamado', e);

  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (!state.authToken) return;

  const message = document.getElementById('inputMessage').value.trim();

  // Validación: mínimo 5 caracteres
  if (message.length < 5) {
    document.getElementById('errMessage').classList.remove('hidden');
    return;
  }
  document.getElementById('errMessage').classList.add('hidden');

  ui.setPublishLoading(true);
  try {
    await api.createComment(message);
    ui.clearCompose();
    ui.showPublishFeedback('✓ Comentario publicado', 'success');
    await loadComments();
  } catch (err) {
    ui.showPublishFeedback(`✕ ${err.message}`, 'error');
    console.error('handlePublish:', err);
  } finally {
    ui.setPublishLoading(false);
  }
}

//Modal eliminar
function handleDelete(id) {
  state.pendingDeleteId = id;
  document.getElementById('deleteModal').classList.remove('hidden');
}

function initDeleteModal() {
  document.getElementById('deleteCancelBtn').addEventListener('click', () => {
    state.pendingDeleteId = null;
    document.getElementById('deleteModal').classList.add('hidden');
  });

  document.getElementById('deleteConfirmBtn').addEventListener('click', async () => {
    document.getElementById('deleteModal').classList.add('hidden');
    if (state.pendingDeleteId === null) return;

    const id = state.pendingDeleteId;
    state.pendingDeleteId = null;

    const card = document.getElementById(`card-${id}`);
    if (card) card.style.opacity = '0.4';

    try {
      await api.deleteComment(id);
      ui.removeCard(id);
    } catch (err) {
      if (card) card.style.opacity = '1';
      console.error('handleDelete:', err);
    }
  });
}
