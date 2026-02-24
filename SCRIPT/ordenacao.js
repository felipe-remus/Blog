// ========================================
// ORDENACAO.JS — Ordena os cards por data dentro do único container
// ========================================
function ordenarNoticias() {
    const container = document.querySelector('.noticias-container');
    if (!container) return;

    const parsarData = (str) => {
        if (!str) return new Date(0);
        const [dia, mes, ano] = str.split('/');
        return new Date(ano, mes - 1, dia);
    };

    // Pega todos os cards, ordena por data (mais recente primeiro)
    // e reinsere no container na ordem correta
    Array.from(container.querySelectorAll('.card-noticia'))
        .sort((a, b) => {
            const dataA = a.getAttribute('data-data');
            const dataB = b.getAttribute('data-data');
            return parsarData(dataB) - parsarData(dataA);
        })
        .forEach(card => container.appendChild(card));
}

document.addEventListener('DOMContentLoaded', ordenarNoticias);
document.body.addEventListener('htmx:afterSwap', ordenarNoticias);