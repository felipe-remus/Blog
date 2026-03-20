<?php
//Conexão 
$con = new PDO("sqlite:banco/blog_racing.db");

//Consulta
$sql_categorias = "SELECT sigla_categoria, nome_categoria FROM categorias";
$rs = $con->query($sql_categorias);
    
$categorias = [];
while ($linha = $rs->fetch(PDO::FETCH_ASSOC)) {
    $categorias[$linha['sigla_categoria']] = $linha['nome_categoria'];
}
?>