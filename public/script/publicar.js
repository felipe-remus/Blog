// ============================================================
// PUBLICAR - PREVIEW EM TEMPO REAL 
// ============================================================

function inicializarPublicarPreview() {
    // ========================================
    // ELEMENTOS DO FORMULÁRIO 
    // ========================================
    const formulario            = document.getElementById('form-noticia');
    const inputTitulo           = document.getElementById('input-titulo');      
    const inputConteudo         = document.getElementById('input-conteudo');    
    const inputImagem           = document.getElementById('input-imagem');      
    const botoesCategorias      = document.querySelectorAll('.categoria-btn');
    const categoriaSelecionada  = document.getElementById('categoria-selecionada');
    const btnRemoverImagem      = document.getElementById('btnRemoverImagem');
    
    let categoriaAtiva          = null;

    // ========================================
    // ELEMENTOS DE PREVIEW
    // ========================================
    const previewTitulo         = document.getElementById('preview-titulo');
    const previewConteudo       = document.getElementById('preview-conteudo');
    const previewImagem         = document.getElementById('preview-imagem');
    const previewData           = document.getElementById('preview-data');
    const previewCategoriaBadge = document.getElementById('preview-categoria-badge');

    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    
    if (previewData) {
        atualizarDataAtual();
    }

    // Exibe flash de sessão caso venha via PHP (fallback)
    const flashData = document.getElementById('flash-data');
    if (flashData) {
        mostrarToastPublicar(flashData.dataset.mensagem, flashData.dataset.tipo);
    }

    // ========================================
    // INTERCEPTA SUBMIT DO FORMULÁRIO
    // ========================================
    if (formulario) {
        formulario.addEventListener('submit', handlePublicarSubmit);
    }

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

    // ========================================
    // EVENT LISTENERS - SELEÇÃO DE IMAGEM
    // ========================================
    
    if (inputImagem) {
        inputImagem.addEventListener('change', function(e) {
            const arquivo = e.target.files[0];
            
            if (arquivo) {
                const fileName = document.getElementById('file-name');
                if (fileName) {
                    fileName.textContent = arquivo.name;
                }
                
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
                if (fileName) {
                    fileName.textContent = 'Nenhuma imagem selecionada';
                }
                resetarImagem();
            }
        });

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
            
            if (inputImagem) {
                inputImagem.value = '';
            }
            
            const fileName = document.getElementById('file-name');
            if (fileName) {
                fileName.textContent = 'Nenhuma imagem selecionada';
            }
            
            resetarImagem();
        });
    }

    // ========================================
    // EVENT LISTENERS - SELEÇÃO DE CATEGORIA
    // ========================================
    
    botoesCategorias.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            
            botoesCategorias.forEach(btn => btn.classList.remove('ativo'));
            this.classList.add('ativo');
            
            categoriaAtiva = this.getAttribute('data-categoria');
            const categoriaNome = this.textContent;
            
            if (categoriaSelecionada) {
                categoriaSelecionada.value = categoriaAtiva;
            }
            
            if (previewCategoriaBadge) {
                previewCategoriaBadge.textContent = categoriaNome;
            }
        });
    });

    // ========================================
    // FUNÇÕES AUXILIARES
    // ========================================
    
    function atualizarDataAtual() {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        if (previewData) {
            previewData.textContent = `${dia}/${mes}/${ano}`;
        }
    }

    function resetarImagem() {
        if (previewImagem) {
            previewImagem.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"%3E%3Crect fill="%23e8e8e8" width="800" height="450"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23999"%3ESelecione uma imagem%3C/text%3E%3C/svg%3E';
            previewImagem.alt = 'Preview da imagem';
        }
    }
}

// ========================================
// INTERCEPTADOR DE SUBMIT — fetch + get_flash.php
// ========================================
async function handlePublicarSubmit(e) {
    e.preventDefault();
    const form = e.target;

    try {
        // Envia o POST com fetch — redirect do PHP é ignorado
        await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            redirect: 'manual'
        });

        // Lê o flash que o PHP gravou na sessão
        const flashRes = await fetch('includes/get_flash.php');
        const flash = await flashRes.json();

        if (!flash) return;

        if (flash.tipo === 'erro') {
            mostrarToastPublicar(flash.mensagem, 'erro');
            return;
        }

        // Sucesso: mostra toast e redireciona
        mostrarToastPublicar(flash.mensagem, 'sucesso');
        setTimeout(() => {
            window.location.href = 'index.php';
        }, 800);

    } catch (err) {
        mostrarToastPublicar('Erro de conexão. Tente novamente.', 'erro');
    }
}

// ========================================
// TOAST (usa o mesmo #toast da view)
// ========================================
function mostrarToastPublicar(mensagem, tipo = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = mensagem;
    toast.className = `toast ${tipo}`;
    setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

// Aguarda HTMX injetar o HTML no #publicar (igual ao login)
document.addEventListener('htmx:afterSwap', function (e) {
    if (e.target.id === 'publicar') {
        inicializarPublicarPreview();
    }
});