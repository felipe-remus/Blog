<?php
$id_post = $_GET['id_noticia'];

// Conexão
$con = new PDO("sqlite:banco/blog_racing.db");

// Consulta
$sql_deletar = "
DELETE FROM noticias
WHERE id_noticia = :id_post";

$stmt = $con->prepare($sql_deletar);

$stmt->bindValue(':id_post', $id_post);

$stmt->execute();

header("Location: index.html");
?>