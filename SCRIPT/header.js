// ========================================
// HEADER.JS — Destaque da página atual no menu
// Sem dependências.
// ========================================

function highlightCurrentPage() {
    requestAnimationFrame(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('#menu-principal .nav-link').forEach(link => {
            const linkPage = link.getAttribute('data-page') || link.getAttribute('href');
            link.classList.toggle('active', linkPage === currentPage);
        });
    });
}

document.body.addEventListener('htmx:afterSwap', function (event) {
    if (
        event.target.id === 'xcabecalho' ||
        event.detail.target.id === 'xcabecalho'
    ) {
        highlightCurrentPage();
    }
});