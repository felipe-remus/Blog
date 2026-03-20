<?php
// Conexão com o banco
$con = new PDO("sqlite:banco/blog_racing.db");
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Configurações de paginação
$por_pagina = 20;
$pagina_atual = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$offset = ($pagina_atual - 1) * $por_pagina;

// Contar total de notícias
$sql_contagem = "SELECT COUNT(*) as total FROM noticias";
$total_noticias = $con->query($sql_contagem)->fetch(PDO::FETCH_ASSOC)['total'];
$total_paginas = $total_noticias > 0 ? ceil($total_noticias / $por_pagina) : 1;

// Calcular início e fim para exibição
$inicio = $total_noticias > 0 ? $offset + 1 : 0;
$fim = min($offset + $por_pagina, $total_noticias);

// Buscar notícias da página atual
$sql_noticias = "SELECT 
                    n.titulo_noticia,
                    n.texto_noticia,
                    n.imagem_noticia,
                    n.data_noticia,
                    u.user AS autor,
                    c.nome_categoria,
                    c.sigla_categoria
                FROM noticias n
                JOIN usuarios u ON n.usuario_id = u.id_usuario
                JOIN categorias c ON n.categoria_id = c.id_categoria
                ORDER BY n.data_noticia DESC
                LIMIT :limit OFFSET :offset";

$stmt = $con->prepare($sql_noticias);
$stmt->bindValue(':limit', $por_pagina, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$noticias = $stmt->fetchAll(PDO::FETCH_ASSOC);

require "views/paginacao-view.php";
?>