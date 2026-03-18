<?php
//Conexão
$string_conexao = 'sqlite:banco/blog_racing.db';
$con = new PDO($string_conexao);

//Consulta
$sql_noticia = "
SELECT 
    n.titulo_noticia, 
    n.texto_noticia, 
    n.imagem_noticia, 
    n.data_noticia, 
    u.user AS autor,
    c.nome_categoria
    FROM noticias n
    JOIN usuarios u ON n.usuario_id = u.id_usuario
    JOIN categorias c ON n.categoria_id = c.id_categoria
    ORDER BY n.data_noticia DESC";

$noticias = $con->query($sql_noticia);

require "views/card-view.php";
?>