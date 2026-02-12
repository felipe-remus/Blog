// ========================================
// MÓDULO DE ABAS (LOGIN / REGISTRO)
// ========================================

/**
 * Gerencia a troca entre abas
 */
function gerenciarAbas(e) {
    if (!e.target.matches('.aba')) return;
    e.preventDefault();

    const aba = e.target;
    const container = aba.closest('[hx-get], body') || document.body;

    // Atualiza aba ativa
    container.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
    aba.classList.add('ativa');

    // Mostra formulário correspondente
    const alvo = aba.getAttribute('data-aba');
    container.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
    container.querySelector(`#form-${alvo}`)?.classList.add('ativo');
}

/**
 * Inicialização do módulo
 */
export function iniciar() {
    document.addEventListener('click', gerenciarAbas);
}