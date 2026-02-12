// ========================================
// MÓDULO DE NAVEGAÇÃO (HEADER)
// ========================================

import { aoCarregarHTMX } from './utils.js';

/**
 * Destaca a página atual no menu
 */
function highlightCurrentPage() {
    // Aguarda o DOM estar pronto
    requestAnimationFrame(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#menu-principal .nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page') || link.getAttribute('href');
            link.classList.toggle('active', linkPage === currentPage);
        });
    });
}

/**
 * Inicialização do módulo
 */
export function iniciar() {
    // Atualiza na carga inicial
    highlightCurrentPage();

    // Atualiza após HTMX carregar o cabeçalho
    aoCarregarHTMX(function(event) {
        if (event.target.id === 'xcabecalho' || event.detail.target.id === 'xcabecalho') {
            highlightCurrentPage();
        }
    });
}