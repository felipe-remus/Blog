<?php
// Inicia sessão para verificar se usuário está logado
session_start();
$usuarioLogado = isset($_SESSION['usuario']);
?>

<main class="pagina-login">
    <div class="login-container">
        
        <!-- SE USUÁRIO ESTÁ LOGADO: MOSTRAR FORMULÁRIO DE EDIÇÃO DE PERFIL -->
        <?php if ($usuarioLogado): ?>
            <div class="perfil-usuario">
                <h2>Alterar Meu Perfil</h2>
                <p class="bem-vindo">Bem-vindo, <strong><?php echo htmlspecialchars($_SESSION['usuario']['nome']); ?></strong>!</p>
                
                <form id="form-editar-perfil" class="formulario ativo">
                    <div class="campo">
                        <label for="nome-perfil">Nome Completo</label>
                        <input 
                            type="text" 
                            id="nome-perfil" 
                            name="nome" 
                            value="<?php echo htmlspecialchars($_SESSION['usuario']['nome']); ?>" 
                            required>
                    </div>

                    <div class="campo">
                        <label for="usuario-perfil">Nome de Usuário</label>
                        <input 
                            type="text" 
                            id="usuario-perfil" 
                            name="user" 
                            value="<?php echo htmlspecialchars($_SESSION['usuario']['user']); ?>" 
                            required>
                    </div>

                    <div class="campo">
                        <label for="email-perfil">Email</label>
                        <input 
                            type="email" 
                            id="email-perfil" 
                            name="email" 
                            value="<?php echo htmlspecialchars($_SESSION['usuario']['email']); ?>" 
                            required>
                    </div>

                    <div class="campo">
                        <label for="telefone-perfil">Telefone</label>
                        <input 
                            type="tel" 
                            id="telefone-perfil" 
                            name="telefone" 
                            value="<?php echo htmlspecialchars($_SESSION['usuario']['telefone']); ?>"
                            placeholder="(00) 00000-0000">
                    </div>

                    <fieldset class="fieldset-senha">
                        <legend>Alterar Senha (Opcional)</legend>
                        <p class="info-senha">Deixe em branco se não desejar alterar a senha</p>
                        
                        <div class="campo">
                            <label for="senha-atual">Senha Atual</label>
                            <input 
                                type="password" 
                                id="senha-atual" 
                                name="senha_atual">
                        </div>

                        <div class="campo">
                            <label for="senha-nova">Senha Nova</label>
                            <input 
                                type="password" 
                                id="senha-nova" 
                                name="senha_nova">
                        </div>

                        <div class="campo">
                            <label for="confirmar-senha-nova">Confirmar Senha Nova</label>
                            <input 
                                type="password" 
                                id="confirmar-senha-nova" 
                                name="confirmar_senha_nova">
                        </div>
                    </fieldset>

                    <div class="grupo-botoes">
                        <button type="submit" class="botao-de-login">Salvar Alterações</button>
                        <a href="model_logout.php" class="botao-logout">Sair da Conta</a>
                    </div>
                </form>
            </div>

        <!-- SE USUÁRIO NÃO ESTÁ LOGADO: MOSTRAR FORMULÁRIOS DE LOGIN E REGISTRO -->
        <?php else: ?>
            <!-- Abas -->
            <div class="abas-login">
                <button type="button" class="aba ativa" data-aba="login">Entrar</button>
                <button type="button" class="aba" data-aba="registro">Criar Conta</button>
            </div>

            <!-- Login -->
            <form id="form-login" class="formulario ativo">
                <div class="campo">
                    <label for="email-login">Email ou Nome de Usuário</label>
                    <input id="email-login" name="email_login" required>
                </div>

                <div class="campo campo-senha">
                    <label for="senha-login">Senha</label>
                    <input type="password" id="senha-login" name="senha_login" required>
                    <!-- Botão atualizado -->
                    <button type="button" class="btn-mostrar-senha" onclick="toggleSenha(this)">
                        <svg class="icone-olho-aberto" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        <svg class="icone-olho-fechado" viewBox="0 0 24 24" style="display: none;"><path d="M11.83 9L15 12.17V12c0-1.66-1.34-3-3-3h-.17zm-4.27.55L6.39 8.38C4.65 9.65 3.29 11.27 2.5 13.25c1.73 4.39 6 7.5 11 7.5 2.07 0 4.04-.51 5.77-1.41l-1.56-1.56C16.65 18.45 15.38 19 14 19c-3.87 0-7-3.13-7-7 0-.68.1-1.33.28-1.95zM12 6c3.79 0 7.17 2.13 8.82 5.5C20.97 11.17 21.19 10.83 21.5 10.5c-1.73-4.39-6-7.5-11-7.5-2.07 0-4.04.51-5.77 1.41L6.29 5.96C8.03 5.06 10 4.55 12 4.55zM1.27 4.21l1.41 1.41L4.22 7.17C3.07 8.55 2.19 10.22 1.5 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l4.5 4.5 1.41-1.41L1.27 4.21z"/></svg>
                    </button>
                </div>
                <button type="submit" class="botao-de-login">Entrar</button>
            </form>

            <!-- Registro -->
            <form id="form-registro" class="formulario" method="POST">
                <div class="campo">
                    <label for="nome-registro">Nome</label>
                    <input name="nome_registro" type="text" id="nome-registro" required>
                </div>
                <div class="campo">
                    <label for="usuario-registro">Nome de Usuário</label>
                    <input name="user_registro" type="text" id="usuario-registro" required>
                </div>
                <div class="campo">
                    <label for="email-registro">Email</label>
                    <input name="email_registro" type="email" id="email-registro" required>
                </div>

                <div class="campo-linha">
                    <div class="subcampo">
                        <label for="telefone-registro">Telefone</label>
                        <input name="fone_registro" type="tel" id="telefone-registro" placeholder="(00) 00000-0000">
                    </div>
                </div>

                <div class="campo campo-senha">
                    <label for="senha-registro">Senha</label>
                    <input type="password" id="senha-registro" name="senha_registro" required>
                    <!-- Botão atualizado -->
                    <button type="button" class="btn-mostrar-senha" onclick="toggleSenha(this)">
                        <!-- Mesmos SVGs com class em vez de id -->
                        <svg class="icone-olho-aberto" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        <svg class="icone-olho-fechado" viewBox="0 0 24 24" style="display: none;"><path d="M11.83 9L15 12.17V12c0-1.66-1.34-3-3-3h-.17zm-4.27.55L6.39 8.38C4.65 9.65 3.29 11.27 2.5 13.25c1.73 4.39 6 7.5 11 7.5 2.07 0 4.04-.51 5.77-1.41l-1.56-1.56C16.65 18.45 15.38 19 14 19c-3.87 0-7-3.13-7-7 0-.68.1-1.33.28-1.95zM12 6c3.79 0 7.17 2.13 8.82 5.5C20.97 11.17 21.19 10.83 21.5 10.5c-1.73-4.39-6-7.5-11-7.5-2.07 0-4.04-.51-5.77 1.41L6.29 5.96C8.03 5.06 10 4.55 12 4.55zM1.27 4.21l1.41 1.41L4.22 7.17C3.07 8.55 2.19 10.22 1.5 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l4.5 4.5 1.41-1.41L1.27 4.21z"/></svg>
                    </button>
                </div>

                <div class="campo campo-senha">
                    <label for="confirmar-senha">Confirmar Senha</label>
                    <input type="password" id="confirmar-senha" name="confirmar_senha_registro" required>
                    <!-- Botão atualizado -->
                    <button type="button" class="btn-mostrar-senha" onclick="toggleSenha(this)">
                        <!-- Mesmos SVGs com class em vez de id -->
                        <svg class="icone-olho-aberto" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        <svg class="icone-olho-fechado" viewBox="0 0 24 24" style="display: none;"><path d="M11.83 9L15 12.17V12c0-1.66-1.34-3-3-3h-.17zm-4.27.55L6.39 8.38C4.65 9.65 3.29 11.27 2.5 13.25c1.73 4.39 6 7.5 11 7.5 2.07 0 4.04-.51 5.77-1.41l-1.56-1.56C16.65 18.45 15.38 19 14 19c-3.87 0-7-3.13-7-7 0-.68.1-1.33.28-1.95zM12 6c3.79 0 7.17 2.13 8.82 5.5C20.97 11.17 21.19 10.83 21.5 10.5c-1.73-4.39-6-7.5-11-7.5-2.07 0-4.04-.51-5.77 1.41L6.29 5.96C8.03 5.06 10 4.55 12 4.55zM1.27 4.21l1.41 1.41L4.22 7.17C3.07 8.55 2.19 10.22 1.5 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l4.5 4.5 1.41-1.41L1.27 4.21z"/></svg>
                    </button>
                </div>

                <button type="submit" class="botao-de-login">Criar Conta</button>
            </form>
        <?php endif; ?>

        <!-- Toast para mensagens -->
        <div id="toast" class="toast"></div>
    </div>

<script>
// ========================================
// MÁSCARA DE TELEFONE
// ========================================
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function(e) {
        var value = e.target.value;
        var telPattern = value.replace(/\D/g, '')
                            .replace(/(\d{2})(\d)/, '($1) $2')
                            .replace(/(\(\d{2}\) \s\d{5})(\d)/, '$1-$2')
                            .replace(/(-\d{4})\d+?$/, '$1');        
        e.target.value = telPattern;
    });
}

// Aplicar máscara em todos os inputs de telefone
document.querySelectorAll('input[type="tel"]').forEach(input => {
    aplicarMascaraTelefone(input);
});

// ========================================
// MOSTRAR SENHA (CORRIGIDO PARA MÚLTIPLOS CAMPOS)
// ========================================
function toggleSenha(botao) {
    // Encontra o input de senha mais próximo dentro do mesmo campo
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
// FUNÇÃO MOSTRAR TOAST
// ========================================
function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.className = `toast ${tipo}`;
    
    setTimeout(() => {
        toast.classList.add(tipo);
    }, 10);

    setTimeout(() => {
        toast.classList.remove(tipo);
    }, 3000);
}

// ========================================
// FUNÇÃO ENVIAR REQUISIÇÃO
// ========================================
function enviarRequisicao(formData, endpoint, callback) {
    fetch(endpoint, {
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

// ========================================
// SUBMIT DO FORMULÁRIO DE LOGIN
// ========================================
const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        enviarRequisicao(formData, '../model/model_login.php', (resposta) => {
            if (resposta.sucesso) {
                mostrarToast(resposta.mensagem, 'sucesso');
                document.getElementById('form-login').reset();
                
                // Redirecionar após 1 segundo
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);
            } else {
                mostrarToast(resposta.mensagem, 'erro');
            }
        });
    });
}

// ========================================
// SUBMIT DO FORMULÁRIO DE REGISTRO
// ========================================
const formRegistro = document.getElementById('form-registro');
if (formRegistro) {
    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senha = document.getElementById('senha-registro').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        
        // Validação client-side
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
                
                // Redirecionar após 1 segundo
                setTimeout(() => {
                    window.location.href = '../login.html';
                }, 1000);
            } else {
                mostrarToast(resposta.mensagem, 'erro');
            }
        });
    });
}

// ========================================
// SUBMIT DO FORMULÁRIO DE EDIÇÃO DE PERFIL
// ========================================
const formEditarPerfil = document.getElementById('form-editar-perfil');
if (formEditarPerfil) {
    formEditarPerfil.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senhaAtual = document.getElementById('senha-atual').value;
        const senhaNova = document.getElementById('senha-nova').value;
        const confirmarSenhaNova = document.getElementById('confirmar-senha-nova').value;
        
        // Se tentou alterar senha
        if (senhaNova || confirmarSenhaNova || senhaAtual) {
            if (!senhaAtual) {
                mostrarToast('Digite sua senha atual para alterar a senha', 'erro');
                return;
            }
            
            if (!senhaNova) {
                mostrarToast('Digite a nova senha', 'erro');
                return;
            }
            
            if (senhaNova !== confirmarSenhaNova) {
                mostrarToast('As senhas não coincidem', 'erro');
                return;
            }
            
            if (senhaNova.length < 6) {
                mostrarToast('Senha deve ter no mínimo 6 caracteres', 'erro');
                return;
            }
        }
        
        const formData = new FormData(this);
        
        enviarRequisicao(formData, '../model/model_editar-usuario.php', (resposta) => {
            if (resposta.sucesso) {
                mostrarToast(resposta.mensagem, 'sucesso');
                
                // Se a senha foi alterada, redirecionar para login
                if (resposta.mudar_senha) {
                    setTimeout(() => {
                        window.location.href = '../login.html';
                    }, 1500);
                } else {
                    // Leva para inedex.htlm
                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 1500);
                }
            } else {
                mostrarToast(resposta.mensagem, 'erro');
            }
        });
    });
}

// ========================================
// ALTERNAR ENTRE ABAS (Login/Registro)
// ========================================
document.querySelectorAll('.aba').forEach(aba => {
    aba.addEventListener('click', function() {
        const abaAlvo = this.dataset.aba;
        
        // Remove class ativa de todas as abas
        document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
        document.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
        
        // Adiciona class ativa na aba clicada
        this.classList.add('ativa');
        document.getElementById('form-' + abaAlvo).classList.add('ativo');
    });
});
</script>