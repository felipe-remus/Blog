// ============================================================
// CONFIGURAÇÃO
// ============================================================

const NOTICIAS_POR_PAGINA = 20;
let paginaAtual  = 1;
let totalPaginas = 1;


// ============================================================
// SLIDER HERO
// ============================================================

let currentSlide      = 0;
let slides            = [];
let indicators        = [];
let totalSlides       = 0;
let autoSlideInterval;
let sliderInitialized = false;

function initSlider() {
    if (sliderInitialized) stopAutoSlide();

    slides      = document.querySelectorAll('.slide');
    indicators  = document.querySelectorAll('.indicator');
    totalSlides = slides.length;

    if (totalSlides === 0) return;

    currentSlide      = 0;
    sliderInitialized = true;

    showSlide(0);
    startAutoSlide();

    const sliderHero = document.querySelector('.slider-hero');
    if (sliderHero) {
        sliderHero.addEventListener('mouseenter', stopAutoSlide);
        sliderHero.addEventListener('mouseleave', startAutoSlide);

        let touchStartX = 0;
        let touchEndX   = 0;

        sliderHero.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        sliderHero.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) changeSlide(1);
            if (touchEndX > touchStartX + 50) changeSlide(-1);
        });
    }
}

function showSlide(index) {
    if (slides.length === 0) return;

    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));

    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0)       currentSlide = totalSlides - 1;
    else                      currentSlide = index;

    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function startAutoSlide() {
    if (!sliderInitialized) return;
    stopAutoSlide();
    
    //Tempo de mudança das fotos
    autoSlideInterval = setInterval(() => changeSlide(1), 10000); 
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

document.addEventListener('keydown', e => {
    if (!sliderInitialized) return;
    if (e.key === 'ArrowLeft')  changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
});

document.addEventListener('visibilitychange', () => {
    if (!sliderInitialized) return;
    document.hidden ? stopAutoSlide() : startAutoSlide();
});

document.addEventListener('htmx:afterSwap', e => {
    if (
        e.detail.target.querySelector('.slider-hero') ||
        e.detail.target.classList.contains('slider-hero')
    ) {
        setTimeout(initSlider, 150);
    }
});


// ============================================================
// ABAS DE LOGIN / REGISTRO
// ============================================================

document.addEventListener('click', e => {
    if (!e.target.matches('.aba')) return;
    e.preventDefault();

    const aba       = e.target;
    const container = aba.closest('[hx-get], body') || document.body;

    container.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
    aba.classList.add('ativa');

    const alvo = aba.getAttribute('data-aba');
    container.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
    container.querySelector(`#form-${alvo}`)?.classList.add('ativo');
});


// ============================================================
// HEADER — destaque da página atual
// ============================================================

function highlightCurrentPage() {
    requestAnimationFrame(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('#menu-principal .nav-link').forEach(link => {
            const linkPage = link.getAttribute('data-page') || link.getAttribute('href');
            link.classList.toggle('active', linkPage === currentPage);
        });
    });
}

document.body.addEventListener('htmx:afterSwap', e => {
    if (e.target.id === 'xcabecalho' || e.detail.target.id === 'xcabecalho') {
        highlightCurrentPage();
    }
});

// ============================================================
// PAGINAÇÃO
// ============================================================

function aplicarPaginacao() {
    const cards = document.querySelectorAll('.card-noticia');

    cards.forEach(card => card.classList.remove('paginacao-oculto'));

    const cardsVisiveis = Array.from(cards).filter(card => card.style.display !== 'none');
    const totalNoticias = cardsVisiveis.length;

    totalPaginas = Math.ceil(totalNoticias / NOTICIAS_POR_PAGINA) || 1;
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
    if (paginaAtual < 1)            paginaAtual = 1;

    cardsVisiveis.forEach(card => card.classList.add('paginacao-oculto'));

    const inicio = (paginaAtual - 1) * NOTICIAS_POR_PAGINA;
    const fim    = inicio + NOTICIAS_POR_PAGINA;
    cardsVisiveis.slice(inicio, fim).forEach(card => card.classList.remove('paginacao-oculto'));

    _atualizarControlesPaginacao(totalNoticias, inicio, fim);
}

function _atualizarControlesPaginacao(totalNoticias, inicio, fim) {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('info-inicio', totalNoticias > 0 ? inicio + 1 : 0);
    set('info-fim',    Math.min(fim, totalNoticias));
    set('info-total',  totalNoticias);

    const setDisabled = (id, val) => { const el = document.getElementById(id); if (el) el.disabled = val; };
    setDisabled('btn-primeira', paginaAtual === 1);
    setDisabled('btn-anterior', paginaAtual === 1);
    setDisabled('btn-proxima',  paginaAtual === totalPaginas);
    setDisabled('btn-ultima',   paginaAtual === totalPaginas);

    _gerarNumerosPaginas();
}

function _gerarNumerosPaginas() {
    const container = document.getElementById('numeros-paginas');
    if (!container) return;
    container.innerHTML = '';

    let paginas;
    if (totalPaginas <= 7) {
        paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
    } else if (paginaAtual <= 3) {
        paginas = [1, 2, 3, 4, '...', totalPaginas];
    } else if (paginaAtual >= totalPaginas - 2) {
        paginas = [1, '...', totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas];
    } else {
        paginas = [1, '...', paginaAtual - 1, paginaAtual, paginaAtual + 1, '...', totalPaginas];
    }

    paginas.forEach(num => {
        if (num === '...') {
            const span = document.createElement('span');
            span.className   = 'pagina-reticencias';
            span.textContent = '...';
            container.appendChild(span);
        } else {
            const btn = document.createElement('button');
            btn.className   = 'pagina-numero' + (num === paginaAtual ? ' ativa' : '');
            btn.textContent = num;
            btn.onclick     = () => irParaPagina(num);
            container.appendChild(btn);
        }
    });
}

function irParaPagina(numeroPagina) {
    paginaAtual = numeroPagina;
    aplicarPaginacao();

    const container = document.querySelector('.noticias-container');
    if (container) {
        window.scrollTo({
            top:      container.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: 'smooth',
        });
    }
}

function _vincularBotoesPaginacao() {
    const el = id => document.getElementById(id);
    const primeira = el('btn-primeira');
    const anterior = el('btn-anterior');
    const proxima  = el('btn-proxima');
    const ultima   = el('btn-ultima');

    if (primeira) primeira.onclick = () => irParaPagina(1);
    if (anterior) anterior.onclick = () => irParaPagina(Math.max(1, paginaAtual - 1));
    if (proxima)  proxima.onclick  = () => irParaPagina(Math.min(totalPaginas, paginaAtual + 1));
    if (ultima)   ultima.onclick   = () => irParaPagina(totalPaginas);
}

function inicializarPaginacao() {
    _vincularBotoesPaginacao();
    aplicarPaginacao();
}

document.addEventListener('htmx:afterSwap', () => setTimeout(inicializarPaginacao, 150));

// ============================================================
// MODAL DE NOTÍCIA
// ============================================================

// Fecha o modal (precisa ser acessível globalmente para o ESC e overlay)
function fecharModal() {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay) return;
    overlay.classList.remove('ativo');
    document.body.classList.remove('modal-aberto');
}

function inicializarModal() {
    const overlay   = document.getElementById('modalOverlay');
    const modalCard = document.getElementById('modalCard');
    const btnFechar = document.getElementById('modalFechar');

    // Elementos ainda não existem no DOM (HTMX ainda não carregou o card.html)
    if (!overlay || !modalCard || !btnFechar) return;

    function abrirModal(card) {
        const clone = card.cloneNode(true);

        // Limpa conteúdo anterior (mantém só o botão fechar)
        while (modalCard.children.length > 1) {
            modalCard.removeChild(modalCard.lastChild);
        }

        Array.from(clone.children).forEach(el => modalCard.appendChild(el));

        overlay.classList.add('ativo');
        document.body.classList.add('modal-aberto');
        btnFechar.focus();
    }

    // Vincula clique nos cards
    document.querySelectorAll('.card-noticia').forEach(card => {
        card.addEventListener('click', () => abrirModal(card));
    });

    // Botão X
    btnFechar.onclick = fecharModal;

    // Clique no fundo escuro
    overlay.addEventListener('click', e => {
        if (e.target === overlay) fecharModal();
    });
}

// ESC fecha o modal (pode ser registrado uma única vez no document)
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharModal();
});

// Roda após cada swap do HTMX — aguarda o card.html ser injetado no #noticia
document.addEventListener('htmx:afterSwap', e => {
    if (e.detail.target.id === 'noticia') {
        setTimeout(inicializarModal, 50);
    }
});

// ============================================================
// ABAS DE CATEGORIA — Publicar e História
// ============================================================

document.addEventListener('click', e => {
    if (!e.target.matches('.aba-btn')) return;

    const btn = e.target;
    const nav = btn.closest('.abas-nav');
    if (!nav) return;

    nav.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('aba-ativa'));
    btn.classList.add('aba-ativa');
});

function scrollToSecao(id, btn) {
    const el = document.getElementById(id);
    if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
    document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('aba-ativa'));
    btn.classList.add('aba-ativa');
}

// ============================================================
// PUBLICAR PREVIEW — Live Preview do Card de Notícia
// ============================================================

function inicializarPublicarPreview() {
    // ========================================
    // ELEMENTOS DO FORMULÁRIO
    // ========================================
    const inputTitulo = document.getElementById('input-titulo');
    const inputConteudo = document.getElementById('input-conteudo');
    const inputAutor = document.getElementById('input-autor');
    const inputImagem = document.getElementById('input-imagem');
    const categoriaSelecionada = document.getElementById('categoria-selecionada');
    const botoesCategorias = document.querySelectorAll('.categoria-btn');
    const formulario = document.getElementById('form-noticia');

    // Se nenhum desses elementos existe, não inicializar
    if (!formulario || botoesCategorias.length === 0) {
        setTimeout(inicializarPublicarPreview, 200);
        return;
    }

    // ========================================
    // ELEMENTOS DO PREVIEW
    // ========================================
    const previewTitulo = document.getElementById('preview-titulo');
    const previewConteudo = document.getElementById('preview-conteudo');
    const previewAutor = document.getElementById('preview-autor');
    const previewImagem = document.getElementById('preview-imagem');
    const previewData = document.getElementById('preview-data');
    const previewCategoriaBadge = document.getElementById('preview-categoria-badge');
    const previewTag = document.getElementById('preview-tag');
    const previewImagemContainer = document.getElementById('preview-imagem-container');
    const fileName = document.getElementById('file-name');

    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    if (previewData) atualizarDataAtual();

    // ========================================
    // EVENT LISTENERS - INPUTS DE TEXTO
    // ========================================
    if (inputTitulo) {
        inputTitulo.addEventListener('input', function() {
            if (this.value.trim()) {
                previewTitulo.textContent = this.value;
                previewTitulo.classList.remove('preview-text');
            } else {
                previewTitulo.textContent = 'Digite o título aqui...';
                previewTitulo.classList.add('preview-text');
            }
        });
    }

    if (inputConteudo) {
        inputConteudo.addEventListener('input', function() {
            if (this.value.trim()) {
                previewConteudo.textContent = this.value;
                previewConteudo.classList.remove('preview-text');
            } else {
                previewConteudo.textContent = 'Digite o conteúdo da notícia aqui. Será exibido em até 4 linhas na visualização do card.';
                previewConteudo.classList.add('preview-text');
            }
        });
    }

    if (inputAutor) {
        inputAutor.addEventListener('input', function() {
            const autorTexto = this.value.trim() || 'usuário';
            previewAutor.textContent = autorTexto;
        });
    }

    // ========================================
    // EVENT LISTENERS - SELEÇÃO DE IMAGEM
    // ========================================
    if (inputImagem) {
        inputImagem.addEventListener('change', function(e) {
            const arquivo = e.target.files[0];
            
            if (arquivo) {
                // Atualizar nome do arquivo exibido
                if (fileName) fileName.textContent = arquivo.name;
                
                // Criar preview da imagem
                const leitor = new FileReader();
                leitor.onload = function(event) {
                    if (previewImagem) {
                        previewImagem.src = event.target.result;
                        previewImagem.alt = 'Preview - ' + arquivo.name;
                        console.log('✓ Preview da imagem atualizado');
                    }
                };
                leitor.readAsDataURL(arquivo);
            } else {
                if (fileName) fileName.textContent = 'Nenhuma imagem selecionada';
                resetarImagem();
            }
        });

        // 🔥 IMPORTANTE: Quando clicar no botão (.file-label), clicar no input invisível
        const fileLabel = document.querySelector('.file-label');
        if (fileLabel) {
            fileLabel.addEventListener('click', function(e) {
                e.preventDefault();
                inputImagem.click(); // ← ISTO ABRE O DIÁLOGO!
            });
        }
    }

    // ========================================
    // EVENT LISTENERS - SELEÇÃO DE CATEGORIA
    // ========================================
    botoesCategorias.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe ativa de todos os botões
            botoesCategorias.forEach(btn => btn.classList.remove('ativo'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('ativo');
            
            // Atualizar categoria selecionada
            categoriaAtiva = this.getAttribute('data-categoria');
            const categoriaNome = this.textContent;
            
            // Atualizar campo hidden
            if (categoriaSelecionada) categoriaSelecionada.value = categoriaAtiva;
            
            // Atualizar preview
            if (previewCategoriaBadge) previewCategoriaBadge.textContent = categoriaNome;
            if (previewTag) previewTag.textContent = categoriaNome;
        });
    });

    // ========================================
    // SUBMIT DO FORMULÁRIO
    // ========================================
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar categoria selecionada
        if (!categoriaAtiva) {
            alert('Por favor, selecione uma categoria.');
            return;
        }
        
        // Validar imagem selecionada
        if (!inputImagem.files.length) {
            alert('Por favor, selecione uma imagem.');
            return;
        }

        // Aqui você pode fazer o envio para o servidor
        console.log({
            titulo: inputTitulo.value,
            conteudo: inputConteudo.value,
            autor: inputAutor.value,
            categoria: categoriaAtiva,
            imagem: inputImagem.files[0]
        });

        // Simular envio bem-sucedido
        alert('Notícia publicada com sucesso!');
        this.reset();
        resetarPreview();
    });

    // ========================================
    // FUNÇÕES AUXILIARES
    // ========================================
    function atualizarDataAtual() {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        if (previewData) previewData.textContent = `${dia}/${mes}/${ano}`;
    }

    function resetarImagem() {
        if (previewImagem) {
            previewImagem.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"%3E%3Crect fill="%23e8e8e8" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23999"%3ESelecione uma imagem%3C/text%3E%3C/svg%3E';
            previewImagem.alt = 'Preview da imagem';
        }
    }

    function resetarPreview() {
        if (previewTitulo) {
            previewTitulo.textContent = 'Digite o título aqui...';
            previewTitulo.classList.add('preview-text');
        }
        
        if (previewConteudo) {
            previewConteudo.textContent = 'Digite o conteúdo da notícia aqui. Será exibido em até 4 linhas na visualização do card.';
            previewConteudo.classList.add('preview-text');
        }
        
        if (previewAutor) previewAutor.textContent = 'usuário';
        
        resetarImagem();
        
        if (previewCategoriaBadge) previewCategoriaBadge.textContent = 'Categoria';
        if (previewTag) previewTag.textContent = 'Categoria';
        
        if (fileName) fileName.textContent = 'Nenhuma imagem selecionada';
        
        botoesCategorias.forEach(btn => btn.classList.remove('ativo'));
        if (categoriaSelecionada) categoriaSelecionada.value = '';
        categoriaAtiva = null;
        
        atualizarDataAtual();
    }
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.slider-hero'))   initSlider();
    if (document.querySelector('.card-noticia'))  inicializarPaginacao();
    if (document.getElementById('form-noticia'))  inicializarPublicarPreview();
    highlightCurrentPage();
});

// Reinicializar publicar preview ao carregar novo conteúdo via HTMX
document.addEventListener('htmx:afterSwap', e => {
    if (e.detail.target.id === 'conteudo-principal' || 
        e.detail.target.querySelector('#form-noticia')) {
        setTimeout(inicializarPublicarPreview, 150);
    }
});