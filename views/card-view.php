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

<div class="noticias-container">

<?php while ( $uma_noticia = $noticias->fetch(PDO::FETCH_ASSOC) ) { 
    $id_noticia         = $uma_noticia['id_noticia'];
    $titulo_noticia     = $uma_noticia['titulo_noticia'];
    $texto_noticia      = $uma_noticia['texto_noticia'];
    $data_noticia       = date('d/m/Y', strtotime($uma_noticia['data_noticia']));
    $autor              = $uma_noticia['autor'];
    $usuario_id_noticia = $uma_noticia['usuario_id'];
    $tag_categoria      = $uma_noticia['nome_categoria'];
    $categoria_id       = $uma_noticia['id_categoria'];
    $imagem_noticia     = $uma_noticia['imagem_noticia'];
    
    // ========================================
    // VERIFICAR PERMISSÃO PARA EDITAR/DELETAR
    // ========================================
    
    $temPermissao = false;
    
    if ($usuario_logado) {
        if ($is_admin) {
            $temPermissao = true; // Admin pode editar tudo
        } elseif ($usuario_id_noticia == $id_usuario_logado) {
            $temPermissao = true; // É o autor
        }
    }
?>
    <article class="card-noticia"
        data-id="<?=$id_noticia?>"
        data-usuario-id="<?=$usuario_id_noticia?>"
        data-categoria-id="<?=$categoria_id?>"
        data-data="<?=$data_noticia?>"
        data-categoria="<?=$tag_categoria?>">

        <div class="card-imagem">
            <img src="<?=$imagem_noticia?>"
                loading="lazy"
                alt="<?=$titulo_noticia?>">
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
            
            <!-- ========================================
                 BOTÕES - APENAS SE TEM PERMISSÃO
                 ======================================== -->
            <?php if ($temPermissao): ?>
                <div class="card-acoes">
                    <button 
                        class="btn-acao btn-editar" 
                        data-id="<?=$id_noticia?>"
                        data-titulo="<?=$titulo_noticia?>"
                        data-conteudo="<?=$texto_noticia?>"
                        data-categoria="<?=$categoria_id?>"
                        aria-label="Editar notícia" 
                        title="Editar notícia">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L21 6.5z"/>
                        </svg>
                        Editar
                    </button>
                    <button 
                        class="btn-acao btn-deletar" 
                        data-id="<?=$id_noticia?>"
                        data-titulo="<?=$titulo_noticia?>"
                        aria-label="Deletar notícia" 
                        title="Deletar notícia">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                        Deletar
                    </button>
                </div>
            <?php endif; ?>
        </div>
    </article>
<?php }?>
</div>

<!-- ========================================
     MODAL - VISUALIZAR NOTÍCIA
     ======================================== -->
<div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-label="Notícia expandida">
    <div class="modal-card" id="modalCard">
        <button class="modal-fechar" id="modalFechar" aria-label="Fechar">&#x2715;</button>
    </div>
</div>