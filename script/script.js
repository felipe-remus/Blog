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
// MODAL DE NOTÍCIA (VISUALIZAÇÃO)
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
        card.addEventListener('click', (e) => {
            // Previne abrir o modal se clicou nos botões
            if (e.target.closest('.btn-acao') || e.target.closest('.card-acoes')) {
                return;
            }
            abrirModal(card);
        });
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
    if (e.detail.target.id === 'noticia' || 
        e.detail.target.classList.contains('noticias-container') ||
        e.detail.target.querySelector('.card-noticia')) {
        setTimeout(inicializarModal, 50);
    }
});

// Chamar inicializarModal quando o página carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(inicializarModal, 100);
});

// ============================================================
// EDITAR E DELETAR NOTÍCIAS
// ============================================================

let noticiaEditacaoAtual = { id: null, titulo: null, conteudo: null, categoria: null };
let noticiaDelecaoAtual = { id: null, titulo: null };

function carregarCategorias() {
    fetch('card.php?acao=categorias')
        .then(response => response.json())
        .then(data => {
            if (data.sucesso) {
                const selectCategoria = document.getElementById('editar-categoria');
                if (selectCategoria) {
                    data.categorias.forEach(cat => {
                        const option = document.createElement('option');
                        option.value = cat.id_categoria;
                        option.textContent = cat.nome_categoria;
                        selectCategoria.appendChild(option);
                    });
                }
            }
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
            mostrarNotificacao('Erro ao carregar categorias', 'erro');
        });
}

function abrirModalEdicao(btn) {
    const id = btn.dataset.id;
    const titulo = btn.dataset.titulo;
    const conteudo = btn.dataset.conteudo;
    const categoria = btn.dataset.categoria;

    if (!id || !titulo) {
        mostrarNotificacao('Dados da notícia inválidos', 'erro');
        return;
    }

    document.getElementById('noticia-id').value = id;
    document.getElementById('editar-titulo').value = titulo;
    document.getElementById('editar-conteudo').value = conteudo;
    document.getElementById('editar-categoria').value = categoria;

    noticiaEditacaoAtual = { id, titulo, conteudo, categoria };
    document.getElementById('modalEdicao').style.display = 'flex';
}

function abrirModalDelecao(btn) {
    const id = btn.dataset.id;
    const titulo = btn.dataset.titulo;

    if (!id || !titulo) {
        mostrarNotificacao('Dados da notícia inválidos', 'erro');
        return;
    }

    noticiaDelecaoAtual = { id, titulo };

    const textoConfirmacao = document.getElementById('textoConfirmacao');
    if (textoConfirmacao) {
        textoConfirmacao.textContent = `Tem certeza que deseja deletar a notícia "${titulo}"? Esta ação é irreversível!`;
    }

    document.getElementById('modalConfirmacaoDelete').style.display = 'flex';
}

function fecharModalEdicao() {
    document.getElementById('modalEdicao').style.display = 'none';
}

function fecharModalDelecao() {
    document.getElementById('modalConfirmacaoDelete').style.display = 'none';
}

function salvarEdicaoNoticia() {
    const id = document.getElementById('noticia-id').value;
    const titulo = document.getElementById('editar-titulo').value.trim();
    const conteudo = document.getElementById('editar-conteudo').value.trim();
    const categoria_id = document.getElementById('editar-categoria').value;

    if (!titulo || !conteudo || !categoria_id) {
        mostrarNotificacao('Preencha todos os campos', 'erro');
        return;
    }

    if (titulo.length < 3) {
        mostrarNotificacao('Título deve ter no mínimo 3 caracteres', 'erro');
        return;
    }

    if (conteudo.length < 10) {
        mostrarNotificacao('Conteúdo deve ter no mínimo 10 caracteres', 'erro');
        return;
    }

    const formData = new FormData();
    formData.append('acao', 'editar');
    formData.append('id_noticia', id);
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('categoria_id', categoria_id);

    const btnSalvar = document.querySelector('.btn-salvar');
    const textoBotaoOriginal = btnSalvar.textContent;
    btnSalvar.disabled = true;
    btnSalvar.textContent = 'Salvando...';

    fetch('card.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.sucesso) {
                mostrarNotificacao('Notícia atualizada com sucesso!', 'sucesso');
                fecharModalEdicao();
                setTimeout(() => { location.reload(); }, 1500);
            } else {
                mostrarNotificacao(data.mensagem || 'Erro ao salvar notícia', 'erro');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            mostrarNotificacao('Erro ao processar requisição', 'erro');
        })
        .finally(() => {
            btnSalvar.disabled = false;
            btnSalvar.textContent = textoBotaoOriginal;
        });
}

function deletarNoticia() {
    const id = noticiaDelecaoAtual.id;

    if (!id) {
        mostrarNotificacao('Erro ao deletar notícia', 'erro');
        return;
    }

    const formData = new FormData();
    formData.append('acao', 'deletar');
    formData.append('id_noticia', id);

    const btnConfirmar = document.getElementById('btnConfirmarDelete');
    const textoBotaoOriginal = btnConfirmar.textContent;
    btnConfirmar.disabled = true;
    btnConfirmar.textContent = 'Deletando...';

    fetch('card.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.sucesso) {
                mostrarNotificacao('Notícia deletada com sucesso!', 'sucesso');
                fecharModalDelecao();

                const article = document.querySelector(`article[data-id="${id}"]`);
                if (article) {
                    article.style.transition = 'opacity 0.3s ease';
                    article.style.opacity = '0';
                }

                setTimeout(() => { location.reload(); }, 1500);
            } else {
                mostrarNotificacao(data.mensagem || 'Erro ao deletar notícia', 'erro');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            mostrarNotificacao('Erro ao processar requisição', 'erro');
        })
        .finally(() => {
            btnConfirmar.disabled = false;
            btnConfirmar.textContent = textoBotaoOriginal;
        });
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    const toast = document.getElementById('notificacao-toast');
    if (!toast) return;

    toast.textContent = mensagem;
    toast.className = `notificacao-toast ${tipo} ativo`;

    setTimeout(() => {
        toast.classList.remove('ativo');
    }, 4000);
}

function inicializarAcoesNoticia() {
    // Carregar categorias
    carregarCategorias();

    // Botão Editar
    document.addEventListener('click', (e) => {
        const btnEditar = e.target.closest('.btn-editar');
        if (btnEditar) abrirModalEdicao(btnEditar);
    });

    // Botão Deletar
    document.addEventListener('click', (e) => {
        const btnDeletar = e.target.closest('.btn-deletar');
        if (btnDeletar) abrirModalDelecao(btnDeletar);
    });

    // Fechar Modais
    const fecharModalEdicaoBtn = document.getElementById('fecharModalEdicao');
    const btnCancelarEdicao = document.getElementById('btnCancelarEdicao');
    const fecharModalDeleteBtn = document.getElementById('fecharModalDelete');
    const btnCancelarDelete = document.getElementById('btnCancelarDelete');

    if (fecharModalEdicaoBtn) fecharModalEdicaoBtn.addEventListener('click', fecharModalEdicao);
    if (btnCancelarEdicao) btnCancelarEdicao.addEventListener('click', fecharModalEdicao);
    if (fecharModalDeleteBtn) fecharModalDeleteBtn.addEventListener('click', fecharModalDelecao);
    if (btnCancelarDelete) btnCancelarDelete.addEventListener('click', fecharModalDelecao);

    // Formulário de Edição
    const formEditar = document.getElementById('form-editar-noticia');
    if (formEditar) {
        formEditar.addEventListener('submit', (e) => {
            e.preventDefault();
            salvarEdicaoNoticia();
        });
    }

    // Confirmação de Deleção
    const btnConfirmarDelete = document.getElementById('btnConfirmarDelete');
    if (btnConfirmarDelete) {
        btnConfirmarDelete.addEventListener('click', deletarNoticia);
    }

    // Fechar ao clicar fora do modal (Edição)
    const modalEdicao = document.getElementById('modalEdicao');
    if (modalEdicao) {
        modalEdicao.addEventListener('click', (e) => {
            if (e.target === modalEdicao) fecharModalEdicao();
        });
    }

    // Fechar ao clicar fora do modal (Deleção)
    const modalDelete = document.getElementById('modalConfirmacaoDelete');
    if (modalDelete) {
        modalDelete.addEventListener('click', (e) => {
            if (e.target === modalDelete) fecharModalDelecao();
        });
    }
}

// Inicializar quando página carregar
document.addEventListener('DOMContentLoaded', inicializarAcoesNoticia);

// Reinicializar após HTMX swap
document.addEventListener('htmx:afterSwap', (e) => {
    if (e.detail.target.classList.contains('noticias-container') ||
        e.detail.target.querySelector('.card-noticia')) {
        setTimeout(inicializarAcoesNoticia, 50);
    }
});

// ============================================================
// NAVEGAÇÃO ENTRE SEÇÕES - História
// ============================================================

const historiaSections = document.querySelectorAll('[data-historia]');
const historiaButtons = document.querySelectorAll('.historia-btn');

historiaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.querySelector(`[data-historia="${targetId}"]`);

        historiaSections.forEach(section => section.classList.remove('active'));
        historiaButtons.forEach(button => button.classList.remove('active'));

        if (targetSection) {
            targetSection.classList.add('active');
            btn.classList.add('active');
        }
    });
});

// ============================================================
// PUBLICAR - PREVIEW EM TEMPO REAL
// ============================================================

function inicializarPublicarPreview() {
    const formulario            = document.getElementById('form-noticia');
    const inputTitulo           = document.getElementById('titulo_noticia');
    const inputConteudo         = document.getElementById('texto_noticia');
    const inputAutor            = document.getElementById('autor');
    const inputImagem           = document.getElementById('imagem_noticia');
    const botoesCategorias      = document.querySelectorAll('.categoria-btn');
    const categoriaSelecionada  = document.getElementById('categoria_id');
    let categoriaAtiva          = null;

    const btnRemoverImagem      = document.getElementById('btn-remover-imagem');

    const previewTitulo = document.getElementById('preview-titulo');
    const previewConteudo = document.getElementById('preview-conteudo');
    const previewAutor = document.getElementById('preview-autor');
    const previewImagem = document.getElementById('preview-imagem');
    const previewData = document.getElementById('preview-data');
    const previewCategoriaBadge = document.getElementById('preview-categoria-badge');

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
                previewTitulo.textContent = 'Título';
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
                previewConteudo.textContent = 'Conteúdo da notícia. Será exibido em até 4 linhas na visualização do card.';
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
                const fileName = document.getElementById('file-name');
                if (fileName) fileName.textContent = arquivo.name;
                
                // Criar preview da imagem
                const leitor = new FileReader();
                leitor.onload = function(event) {
                    if (previewImagem) {
                        previewImagem.src = event.target.result;
                        previewImagem.alt = 'Preview - ' + arquivo.name;
                    }
                };
                leitor.readAsDataURL(arquivo);
            } else {
                const fileName = document.getElementById('file-name');
                if (fileName) fileName.textContent = 'Nenhuma imagem selecionada';
                resetarImagem();
            }
        });

        // Quando clicar no botão, clicar no input invisível
        const fileLabel = document.querySelector('.file-label');
        if (fileLabel) {
            fileLabel.addEventListener('click', function(e) {
                e.preventDefault();
                inputImagem.click();
            });
        }
    }

    // ========================================
    // BOTÃO DE REMOVER IMAGEM
    // ========================================
    if (btnRemoverImagem) {
        btnRemoverImagem.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Limpar o input de arquivo
            if (inputImagem) {
                inputImagem.value = '';
            }
            
            // Atualizar nome do arquivo
            const fileName = document.getElementById('file-name');
            if (fileName) fileName.textContent = 'Nenhuma imagem selecionada';
            
            // Resetar o preview da imagem
            resetarImagem();
        });
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
        });
    });

    // ========================================
    // SUBMIT DO FORMULÁRIO
    // ========================================
    if (formulario) {
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
    }

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
            previewTitulo.textContent = 'Título';
            previewTitulo.classList.add('preview-text');
        }
        
        if (previewConteudo) {
            previewConteudo.textContent = 'Conteúdo da notícia. Será exibido em até 4 linhas na visualização do card.';
            previewConteudo.classList.add('preview-text');
        }
        
        if (previewAutor) previewAutor.textContent = 'usuário';
        
        resetarImagem();
        
        if (previewCategoriaBadge) previewCategoriaBadge.textContent = 'Categoria';
        
        const fileName = document.getElementById('file-name');
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
    if (document.getElementById('form-noticia')) {
        inicializarPublicarPreview();
    }
});

// Reinicializar publicar preview ao carregar novo conteúdo via HTMX
document.addEventListener('htmx:afterSwap', e => {
    if (e.detail.target.id === 'conteudo-principal' || 
        e.detail.target.querySelector('#form-noticia')) {
        setTimeout(inicializarPublicarPreview, 150);
    }
});