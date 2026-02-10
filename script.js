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
// Filtros
// ========================================
let timeoutBusca;

function aplicarFiltros() {
    const termo = (document.getElementById('busca-texto')?.value || '').trim().toLowerCase();
    const categoria = document.getElementById('filtro-categoria')?.value || '';
    const equipe = document.getElementById('filtro-equipe')?.value || '';
    const piloto = document.getElementById('filtro-piloto')?.value || '';
    const pista = document.getElementById('filtro-pista')?.value || '';
    const cards = document.querySelectorAll('.card-noticia');

    if (cards.length === 0) return;

    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        const categorias = (card.getAttribute('data-categoria') || '').split(' ').filter(Boolean);
        const equipes = (card.getAttribute('data-equipe') || '').split(' ').filter(Boolean);
        const pilotos = (card.getAttribute('data-piloto') || '').split(' ').filter(Boolean);
        const pistas = (card.getAttribute('data-pista') || '').split(' ').filter(Boolean);

        const passaBusca = !termo || texto.includes(termo);
        const passaCategoria = !categoria || categorias.includes(categoria);
        const passaEquipe = !equipe || equipes.includes(equipe);
        const passaPiloto = !piloto || pilotos.includes(piloto);
        const passaPista = !pista || pistas.includes(pista);

        card.style.display = (passaBusca && passaCategoria && passaEquipe && passaPiloto && passaPista) ? 'block' : 'none';
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
        e.target.id === 'filtro-categoria' ||
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

// Inicializar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', inicializarFiltros);

// ========================================
// VARIÁVEL DE CONTROLE GLOBAL
// ========================================
let limpezaEmAndamento = false;

// ========================================
// Mostrar Tags
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  
    // Event Delegation - funciona mesmo após recarregar com HTMX
    document.addEventListener('click', function(e) {
      // Verifica se clicou em um header colapsável
      if (e.target.classList.contains('collapsible-header')) {
        const targetId = e.target.getAttribute('data-target');
        const content = document.getElementById(targetId);
        
        if (content) {
          content.classList.toggle('show');
          e.target.classList.toggle('active');
        }
      }
      
      // ✅ ADICIONA: Detecta clique no botão limpar por EVENT DELEGATION
      if (e.target.id === 'btn-limpar-todas' || e.target.closest('#btn-limpar-todas')) {
        limparTodasTags();
      }
    });
    
});

// ========================================
// GERENCIADOR DE TAGS - VERSÃO CORRIGIDA
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

// ========================================
// ATUALIZAÇÃO DE CONTADORES
// ========================================
function atualizarContadores() {
    // Contador de Equipes
    const countEquipes = document.getElementById('count-equipes');
    if (countEquipes) {
        countEquipes.textContent = `(${selecoes.equipe.size}/${limites.equipe})`;
    }
    
    // Contador de Pilotos
    const countPilotos = document.getElementById('count-pilotos');
    if (countPilotos) {
        countPilotos.textContent = `(${selecoes.piloto.size}/${limites.piloto})`;
    }
    
    // Contador de Pistas
    const countPistas = document.getElementById('count-pistas');
    if (countPistas) {
        countPistas.textContent = `(${selecoes.pista.size}/${limites.pista})`;
    }
}

// ========================================
// CONTROLE DO BOTÃO LIMPAR 
// ========================================
function atualizarBotaoLimpar() {
    const btnLimpar = document.getElementById('btn-limpar-todas');
    if (!btnLimpar) return;
    
    // Verifica se há alguma tag selecionada em qualquer categoria
    const temTags = Object.values(selecoes).some(set => set.size > 0);
    
    if (temTags) {
        btnLimpar.style.display = 'block';
    } else {
        btnLimpar.style.display = 'none';
    }
}

// ========================================
// ✅ FUNÇÃO LIMPAR TODAS AS TAGS (NOVA!)
// ========================================
function limparTodasTags() {
    
    // ✅ ATIVA FLAG ANTES DE COMEÇAR
    limpezaEmAndamento = true;
    
    // Desmarca todos os checkboxes
    document.querySelectorAll('.checkbox-tag input[type="checkbox"]:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Limpa todas as seleções
    Object.keys(selecoes).forEach(tipo => {
        selecoes[tipo].clear();
    });
    
    // Limpa a área visual
    const tagsSel = document.querySelector('.tags-selecionadas');
    if (tagsSel) {
        tagsSel.innerHTML = '';
    }
    
    // Remove classe de selecionado visual
    document.querySelectorAll('.tag-selecionado-visual').forEach(el => {
        el.classList.remove('tag-selecionado-visual');
    });
    
    // Atualiza contadores e botão
    atualizarContadores();
    atualizarBotaoLimpar();
    
    // Esconde aviso
    const aviso = document.getElementById('aviso-tags');
    if (aviso) {
        aviso.style.display = 'none';
    }
    
    // ✅ DESATIVA FLAG APÓS CONCLUSÃO
    setTimeout(() => { 
        limpezaEmAndamento = false; 
    }, 50);
}

// ========================================
// EVENT LISTENER DE CHANGE (✅ ÚNICO!)
// ========================================
document.addEventListener('change', e => {
    if (e.target.type !== 'checkbox' || !e.target.closest('.checkbox-tag')) return;
    
    // ✅ IGNORA EVENTOS DURANTE LIMPEZA TOTAL
    if (limpezaEmAndamento) return;

    const checkbox = e.target;
    const label = checkbox.closest('.checkbox-tag');
    const tagPreview = label.querySelector('.tag-preview');
    const tipo = getTipoTag(tagPreview);
    const valor = checkbox.value;
    
    if (!tipo) return;

    const tagsSel = document.querySelector('.tags-selecionadas');
    const aviso = document.getElementById('aviso-tags');

    if (!tagsSel) {
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
                setTimeout(() => { if (aviso.textContent === msg) aviso.style.display = 'none'; }, 3500);
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

    // ✅ ATUALIZA CONTADORES E BOTÃO
    atualizarContadores();
    atualizarBotaoLimpar();

    // Limpa aviso se tudo estiver ok
    if (aviso && Object.values(selecoes).every(set => set.size <= limites[set.tipo || 'equipe'])) {
        aviso.style.display = 'none';
    }
});

// ========================================
// Inicializa ao carregar E após HTMX
// ========================================
function inicializarTags() {
    document.querySelectorAll('.checkbox-tag input[type="checkbox"]:checked').forEach(checkbox => {
        const tagPreview = checkbox.closest('.checkbox-tag')?.querySelector('.tag-preview');
        if (!tagPreview) return;
        const tipo = getTipoTag(tagPreview);
        if (tipo) selecoes[tipo].add(checkbox.value);
    });
    atualizarContadores();
    atualizarBotaoLimpar();
}

// Executa na carga inicial
document.addEventListener('DOMContentLoaded', inicializarTags);

// ✅ Se usa HTMX, executa após updates
document.addEventListener('htmx:afterSwap', inicializarTags);

// Fallback com timeout
setTimeout(inicializarTags, 100);

/* ========================================
SLIDER HERO 
======================================== */

let currentSlide = 0;
let slides = [];
let indicators = [];
let totalSlides = 0;
let autoSlideInterval;
let sliderInitialized = false;

// Função para inicializar o slider (chamada após HTMX carregar)
function initSlider() {
    // Evita inicializar múltiplas vezes
    if (sliderInitialized) {
        stopAutoSlide();
    }

    // Seleciona os elementos do slider
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
    totalSlides = slides.length;
    
    if (totalSlides === 0) {
        return;
    }

    currentSlide = 0;
    sliderInitialized = true;

    // Mostra o primeiro slide
    showSlide(0);
    
    // Inicia transição automática
    startAutoSlide();

    // Configura eventos de mouse
    const sliderHero = document.querySelector('.slider-hero');
    if (sliderHero) {
        sliderHero.addEventListener('mouseenter', stopAutoSlide);
        sliderHero.addEventListener('mouseleave', startAutoSlide);

        // Suporte para touch/swipe em dispositivos móveis
        let touchStartX = 0;
        let touchEndX = 0;

        sliderHero.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderHero.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                changeSlide(1);
            }
            if (touchEndX > touchStartX + 50) {
                changeSlide(-1);
            }
        }
    }
}

// Função para mostrar um slide específico
function showSlide(index) {
    if (slides.length === 0) return;

    // Remove a classe active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Ajusta o índice se for maior que o total ou menor que zero
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Adiciona a classe active ao slide e indicador atual
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

// Função para mudar de slide (próximo ou anterior)
function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

// Função para ir para um slide específico
function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// Função para avançar automaticamente
function autoSlide() {
    changeSlide(1);
}

// Inicia o slider automático
function startAutoSlide() {
    if (!sliderInitialized) return;
    stopAutoSlide(); // Para qualquer timer existente
    autoSlideInterval = setInterval(autoSlide, 5000); // 5 segundos
}

// Para o slider automático
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Reinicia o slider automático
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (!sliderInitialized) return;
    
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Para o slider quando a aba não está visível
document.addEventListener('visibilitychange', () => {
    if (!sliderInitialized) return;
    
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

// Listener para quando o HTMX carregar conteúdo
document.addEventListener('htmx:afterSwap', function(event) {
    // Verifica se o conteúdo carregado contém o slider
    if (event.detail.target.querySelector('.slider-hero') || 
        event.detail.target.classList.contains('slider-hero')) {
        setTimeout(initSlider, 150);
    }
});

// Também tenta inicializar quando a página carrega (caso o slider já esteja no HTML)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            if (document.querySelector('.slider-hero')) {
                initSlider();
            }
        }, 200);
    });
} else {
    // DOM já está pronto
    setTimeout(function() {
        if (document.querySelector('.slider-hero')) {
            initSlider();
        }
    }, 200);
}