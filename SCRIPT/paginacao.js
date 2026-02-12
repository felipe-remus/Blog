// ========================================
// MÓDULO DE PAGINAÇÃO
// ========================================

import { aoCarregarDOM, aoCarregarHTMX } from './utils.js';

// Configuração
const NOTICIAS_POR_PAGINA = 10;
let paginaAtual = 1;
let totalPaginas = 1;

/**
 * Reseta para a primeira página
 * EXPORTADA para ser usada pelos filtros
 */
export function resetarPaginacao() {
    paginaAtual = 1;
}

/**
 * Aplica a paginação nas notícias visíveis
 * EXPORTADA para ser usada pelos filtros
 */
export function aplicarPaginacao() {
    const cards = document.querySelectorAll('.card-noticia');
    
    // Filtra apenas cards visíveis (não escondidos por filtros)
    const cardsVisiveis = Array.from(cards).filter(card => {
        const computedStyle = window.getComputedStyle(card);
        return computedStyle.display !== 'none' || card.style.display !== 'none';
    });

    const totalNoticias = cardsVisiveis.length;
    totalPaginas = Math.ceil(totalNoticias / NOTICIAS_POR_PAGINA);
    
    // Se não houver notícias, totalPaginas = 1
    if (totalPaginas === 0) {
        totalPaginas = 1;
    }

    // Ajusta página atual se necessário
    if (paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }
    if (paginaAtual < 1) {
        paginaAtual = 1;
    }

    // Esconde todos os cards visíveis primeiro
    cardsVisiveis.forEach(card => {
        card.classList.add('paginacao-oculto');
    });

    // Mostra apenas os cards da página atual
    const inicio = (paginaAtual - 1) * NOTICIAS_POR_PAGINA;
    const fim = inicio + NOTICIAS_POR_PAGINA;
    
    cardsVisiveis.slice(inicio, fim).forEach(card => {
        card.classList.remove('paginacao-oculto');
    });

    // Atualiza controles
    atualizarControlesPaginacao(totalNoticias, inicio, fim);
}

/**
 * Atualiza os controles de paginação (botões e informações)
 */
function atualizarControlesPaginacao(totalNoticias, inicio, fim) {
    // Atualiza informações de quantidade
    const infoInicio = document.getElementById('info-inicio');
    const infoFim = document.getElementById('info-fim');
    const infoTotal = document.getElementById('info-total');
    
    if (infoInicio) infoInicio.textContent = totalNoticias > 0 ? inicio + 1 : 0;
    if (infoFim) infoFim.textContent = Math.min(fim, totalNoticias);
    if (infoTotal) infoTotal.textContent = totalNoticias;

    // Atualiza estado dos botões
    const btnPrimeira = document.getElementById('btn-primeira');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProxima = document.getElementById('btn-proxima');
    const btnUltima = document.getElementById('btn-ultima');
    
    if (btnPrimeira) btnPrimeira.disabled = paginaAtual === 1;
    if (btnAnterior) btnAnterior.disabled = paginaAtual === 1;
    if (btnProxima) btnProxima.disabled = paginaAtual === totalPaginas;
    if (btnUltima) btnUltima.disabled = paginaAtual === totalPaginas;

    // Gera números das páginas
    gerarNumerosPaginas();
}

/**
 * Gera os botões de números de páginas
 */
function gerarNumerosPaginas() {
    const container = document.getElementById('numeros-paginas');
    if (!container) return;
    
    container.innerHTML = '';

    const maxBotoes = 7;
    let paginas = [];

    if (totalPaginas <= maxBotoes) {
        paginas = Array.from({length: totalPaginas}, (_, i) => i + 1);
    } else {
        if (paginaAtual <= 3) {
            paginas = [1, 2, 3, 4, '...', totalPaginas];
        } else if (paginaAtual >= totalPaginas - 2) {
            paginas = [1, '...', totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas];
        } else {
            paginas = [1, '...', paginaAtual - 1, paginaAtual, paginaAtual + 1, '...', totalPaginas];
        }
    }

    paginas.forEach(num => {
        if (num === '...') {
            const reticencias = document.createElement('span');
            reticencias.className = 'pagina-reticencias';
            reticencias.textContent = '...';
            container.appendChild(reticencias);
        } else {
            const botao = document.createElement('button');
            botao.className = 'pagina-numero';
            if (num === paginaAtual) {
                botao.classList.add('ativa');
            }
            botao.textContent = num;
            botao.onclick = () => irParaPagina(num);
            container.appendChild(botao);
        }
    });
}

/**
 * Navega para uma página específica
 */
function irParaPagina(numeroPagina) {
    paginaAtual = numeroPagina;
    aplicarPaginacao();
    
    // Scroll suave para o topo
    const container = document.querySelector('.noticias-container');
    if (container) {
        const offset = 100;
        const elementPosition = container.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Inicializa os event listeners da paginação
 */
function inicializarPaginacao() {
    console.log('Inicializando paginação...');
    
    const btnPrimeira = document.getElementById('btn-primeira');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProxima = document.getElementById('btn-proxima');
    const btnUltima = document.getElementById('btn-ultima');
    
    if (btnPrimeira) {
        btnPrimeira.addEventListener('click', () => {
            console.log('Clicou em primeira');
            irParaPagina(1);
        });
    }
    
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            console.log('Clicou em anterior');
            irParaPagina(Math.max(1, paginaAtual - 1));
        });
    }
    
    if (btnProxima) {
        btnProxima.addEventListener('click', () => {
            console.log('Clicou em próxima');
            irParaPagina(Math.min(totalPaginas, paginaAtual + 1));
        });
    }
    
    if (btnUltima) {
        btnUltima.addEventListener('click', () => {
            console.log('Clicou em última');
            irParaPagina(totalPaginas);
        });
    }
    
    // Aplica paginação inicial
    aplicarPaginacao();
}

/**
 * Inicialização do módulo
 */
export function iniciar() {
    // Quando o DOM estiver pronto
    aoCarregarDOM(inicializarPaginacao);
    
    // Para HTMX - reaplica após carregar conteúdo
    aoCarregarHTMX(() => {
        console.log('HTMX afterSwap detectado (paginação)');
        setTimeout(() => {
            paginaAtual = 1;
            inicializarPaginacao();
        }, 100);
    });
}