// ============================================================
// edicao-noticia.js
// VERSÃO PARA USAR COM card.php CONSOLIDADO
// ============================================================

let noticiaEditacaoAtual = { id: null, titulo: null, conteudo: null, categoria: null };
let noticiaDelecaoAtual = { id: null, titulo: null };

// ============================================================
// FUNÇÃO: CARREGAR CATEGORIAS
// ============================================================

function carregarCategorias() {
    // ✅ Chamar card.php com acao=categorias
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

// ============================================================
// FUNÇÃO: ABRIR MODAL DE EDIÇÃO
// ============================================================

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

// ============================================================
// FUNÇÃO: FECHAR MODAL DE EDIÇÃO
// ============================================================

function fecharModalEdicao() {
    document.getElementById('modalEdicao').style.display = 'none';
}

// ============================================================
// FUNÇÃO: ABRIR MODAL DE DELEÇÃO
// ============================================================

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

// ============================================================
// FUNÇÃO: FECHAR MODAL DE DELEÇÃO
// ============================================================

function fecharModalDelecao() {
    document.getElementById('modalConfirmacaoDelete').style.display = 'none';
}

// ============================================================
// FUNÇÃO: SALVAR EDIÇÃO
// ============================================================

function salvarEdicaoNoticia() {
    const id = document.getElementById('noticia-id').value;
    const titulo = document.getElementById('editar-titulo').value.trim();
    const conteudo = document.getElementById('editar-conteudo').value.trim();
    const categoria_id = document.getElementById('editar-categoria').value;

    // ========================================
    // VALIDAÇÕES
    // ========================================

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

    // ========================================
    // ENVIAR PARA BACKEND
    // ========================================

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

    // ✅ Chamar card.php (consolidado)
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

// ============================================================
// FUNÇÃO: DELETAR NOTÍCIA
// ============================================================

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

    // ✅ Chamar card.php (consolidado)
    fetch('card.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.sucesso) {
                mostrarNotificacao('Notícia deletada com sucesso!', 'sucesso');
                fecharModalDelecao();

                // Remover do DOM com animação
                const article = document.querySelector(`article[data-id="${id}"]`);
                if (article) {
                    article.style.transition = 'opacity 0.3s ease';
                    article.style.opacity = '0';
                    setTimeout(() => {
                        article.remove();
                    }, 300);
                }

                // Recarregar página após 1.5s
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

// ============================================================
// FUNÇÃO: MOSTRAR NOTIFICAÇÃO
// ============================================================

function mostrarNotificacao(mensagem, tipo = 'info') {
    const toast = document.getElementById('notificacao-toast');
    if (!toast) return;

    toast.textContent = mensagem;
    toast.className = `notificacao-toast ${tipo} ativo`;

    setTimeout(() => {
        toast.classList.remove('ativo');
    }, 4000);
}

// ============================================================
// FUNÇÃO: INICIALIZAR AÇÕES
// ============================================================

function inicializarAcoesNoticia() {
    // Carregar categorias
    carregarCategorias();

    // ========================================
    // Botão Editar
    // ========================================
    document.addEventListener('click', (e) => {
        const btnEditar = e.target.closest('.btn-editar');
        if (btnEditar) {
            abrirModalEdicao(btnEditar);
        }
    });

    // ========================================
    // Botão Deletar
    // ========================================
    document.addEventListener('click', (e) => {
        const btnDeletar = e.target.closest('.btn-deletar');
        if (btnDeletar) {
            abrirModalDelecao(btnDeletar);
        }
    });

    // ========================================
    // Fechar Modais
    // ========================================
    const fecharModalEdicaoBtn = document.getElementById('fecharModalEdicao');
    const btnCancelarEdicao = document.getElementById('btnCancelarEdicao');
    const fecharModalDeleteBtn = document.getElementById('fecharModalDelete');
    const btnCancelarDelete = document.getElementById('btnCancelarDelete');

    if (fecharModalEdicaoBtn) fecharModalEdicaoBtn.addEventListener('click', fecharModalEdicao);
    if (btnCancelarEdicao) btnCancelarEdicao.addEventListener('click', fecharModalEdicao);
    if (fecharModalDeleteBtn) fecharModalDeleteBtn.addEventListener('click', fecharModalDelecao);
    if (btnCancelarDelete) btnCancelarDelete.addEventListener('click', fecharModalDelecao);

    // ========================================
    // Formulário de Edição
    // ========================================
    const formEditar = document.getElementById('form-editar-noticia');
    if (formEditar) {
        formEditar.addEventListener('submit', (e) => {
            e.preventDefault();
            salvarEdicaoNoticia();
        });
    }

    // ========================================
    // Confirmação de Deleção
    // ========================================
    const btnConfirmarDelete = document.getElementById('btnConfirmarDelete');
    if (btnConfirmarDelete) {
        btnConfirmarDelete.addEventListener('click', deletarNoticia);
    }

    // ========================================
    // Fechar ao clicar fora (Edição)
    // ========================================
    const modalEdicao = document.getElementById('modalEdicao');
    if (modalEdicao) {
        modalEdicao.addEventListener('click', (e) => {
            if (e.target === modalEdicao) fecharModalEdicao();
        });
    }

    // ========================================
    // Fechar ao clicar fora (Deleção)
    // ========================================
    const modalDelete = document.getElementById('modalConfirmacaoDelete');
    if (modalDelete) {
        modalDelete.addEventListener('click', (e) => {
            if (e.target === modalDelete) fecharModalDelecao();
        });
    }
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener('DOMContentLoaded', inicializarAcoesNoticia);

// Reinicializar após HTMX swap
document.addEventListener('htmx:afterSwap', (e) => {
    if (e.detail.target.classList.contains('noticias-container') ||
        e.detail.target.querySelector('.card-noticia')) {
        setTimeout(inicializarAcoesNoticia, 50);
    }
});