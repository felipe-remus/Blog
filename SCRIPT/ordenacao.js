// ========================================
// MÓDULO DE ORDENAÇÃO DE NOTÍCIAS
// ========================================

import { aoCarregarDOM, aoCarregarHTMX } from './utils.js';

/**
 * Ordena as notícias por data (mais recentes primeiro)
 */
function ordenarNoticias() {
    const containers = document.querySelectorAll('.noticias-container');
    if (containers.length === 0) return;
    
    const parent = containers[0].parentElement;
    
    const noticiasOrdenadas = Array.from(containers).sort((a, b) => {
        // Se você adicionou data-data
        const dataA = a.querySelector('.card-noticia')?.getAttribute('data-data');
        const dataB = b.querySelector('.card-noticia')?.getAttribute('data-data');
        
        if (dataA && dataB) {
            return new Date(dataB) - new Date(dataA);
        }
        
        // Caso contrário, extrai da meta
        const metaTextA = a.querySelector('.meta')?.textContent;
        const metaTextB = b.querySelector('.meta')?.textContent;
        
        if (!metaTextA || !metaTextB) return 0;
        
        const matchA = metaTextA.match(/\d{2}\/\d{2}\/\d{4}/);
        const matchB = metaTextB.match(/\d{2}\/\d{2}\/\d{4}/);
        
        if (!matchA || !matchB) return 0;
        
        const metaA = matchA[0];
        const metaB = matchB[0];
        
        const [diaA, mesA, anoA] = metaA.split('/');
        const [diaB, mesB, anoB] = metaB.split('/');
        
        return new Date(anoB, mesB - 1, diaB) - new Date(anoA, mesA - 1, diaA);
    });
    
    noticiasOrdenadas.forEach(noticia => parent.appendChild(noticia));
}

/**
 * Inicialização do módulo
 */
export function iniciar() {
    // Ordena no carregamento inicial
    aoCarregarDOM(ordenarNoticias);
    
    // Ordena quando o conteúdo HTMX é carregado
    aoCarregarHTMX(ordenarNoticias);
}