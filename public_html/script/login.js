// ========================================
// INICIALIZAÇÃO — aguarda HTMX injetar o HTML
// ========================================
function init() {
    document.querySelectorAll('input[type="tel"]').forEach(input => aplicarMascaraTelefone(input));

    // SUBMIT — LOGIN
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            enviarRequisicao(formData, '../model/model_login.php', (resposta) => {
                if (resposta.sucesso) {
                    mostrarToast(resposta.mensagem, 'sucesso');
                    document.getElementById('form-login').reset();
                    setTimeout(() => { window.location.href = '../index.php'; }, 1000);
                } else {
                    mostrarToast(resposta.mensagem, 'erro');
                }
            });
        });
    }

    // SUBMIT — REGISTRO
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault();
            const senha = document.getElementById('senha-registro').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;

            if (senha !== confirmarSenha) {
                mostrarToast('As senhas não coincidem', 'erro');
                return;
            }
            if (senha.length < 6) {
                mostrarToast('Senha deve ter no mínimo 6 caracteres', 'erro');
                return;
            }

            const formData = new FormData(this);
            enviarRequisicao(formData, '../model/model_registro.php', (resposta) => {
                if (resposta.sucesso) {
                    mostrarToast(resposta.mensagem, 'sucesso');
                    document.getElementById('form-registro').reset();
                    setTimeout(() => { window.location.href = '../login.php'; }, 1000);
                } else {
                    mostrarToast(resposta.mensagem, 'erro');
                }
            });
        });
    }

    // SUBMIT — EDITAR PERFIL
    const formEditarPerfil = document.getElementById('form-editar-perfil');
    if (formEditarPerfil) {
        formEditarPerfil.addEventListener('submit', function(e) {
            e.preventDefault();
            const senhaAtual = document.getElementById('senha-atual').value;
            const senhaNova = document.getElementById('senha-nova').value;
            const confirmarSenhaNova = document.getElementById('confirmar-senha-nova').value;

            if (senhaNova || confirmarSenhaNova || senhaAtual) {
                if (!senhaAtual) { mostrarToast('Digite sua senha atual para alterar a senha', 'erro'); return; }
                if (!senhaNova) { mostrarToast('Digite a nova senha', 'erro'); return; }
                if (senhaNova !== confirmarSenhaNova) { mostrarToast('As senhas não coincidem', 'erro'); return; }
                if (senhaNova.length < 6) { mostrarToast('Senha deve ter no mínimo 6 caracteres', 'erro'); return; }
            }

            const formData = new FormData(this);
            enviarRequisicao(formData, '../model/model_editar-usuario.php', (resposta) => {
                if (resposta.sucesso) {
                    mostrarToast(resposta.mensagem, 'sucesso');
                    if (resposta.mudar_senha) {
                        setTimeout(() => { window.location.href = '../login.php'; }, 1500);
                    } else {
                        setTimeout(() => { window.location.href = '../index.php'; }, 1500);
                    }
                } else {
                    mostrarToast(resposta.mensagem, 'erro');
                }
            });
        });
    }

    // ALTERNAR ABAS (Login / Registro)
    document.querySelectorAll('.aba').forEach(aba => {
        aba.addEventListener('click', function() {
            const abaAlvo = this.dataset.aba;
            document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
            document.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
            this.classList.add('ativa');
            document.getElementById('form-' + abaAlvo).classList.add('ativo');
        });
    });
}

// ========================================
// MÁSCARA DE TELEFONE — (00) 00000-0000
// ========================================
function aplicarMascaraTelefone(input) {
    input.setAttribute('maxlength', '15');

    input.addEventListener('input', function(e) {
        var digits = e.target.value.replace(/\D/g, '').slice(0, 11);

        var mask = '';
        if (digits.length === 0) {
            mask = '';
        } else if (digits.length <= 2) {
            mask = '(' + digits;
        } else if (digits.length <= 7) {
            mask = '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
        } else {
            mask = '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
        }

        e.target.value = mask;
    });
}

// ========================================
// MOSTRAR / OCULTAR SENHA
// ========================================
function toggleSenha(botao) {
    var campo = botao.closest('.campo-senha');
    var campoSenha = campo.querySelector('input[type="password"], input[type="text"]');
    var iconeAberto = campo.querySelector('.icone-olho-aberto');
    var iconeFechado = campo.querySelector('.icone-olho-fechado');

    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        iconeAberto.style.display = "none";
        iconeFechado.style.display = "block";
    } else {
        campoSenha.type = "password";
        iconeAberto.style.display = "block";
        iconeFechado.style.display = "none";
    }
}

// ========================================
// TOAST
// ========================================
function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.className = `toast ${tipo}`;
    setTimeout(() => { toast.classList.add(tipo); }, 10);
    setTimeout(() => { toast.classList.remove(tipo); }, 3000);
}

// ========================================
// FETCH HELPER
// ========================================
function enviarRequisicao(formData, endpoint, callback) {
    fetch(endpoint, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {
            mostrarToast('Erro ao processar requisição', 'erro');
        });
}

// ========================================
// GATILHO — espera HTMX terminar de injetar
// ========================================
document.addEventListener('htmx:afterSwap', function(e) {
    if (e.target.id === 'login') {
        init();
    }
});