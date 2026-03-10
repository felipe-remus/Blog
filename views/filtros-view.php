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

<div class="filtros-wrapper">
    <div class="busca-container">
        <input type="text" id="busca-texto" placeholder="Pesquisar Noticias...">
    </div>

    <!-- Filtro por categoria (sempre visível) -->
    <div class="filtro-container">
        <select id="filtro-categoria" name="categoria" class="filtro-select">
        <option value="" disabled selected>Selecione a Categoria</option>
        
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
</div>