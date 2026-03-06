<form id="form-noticia">

    <!-- Título -->
    <div class="campo">
        <input type="text" id="titulo-noticia" required placeholder="Título da Notícia">
    </div>

    <!-- Texto -->
    <div class="campo">
        <textarea id="texto-noticia" required placeholder="Texto da Notícia"></textarea>
    </div>

    <!-- Tags selecionadas (preview global) -->
    <div class="campo">
            <label><?= $label_tags?></label>
            <div class="tag-selector">
            <div class="tags-selecionadas"></div>
            <div id="aviso-tags" class="aviso-tags"></div>
            <button type="button" class="btn-limpar-tags" id="btn-limpar-todas" style="display:none;">✕ Limpar Tudo</button>
        </div>
    </div>

    <!-- Tags selecionadas (preview global) -->
    <div class="campo">
        <label><?= $label_categoria?></label>
    </div>

    <!-- ABAS DE CATEGORIA -->
    <div class="abas-categoria">
        <nav class="abas-nav" role="tablist">
        <button type="button" class="aba-btn aba-ativa" data-aba="f1" role="tab"><?= $botao_categoria["f1"]?></button>
        <button type="button" class="aba-btn" data-aba="f2" role="tab"><?= $botao_categoria["f2"]?></button>
        <button type="button" class="aba-btn" data-aba="f3" role="tab"><?= $botao_categoria["f3"]?></button>
        <button type="button" class="aba-btn" data-aba="f4" role="tab"><?= $botao_categoria["f4"]?></button>
        <button type="button" class="aba-btn" data-aba="f1academy" role="tab"><?= $botao_categoria["f1academy"]?></button>
        <button type="button" class="aba-btn" data-aba="fe" role="tab"><?= $botao_categoria["fe"]?></button>
        <button type="button" class="aba-btn" data-aba="indy" role="tab"><?= $botao_categoria["indy"]?></button>
            <!--
            <button type="button" class="aba-btn aba-ativa" data-aba="f1"        role="tab">Fórmula 1</button>
            <button type="button" class="aba-btn"           data-aba="f2"        role="tab">Fórmula 2</button>
            <button type="button" class="aba-btn"           data-aba="f3"        role="tab">Fórmula 3</button>
            <button type="button" class="aba-btn"           data-aba="f4"        role="tab">Fórmula 4</button>
            <button type="button" class="aba-btn"           data-aba="f1academy" role="tab">F1 Academy</button>
            <button type="button" class="aba-btn"           data-aba="fe"        role="tab">Fórmula E</button>
            <button type="button" class="aba-btn"           data-aba="indy"      role="tab">IndyCar</button>
            -->
        </nav>
    
        <!-- Conteúdo de cada aba (gerado via JS) -->
        <div id="abas-conteudo"></div>
    </div>  
    <button type="submit" class="botao-enviar"><?=$botao_publicar?></button>
</form>