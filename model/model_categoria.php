<?php
// __DIR__ garante o caminho absoluto ao arquivo, independente de onde ele é incluído
$con = new PDO("sqlite:" . __DIR__ . "/../banco/blog_racing.db");

$sql_categorias = "SELECT sigla_categoria, nome_categoria FROM categorias";
$rs = $con->query($sql_categorias);

$categorias = [];
while ($linha = $rs->fetch(PDO::FETCH_ASSOC)) {
    $categorias[$linha['sigla_categoria']] = $linha['nome_categoria'];
}