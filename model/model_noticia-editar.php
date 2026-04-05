<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require __DIR__ . "/model_categoria.php";

// __DIR__ garante o caminho absoluto ao arquivo, independente de onde ele é incluído
$pdo = new PDO("sqlite:" . __DIR__ . "/../banco/blog_racing.db");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (!isset($_GET['id_noticia']) || empty($_GET['id_noticia'])) {
    header('Location: ../noticias.php');
    exit;
}

$id_noticia = $_GET['id_noticia'];

$sql_mostrar = "
    SELECT
        n.titulo_noticia,
        n.texto_noticia,
        n.imagem_noticia,
        u.user AS autor,
        c.nome_categoria,
        c.sigla_categoria,
        n.id_noticia,
        n.usuario_id
    FROM noticias n
    JOIN usuarios u ON n.usuario_id = u.id_usuario
    JOIN categorias c ON n.categoria_id = c.id_categoria
    WHERE n.id_noticia = :id_noticia
";

$stmt = $pdo->prepare($sql_mostrar);
$stmt->bindValue(':id_noticia', $id_noticia);
$stmt->execute();
$uma_noticia = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$uma_noticia) {
    header('Location: ../noticias.php');
    exit;
}

$titulo_noticia_editar    = $uma_noticia['titulo_noticia'];
$texto_noticia_editar     = $uma_noticia['texto_noticia'];
$user_noticia_editar      = $uma_noticia['autor'];
$categoria_noticia_editar = $uma_noticia['nome_categoria'];
$imagem_noticia_editar    = $uma_noticia['imagem_noticia'];
$sigla_categoria_editar   = $uma_noticia['sigla_categoria'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $titulo = $_POST['titulo'];
        $texto  = $_POST['texto'];

        if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
            $nome_original = basename($_FILES['img']['name']);
            $novo_nome     = $id_noticia . '-' . $nome_original;
            $destino       = __DIR__ . '/../img-noticia/' . $novo_nome;
            move_uploaded_file($_FILES['img']['tmp_name'], $destino);
            $img = '../img-noticia/' . $novo_nome;
        } else {
            $img = $_POST['img_atual'];
        }

        $sql_editar = "
            UPDATE noticias
            SET titulo_noticia = :titulo,
                imagem_noticia = :img,
                texto_noticia  = :texto
            WHERE id_noticia   = :id_noticia
        ";

        $stmt = $pdo->prepare($sql_editar);
        $stmt->bindValue(':titulo',     $titulo);
        $stmt->bindValue(':img',        $img);
        $stmt->bindValue(':texto',      $texto);
        $stmt->bindValue(':id_noticia', $id_noticia);
        $stmt->execute();

        header('Location: ../noticias.php');
        exit;

    } catch (PDOException $e) {
        header('Location: ../noticias.php');
        exit;
    }
}

require __DIR__ . "/../view/view_noticia-editar.php";