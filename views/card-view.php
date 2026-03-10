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

<div class="noticias-container">
    <article class="card-noticia"
        data-data="<?=$data_noticia?>"
        data-categoria="<?=$tag_categoria?>">

        <div class="card-imagem">
            <img src="<?=$imagem_noticia?>"
                alt="<?=$imagem_alt_noticia?>"
                loading="lazy">
            <span class="card-imagem-badge"><?=$tag_categoria?></span>
        </div>

        <div class="card-body">
            <div class="card-header">
                <h2><?=$titulo_noticia?></h2>
                <p class="meta">
                    <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <?=$data_noticia?>
                    <span class="separador">•</span>
                    <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <?=$autor?>
                </p>
            </div>

            <p class="card-conteudo"><?=$texto_noticia?></p>

            <div class="card-tags">
                <span class="tag"><?=$tag_categoria?></span>
            </div>
        </div>
    </article>
</div>

<div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-label="Notícia expandida">
    <div class="modal-card" id="modalCard">
        <button class="modal-fechar" id="modalFechar" aria-label="Fechar">&#x2715;</button>
    </div>
</div>