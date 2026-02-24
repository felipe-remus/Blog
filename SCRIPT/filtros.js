// ========================================
// FILTROS.JS — Filtros dinâmicos por categoria
// Depende de: globals.js, dados-categorias.js, paginacao.js
// ========================================

let _timeoutBusca;

// ── Popula um <select> com uma lista de itens ──────────────────────────────
function popularSelect(selectId, itens, placeholder) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    itens.forEach(({ value, label }) => {
        const opt   = document.createElement('option');
        opt.value   = value;
        opt.textContent = label;
        select.appendChild(opt);
    });
}

// ── Atualiza os selects de equipe / piloto / pista conforme a categoria ───
function atualizarFiltrosDinamicos(categoria) {
    const dados = DADOS_CATEGORIAS[categoria];

    const containerEquipe = document.getElementById('container-equipe');
    const containerPiloto = document.getElementById('container-piloto');
    const containerPista  = document.getElementById('container-pista');

    // Limpa selects
    popularSelect('filtro-equipe', [], 'Selecione a Equipe');
    popularSelect('filtro-piloto', [], 'Selecione o Piloto');
    popularSelect('filtro-pista',  [], 'Selecione a Pista');

    if (!dados) {
        if (containerEquipe) containerEquipe.style.display = 'none';
        if (containerPiloto) containerPiloto.style.display = 'none';
        if (containerPista)  containerPista.style.display  = 'none';
        return;
    }

    const configurar = (containerId, selectId, itens, placeholder) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (itens.length > 0) {
            popularSelect(selectId, itens, placeholder);
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    };

    configurar('container-equipe', 'filtro-equipe', dados.equipes, 'Selecione a Equipe');
    configurar('container-piloto', 'filtro-piloto', dados.pilotos, 'Selecione o Piloto');
    configurar('container-pista',  'filtro-pista',  dados.pistas,  'Selecione a Pista');
}

// ── Lógica central de filtragem ────────────────────────────────────────────
function aplicarFiltros() {
    const termo     = (document.getElementById('busca-texto')?.value || '').trim().toLowerCase();
    const categoria = document.getElementById('filtro-categoria')?.value || '';
    const equipe    = document.getElementById('filtro-equipe')?.value    || '';
    const piloto    = document.getElementById('filtro-piloto')?.value    || '';
    const pista     = document.getElementById('filtro-pista')?.value     || '';
    const cards     = document.querySelectorAll('.card-noticia');

    if (cards.length === 0) return;

    cards.forEach(card => {
        const texto      = card.textContent.toLowerCase();
        const categorias = (card.getAttribute('data-categoria') || '').split(' ').filter(Boolean);
        const equipes    = (card.getAttribute('data-equipe')    || '').split(' ').filter(Boolean);
        const pilotos    = (card.getAttribute('data-piloto')    || '').split(' ').filter(Boolean);
        const pistas     = (card.getAttribute('data-pista')     || '').split(' ').filter(Boolean);

        const visivel =
            (!termo     || texto.includes(termo))          &&
            (!categoria || categorias.includes(categoria)) &&
            (!equipe    || equipes.includes(equipe))       &&
            (!piloto    || pilotos.includes(piloto))       &&
            (!pista     || pistas.includes(pista));

        card.style.display = visivel ? 'block' : 'none';
    });

    paginaAtual = 1;
    aplicarPaginacao();
}

// ── Event listeners ────────────────────────────────────────────────────────
document.addEventListener('input', e => {
    if (e.target.id !== 'busca-texto') return;
    clearTimeout(_timeoutBusca);
    _timeoutBusca = setTimeout(aplicarFiltros, 300);
});

document.addEventListener('change', e => {
    if (e.target.id === 'filtro-categoria') {
        atualizarFiltrosDinamicos(e.target.value);
        aplicarFiltros();
        return;
    }
    if (['filtro-equipe', 'filtro-piloto', 'filtro-pista'].includes(e.target.id)) {
        aplicarFiltros();
    }
});

// ── Inicialização ──────────────────────────────────────────────────────────
function inicializarFiltros() {
    setTimeout(() => {
        const catAtual = document.getElementById('filtro-categoria')?.value || '';
        atualizarFiltrosDinamicos(catAtual);
        aplicarFiltros();
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFiltros);
} else {
    inicializarFiltros();
}

document.addEventListener('DOMContentLoaded', inicializarFiltros);

document.body.addEventListener('htmx:afterSwap', function (event) {
    if (
        event.detail.target.classList?.contains('noticias-container') ||
        event.detail.target.id === 'noticias-container'
    ) {
        setTimeout(inicializarFiltros, 100);
    }
});