<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Dispatcher — intercepta POST antes de renderizar a página
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $acao = $_POST['acao'] ?? '';

    // Cada case inclui a model correspondente (caminho relativo ao arquivo PHP,
    // não à URL — por isso "../model/" funciona estando em public/).
    match ($acao) {
        'login'   => require '../model/model_login.php',
        'registro' => require '../model/model_registro.php',
        'editar'  => require '../model/model_editar-usuario.php',
        default   => null,
    };

    // As models fazem header('Location: ...') e exit(),
    // então o código abaixo só é alcançado se $acao for inválida.
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/filtros.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/historia.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/noticias.css">
    <link rel="stylesheet" href="css/paginacao.css">
    <link rel="stylesheet" href="css/publicar.css">
    <link rel="stylesheet" href="css/slider.css">
    <link rel="stylesheet" href="css/tags.css">
    
    <script src="script/header.js" defer></script>
    <script src="script/historia.js" defer></script>
    <script src="script/login.js" defer></script>
    <script src="script/modal-noticia.js" defer></script>
    <script src="script/publicar.js" defer></script>
    <script src="script/slider.js" defer></script>

    <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js" integrity="sha384-/TgkGk7p307TH7EXJDuUlgG3Ce1UVolAOFopFekQkkXihi5u/6OCvVKyz1W+idaz" crossorigin="anonymous"></script>
</head>
<body>
    <!-- Header: include direto, sem requisição HTTP extra -->
    <div id="header">
        <?php require "../view/view_header.php"; ?>
    </div>

    <main>
        <!-- Botão "Voltar para a Home" -->
        <div class="voltar-home">
            <a href="index.php" class="btn-voltar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Voltar para a Home</span>
            </a>
        </div>

        <!-- Pagina Login -->
        <template
            hx-get="/proxy2.php?p=view_pag-login"
            hx-target="#login" 
            hx-swap="innerHTML"
            hx-trigger="load">
        </template>
        <div id="login"></div>
    </main>

    <!-- Footer: include direto, sem requisição HTTP extra -->
    <div id="footer">
        <?php require "../view/view_footer.php"; ?>
    </div>
</body>
</html>