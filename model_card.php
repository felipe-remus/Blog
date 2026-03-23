<?php
//Conexão
$con = new PDO("sqlite:banco/blog_racing.db");

//Consulta
$sql_noticia = "
SELECT 
    n.titulo_noticia, 
    n.texto_noticia, 
    n.imagem_noticia, 
    n.data_noticia, 
    u.user AS autor,
    c.nome_categoria,
    n.id_noticia
    FROM noticias n
    JOIN usuarios u ON n.usuario_id = u.id_usuario
    JOIN categorias c ON n.categoria_id = c.id_categoria
    ORDER BY n.data_noticia DESC";

$noticias = $con->query($sql_noticia);

require "view_card.php";
?>