<?php
session_start();
http_response_code(403);

// Motivo recebido via query string: 'login' ou 'permissao'
$motivo   = $_GET['motivo']   ?? 'login';
$destino  = $_GET['destino']  ?? '';   // URL original (para redirecionar após login)

$eh_login = ($motivo === 'login');

$titulo_principal = $eh_login
    ? "Acesso restrito: faça login para continuar"
    : "Sem permissão: área exclusiva para administradores";

$corpo1 = $eh_login
    ? "Nossa equipe de segurança identificou que você não está autenticado. Para acessar esta área, é necessário realizar o login com suas credenciais."
    : "Você está autenticado, mas sua conta não possui os privilégios necessários para acessar esta área. Apenas administradores têm acesso a este conteúdo.";

$corpo2 = $eh_login
    ? "Se você ainda não possui uma conta, pode se registrar gratuitamente na nossa plataforma."
    : "Se acredita que deveria ter acesso, entre em contato com um administrador do sistema.";

$kicker = $eh_login ? "AUTENTICAÇÃO NECESSÁRIA" : "ACESSO NEGADO";
$codigo = $eh_login ? "HTTP 401 · Unauthorized" : "HTTP 403 · Forbidden";
$icone  = $eh_login ? "login" : "shield";

// Monta o link de login com redirecionamento (se veio de uma página específica)
$link_login = "login.php";
if (!empty($destino)) {
    $link_login = "login.php?redirect=" . urlencode($destino);
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $eh_login ? '401 — Acesso Restrito' : '403 — Sem Permissão' ?></title>

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/acesso-restrito.css">

    <script src="script/header.js" defer></script>
</head>
<body>

    <div id="header">
        <?php require "view/view_header.php"; ?>
    </div>

    <main class="ar-main">

        <div class="ar-tape"></div>

        <div class="ar-wrapper">

            <!-- Ícone / Código -->
            <div class="ar-left">

                <div class="ar-icon-wrap <?= $icone ?>">
                    <?php if ($icone === 'login'): ?>
                    <!-- Cadeado -->
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <?php else: ?>
                    <!-- Escudo -->
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <?php endif; ?>
                </div>

                <div class="ar-codigo-box">
                    <span class="ar-numero"><?= $eh_login ? '401' : '403' ?></span>
                </div>

                <div class="ar-edition">
                    <span class="ar-edition-line">SEGURANÇA</span>
                    <span class="ar-edition-dot">●</span>
                    <span class="ar-edition-line"><?= $eh_login ? 'LOGIN' : 'PERMISSÃO' ?></span>
                </div>

            </div>

            <div class="ar-divider" aria-hidden="true"></div>

            <!-- Conteúdo editorial -->
            <div class="ar-right">

                <p class="ar-kicker"><?= htmlspecialchars($kicker) ?></p>

                <h1 class="ar-headline"><?= htmlspecialchars($titulo_principal) ?></h1>

                <div class="ar-rule"></div>

                <p class="ar-body"><?= htmlspecialchars($corpo1) ?></p>
                <p class="ar-body"><?= htmlspecialchars($corpo2) ?></p>

                <div class="ar-acoes">
                    <?php if ($eh_login): ?>
                        <a href="<?= htmlspecialchars($link_login) ?>" class="ar-btn ar-btn-primario">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                                <polyline points="10 17 15 12 10 7"/>
                                <line x1="15" y1="12" x2="3" y2="12"/>
                            </svg>
                            Fazer Login
                        </a>
                    <?php else: ?>
                        <a href="index.php" class="ar-btn ar-btn-primario">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5"
                                stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                            Ir para a Home
                        </a>
                    <?php endif; ?>

                    <button class="ar-btn ar-btn-secundario" onclick="history.back()">
                        Página anterior
                    </button>
                </div>
            </div>

        </div>

        <div class="ar-tape ar-tape-bottom"></div>

    </main>

    <div id="footer">
        <?php require "view/view_footer.php"; ?>
    </div>

</body>
</html>