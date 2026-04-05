<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Lê e limpa o flash de sessão
$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);

$usuarioLogado = isset($_SESSION['usuario']);
$nomeUsuario   = $usuarioLogado ? $_SESSION['usuario']['user'] : '';
?>

<div class="publicar-container">
    <div class="publicar-wrapper">
        <!-- PAINEL DE CONTROLES -->
        <div class="publicar-controls">
            <h1>Publicar Nova Notícia</h1>

            <!-- action aponta para o entry point em public/actions/ -->
            <form id="form-noticia"
                method="POST"
                enctype="multipart/form-data"
                action="escrever-noticia.php">

                <!-- Título -->
                <div class="form-campo">
                    <label for="input-titulo">Título da Notícia *</label>
                    <input
                        type="text"
                        id="input-titulo"
                        name="titulo"
                        placeholder="Digite o título da notícia"
                        required>
                </div>

                <!-- Imagem -->
                <div class="form-campo">
                    <label for="input-imagem">Imagem da Notícia</label>
                    <div class="input-file-wrapper">
                        <button type="button" class="btn-remover-imagem" id="btnRemoverImagem" title="Remover imagem selecionada">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                        <input
                            type="file"
                            id="input-imagem"
                            name="img"
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
                        name="texto"
                        rows="15"
                        placeholder="Digite o conteúdo completo da notícia"
                        required></textarea>
                </div>

                <!-- Autor (somente leitura, vem da sessão) -->
                <div class="form-campo">
                    <label for="input-autor">Autor</label>
                    <input
                        type="text"
                        id="input-autor"
                        placeholder="Seu nome de usuário"
                        readonly
                        value="<?= htmlspecialchars($nomeUsuario) ?>">
                </div>

                <!-- Categoria -->
                <div class="form-campo">
                    <label>Categoria *</label>
                    <div class="categoria-tabs">
                        <?php foreach ($categorias as $chave => $valor): ?>
                            <button type="button" class="categoria-btn" data-categoria="<?= $chave ?>">
                                <?= $valor ?>
                            </button>
                        <?php endforeach; ?>
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
                                <span id="preview-autor"><?= htmlspecialchars($nomeUsuario) ?></span>
                            </p>
                        </div>
                        <p class="card-conteudo" id="preview-conteudo">Conteúdo da notícia. Será exibido em até 4 linhas na visualização do card.</p>
                    </div>
                </article>
            </div>
        </div>
    </div>
</div>
        <!-- Flash de sessão: PHP escreve os dados, JS exibe o toast -->
        <?php if ($flash): ?>
            <div id="flash-data"
                data-mensagem="<?= htmlspecialchars($flash['mensagem']) ?>"
                data-tipo="<?= htmlspecialchars($flash['tipo']) ?>"
                style="display:none"></div>
        <?php endif; ?>

        <!-- Toast para mensagens -->
        <div id="toast" class="toast"></div>