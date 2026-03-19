// ============================================================
// HEADER — destaque da página atual
// ============================================================

function highlightCurrentPage() {
    requestAnimationFrame(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('#menu-principal .nav-link').forEach(link => {
            const linkPage = link.getAttribute('data-page') || link.getAttribute('href');
            link.classList.toggle('active', linkPage === currentPage);
        });
    });
}

// Atualizar quando header é carregado via HTMX
document.body.addEventListener('htmx:afterSwap', e => {
    if (e.target.id === 'xcabecalho' || e.detail.target.id === 'xcabecalho') {
        highlightCurrentPage();
    }
});

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', highlightCurrentPage);