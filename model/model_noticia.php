<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Conexão
$con = new PDO("sqlite:../banco/blog_racing.db");
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Recebe os parâmetros de filtro via GET
$busca = trim($_GET['busca-texto']        ?? '');
$categoria = trim($_GET['filtro-categoria']   ?? '');
$data_inicio = trim($_GET['filtro-data-inicio'] ?? '');
$data_fim = trim($_GET['filtro-data-fim']    ?? '');

// Configurações de paginação
$por_pagina = 20;
$pagina_atual = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$offset = ($pagina_atual - 1) * $por_pagina;

// WHERE compartilhado entre contagem e busca
$where  = " WHERE 1=1";
$params = [];

if ($busca !== '') {
    $where .= " AND (n.titulo_noticia LIKE :busca OR n.texto_noticia LIKE :busca)";
    $params[':busca'] = '%' . $busca . '%';
}

if ($categoria !== '') {
    $where .= " AND c.nome_categoria = :categoria";
    $params[':categoria'] = $categoria;
}

if ($data_inicio !== '') {
    $where .= " AND n.data_noticia >= :data_inicio";
    $params[':data_inicio'] = $data_inicio;
}

if ($data_fim !== '') {
    $where .= " AND n.data_noticia <= :data_fim";
    $params[':data_fim'] = $data_fim;
}

// Contagem total (respeitando filtros)
$sql_contagem = "
    SELECT COUNT(*) as total
    FROM noticias n
    JOIN usuarios u   ON n.usuario_id   = u.id_usuario
    JOIN categorias c ON n.categoria_id = c.id_categoria"
    . $where;

$stmt_count = $con->prepare($sql_contagem);
$stmt_count->execute($params);
$total_noticias = (int) $stmt_count->fetch(PDO::FETCH_ASSOC)['total'];
$total_paginas = $total_noticias > 0 ? ceil($total_noticias / $por_pagina) : 1;

// Garante que a página atual não ultrapasse o total
$pagina_atual = min($pagina_atual, $total_paginas);
$offset = ($pagina_atual - 1) * $por_pagina;

$inicio = $total_noticias > 0 ? $offset + 1 : 0;
$fim = min($offset + $por_pagina, $total_noticias);

// Busca paginada (respeitando filtros)
$sql_noticia = "
    SELECT
        n.titulo_noticia,
        n.texto_noticia,
        n.imagem_noticia,
        n.data_noticia,
        u.user AS autor,
        c.nome_categoria,
        n.id_noticia,
        n.usuario_id
    FROM noticias n
    JOIN usuarios u   ON n.usuario_id   = u.id_usuario
    JOIN categorias c ON n.categoria_id = c.id_categoria"
    . $where
    . " ORDER BY n.data_noticia DESC
        LIMIT :limit OFFSET :offset";

$stmt = $con->prepare($sql_noticia);

foreach ($params as $key => $value) {
    $stmt->bindValue($key, $value);
}

$stmt->bindValue(':limit',  $por_pagina, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset,     PDO::PARAM_INT);
$stmt->execute();
$noticias = $stmt;

require "../view/view_card.php";
require "../view/view_paginacao.php";
?>