// ========================================
// TROCA DE ABAS: LOGIN / REGISTRO
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const abas = document.querySelectorAll('.aba');
    
    // Só executa se estiver na página de login
    if (abas.length === 0) return;

    abas.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove classe "ativa" de todas as abas
            document.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
            
            // Adiciona "ativa" à aba clicada
            this.classList.add('ativa');

            // Esconde todos os formulários
            document.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));

            // Mostra o formulário correspondente
            const aba = this.getAttribute('data-aba');
            const formulario = document.getElementById(`form-${aba}`);
            if (formulario) {
                formulario.classList.add('ativo');
            }
        });
    });
});

// ========================================
// FILTRO COMBINADO: TEXTO + EQUIPE/PILOTO
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const inputBusca = document.getElementById('busca-texto');
    const selectEquipe = document.getElementById('filtro-equipe');
    const selectPiloto = document.getElementById('filtro-piloto');
    const cards = document.querySelectorAll('.card-noticia');

    if (cards.length === 0) return;

    function aplicarFiltros() {
        const termoBusca = (inputBusca?.value || '').trim().toLowerCase();
        const equipeSelecionada = selectEquipe?.value || '';
        const pilotoSelecionado = selectPiloto?.value || '';

        cards.forEach(card => {
            // 1. Verifica busca por texto
            const textoCard = card.textContent.toLowerCase();
            const passaBusca = termoBusca === '' || textoCard.includes(termoBusca);

            // 2. Verifica filtro de equipe
            const equipesCard = card.getAttribute('data-equipe') || '';
            const passaEquipe = !equipeSelecionada || 
                equipesCard.split(' ').includes(equipeSelecionada);

            // 3. Verifica filtro de piloto
            const pilotosCard = card.getAttribute('data-piloto') || '';
            const passaPiloto = !pilotoSelecionado || 
                pilotosCard.split(' ').includes(pilotoSelecionado);

            // 4. Mostra só se passar por todos
            if (passaBusca && passaEquipe && passaPiloto) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Aplica filtros quando algo muda
    if (inputBusca) {
        let timeout;
        inputBusca.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(aplicarFiltros, 200);
        });
    }

    if (selectEquipe) {
        selectEquipe.addEventListener('change', aplicarFiltros);
    }

    if (selectPiloto) {
        selectPiloto.addEventListener('change', aplicarFiltros);
    }

    // Aplica no carregamento
    aplicarFiltros();
});

/// ========================================
// PÁGINA DE ESCREVER NOTÍCIA – GESTÃO DE TAGS E SIMULAÇÃO DE PUBLICAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const formNoticia = document.getElementById('form-noticia');
    if (!formNoticia) return;

    // Armazena as tags selecionadas (evita duplicação)
    let tagsSelecionadasAtivas = new Set();

    const tagsContainer = document.querySelector('.tags-selecionadas');
    const checkboxes = formNoticia.querySelectorAll('input[type="checkbox"]');

    // Limpa tags de exemplo iniciais
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
    }

    // Atualiza a exibição visual das tags
    function atualizarVisualTags() {
        tagsContainer.innerHTML = '';
        tagsSelecionadasAtivas.forEach(tagObj => {
            const tagElement = document.createElement('span');
            tagElement.className = `tag tag-selecionado ${tagObj.classe}`;
            tagElement.innerHTML = `${tagObj.nome} <button type="button" class="remove-tag">×</button>`;
            tagsContainer.appendChild(tagElement);

            // Evento de remoção
            const botaoRemover = tagElement.querySelector('.remove-tag');
            botaoRemover.addEventListener('click', () => {
                tagsSelecionadasAtivas.delete(tagObj);
                atualizarVisualTags();
                // Desmarca checkbox correspondente
                const checkbox = formNoticia.querySelector(`input[value="${tagObj.value}"]`);
                if (checkbox) checkbox.checked = false;
            });
        });
    }

    // Adiciona evento aos checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const value = this.value;
            const label = this.nextElementSibling;
            const nome = label.textContent.trim();

            let classe = 'geral';
            if (value === 'geral') {
                classe = 'geral';
            } else if (['alpine','astonmartin','audi','cadillac','ferrari','haas','mclaren','mercedes','racingbulls','redbull','williams'].includes(value)) {
                classe = `equipe-${value}`;
            } else {
                classe = 'piloto';
            }

            if (this.checked) {
                // Evita duplicação com Set
                tagsSelecionadasAtivas.add({ value, nome, classe });
            } else {
                // Remove se desmarcado
                tagsSelecionadasAtivas = new Set([...tagsSelecionadasAtivas].filter(t => t.value !== value));
            }
            atualizarVisualTags();
        });
    });

    // --- ENVIAR NOTÍCIA ---
    formNoticia.addEventListener('submit', function (e) {
        e.preventDefault();

        const titulo = document.getElementById('titulo-noticia').value.trim();
        const texto = document.getElementById('texto-noticia').value.trim();

        if (!titulo || !texto) {
            alert('⚠️ Preencha título e texto.');
            return;
        }

        if (tagsSelecionadasAtivas.size === 0) {
            alert('⚠️ Selecione pelo menos uma tag.');
            return;
        }

        // Classifica onde a notícia aparecerá
        const tags = Array.from(tagsSelecionadasAtivas);
        const equipes = tags.filter(t => t.classe.startsWith('equipe')).map(t => t.value);
        const pilotos = tags.filter(t => t.classe === 'piloto').map(t => t.value);
        const temGeral = tags.some(t => t.value === 'geral');

        let locais = [];

        if (temGeral) {
            locais.push('Home (Fórmula 1)');
        }

        if (equipes.length > 0) {
            locais.push(`Equipes: ${equipes.join(', ')}`);
        }

        if (pilotos.length > 0) {
            locais.push(`Pilotos: ${pilotos.join(', ')}`);
        }

        // Mensagem de simulação
        alert(`✅ Notícia pronta!\n\nTítulo: ${titulo}\n\nAparecerá em:\n${locais.join('\n')}\n\n(Este recurso será ativado com o backend.)`);
    });
});