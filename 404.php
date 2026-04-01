<?php
session_start();
http_response_code(404);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 — Página Não Encontrada</title>

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/not-found.css">

    <script src="script/header.js" defer></script>
    <script src="script/not-found.js" defer></script>
</head>
<body>

    <div id="header">
        <?php require "view/view_header.php"; ?>
    </div>

    <main class="notfound-main">

        <!-- Fita decorativa superior -->
        <div class="nf-tape"></div>

        <div class="nf-wrapper">

            <!-- Coluna esquerda: número -->
            <div class="nf-left">
                <div class="nf-digits" aria-hidden="true">
                    <span class="nf-digit" data-char="4">4</span>
                    <span class="nf-digit nf-zero" data-char="0">0</span>
                    <span class="nf-digit" data-char="4">4</span>
                </div>
                <div class="nf-edition">
                    <span class="nf-edition-line">EDIÇÃO ESPECIAL</span>
                    <span class="nf-edition-dot">●</span>
                    <span class="nf-edition-line">ERRO DE ROTA</span>
                </div>
            </div>

            <!-- Divisória vertical -->
            <div class="nf-divider" aria-hidden="true"></div>

            <!-- Coluna direita: conteúdo editorial -->
            <div class="nf-right">

                <p class="nf-kicker">ÚLTIMA HORA</p>

                <h1 class="nf-headline">
                    Página Não Encontrada:<br>
                    nenhuma pista encontrada
                </h1>

                <div class="nf-rule"></div>

                <p class="nf-body">
                    Nossos repórteres vasculharam todos os arquivos, mas a página que você procura não foi localizada. Ela pode ter sido removida, renomeada ou nunca ter existido em nossa base de dados.
                </p>

                <p class="nf-body">
                    Sugerimos retornar à página inicial ou utilizar os filtros de busca para encontrar o conteúdo desejado.
                </p>

                <div class="nf-acoes">
                    <a href="index.php" class="nf-btn nf-btn-primario">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                        Voltar para a Home
                    </a>
                    <button class="nf-btn nf-btn-secundario" onclick="history.back()">
                        Página anterior
                    </button>
                </div>
            </div><!-- /nf-right -->

        </div><!-- /nf-wrapper -->

        <!-- Fita decorativa inferior -->
        <div class="nf-tape nf-tape-bottom"></div>

        <!-- Partículas de fundo -->
        <canvas id="nf-canvas" aria-hidden="true"></canvas>

    </main>

    <div id="footer">
        <?php require "view/view_footer.php"; ?>
    </div>

</body>
</html>