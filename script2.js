// ========================================
// UTILITÁRIOS
// ========================================
let tagsSelecionadasAtivas = new Set(); // Mantido global para o formulário de escrita

// ========================================
// INICIALIZAÇÃO APÓS CARREGAMENTO DO HTMX
// ========================================
document.body.addEventListener('htmx:afterOnLoad', function (event) {
    const container = event.detail.elt;

    // 1. Inicializa sistema de abas (login/registro)
    if (container.querySelector('.aba')) {
        inicializarAbas(container);
    }

    // 2. Inicializa filtros (busca, equipe, piloto)
    if (container.querySelector('.card-noticia') || 
        container.querySelector('#busca-texto') || 
        container.querySelector('#filtro-equipe') ||
        container.querySelector('#filtro-piloto')) {
        inicializarFiltros();
    }

    // 3. Inicializa formulário de escrita de notícia
    const formNoticia = container.querySelector('#form-noticia');
    if (formNoticia) {
        inicializarFormNoticia(formNoticia);
    }
});

// ========================================
// TROCA DE ABAS: LOGIN / REGISTRO
// ========================================
function inicializarAbas(container) {
    // Já está usando delegação abaixo, então aqui só garantimos que não há listeners duplicados
    // A lógica principal está em eventos delegados
}

// Delegação global para abas
document.addEventListener('click', function (e) {
    if (e.target.matches('.aba')) {
        e.preventDefault();

        const button = e.target;
        const container = button.closest('[hx-get], body') || document.body;

        // Remove "ativa" de todas as abas no mesmo contexto
        container.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
        button.classList.add('ativa');

        // Esconde todos os formulários no mesmo contexto
        container.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));

        // Mostra o formulário correspondente
        const aba = button.getAttribute('data-aba');
        const formulario = container.querySelector(`#form-${aba}`);
        if (formulario) {
            formulario.classList.add('ativo');
        }
    }
});

// ========================================
// FILTRO COMBINADO: TEXTO + EQUIPE/PILOTO
// ========================================
let timeoutBusca;

function aplicarFiltros() {
    const inputBusca = document.getElementById('busca-texto');
    const selectEquipe = document.getElementById('filtro-equipe');
    const selectPiloto = document.getElementById('filtro-piloto');
    const cards = document.querySelectorAll('.card-noticia');

    if (cards.length === 0) return;

    const termoBusca = (inputBusca?.value || '').trim().toLowerCase();
    const equipeSelecionada = selectEquipe?.value || '';
    const pilotoSelecionado = selectPiloto?.value || '';

    cards.forEach(card => {
        const textoCard = card.textContent.toLowerCase();
        const passaBusca = termoBusca === '' || textoCard.includes(termoBusca);

        const equipesCard = card.getAttribute('data-equipe') || '';
        const passaEquipe = !equipeSelecionada || equipesCard.split(' ').includes(equipeSelecionada);

        const pilotosCard = card.getAttribute('data-piloto') || '';
        const passaPiloto = !pilotoSelecionado || pilotosCard.split(' ').includes(pilotoSelecionado);

        card.style.display = (passaBusca && passaEquipe && passaPiloto) ? 'block' : 'none';
    });
}

// Delegação global para filtros
document.addEventListener('input', function (e) {
    if (e.target.id === 'busca-texto') {
        clearTimeout(timeoutBusca);
        timeoutBusca = setTimeout(aplicarFiltros, 200);
    }
});

document.addEventListener('change', function (e) {
    if (e.target.id === 'filtro-equipe' || e.target.id === 'filtro-piloto') {
        aplicarFiltros();
    }
});

// Função de inicialização (chamada pelo HTMX)
function inicializarFiltros() {
    // Aplica filtros imediatamente após carregar os componentes
    setTimeout(aplicarFiltros, 10); // pequeno delay para garantir renderização
}

// ========================================
// PÁGINA DE ESCREVER NOTÍCIA – GESTÃO DE TAGS
// ========================================
function inicializarFormNoticia(formNoticia) {
    // Reset global para evitar conflito entre carregamentos (opcional)
    tagsSelecionadasAtivas = new Set();

    const tagsContainer = formNoticia.querySelector('.tags-selecionadas');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
    }

    // Atualiza visual das tags
    function atualizarVisualTags() {
        if (!tagsContainer) return;
        tagsContainer.innerHTML = '';
        tagsSelecionadasAtivas.forEach(tagObj => {
            const tagElement = document.createElement('span');
            tagElement.className = `tag tag-selecionado ${tagObj.classe}`;
            tagElement.innerHTML = `${tagObj.nome} <button type="button" class="remove-tag">×</button>`;
            tagsContainer.appendChild(tagElement);

            // Listener de remoção (com delegação, mas como é dinâmico, vamos usar diretamente)
            const botaoRemover = tagElement.querySelector('.remove-tag');
            if (botaoRemover) {
                botaoRemover.onclick = () => {
                    tagsSelecionadasAtivas.delete(tagObj);
                    atualizarVisualTags();
                    const checkbox = formNoticia.querySelector(`input[value="${tagObj.value}"]`);
                    if (checkbox) checkbox.checked = false;
                };
            }
        });
    }

    // Listener para checkboxes
    formNoticia.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        // Evita múltiplos listeners se o formulário for recarregado
        checkbox.onclick = function () {
            const value = this.value;
            const label = this.nextElementSibling;
            const nome = label?.textContent.trim() || value;

            let classe = 'geral';
            if (value === 'geral') {
                classe = 'geral';
            } else if (['alpine','astonmartin','audi','cadillac','ferrari','haas','mclaren','mercedes','racingbulls','redbull','williams'].includes(value)) {
                classe = `equipe-${value}`;
            } else {
                classe = 'piloto';
            }

            if (this.checked) {
                tagsSelecionadasAtivas.add({ value, nome, classe });
            } else {
                tagsSelecionadasAtivas = new Set([...tagsSelecionadasAtivas].filter(t => t.value !== value));
            }
            atualizarVisualTags();
        };
    });

    // Submissão do formulário
    if (!formNoticia.hasAttribute('data-submit-listener')) {
        formNoticia.addEventListener('submit', function (e) {
            e.preventDefault();

            const titulo = document.getElementById('titulo-noticia')?.value.trim();
            const texto = document.getElementById('texto-noticia')?.value.trim();

            if (!titulo || !texto) {
                alert('⚠️ Preencha título e texto.');
                return;
            }

            if (tagsSelecionadasAtivas.size === 0) {
                alert('⚠️ Selecione pelo menos uma tag.');
                return;
            }

            const tags = Array.from(tagsSelecionadasAtivas);
            const equipes = tags.filter(t => t.classe.startsWith('equipe')).map(t => t.value);
            const pilotos = tags.filter(t => t.classe === 'piloto').map(t => t.value);
            const temGeral = tags.some(t => t.value === 'geral');

            let locais = [];
            if (temGeral) locais.push('Home (Fórmula 1)');
            if (equipes.length > 0) locais.push(`Equipes: ${equipes.join(', ')}`);
            if (pilotos.length > 0) locais.push(`Pilotos: ${pilotos.join(', ')}`);

            alert(`✅ Notícia pronta!\n\nTítulo: ${titulo}\n\nAparecerá em:\n${locais.join('\n')}\n\n(Este recurso será ativado com o backend.)`);
        });
        formNoticia.setAttribute('data-submit-listener', 'true');
    }
}