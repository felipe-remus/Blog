<?php
// Sessão iniciada UMA VEZ aqui — não precisa mais em nenhuma view
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    
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

    <!-- Slider Hero: include direto, sem requisição HTTP extra -->
    <div id="slider">
        <?php require "../view/view_slider.php"; ?>
    </div>

    <main>
        <!-- Notícias: HTMX mantido pois responde a filtros e paginação dinâmica -->
        <template
            hx-get="../model/model_noticia.php"
            hx-target="#noticia"
            hx-swap="innerHTML"
            hx-trigger="load">
        </template>
        <div id="noticia"></div>
    </main>

    <!-- Footer: include direto, sem requisição HTTP extra -->
    <div id="footer">
        <?php require "../view/view_footer.php"; ?>
    </div>
</body>
</html>