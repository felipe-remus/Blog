<?php
// Inicia sessão para verificar permissões
session_start();

$usuarioLogado = isset($_SESSION['usuario']);
$idUsuarioLogado = $usuarioLogado ? $_SESSION['usuario']['id_usuario'] : null;
$perfilUsuario = $usuarioLogado ? $_SESSION['usuario']['perfil_id'] : null;
?>

<!-- ✨ CORREÇÃO: Adicionado id="noticias-container" para JavaScript encontrar -->
<div id="noticias-container" class="noticias-container">
<?php while ( $uma_noticia = $noticias->fetch(PDO::FETCH_ASSOC) ) { 
    $titulo_noticia = $uma_noticia['titulo_noticia'];
    $texto_noticia  = $uma_noticia['texto_noticia'];
    $data_noticia   = date('d/m/Y', strtotime($uma_noticia['data_noticia']));
    $autor          = $uma_noticia['autor'];
    $tag_categoria  = $uma_noticia['nome_categoria'];
    $imagem_noticia = $uma_noticia['imagem_noticia'];
    $id_noticia = $uma_noticia['id_noticia'];
    $usuario_id_noticia = $uma_noticia['usuario_id'];
    
    // Verificar permissões
    $podeEditar = false;
    $podeDeletar = false;
    
    if ($usuarioLogado) {
        // Admin (perfil_id = 1) pode deletar mas não pode editar
        if ($perfilUsuario == 1) {
            $podeDeletar = true;
            $podeEditar = false;
        }
        // User comum (perfil_id = 2) só pode editar e deletar seu próprio card
        else if ($perfilUsuario == 2 && $idUsuarioLogado == $usuario_id_noticia) {
            $podeEditar = true;
            $podeDeletar = true;
        }
    }
?>
    <article class="card-noticia"
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
            
            <?php if ($podeEditar || $podeDeletar): ?>
                <div class="card-acoes">
                    <?php if ($podeEditar): ?>
                        <button class="btn-acao btn-editar" aria-label="Editar notícia" title="Editar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L21 6.5z"/>
                            </svg>
                            Editar
                        </button>
                    <?php endif; ?>

                    <?php if ($podeDeletar): ?>
                        <!-- Botão Deletar -->
                        <a class="btn-acao btn-deletar"
                        aria-label="Deletar notícia" 
                        title="Deletar" 
                        onclick="if(confirm('Tem certeza que deseja deletar esta notícia?')) { window.location.href='../model/model_noticia-apagar.php?id_noticia=<?=$id_noticia?>'; }">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                            </svg>
                            Deletar
                        </a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
    </article>
<?php }?>
</div>

<div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-label="Notícia expandida">
    <div class="modal-card" id="modalCard">
        <button class="modal-fechar" id="modalFechar" aria-label="Fechar">&#x2715;</button>
    </div>
</div>