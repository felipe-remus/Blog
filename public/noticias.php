<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notícias</title>

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

        <h1 class="titulo-principal">Notícias das Equipes e Pilotos</h1>

        <!-- Filtros: HTMX mantido pois carrega categorias do banco -->
        <template
            hx-get="/proxy.php?p=model_filtros"
            hx-target="#filtro"
            hx-swap="innerHTML"
            hx-trigger="load">
        </template>
        <div id="filtro"></div>

        <!-- Notícias: HTMX mantido pois responde a filtros e paginação dinâmica -->
        <template
            hx-get="/proxy.php?p=model_noticia"
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