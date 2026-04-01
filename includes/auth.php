<?php
/**
 * includes/auth.php
 * Funções de guarda de autenticação e autorização.
 * Inclua este arquivo APÓS session_start() em qualquer página protegida.
 *
 * Uso:
 *   requer_login();          → redireciona se não estiver logado
 *   requer_admin();          → redireciona se não for admin (perfil_id = 1)
 */

/**
 * Garante que o usuário está autenticado.
 * Redireciona para a página de acesso restrito se não estiver logado.
 */
function requer_login(): void {
    if (empty($_SESSION['usuario'])) {
        $destino = urlencode($_SERVER['REQUEST_URI'] ?? '');
        header("Location: /acesso-restrito.php");
        exit;
    }
}

/**
 * Garante que o usuário está autenticado E possui perfil de administrador.
 * perfil_id = 1  →  administrador
 * Redireciona para a página de acesso restrito caso contrário.
 */
function requer_admin(): void {
    if (empty($_SESSION['usuario'])) {
        $destino = urlencode($_SERVER['REQUEST_URI'] ?? '');
        header("Location: /acesso-restrito.php");
        exit;
    }

    if ((int) $_SESSION['usuario']['perfil_id'] !== 1) {
        header("Location: /acesso-restrito.php");
        exit;
    }
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