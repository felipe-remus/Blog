<?php
session_start();
require "includes/auth.php";

// Apenas administradores (perfil_id = 1) podem acessar esta página
requer_admin();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Administrativo</title>

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/header.css">

    <script src="script/header.js" defer></script>
    <script src="script/admin.js" defer></script>

    <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js"
            integrity="sha384-/TgkGk7p307TH7EXJDuUlgG3Ce1UVolAOFopFekQkkXihi5u/6OCvVKyz1W+idaz"
            crossorigin="anonymous"></script>
</head>
<body>

    <div id="header">
        <?php require "view/view_header.php"; ?>
    </div>

    <main style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">

        <!-- Botão Voltar -->
        <div class="voltar-home">
            <a href="index.php" class="btn-voltar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                </svg>
                <span>Voltar para a Home</span>
            </a>
        </div>

        <!-- Cabeçalho do painel -->
        <div class="admin-header">
            <h1>Painel Administrativo</h1>
            <p class="admin-subtitle">
                Bem-vindo, <strong><?= htmlspecialchars($_SESSION['usuario']['nome']) ?></strong>
                — gerencie usuários, categorias e notícias do sistema.
            </p>
        </div>

        <!-- Estatísticas -->
        <div class="admin-stats">
            <template
                hx-get="model/model_admin-stats.php"
                hx-target="#admin-stats"
                hx-swap="innerHTML"
                hx-trigger="load">
            </template>
            <div id="admin-stats"></div>
        </div>

        <!-- Abas -->
        <div class="admin-tabs">
            <button class="tab-btn active" onclick="mostrarAba('usuarios', this)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Usuários
            </button>
            <button class="tab-btn" onclick="mostrarAba('noticias', this)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                Notícias
            </button>
            <button class="tab-btn" onclick="mostrarAba('categorias', this)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                Categorias
            </button>
        </div>

        <!-- Conteúdo das abas -->
        <div class="admin-container">

            <div id="tab-usuarios" class="tab-content active">
                <template
                    hx-get="model/model_admin-usuarios.php"
                    hx-target="#admin-usuarios"
                    hx-swap="innerHTML"
                    hx-trigger="load">
                </template>
                <div id="admin-usuarios"></div>
            </div>

            <div id="tab-noticias" class="tab-content">
                <template
                    hx-get="model/model_admin-noticias.php"
                    hx-target="#admin-noticias"
                    hx-swap="innerHTML"
                    hx-trigger="load revealed">
                </template>
                <div id="admin-noticias"></div>
            </div>

            <div id="tab-categorias" class="tab-content">
                <template
                    hx-get="model/model_admin-categorias.php"
                    hx-target="#admin-categorias"
                    hx-swap="innerHTML"
                    hx-trigger="load revealed">
                </template>
                <div id="admin-categorias"></div>
            </div>

        </div>

    </main>

    <div id="footer">
        <?php require "view/view_footer.php"; ?>
    </div>

    <script>
        function mostrarAba(aba, btn) {
            // Esconde todas as abas
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

            // Mostra a aba selecionada
            document.getElementById('tab-' + aba).classList.add('active');
            btn.classList.add('active');
        }
    </script>

</body>
</html>