// ========================================
// GLOBALS.JS — Variáveis globais compartilhadas
// Deve ser o PRIMEIRO script carregado.
// ========================================

// Utilitário legado (mantido por compatibilidade)
const tagsSelecionadasAtivas = new Set();

// ── Paginação ────────────────────────────
const NOTICIAS_POR_PAGINA = 20;
let paginaAtual  = 1;
let totalPaginas = 1;

// ── Gerenciador de tags ──────────────────
let limpezaEmAndamento = false;

const selecoes = {
    categoria: new Set(),
    equipe:    new Set(),
    piloto:    new Set(),
    pista:     new Set(),
};

const limites = { categoria: 2, equipe: 4, piloto: 4, pista: 4 };