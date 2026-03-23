function commentCard(c, i) {
  const isOwner = c.username === state.authUsername;

  return `
    <article
      class="comment-card border border-ash/30 p-5"
      id="card-${c.id}"
    >
      <div class="flex items-start justify-between gap-4">

        <div class="flex items-start gap-3 flex-1 min-w-0">

          <!-- Avatar inicial -->
          <div class="w-8 h-8 bg-ink border border-ash/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="font-display font-bold text-purple-500 text-sm uppercase">
              ${escapeHtml(c.username.charAt(0))}
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <!-- Meta: usuario + tiempo + badge "tú" -->
            <div class="flex items-center gap-2 flex-wrap mb-2">
              <span class="font-display font-bold text-lg leading-none tracking-wide uppercase"
                style="color: #ffffff;">
                ${escapeHtml(c.username)}
              </span>
              <span class="font-mono text-xs"
                style="color: #a0a090;"
                title="${new Date(c.date).toLocaleString('es-MX')}">
                · ${timeAgo(c.date)}
              </span>
              ${isOwner
                ? '<span class="font-mono text-xs border px-1.5 py-0.5 leading-none text-purple-200 bg-purple-600 border-purple-600" >tú</span>'
                : ''}
            </div>
            <!-- Mensaje -->
            <p class="text-sm leading-relaxed break-words"
              style="color: #f0ebe0; font-family: 'Lora', serif;">
              ${escapeHtml(c.message)}
            </p>
          </div>
        </div>

        <!-- Botón eliminar — solo visible para el dueño -->
        ${isOwner ? `
          <button
          type="button"
          data-id="${c.id}"
            title="Eliminar comentario"
            class="delete-btn flex-shrink-0 w-7 h-7 border border-ash/20 font-mono text-xs
                  hover:border-red hover:bg-red/10
                  transition-all duration-150 flex items-center justify-center cursor-pointer"
            style="color: #a0a090;"
          >✕</button>
        ` : ''}

      </div>
    </article>
  `;
}