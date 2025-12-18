// ========================================
// UTILITÁRIOS GLOBAIS
// ========================================
const tagsSelecionadasAtivas = new Set(); // Mantido para compatibilidade futura

// ========================================
// INICIALIZAÇÃO PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa filtros caso já estejam na página
    if (document.querySelector('.card-noticia')) inicializarFiltros();
});

// HTMX: re-inicializa componentes após carregamento dinâmico
document.body.addEventListener('htmx:afterOnLoad', (event) => {
    const container = event.detail.elt;

    if (container.querySelector('.aba')) inicializarAbas(container);
    if (container.querySelector('.card-noticia') || container.querySelector('#busca-texto')) inicializarFiltros();
    if (container.querySelector('#form-noticia')) inicializarFormNoticia(container.querySelector('#form-noticia'));
});

// ========================================
// ABAS (LOGIN / REGISTRO)
// ========================================
document.addEventListener('click', (e) => {
    if (!e.target.matches('.aba')) return;
    e.preventDefault();

    const aba = e.target;
    const container = aba.closest('[hx-get], body') || document.body;

    // Atualiza estado da aba
    container.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
    aba.classList.add('ativa');

    // Mostra formulário correspondente
    const alvo = aba.getAttribute('data-aba');
    container.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
    container.querySelector(`#form-${alvo}`)?.classList.add('ativo');
});

// ========================================
// FILTROS (BUSCA + EQUIPE + PILOTO)
// ========================================
let timeoutBusca;

function aplicarFiltros() {
    const termo = (document.getElementById('busca-texto')?.value || '').trim().toLowerCase();
    const equipe = document.getElementById('filtro-equipe')?.value || '';
    const piloto = document.getElementById('filtro-piloto')?.value || '';
    const cards = document.querySelectorAll('.card-noticia');

    if (cards.length === 0) return;

    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        const equipes = (card.getAttribute('data-equipe') || '').split(' ');
        const pilotos = (card.getAttribute('data-piloto') || '').split(' ');

        const passaBusca = !termo || texto.includes(termo);
        const passaEquipe = !equipe || equipes.includes(equipe);
        const passaPiloto = !piloto || pilotos.includes(piloto);

        card.style.display = (passaBusca && passaEquipe && passaPiloto) ? 'block' : 'none';
    });
}

document.addEventListener('input', (e) => {
    if (e.target.id === 'busca-texto') {
        clearTimeout(timeoutBusca);
        timeoutBusca = setTimeout(aplicarFiltros, 200);
    }
});

document.addEventListener('change', (e) => {
    if (e.target.id === 'filtro-equipe' || e.target.id === 'filtro-piloto') {
        aplicarFiltros();
    }
});

function inicializarFiltros() {
    // Garante que os filtros sejam aplicados após renderização
    setTimeout(aplicarFiltros, 10);
}