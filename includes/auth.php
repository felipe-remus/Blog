<?php
/**
* includes/auth.php
* Funções de guarda de autenticação e autorização.
* Inclua este arquivo APÓS session_start() em qualquer página protegida.
*
* Uso:
*   requer_login();                    → redireciona se não estiver logado
*   requer_admin();                    → redireciona se não for admin (perfil_id = 1)
*   proteger_contra_acesso_direto();   → redireciona se for acesso direto via URL
*/

// Garantir que a sessão esteja iniciada assim que este arquivo for incluído
// Só inicia se ainda não estiver ativa
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
* Garante que o usuário está autenticado.
* Redireciona para a página de acesso restrito se não estiver logado.
*/
function requer_login(): void {
    if (empty($_SESSION['usuario'])) {
        // Armazena o motivo na sessão ANTES do redirecionamento
        $_SESSION['acesso_negado_motivo'] = 'login';
        $_SESSION['acesso_negado_destino'] = $_SERVER['REQUEST_URI'] ?? '/'; // Armazena destino também, se necessário

        header("Location: /acesso-restrito.php"); // <-- Agora SEM motivo na URL
        exit; // Muito importante para evitar que o resto da página carregue
    }
}

/**
* Garante que o usuário está autenticado E possui perfil de administrador.
* perfil_id = 1  →  administrador
* Redireciona para a página de acesso restrito caso contrário.
*/
function requer_admin(): void {
    // Primeiro verifica se está logado
    if (empty($_SESSION['usuario'])) {
        // Se não estiver logado, o motivo é 'login'
        $_SESSION['acesso_negado_motivo'] = 'login';
        $_SESSION['acesso_negado_destino'] = $_SERVER['REQUEST_URI'] ?? '/';

        header("Location: /acesso-restrito.php"); // <-- Redireciona como se fosse um erro de login primeiro
        exit;
    }

    // Agora verifica se é admin
    if ((int) $_SESSION['usuario']['perfil_id'] !== 1) {
        // Está logado, mas não é admin. O motivo é 'permissao'
        $_SESSION['acesso_negado_motivo'] = 'permissao';
        $_SESSION['acesso_negado_destino'] = $_SERVER['REQUEST_URI'] ?? '/';

        header("Location: /acesso-restrito.php"); // <-- Agora SEM motivo na URL
        exit;
    }
}

/**
* Impede o acesso direto via URL aos arquivos.
* Redireciona para a página de acesso restrito se a requisição parecer ser direta.
* Funciona para requisições AJAX/HTMX que geralmente enviam o cabeçalho X-Requested-With.
*/
function proteger_contra_acesso_direto(): void {
    // Verifica se o cabeçalho X-Requested-With está presente e é igual a XMLHttpRequest
    // Isso é comum em requisições AJAX e HTMX
    $is_ajax_or_htmx = isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
                       strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

    // Outra verificação comum é se o Content-Type é JSON (para APIs REST)
    // $content_type = $_SERVER['CONTENT_TYPE'] ?? '';
    // $is_json_request = strpos($content_type, 'application/json') !== false;

    // Outra verificação pode ser o tipo de método HTTP.
    // Requisições GET normais do navegador são frequentemente "acesso direto".
    // POST, PUT, DELETE geralmente vêm de formulários ou AJAX.
    // Mas cuidado: HTMX pode usar GET também para carregar templates.
    // A combinação de métodos e headers é mais segura.

    // Para este caso, vamos considerar "acesso direto" se NÃO for uma requisição AJAX/HTMX.
    // Se for GET e não for AJAX/HTMX, quase certeza que é acesso direto.
    // Se for POST/PUT/DELETE mas não for AJAX/HTMX (ex: form submit normal), talvez deva ser permitido,
    // mas para models/views que só devem ser chamadas internamente, o ideal é que venham via AJAX/HTMX.
    // Vamos assumir que QUALQUER acesso que NÃO seja AJAX/HTMX é direto e proibido para esses arquivos.

    if (!$is_ajax_or_htmx) {
        // A requisição parece ser direta via URL.
        // Armazena um motivo genérico ou um específico para "acesso direto"
        // Podemos usar 'permissao' como fallback, ou criar um novo 'direto'
        // Para manter consistência com o código atual, vamos usar 'permissao',
        // pois o acesso direto a uma model/view interna é um tipo de violação de permissão.
        $_SESSION['acesso_negado_motivo'] = 'permissao'; // Ou poderia ser 'direto' se ajustar acesso-restrito.php
        $_SESSION['acesso_negado_destino'] = $_SERVER['REQUEST_URI'] ?? '/';

        // Redireciona para a página de acesso restrito
        header("Location: /acesso-restrito.php");
        exit; // Interrompe a execução do script chamador
    }

    // Se for AJAX/HTMX, a requisição é considerada válida e o script continua.
}

/**
* Verifica se o usuário atual é administrador (sem redirecionar).
* Útil para mostrar/esconder elementos na view.
*/
function eh_admin(): bool {
    return !empty($_SESSION['usuario'])
        && (int) $_SESSION['usuario']['perfil_id'] === 1;
}

/**
* Verifica se existe um usuário logado (sem redirecionar).
*/
function esta_logado(): bool {
    return !empty($_SESSION['usuario']);
}
?>