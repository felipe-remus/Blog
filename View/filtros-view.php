<div class="filtros-wrapper">


    <div class="busca-container">
        <input type="text" id="busca-texto" placeholder="Pesquisar Noticias...">
    </div>

    <!-- Filtro por categoria (sempre visível) -->
    <div class="filtro-container">
        <select id="filtro-categoria" name="categoria" class="filtro-select">
        <option value="" disabled selected><?= $select_categoria ?></option>
        
        <option value="f1" ><?= $categorias["f1"]?></option>
        <option value="f2" ><?= $categorias["f2"]?></option>
        <option value="f3" ><?= $categorias["f3"]?></option>
        <option value="f4" ><?= $categorias["f4"]?></option>
        <option value="f1academy" ><?= $categorias["f1academy"]?></option>
        <option value="fe" ><?= $categorias["fe"]?></option>
        <option value="indy" ><?= $categorias["indy"]?></option>
        <!--
        <option value="f1">Fórmula 1</option>
        <option value="f2">Fórmula 2</option>
        <option value="f3">Fórmula 3</option>
        <option value="f4">Fórmula 4</option>
        <option value="f1academy">F1 Academy</option>
        <option value="fe">Fórmula E</option>
        <option value="indy">IndyCar Series</option>
        -->
        </select>
    </div>

    <!-- Filtros dinâmicos (ocultos até selecionar categoria) -->
    <div class="filtro-container filtro-dinamico" id="container-equipe" style="display:none;">
        <select id="filtro-equipe" name="equipe" class="filtro-select">
        <option value=""><?= $select_equipe?></option>
        </select>
    </div>

    <div class="filtro-container filtro-dinamico" id="container-piloto" style="display:none;">
        <select id="filtro-piloto" name="piloto" class="filtro-select">
        <option value=""><?= $select_piloto?></option>
        </select>
    </div>

    <div class="filtro-container filtro-dinamico" id="container-pista" style="display:none;">
        <select id="filtro-pista" name="pista" class="filtro-select">
        <option value=""><?= $select_pista?></option>
        </select>
    </div>
</div>