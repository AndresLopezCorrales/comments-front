// tiempo transcurrido desde una fecha dada
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);

  if (s < 10) return 'ahora mismo';
  if (s < 60) return `hace ${s}s`;
  if (m < 60) return `hace ${m} min`;
  if (h < 24) return `hace ${h}h`;
  if (d <  7) return `hace ${d}d`;

  return new Date(dateStr).toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

//EVITAR XSS
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ACTUALIZAR CONTADOR DE CARACTERES EN COMPOSE
function updateCharCount() {
  const len = document.getElementById('inputMessage').value.length;
  const el  = document.getElementById('charCount');
  el.textContent = `${len} / 500`;
  el.className   = `font-mono text-xs ml-auto transition-colors ${len > 450 ? 'text-red' : 'text-ash/60'}`;
}
