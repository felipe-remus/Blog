// ============================================================
// NAVEGAÇÃO ENTRE SEÇÕES - História 
// ============================================================

function scrollToSecao(secaoId, button) {
    // Remover classe active de todos os botões
    document.querySelectorAll('.abas-sumario button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar classe active ao botão clicado
    button.classList.add('active');
    
    // Buscar a seção pelo ID
    const secao = document.getElementById(secaoId);
    
    if (secao) {
        // Scroll suave até a seção
        secao.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================================
// INICIALIZAR NAVEGAÇÃO DA HISTÓRIA
// ============================================================

function inicializarHistoria() {
    const botoes = document.querySelectorAll('.abas-sumario button');
    
    // Adicionar listener de clique a cada botão
    botoes.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pegar o atributo onclick e extrair o ID da seção
            const onclickText = this.getAttribute('onclick');
            const match = onclickText.match(/scrollToSecao\('([^']+)'/);
            
            if (match) {
                const secaoId = match[1];
                scrollToSecao(secaoId, this);
            }
        });
    });
    
    // Ao scrollar, destacar o botão correspondente
    window.addEventListener('scroll', () => {
        const secoes = document.querySelectorAll('.historia-secao');
        
        secoes.forEach(secao => {
            const rect = secao.getBoundingClientRect();
            
            // Se a seção está visível
            if (rect.top <= 150 && rect.bottom >= 150) {
                const secaoId = secao.getAttribute('id');
                const botaoCorrespondente = Array.from(botoes).find(btn => {
                    const onclick = btn.getAttribute('onclick');
                    return onclick.includes(`'${secaoId}'`);
                });
                
                if (botaoCorrespondente) {
                    botoes.forEach(btn => btn.classList.remove('active'));
                    botaoCorrespondente.classList.add('active');
                }
            }
        });
    });
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

// Inicializar quando página carregar
document.addEventListener('DOMContentLoaded', inicializarHistoria);

// Reinicializar após HTMX swap
document.addEventListener('htmx:afterSwap', () => {
    setTimeout(inicializarHistoria, 50);
});