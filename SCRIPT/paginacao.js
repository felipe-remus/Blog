// ========================================
// PAGINACAO.JS — Sistema de paginação
// Depende de: globals.js  (paginaAtual, totalPaginas, NOTICIAS_POR_PAGINA)
//
// ATENÇÃO: Com o layout em 2 colunas, defina NOTICIAS_POR_PAGINA
// como um número PAR no globals.js (ex: 6 ou 8) para evitar
// linhas incompletas no grid.
//
// O CSS também precisa ter:
//   .paginacao-oculto { display: none; }
// para que cards ocultos não gerem espaços vazios no grid.
// ========================================

function aplicarPaginacao() {
    const cards = document.querySelectorAll('.card-noticia');

    // ① Remove classe de paginação de TODOS os cards antes de calcular
    //    (caso contrário, na segunda chamada os cards ocultos pela paginação
    //     seriam excluídos do cálculo, quebrando o total)
    cards.forEach(card => card.classList.remove('paginacao-oculto'));

    // ② Filtra apenas cards ocultados pelos FILTROS (style inline)
    //    NÃO usa getComputedStyle, pois ele leria a classe paginacao-oculto
    const cardsVisiveis = Array.from(cards).filter(card =>
        card.style.display !== 'none'
    );

    const totalNoticias = cardsVisiveis.length;
    totalPaginas = Math.ceil(totalNoticias / NOTICIAS_POR_PAGINA) || 1;

    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
    if (paginaAtual < 1)            paginaAtual = 1;

    // ③ Oculta todos os visíveis e mostra só os da página atual
    //    display:none via classe garante que o grid não reserve
    //    espaço para os cards ocultos
    cardsVisiveis.forEach(card => card.classList.add('paginacao-oculto'));

    const inicio = (paginaAtual - 1) * NOTICIAS_POR_PAGINA;
    const fim    = inicio + NOTICIAS_POR_PAGINA;
    cardsVisiveis.slice(inicio, fim).forEach(card => card.classList.remove('paginacao-oculto'));

    _atualizarControlesPaginacao(totalNoticias, inicio, fim);
}

function _atualizarControlesPaginacao(totalNoticias, inicio, fim) {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('info-inicio', totalNoticias > 0 ? inicio + 1 : 0);
    set('info-fim',    Math.min(fim, totalNoticias));
    set('info-total',  totalNoticias);

    const setDisabled = (id, val) => { const el = document.getElementById(id); if (el) el.disabled = val; };
    setDisabled('btn-primeira', paginaAtual === 1);
    setDisabled('btn-anterior', paginaAtual === 1);
    setDisabled('btn-proxima',  paginaAtual === totalPaginas);
    setDisabled('btn-ultima',   paginaAtual === totalPaginas);

    _gerarNumerosPaginas();
}

function _gerarNumerosPaginas() {
    const container = document.getElementById('numeros-paginas');
    if (!container) return;
    container.innerHTML = '';

    let paginas;
    if (totalPaginas <= 7) {
        paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
    } else if (paginaAtual <= 3) {
        paginas = [1, 2, 3, 4, '...', totalPaginas];
    } else if (paginaAtual >= totalPaginas - 2) {
        paginas = [1, '...', totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas];
    } else {
        paginas = [1, '...', paginaAtual - 1, paginaAtual, paginaAtual + 1, '...', totalPaginas];
    }

    paginas.forEach(num => {
        if (num === '...') {
            const span = document.createElement('span');
            span.className   = 'pagina-reticencias';
            span.textContent = '...';
            container.appendChild(span);
        } else {
            const btn = document.createElement('button');
            btn.className   = 'pagina-numero' + (num === paginaAtual ? ' ativa' : '');
            btn.textContent = num;
            btn.onclick     = () => irParaPagina(num);
            container.appendChild(btn);
        }
    });
}

function irParaPagina(numeroPagina) {
    paginaAtual = numeroPagina;
    aplicarPaginacao();

    const container = document.querySelector('.noticias-container');
    if (container) {
        window.scrollTo({
            top: container.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: 'smooth',
        });
    }
}

// ── Delegação de eventos nos botões de navegação ───────────────────────────
// Usa onclick (em vez de addEventListener) para evitar listeners duplicados
// a cada htmx:afterSwap. Os botões numéricos já usam onclick inline.
function _vincularBotoes() {
    const primeira = document.getElementById('btn-primeira');
    const anterior = document.getElementById('btn-anterior');
    const proxima  = document.getElementById('btn-proxima');
    const ultima   = document.getElementById('btn-ultima');

    if (primeira) primeira.onclick = () => irParaPagina(1);
    if (anterior) anterior.onclick = () => irParaPagina(Math.max(1, paginaAtual - 1));
    if (proxima)  proxima.onclick  = () => irParaPagina(Math.min(totalPaginas, paginaAtual + 1));
    if (ultima)   ultima.onclick   = () => irParaPagina(totalPaginas);
}

function inicializarPaginacao() {
    _vincularBotoes();
    aplicarPaginacao();
}

// ── Reage a cada swap do HTMX ─────────────────────────────────────────────
// Aguarda 150ms para garantir que cards E botões já foram inseridos no DOM
document.addEventListener('htmx:afterSwap', () => {
    setTimeout(inicializarPaginacao, 150);
});