<?php
// public/actions/get_flash.php
// Endpoint dedicado: lê e limpa o flash da sessão, retorna JSON.
// Chamado pelo JS após fetch de formulários (publicar, login, etc.)

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);

echo json_encode($flash);