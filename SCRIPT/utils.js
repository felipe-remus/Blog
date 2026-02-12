// ========================================
// UTILITÁRIOS GLOBAIS COMPARTILHADOS
// ========================================

/**
 * Estado global compartilhado entre módulos
 */
export const estadoGlobal = {
    tagsSelecionadasAtivas: new Set(),
    limpezaEmAndamento: false
};

/**
 * Aguarda que um elemento apareça no DOM
 * @param {string} seletor - Seletor CSS do elemento
 * @param {number} timeout - Tempo máximo de espera em ms
 * @returns {Promise<Element>}
 */
export function aguardarElemento(seletor, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            resolve(elemento);
            return;
        }

        const observer = new MutationObserver(() => {
            const el = document.querySelector(seletor);
            if (el) {
                observer.disconnect();
                resolve(el);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timeout: elemento ${seletor} não encontrado`));
        }, timeout);
    });
}

/**
 * Debounce para otimizar eventos frequentes
 * @param {Function} func - Função a ser executada
 * @param {number} delay - Delay em ms
 * @returns {Function}
 */
export function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Executa callback quando HTMX terminar de carregar
 * @param {Function} callback
 */
export function aoCarregarHTMX(callback) {
    document.body.addEventListener('htmx:afterSwap', callback);
}

/**
 * Executa callback no DOMContentLoaded
 * @param {Function} callback
 */
export function aoCarregarDOM(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}