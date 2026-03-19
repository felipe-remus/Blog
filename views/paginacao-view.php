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

<script src="../script/edicao-noticia.js" defer></script>
<script src="../script/header.js" defer></script>
<script src="../script/historia.js" defer></script>
<script src="../script/modal-noticia.js" defer></script>
<script src="../script/publicar.js" defer></script>
<script src="../script/slider.js" defer></script>
<script src="../script/tabs.js" defer></script>

<!-- Container de paginação -->
<div class="paginacao-container" id="paginacao">
    
    <!-- Botão Primeira -->
    <button class="paginacao-btn" 
            id="btn-primeira" 
            title="Primeira página"
            <?= $pagina_atual === 1 ? 'disabled' : '' ?>
            onclick="window.location.href='?page=1'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
        </svg>
    </button>
    
    <!-- Botão Anterior -->
    <button class="paginacao-btn" 
            id="btn-anterior" 
            title="Página anterior"
            <?= $pagina_atual === 1 ? 'disabled' : '' ?>
            onclick="window.location.href='?page=<?= max(1, $pagina_atual - 1) ?>'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    </button>
    
    <!-- Botão Próxima -->
    <button class="paginacao-btn" 
            id="btn-proxima" 
            title="Próxima página"
            <?= $pagina_atual === $total_paginas ? 'disabled' : '' ?>
            onclick="window.location.href='?page=<?= min($total_paginas, $pagina_atual + 1) ?>'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    </button>
    
    <!-- Botão Última -->
    <button class="paginacao-btn" 
            id="btn-ultima" 
            title="Última página"
            <?= $pagina_atual === $total_paginas ? 'disabled' : '' ?>
            onclick="window.location.href='?page=<?= $total_paginas ?>'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
        </svg>
    </button>
</div>

<!-- Info: "Mostrando X-Y de Z notícias" -->
<div class="info-paginacao" id="info-paginacao">
    Mostrando 
    <span id="info-inicio"><?= $inicio ?></span>-<span id="info-fim"><?= $fim ?></span> 
    de 
    <span id="info-total"><?= $total_noticias ?></span> notícias
</div>