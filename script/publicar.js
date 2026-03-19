// ============================================================
// PUBLICAR - PREVIEW EM TEMPO REAL (CORRIGIDO)
// ============================================================

function inicializarPublicarPreview() {
    // ========================================
    // ELEMENTOS DO FORMULÁRIO (IDs CORRETOS)
    // ========================================
    const formulario            = document.getElementById('form-noticia');
    const inputTitulo           = document.getElementById('input-titulo');      // ✅ CORRIGIDO
    const inputConteudo         = document.getElementById('input-conteudo');    // ✅ CORRIGIDO
    const inputAutor            = document.getElementById('input-autor');       // ✅ CORRIGIDO
    const inputImagem           = document.getElementById('input-imagem');      // ✅ CORRIGIDO
    const botoesCategorias      = document.querySelectorAll('.categoria-btn');
    const categoriaSelecionada  = document.getElementById('categoria-selecionada');
    const btnRemoverImagem      = document.getElementById('btnRemoverImagem');
    
    let categoriaAtiva          = null;

    // ========================================
    // ELEMENTOS DE PREVIEW
    // ========================================
    const previewTitulo         = document.getElementById('preview-titulo');
    const previewConteudo       = document.getElementById('preview-conteudo');
    const previewAutor          = document.getElementById('preview-autor');
    const previewImagem         = document.getElementById('preview-imagem');
    const previewData           = document.getElementById('preview-data');
    const previewCategoriaBadge = document.getElementById('preview-categoria-badge');

    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    
    if (previewData) {
        atualizarDataAtual();
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
                if (fileName) {
                    fileName.textContent = arquivo.name;
                }
                
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
                if (fileName) {
                    fileName.textContent = 'Nenhuma imagem selecionada';
                }
                resetarImagem();
            }
        });

        // Quando clicar no label, clicar no input invisível
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
            if (fileName) {
                fileName.textContent = 'Nenhuma imagem selecionada';
            }
            
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
            if (categoriaSelecionada) {
                categoriaSelecionada.value = categoriaAtiva;
            }
            
            // Atualizar preview
            if (previewCategoriaBadge) {
                previewCategoriaBadge.textContent = categoriaNome;
            }
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
                mostrarNotificacao('Por favor, selecione uma categoria.', 'erro');
                return;
            }
            
            // Validar imagem selecionada
            if (!inputImagem || !inputImagem.files.length) {
                mostrarNotificacao('Por favor, selecione uma imagem.', 'erro');
                return;
            }

            // Preparar dados para envio
            const formData = new FormData();
            formData.append('acao', 'publicar');
            formData.append('titulo', inputTitulo.value);
            formData.append('conteudo', inputConteudo.value);
            formData.append('autor', inputAutor.value);
            formData.append('categoria', categoriaAtiva);
            formData.append('imagem', inputImagem.files[0]);

            // Enviar para o servidor (quando backend estiver pronto)
            // fetch('publicar.php', {
            //     method: 'POST',
            //     body: formData
            // })...

            // Por enquanto, simular envio bem-sucedido
            console.log('Notícia para publicar:', {
                titulo: inputTitulo.value,
                conteudo: inputConteudo.value,
                autor: inputAutor.value,
                categoria: categoriaAtiva,
                imagem: inputImagem.files[0].name
            });

            mostrarNotificacao('Notícia publicada com sucesso!', 'sucesso');
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

    function resetarPreview() {
        if (previewTitulo) {
            previewTitulo.textContent = 'Título';
            previewTitulo.classList.add('preview-text');
        }
        
        if (previewConteudo) {
            previewConteudo.textContent = 'Conteúdo da notícia. Será exibido em até 4 linhas na visualização do card.';
            previewConteudo.classList.add('preview-text');
        }
        
        if (previewAutor) {
            previewAutor.textContent = 'usuário';
        }
        
        resetarImagem();
        
        if (previewCategoriaBadge) {
            previewCategoriaBadge.textContent = 'Categoria';
        }
        
        const fileName = document.getElementById('file-name');
        if (fileName) {
            fileName.textContent = 'Nenhuma imagem selecionada';
        }
        
        botoesCategorias.forEach(btn => btn.classList.remove('ativo'));
        if (categoriaSelecionada) {
            categoriaSelecionada.value = '';
        }
        categoriaAtiva = null;
        
        atualizarDataAtual();
    }
}

// ============================================================
// FUNÇÃO: MOSTRAR NOTIFICAÇÃO
// ============================================================

function mostrarNotificacao(mensagem, tipo = 'info') {
    const toast = document.getElementById('notificacao-toast');
    if (!toast) {
        console.warn('Elemento notificacao-toast não encontrado');
        return;
    }

    toast.textContent = mensagem;
    toast.className = `notificacao-toast ${tipo} ativo`;

    setTimeout(() => {
        toast.classList.remove('ativo');
    }, 4000);
}

// ============================================================
// INICIALIZAÇÃO
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