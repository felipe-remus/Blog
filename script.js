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
// FILTROS (com suporte a PISTA)
// ========================================
let timeoutBusca;

function aplicarFiltros() {
    const termo = (document.getElementById('busca-texto')?.value || '').trim().toLowerCase();
    const equipe = document.getElementById('filtro-equipe')?.value || '';
    const piloto = document.getElementById('filtro-piloto')?.value || '';
    const pista = document.getElementById('filtro-pista')?.value || '';
    const cards = document.querySelectorAll('.card-noticia');

    if (cards.length === 0) return;

    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        const equipes = (card.getAttribute('data-equipe') || '').split(' ').filter(Boolean);
        const pilotos = (card.getAttribute('data-piloto') || '').split(' ').filter(Boolean);
        const pistas = (card.getAttribute('data-pista') || '').split(' ').filter(Boolean);

        const passaBusca = !termo || texto.includes(termo);
        const passaEquipe = !equipe || equipes.includes(equipe);
        const passaPiloto = !piloto || pilotos.includes(piloto);
        const passaPista = !pista || pistas.includes(pista);

        card.style.display = (passaBusca && passaEquipe && passaPiloto && passaPista) ? 'block' : 'none';
    });
}

document.addEventListener('input', (e) => {
    if (e.target.id === 'busca-texto') {
        clearTimeout(timeoutBusca);
        timeoutBusca = setTimeout(aplicarFiltros, 200);
    }
});

document.addEventListener('change', (e) => {
    if (
        e.target.id === 'filtro-equipe' ||
        e.target.id === 'filtro-piloto' ||
        e.target.id === 'filtro-pista'
    ) {
        aplicarFiltros();
    }
});

function inicializarFiltros() {
    setTimeout(aplicarFiltros, 10);
}

// ========================================
// Mostrar Tags
// ========================================
// Inicializa as seções colapsáveis
document.addEventListener('DOMContentLoaded', function() {
  // Garante que os listeners sejam aplicados mesmo após carregamento via HTMX
  function initCollapsible() {
    document.querySelectorAll('.collapsible-header').forEach(header => {
      header.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);
        content.classList.toggle('show');
      });
    });
  }

  // Inicializa imediatamente
  initCollapsible();

  // Reaplica após carregar conteúdo via HTMX
  document.addEventListener('htmx:afterRequest', initCollapsible);
});

// ========================================
// GERENCIADOR DE TAGS - VERSÃO CORRIGIDA
// Resolve: duplicação + limite funcional + clique na tag
// ========================================

const selecoes = {
    categoria: new Set(),
    equipe: new Set(),
    piloto: new Set(),
    pista: new Set()
};
const limites = { categoria: 1, equipe: 4, piloto: 4, pista: 4 };

function getTipoTag(elemento) {
    if (elemento.classList.contains('categoria')) return 'categoria';
    if (elemento.classList.contains('piloto')) return 'piloto';
    if (elemento.classList.contains('pista')) return 'pista';
    if ([...elemento.classList].some(c => c.startsWith('equipe-'))) return 'equipe';
    return null;
}

// ✅ FUNÇÃO HELPER: Busca checkbox de forma robusta
function encontrarCheckbox(valor, tipo) {
    const candidates = document.querySelectorAll('.checkbox-tag input[type="checkbox"]');
    for (const cb of candidates) {
        const label = cb.closest('.checkbox-tag');
        if (!label) continue;
        
        const tagPreview = label.querySelector('.tag-preview');
        if (!tagPreview) continue;
        
        const cbTipo = getTipoTag(tagPreview);
        
        if (cb.value === valor && cbTipo === tipo) {
            return cb;
        }
    }
    return null;
}

document.addEventListener('change', e => {
    if (e.target.type !== 'checkbox' || !e.target.closest('.checkbox-tag')) return;

    const checkbox = e.target;
    const label = checkbox.closest('.checkbox-tag');
    const tagPreview = label.querySelector('.tag-preview');
    const tipo = getTipoTag(tagPreview);
    const valor = checkbox.value;
    
    if (!tipo) return;

    const tagsSel = document.querySelector('.tags-selecionadas');
    const aviso = document.getElementById('aviso-tags');

    if (!tagsSel) {
        console.error('❌ .tags-selecionadas não encontrado!');
        return;
    }

    // Verifica estado atual
    const jaSelecionado = selecoes[tipo].has(valor);

    if (checkbox.checked) {
        // Impede duplicação
        if (jaSelecionado) {
            checkbox.checked = false;
            return;
        }

        // Verifica limite
        if (selecoes[tipo].size >= limites[tipo]) {
            checkbox.checked = false;
            const msg = tipo === 'categoria' 
                ? '⚠️ Só 1 categoria permitida.' 
                : `⚠️ Máximo de ${limites[tipo]} ${tipo === 'equipe' ? 'equipes' : tipo === 'piloto' ? 'pilotos' : 'pistas'} atingido.`;
            
            if (aviso) {
                aviso.textContent = msg;
                aviso.style.cssText = 'display:block;color:#d32f2f;background:#ffebee;padding:0.5rem;border-radius:4px;border-left:3px solid #d32f2f;font-size:0.9rem';
                setTimeout(() => { if (aviso.textContent === msg) aviso.style.display = 'none'; }, 5000);
            }
            return;
        }

        // Adiciona à seleção
        selecoes[tipo].add(valor);

        // Adiciona tag visual
        const clone = tagPreview.cloneNode(true);
        clone.classList.add('tag-selecionada');
        clone.classList.remove('tag-preview');

        // ✅ Armazena o valor e o tipo para busca segura
        clone.dataset.tagValue = valor;
        clone.dataset.tagTipo = tipo;

        // ✅ Clique na tag inteira → desmarca
        clone.style.cursor = 'pointer';
        clone.onclick = function(e) {
            // Se clicar no X, deixa o X lidar
            if (e.target.classList.contains('remove-tag')) return;
            e.stopPropagation();

            const cb = encontrarCheckbox(valor, tipo);
            if (cb && cb.checked) {
                cb.checked = false;
                cb.dispatchEvent(new Event('change', { bubbles: true }));
            }
        };

        // ✅ Botão ×
        const btn = document.createElement('span');
        btn.className = 'remove-tag';
        btn.innerHTML = '&times;';
        btn.style.cssText = 'margin-left:0.4rem;font-weight:bold;cursor:pointer;opacity:0.7';
        btn.onclick = function(e) {
            e.stopPropagation();
            const cb = encontrarCheckbox(valor, tipo);
            if (cb && cb.checked) {
                cb.checked = false;
                cb.dispatchEvent(new Event('change', { bubbles: true }));
            }
        };
        clone.appendChild(btn);

        tagsSel.appendChild(clone);
        label.classList.add('tag-selecionado-visual');

    } else {
        // ✅ Remove da seleção
        selecoes[tipo].delete(valor);

        // ✅ Remove tag visual usando dataset
        tagsSel.querySelectorAll('.tag-selecionada').forEach(tag => {
            if (tag.dataset.tagValue === valor && tag.dataset.tagTipo === tipo) {
                tag.remove();
            }
        });
        
        label.classList.remove('tag-selecionado-visual');
    }

    // Limpa aviso se tudo estiver ok
    if (aviso && Object.values(selecoes).every(set => set.size <= limites[set.tipo || 'equipe'])) {
        aviso.style.display = 'none';
    }
});

// Inicializa seleções existentes (ex: ao editar)
setTimeout(() => {
    document.querySelectorAll('.checkbox-tag input[type="checkbox"]:checked').forEach(checkbox => {
        const tagPreview = checkbox.closest('.checkbox-tag')?.querySelector('.tag-preview');
        if (!tagPreview) return;
        const tipo = getTipoTag(tagPreview);
        if (tipo) selecoes[tipo].add(checkbox.value);
    });
}, 100);