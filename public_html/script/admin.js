// ========================================
// PAINEL ADMINISTRATIVO - ADMIN.JS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // ========== ABAS ==========
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Remover ativo de todos
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Adicionar ativo ao clicado
            btn.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });

    // ========== CATEGORIAS ==========
    // ========== USUÁRIOS ==========
    
    // Atualizar perfil
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('select-perfil')) {
            const id = e.target.dataset.id;
            const perfilId = e.target.value;
            const perfilAnterior = e.target.dataset.perfilAtual;

            if (perfilId !== perfilAnterior) {
                atualizarPerfil(id, perfilId);
            }
        }
    });

    // Deletar usuário
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-deletar-usuario')) {
            const btn = e.target.closest('.btn-deletar-usuario');
            const id = btn.dataset.id;
            const nome = btn.dataset.nome;
            confirmarAcao('Deletar Usuário',
                `Tem certeza que deseja deletar o usuário "${nome}"? Esta ação é irreversível.`,
                () => deletarUsuario(id));
        }
    });

    // ========== MODAL ==========
    const modal = document.getElementById('modalConfirmacao');
    const btnCancelar = modal.querySelector('.btn-cancelar');
    const btnFechar = modal.querySelector('.modal-fechar');

    btnCancelar.addEventListener('click', () => fecharModal());
    btnFechar.addEventListener('click', () => fecharModal());

    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });
});

// ========================================
// FUNÇÕES - USUÁRIOS
// ========================================

function atualizarPerfil(id, perfilId) {
    const formData = new FormData();
    formData.append('acao', 'atualizar_perfil');
    formData.append('id_usuario', id);
    formData.append('perfil_id', perfilId);

    enviarRequisicao(formData, (resposta) => {
        if (resposta.sucesso) {
            mostrarToast(resposta.mensagem, 'sucesso');
            // Atualizar o data-perfil-atual
            const select = document.querySelector(`select[data-id="${id}"]`);
            if (select) {
                select.dataset.perfilAtual = perfilId;
            }
        } else {
            mostrarToast(resposta.mensagem, 'erro');
            // Recarregar a página se houver erro
            location.reload();
        }
    });
}

function deletarUsuario(id) {
    const formData = new FormData();
    formData.append('acao', 'deletar_usuario');
    formData.append('id_usuario', id);

    enviarRequisicao(formData, (resposta) => {
        if (resposta.sucesso) {
            mostrarToast(resposta.mensagem, 'sucesso');
            
            // Animar remoção da linha
            const linha = document.querySelector(`tr[data-id="${id}"]`);
            if (linha) {
                linha.style.opacity = '0';
                linha.style.transition = 'opacity 0.3s ease';
            }
            
            // Recarregar página após 0.5 segundos
            setTimeout(() => {
                location.reload();
            }, 500);
        } else {
            mostrarToast(resposta.mensagem, 'erro');
        }
        fecharModal();
    });
}

// ========================================
// FUNÇÕES - AUXILIARES
// ========================================

function enviarRequisicao(formData, callback) {
    fetch(window.location.href, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => {
        console.error('Erro:', error);
        mostrarToast('Erro ao processar requisição', 'erro');
    });
}

function confirmarAcao(titulo, mensagem, callback) {
    const modal = document.getElementById('modalConfirmacao');
    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalMensagem').textContent = mensagem;

    // Remover evento anterior e adicionar novo
    const btnConfirmar = modal.querySelector('.btn-confirmar');
    const novoBtn = btnConfirmar.cloneNode(true);
    btnConfirmar.replaceWith(novoBtn);

    novoBtn.addEventListener('click', () => {
        callback();
    });

    modal.style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalConfirmacao').style.display = 'none';
}

function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.className = `toast ${tipo}`;

    // Remover classes anteriores e adicionar nova
    setTimeout(() => {
        toast.classList.add(tipo);
    }, 10);

    // Remover após 3 segundos
    setTimeout(() => {
        toast.classList.remove(tipo);
    }, 3000);
}