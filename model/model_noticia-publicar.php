<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['usuario'])) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Faça login para publicar notícias'];
    header('Location: login.php');
    exit;
}

require __DIR__ . "/model_categoria.php";

$pdo = new PDO("sqlite:" . __DIR__ . "/../banco/blog_racing.db");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $titulo       = trim($_POST['titulo']    ?? '');
    $texto        = trim($_POST['texto']     ?? '');
    $sigla_cat    = trim($_POST['categoria'] ?? '');
    $usuario_id   = $_SESSION['usuario']['id_usuario'];
    $data_noticia = date('Y-m-d');

    // Validações
    if (empty($titulo)) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Título é obrigatório'];
        exit;
    }
    if (empty($texto)) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Conteúdo é obrigatório'];
        exit;
    }
    if (empty($sigla_cat)) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Selecione uma categoria'];
        exit;
    }
    if (!isset($_FILES['img']) || $_FILES['img']['error'] !== UPLOAD_ERR_OK) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Selecione uma imagem para a notícia'];
        exit;
    }

    try {
        // Busca id_categoria pela sigla
        $stmt_cat = $pdo->prepare("SELECT id_categoria FROM categorias WHERE sigla_categoria = ?");
        $stmt_cat->execute([$sigla_cat]);
        $cat = $stmt_cat->fetch(PDO::FETCH_ASSOC);

        if (!$cat) {
            $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Categoria inválida'];
            exit;
        }

        $categoria_id = $cat['id_categoria'];

        // 1) Insere a notícia sem imagem para obter o ID gerado
        $stmt = $pdo->prepare("
            INSERT INTO noticias (titulo_noticia, texto_noticia, imagem_noticia, data_noticia, categoria_id, usuario_id)
            VALUES (:titulo, :texto, '', :data, :categoria_id, :usuario_id)
        ");
        $stmt->bindValue(':titulo',       $titulo);
        $stmt->bindValue(':texto',        $texto);
        $stmt->bindValue(':data',         $data_noticia);
        $stmt->bindValue(':categoria_id', $categoria_id, PDO::PARAM_INT);
        $stmt->bindValue(':usuario_id',   $usuario_id,   PDO::PARAM_INT);
        $stmt->execute();

        $id_noticia = $pdo->lastInsertId();

        // 2) Monta o nome da imagem: {id}-{nome_original}
        $nome_original = basename($_FILES['img']['name']);
        $novo_nome     = $id_noticia . '-' . $nome_original;
        $destino       = __DIR__ . '/../public/img-noticia/' . $novo_nome;
        move_uploaded_file($_FILES['img']['tmp_name'], $destino);

        $img = 'img-noticia/' . $novo_nome;

        // 3) Atualiza o caminho da imagem na notícia recém-criada
        $stmt_img = $pdo->prepare("UPDATE noticias SET imagem_noticia = :img WHERE id_noticia = :id");
        $stmt_img->bindValue(':img', $img);
        $stmt_img->bindValue(':id',  $id_noticia, PDO::PARAM_INT);
        $stmt_img->execute();

        $_SESSION['flash'] = ['tipo' => 'sucesso', 'mensagem' => 'Notícia publicada com sucesso!'];
        header('Location: index.php');
        exit;

    } catch (PDOException $e) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Erro ao publicar notícia. Tente novamente.'];
        exit;
    }
}

require __DIR__ . "/../view/view_noticia-publicar.php";