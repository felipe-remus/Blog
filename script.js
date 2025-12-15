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

function inicializarAbas() {
    // Nada a fazer aqui — evento delegado globalmente
}

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

// ========================================
// SELEÇÃO DE TAGS – APENAS VISUAL (SEM ENVIO)
// ========================================

let tagsNoticiaInicializadas = false;

function inicializarTagsNoticia() {
    if (tagsNoticiaInicializadas) return;

    const form = document.getElementById('form-noticia');
    const tagsDisplay = document.querySelector('.tags-selecionadas');
    if (!form || !tagsDisplay) return;

    // Verifica se os blocos dinâmicos foram carregados
    const equipesProntas = document.getElementById('equipes')?.children?.length > 0;
    const pilotosProntos = document.getElementById('pilotos')?.children?.length > 0;

    if (!equipesProntas || !pilotosProntos) {
        setTimeout(inicializarTagsNoticia, 100);
        return;
    }

    // ✅ Pronto!
    tagsNoticiaInicializadas = true;
    console.log('✅ Sistema de tags inicializado.');

    // Atualiza as tags exibidas
    function atualizarTagsExibidas() {
        const geralCheckbox = form.querySelector('input[type="checkbox"][value="geral"]');
        const equipePilotoCheckboxes = form.querySelectorAll(
            'input[type="checkbox"]:not([value="geral"])'
        );
    
        const geralMarcada = geralCheckbox?.checked;
        const equipePilotoMarcadas = Array.from(equipePilotoCheckboxes).filter(cb => cb.checked);
    
        // Elemento de aviso
        const aviso = form.querySelector('#aviso-tags');
        const mostrarAviso = (mensagem) => {
            if (aviso) {
                aviso.textContent = mensagem;
                aviso.style.display = 'block';
                // Remove o aviso após 3 segundos
                setTimeout(() => {
                    if (aviso) aviso.style.display = 'none';
                }, 3000);
            }
        };
    
        // 🔒 Regra 1: Se "Geral" está marcada, desmarca todas as outras
        if (geralMarcada && equipePilotoMarcadas.length > 0) {
            equipePilotoCheckboxes.forEach(cb => cb.checked = false);
            mostrarAviso('⚠️ A tag "Geral" não pode ser combinada com equipes ou pilotos.');
        }
        // 🔒 Regra 2: Se alguma equipe/piloto está marcada, desmarca "Geral"
        else if (!geralMarcada && equipePilotoMarcadas.length > 0 && geralCheckbox?.checked) {
            if (geralCheckbox) geralCheckbox.checked = false;
            mostrarAviso('⚠️ Equipes ou pilotos não podem ser combinados com a tag "Geral".');
        }
    
        // --- Renderiza as tags ---
        const tagsDisplay = form.querySelector('.tags-selecionadas');
        if (!tagsDisplay) return;
    
        tagsDisplay.innerHTML = '';
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    
        if (checkboxes.length === 0) {
            tagsDisplay.innerHTML = '<span style="color:#999;font-style:italic"></span>';
            return;
        }
    
        checkboxes.forEach(checkbox => {
            const label = checkbox.closest('label');
            const tagPreview = label?.querySelector('.tag-preview');
    
            if (tagPreview) {
                const tagClone = tagPreview.cloneNode(true);
                tagClone.classList.add('tag-selecionado-visual');
    
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'remove-tag';
                btn.textContent = '×';
                btn.addEventListener('click', () => {
                    checkbox.checked = false;
                    atualizarTagsExibidas();
                });
    
                tagClone.appendChild(btn);
                tagsDisplay.appendChild(tagClone);
            }
        });
    }

    // Escuta mudanças nos checkboxes (mesmo os carregados depois)
    form.addEventListener('change', (e) => {
        if (e.target.matches('input[type="checkbox"]')) {
            atualizarTagsExibidas();
        }
    });

    // Inicializa
    atualizarTagsExibidas();
}

// Escuta HTMX
document.body.addEventListener('htmx:afterOnLoad', (e) => {
    const id = e.detail.target.id;
    if (id === 'publicar' || id === 'equipes' || id === 'pilotos') {
        inicializarTagsNoticia();
    }
});

// Tenta ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(inicializarTagsNoticia, 150);
});