// ============================================================
// HEADER — destaque da página atual
// ============================================================
function highlightCurrentPage() {
    requestAnimationFrame(() => {
        let currentPage = window.location.pathname.split('/').pop() || 'index.php';      
        // Normalizar: remover query strings e hashes
        currentPage = currentPage.split('?')[0].split('#')[0];

        document.querySelectorAll('#menu-principal .nav-link').forEach(link => {
            const linkPage = link.getAttribute('data-page') || 
                            (link.getAttribute('href') || '').split('/').pop();
            
            link.classList.toggle('active', linkPage === currentPage);
        });
    });
}  

// HTMX - mais flexível
document.body.addEventListener('htmx:afterSwap', () => {
    highlightCurrentPage();
});

// Inicializar
document.addEventListener('DOMContentLoaded', highlightCurrentPage);  

// Também no load (caso HTMX já tenha carregado)
window.addEventListener('load', highlightCurrentPage);