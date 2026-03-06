<div class="noticias-container">
    <!-- CARD 1 -->
    <article class="card-noticia"
            data-data="12/02/2026"
            data-categoria="f1"
            data-piloto="aston-martin"
            data-equipe="mercedes">
        <div class="card-header">
            <h2></h2>
            <h2><?= $titulo_noticia?></h2>
            <p class="meta">
                <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                <?= $data_noticia?>
                <span class="separador">•</span>
                <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                <?= $autor?>
            </p>
        </div>

        <p class="card-conteudo">
            <?= $texto_noticia?>
        </p>

        <div class="card-tags">
            <span class="tag categoria"><?= $tag_categoria?></span>
            <span class="tag equipe-aston-martin"><?= $tag_equipes["aston-martin"] ?></span>
            <span class="tag equipe-mercedes"><?= $tag_equipes["mercedes"] ?></span>
            <span class="tag equipe-ferrari"><?= $tag_equipes["ferrari"] ?></span>
            <span class="tag equipe-redbull"><?= $tag_equipes["redbull"] ?></span>
            <!--
            <span class="tag equipe-astonmartin">Aston Martin</span>
            <span class="tag equipe-mercedes">Mercedes</span>
            <span class="tag equipe-ferrari">Ferrari</span>
            <span class="tag equipe-redbull">RedBull</span>
            -->
        </div>
    </article>
</div><!-- fim .noticias-container -->

<!-- =============================================
    MODAL OVERLAY  (gerado automaticamente pelo JS)
    Inserido no <body> pelo script abaixo
============================================== -->
<div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-label="Notícia expandida">
    <div class="modal-card" id="modalCard">
        <button class="modal-fechar" id="modalFechar" aria-label="Fechar">&#x2715;</button>
        <!-- conteúdo copiado dinamicamente -->
    </div>
</div>