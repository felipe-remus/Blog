// ========================================
// INICIALIZAÇÃO — aguarda HTMX injetar o HTML
// ========================================
function init() {
    // Máscara de telefone
    document.querySelectorAll('input[type="tel"]').forEach(input => aplicarMascaraTelefone(input));

    // Exibe mensagem flash de sessão (gravada pelo PHP via data-*)
    const flashData = document.getElementById('flash-data');
    if (flashData) {
        mostrarToast(flashData.dataset.mensagem, flashData.dataset.tipo);
    }

    // ALTERNAR ABAS (Login / Registro)
    document.querySelectorAll('.aba').forEach(aba => {
        aba.addEventListener('click', function () {
            const abaAlvo = this.dataset.aba;
            document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
            document.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
            this.classList.add('ativa');
            document.getElementById('form-' + abaAlvo)?.classList.add('ativo');
        });
    });

    // Intercepta submits via fetch
    ['form-login', 'form-registro', 'form-editar-perfil'].forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }
    });
}

// ========================================
// INTERCEPTADOR DE SUBMIT — fetch + get_flash.php
// ========================================
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const acao = new FormData(form).get('acao');

    try {
        // Envia o POST — o PHP valida, grava flash na sessão e faz redirect (ignorado)
        await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            redirect: 'manual'
        });

        // Lê o flash que o PHP gravou na sessão via endpoint dedicado
        const flashRes = await fetch('includes/get_flash.php');
        const flash = await flashRes.json();

        if (!flash) {
            // Sem flash algum: não faz nada
            return;
        }

        if (flash.tipo === 'erro') {
            // Erro: apenas mostra o toast, sem recarregar
            mostrarToast(flash.mensagem, 'erro');
            return;
        }

        // Sucesso: mostra toast e redireciona
        mostrarToast(flash.mensagem, 'sucesso');
        setTimeout(() => {
            if (acao === 'login' || acao === 'registro') {
                window.location.href = 'index.php';
            } else if (acao === 'editar') {
                window.location.href = 'index.php';
            } else {
                window.location.reload();
            }
        }, 800);

    } catch (err) {
        mostrarToast('Erro de conexão. Tente novamente.', 'erro');
    }
}

// ========================================
// MÁSCARA DE TELEFONE — (00) 00000-0000
// ========================================
function aplicarMascaraTelefone(input) {
    input.setAttribute('maxlength', '15');

    input.addEventListener('input', function (e) {
        var digits = e.target.value.replace(/\D/g, '').slice(0, 11);
        var mask   = '';

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
    var campo        = botao.closest('.campo-senha');
    var campoSenha   = campo.querySelector('input[type="password"], input[type="text"]');
    var iconeAberto  = campo.querySelector('.icone-olho-aberto');
    var iconeFechado = campo.querySelector('.icone-olho-fechado');

    if (campoSenha.type === 'password') {
        campoSenha.type          = 'text';
        iconeAberto.style.display  = 'none';
        iconeFechado.style.display = 'block';
    } else {
        campoSenha.type          = 'password';
        iconeAberto.style.display  = 'block';
        iconeFechado.style.display = 'none';
    }
}

// ========================================
// TOAST
// ========================================
function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = mensagem;
    toast.className = `toast ${tipo}`;
    setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ========================================
// GATILHO — espera HTMX terminar de injetar
// ========================================
document.addEventListener('htmx:afterSwap', function (e) {
    if (e.target.id === 'login') {
        init();
    }
});