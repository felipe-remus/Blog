<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/filtros.css">
<link rel="stylesheet" href="../css/footer.css">
<link rel="stylesheet" href="../css/header.css">
<link rel="stylesheet" href="../css/historia.css">
<link rel="stylesheet" href="../css/login.css">
<link rel="stylesheet" href="../css/noticias.css">
<link rel="stylesheet" href="../css/paginacao.css">
<link rel="stylesheet" href="../css/publicar.css">
<link rel="stylesheet" href="../css/slider.css">
<link rel="stylesheet" href="../css/tags.css">

<script src="../script/script.js" defer></script>

<div class="publicar-container">
    <div class="publicar-wrapper">
        <!-- PAINEL DE CONTROLES -->
        <div class="publicar-controls">
            <h1>Publicar Nova Notícia</h1>

            <form id="form-noticia">
                <!-- Título -->
                <div class="form-campo">
                    <label for="input-titulo">Título da Notícia *</label>
                    <input 
                        type="text" 
                        id="input-titulo" 
                        placeholder="Digite o título da notícia"
                        required>
                </div>

                <!-- Imagem -->
                <div class="form-campo">
                    <label for="input-imagem">Imagem da Notícia</label>
                    <div class="input-file-wrapper">
                        <input 
                            type="file" 
                            id="input-imagem" 
                            accept="image/*"
                            required>
                        <span class="file-label">Escolher imagem</span>
                        <span class="file-name" id="file-name">Nenhuma imagem selecionada</span>
                    </div>
                </div>

                <!-- Texto/Conteúdo -->
                <div class="form-campo">
                    <label for="input-conteudo">Conteúdo da Notícia *</label>
                    <textarea 
                        id="input-conteudo" 
                        placeholder="Digite o conteúdo completo da notícia"
                        required></textarea>
                </div>

                <!-- Autor -->
                <div class="form-campo">
                    <label for="input-autor">Autor</label>
                    <input 
                        type="text" 
                        id="input-autor" 
                        placeholder="Seu nome de usuário"
                        value="<?= $_SESSION['usuario'] ?? 'anonimo' ?>">
                </div>

                <!-- Categoria -->
                <div class="form-campo">
                    <label>Categoria *</label>
                    <div class="categoria-tabs">
                        <button type="button" class="categoria-btn" data-categoria="f1">
                            <?= $categorias["f1"] ?? "F1" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="f2">
                            <?= $categorias["f2"] ?? "F2" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="f3">
                            <?= $categorias["f3"] ?? "F3" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="f4">
                            <?= $categorias["f4"] ?? "F4" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="f1academy">
                            <?= $categorias["f1academy"] ?? "F1 Academy" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="fe">
                            <?= $categorias["fe"] ?? "FE" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="indy">
                            <?= $categorias["indy"] ?? "Indy" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="wec">
                            <?= $categorias["wec"] ?? "WEC" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="wrc">
                            <?= $categorias["wrc"] ?? "WRC" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="nascar">
                            <?= $categorias["nascar"] ?? "NASCAR" ?>
                        </button>
                        <button type="button" class="categoria-btn" data-categoria="moto">
                            <?= $categorias["moto"] ?? "Moto" ?>
                        </button>
                    </div>
                    <input type="hidden" id="categoria-selecionada" name="categoria">
                </div>

                <button type="submit" class="btn-publicar">Publicar Notícia</button>
            </form>
        </div>

        <!-- PREVIEW DO CARD -->
        <div class="publicar-preview">
            <h2>Pré-visualização</h2>
            <div class="noticias-container preview-container">
                <article class="card-noticia card-preview">
                    <div class="card-imagem" id="preview-imagem-container">
                        <img 
                            id="preview-imagem" 
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect fill='%23e8e8e8' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23999'%3ESelecione uma imagem%3C/text%3E%3C/svg%3E"
                            alt="Preview da imagem"
                            loading="lazy">
                        <span class="card-imagem-badge" id="preview-categoria-badge">Categoria</span>
                    </div>

                    <div class="card-body">
                        <div class="card-header">
                            <h2 id="preview-titulo" class="preview-text">Título</h2>
                            <p class="meta">
                                <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                </svg>
                                <span id="preview-data"></span>
                                <span class="separador">•</span>
                                <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                <span id="preview-autor">usuário</span>
                            </p>
                        </div>

                        <p class="card-conteudo" id="preview-conteudo">Conteúdo da notícia. Será exibido em até 4 linhas na visualização do card.</p>
                    </div>
                </article>
            </div>
        </div>
    </div>
</div>