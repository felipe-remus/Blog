// ========================================
// UTILITÁRIOS GLOBAIS
// ========================================
const tagsSelecionadasAtivas = new Set();

// ========================================
// INICIALIZAÇÃO PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa filtros
    if (document.querySelector('.card-noticia')) inicializarFiltros();
});

// HTMX: re-inicializa componentes 
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

    // Atualiza aba
    container.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
    aba.classList.add('ativa');

    // Mostra formulário 
    const alvo = aba.getAttribute('data-aba');
    container.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
    container.querySelector(`#form-${alvo}`)?.classList.add('ativo');
});

// ========================================
// FILTROS
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
// Selecionar Tags
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Função principal que gerencia as regras de tags
    function initTagManager() {
        const geralCheckbox = document.getElementById('tag-geral');
        if (!geralCheckbox) {
            console.warn("Checkbox 'tag-geral' não encontrado. Verifique o HTML.");
            return;
        }

        const tagsContainer = document.querySelector('.tags-selecionadas');
        const errorMessage = document.getElementById('aviso-tags');

        // Listener do "X"
        tagsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-tag')) {
                const tagSpan = e.target.closest('span[data-value]');
                if (!tagSpan) return;
                const value = tagSpan.getAttribute('data-value');
                const checkbox = document.querySelector(`input[type="checkbox"][value="${value}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });


        // Função para atualizar a lista de tags exibidas
        function updateTagsDisplay() {
            tagsContainer.innerHTML = '';
        
            if (geralCheckbox.checked) {
                const tagEl = document.createElement('span');
                tagEl.className = 'tag tag-preview geral';
                tagEl.textContent = 'Fórmula 1';
                tagEl.setAttribute('data-value', 'geral');
                tagEl.innerHTML += ' <span class="remove-tag">X</span>';
                tagsContainer.appendChild(tagEl);
            } else {
                const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
                checkedBoxes.forEach(cb => {
                    if (cb.id === 'tag-geral') return;
                    const label = cb.closest('label');
                    if (label && label.children[1]) {
                        const preview = label.children[1];
                        const tagEl = document.createElement('span');
                        tagEl.className = preview.className;
                        tagEl.textContent = preview.textContent;
                        tagEl.setAttribute('data-value', cb.value);
                        tagEl.innerHTML += ' <span class="remove-tag">×</span>';
                        tagsContainer.appendChild(tagEl);
                    }
                });
            }
        }

        // Função para validar e aplicar regras
        function handleCheckboxChange(e) {
            const cb = e.target;
            const isGeral = cb.id === 'tag-geral';

            if (isGeral && cb.checked) {
                // Verifica se há outras tags marcadas (além da Geral)
                const outrasMarcadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                    .some(other => other !== cb);

                if (outrasMarcadas) {
                    // Desmarca todas as outras tags
                    document.querySelectorAll('input[type="checkbox"]').forEach(otherCb => {
                        if (otherCb !== cb) otherCb.checked = false;
                    });
                    // Mostra aviso por 3 segundos
                    errorMessage.textContent = '⚠️A tag "Fórmula 1" só pode ser usada sozinha. Outras tags foram removidas.';
                    errorMessage.style.display = 'block';
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 4500);
                } else {
                    errorMessage.style.display = 'none';
                }
            } else if (!isGeral && cb.checked && geralCheckbox.checked) {
                // Bloqueia seleção de equipe/piloto com Geral ativa
                cb.checked = false;
                errorMessage.textContent = '⚠️A tag "Fórmula 1" só pode ser selecionada sozinha.';
                errorMessage.style.display = 'block';
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 4500);
                return;
            } else {
                errorMessage.style.display = 'none';
            }

            updateTagsDisplay();
        }

        // Adiciona evento ao checkbox geral
        geralCheckbox.addEventListener('change', handleCheckboxChange);

        // Adiciona eventos a todos os checkboxes existentes (incluindo os carregados por HTMX)
        // Usamos delegation para cobrir futuros checkboxes (carregados via HTMX)
        document.addEventListener('change', function(e) {
            if (e.target.type === 'checkbox' && e.target.id !== 'tag-geral') {
                handleCheckboxChange(e);
            }
        });

        // Inicializa o estado atual
        updateTagsDisplay();

        // --- HTMX: re-executa após carregar equipes/pilotos ---
        // HTMX dispara `htmx:afterSettle` após inserir conteúdo via hx-get
        document.addEventListener('htmx:afterSettle', function() {
            // Reaplica os listeners aos novos checkboxes (caso ainda não tenham)
            const newCheckboxes = document.querySelectorAll('input[type="checkbox"]');
            newCheckboxes.forEach(cb => {
                // Evita duplicar listeners
                if (!cb.hasAttribute('data-tag-listener')) {
                    cb.setAttribute('data-tag-listener', 'true');
                    // Se for o geral, já tem listener; senão, só precisamos do delegation acima
                    // Mas garantimos que todos respondam ao change (mesmo se o delegation falhar em algum caso)
                    if (cb.id !== 'tag-geral') {
                        cb.addEventListener('change', handleCheckboxChange);
                    }
                }
            });
        });
    }

    // Inicia assim que o DOM estiver pronto
    initTagManager();

    // Caso HTMX ainda não tenha carregado os tags, aguarda um pouco (fallback)
    setTimeout(initTagManager, 500);
});