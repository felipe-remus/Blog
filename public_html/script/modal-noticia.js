// ============================================================
// MODAL DE NOTÍCIA (VISUALIZAÇÃO)
// ============================================================

function fecharModal() {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay) return;
    overlay.classList.remove('ativo');
    document.body.classList.remove('modal-aberto');
}

function inicializarModal() {
    const overlay   = document.getElementById('modalOverlay');
    const modalCard = document.getElementById('modalCard');
    const btnFechar = document.getElementById('modalFechar');

    if (!overlay || !modalCard || !btnFechar) return;

    function abrirModal(card) {
        const clone = card.cloneNode(true);

        // Limpa conteúdo anterior (mantém só o botão fechar)
        while (modalCard.children.length > 1) {
            modalCard.removeChild(modalCard.lastChild);
        }

        Array.from(clone.children).forEach(el => modalCard.appendChild(el));

        overlay.classList.add('ativo');
        document.body.classList.add('modal-aberto');
        btnFechar.focus();
    }

    // Vincula clique nos cards
    document.querySelectorAll('.card-noticia').forEach(card => {
        card.addEventListener('click', (e) => {
            // Previne abrir o modal se clicou nos botões
            if (e.target.closest('.btn-acao') || e.target.closest('.card-acoes')) {
                return;
            }
            abrirModal(card);
        });
    });

    // Botão X
    btnFechar.onclick = fecharModal;

    // Clique no fundo escuro
    overlay.addEventListener('click', e => {
        if (e.target === overlay) fecharModal();
    });
}

// ESC fecha o modal (pode ser registrado uma única vez no document)
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharModal();
});

document.addEventListener('htmx:afterSwap', e => {
    if (e.detail.target.id === 'noticia' || 
        e.detail.target.classList.contains('noticias-container') ||
        e.detail.target.querySelector('.card-noticia')) {
        setTimeout(inicializarModal, 50);
    }
});

// Chamar inicializarModal quando o página carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(inicializarModal, 100);
});