// ========================================
// MAIN.JS — Inicialização principal e orquestração HTMX
// Deve ser o ÚLTIMO script carregado.
// Depende de: todos os demais módulos.
// ========================================

// ── Inicialização no carregamento do DOM ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.card-noticia')) inicializarFiltros();
    inicializarPublicar();
});

// ── Reação ao carregamento de conteúdo via HTMX ───────────────────────────
document.body.addEventListener('htmx:afterOnLoad', event => {
    const container = event.detail.elt;

    if (container.querySelector('.aba'))         inicializarAbas(container);
    if (
        container.querySelector('.card-noticia') ||
        container.querySelector('#busca-texto')
    )                                             inicializarFiltros();
    if (container.querySelector('#form-noticia')) inicializarFormNoticia(container.querySelector('#form-noticia'));
});

// ── Inicialização do módulo de publicação ─────────────────────────────────
function inicializarPublicar() {
    renderizarAbas();
    atualizarContadores();
    atualizarBotaoLimpar();
}

document.addEventListener('htmx:afterSwap', inicializarPublicar);