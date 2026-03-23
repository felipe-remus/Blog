<?php
// Conexão
$con = new PDO("sqlite:banco/blog_racing.db");

// PROCESSAR REQUISIÇÕES AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao'])) {
    header('Content-Type: application/json');
    $acao = $_POST['acao'];

    // ========== CATEGORIAS ==========
    
    // Adicionar categoria
    if ($acao === 'adicionar_categoria') {
        $nome = trim($_POST['nome_categoria'] ?? '');
        $sigla = trim($_POST['sigla_categoria'] ?? '');

        if (empty($nome) || empty($sigla)) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Nome e sigla são obrigatórios']);
            exit;
        }

        try {
            $sql = "INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES (?, ?)";
            $stmt = $con->prepare($sql);
            $stmt->execute([$nome, $sigla]);
            echo json_encode(['sucesso' => true, 'mensagem' => 'Categoria adicionada com sucesso']);
        } catch (PDOException $e) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao adicionar categoria']);
        }
        exit;
    }

    // ========== USUÁRIOS ==========

    // Deletar usuário
    if ($acao === 'deletar_usuario') {
        $id = intval($_POST['id_usuario'] ?? 0);

        if ($id <= 0) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'ID inválido']);
            exit;
        }

        try {
            $sql = "DELETE FROM usuarios WHERE id_usuario = ?";
            $stmt = $con->prepare($sql);
            $stmt->execute([$id]);
            echo json_encode(['sucesso' => true, 'mensagem' => 'Usuário deletado com sucesso']);
        } catch (PDOException $e) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao deletar usuário']);
        }
        exit;
    }

    // Atualizar perfil do usuário
    if ($acao === 'atualizar_perfil') {
        $id = intval($_POST['id_usuario'] ?? 0);
        $perfil_id = intval($_POST['perfil_id'] ?? 0);

        if ($id <= 0 || $perfil_id <= 0) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos']);
            exit;
        }

        try {
            $sql = "UPDATE usuarios SET perfil_id = ? WHERE id_usuario = ?";
            $stmt = $con->prepare($sql);
            $stmt->execute([$perfil_id, $id]);
            echo json_encode(['sucesso' => true, 'mensagem' => 'Perfil atualizado com sucesso']);
        } catch (PDOException $e) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao atualizar perfil']);
        }
        exit;
    }
}

// CARREGAR DADOS PARA EXIBIÇÃO
// Categorias
$sql_categorias = "SELECT * FROM categorias ORDER BY id_categoria";
$categorias = $con->query($sql_categorias)->fetchAll(PDO::FETCH_ASSOC);

// Usuários
$sql_usuarios = "
SELECT 
    u.id_usuario,
    u.nome,
    u.user,
    u.email,
    u.telefone,
    p.id_perfil,
    p.nome_perfil
FROM usuarios u
JOIN perfis p ON u.perfil_id = p.id_perfil
ORDER BY u.nome";
$usuarios = $con->query($sql_usuarios)->fetchAll(PDO::FETCH_ASSOC);

// Perfis
$sql_perfis = "SELECT * FROM perfis ORDER BY nome_perfil";
$perfis = $con->query($sql_perfis)->fetchAll(PDO::FETCH_ASSOC);

// Estatísticas
$sql_stats = "
SELECT 
    (SELECT COUNT(*) FROM usuarios) as total_usuarios,
    (SELECT COUNT(*) FROM categorias) as total_categorias,
    (SELECT COUNT(*) FROM noticias) as total_noticias,
    (SELECT COUNT(*) FROM noticias WHERE DATE(data_noticia) = DATE('now')) as noticias_hoje";
$stats = $con->query($sql_stats)->fetch(PDO::FETCH_ASSOC);

require "view_admin.php";
?>