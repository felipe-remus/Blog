<?php
session_start();

// ============================================================
// CONEXÃO COM BANCO
// ============================================================

$string_conexao = 'sqlite:banco/blog_racing.db';
$con = new PDO($string_conexao);

// ============================================================
// VERIFICAR SE USUÁRIO ESTÁ LOGADO
// ============================================================

$usuario_logado = isset($_SESSION['id_usuario']);
$id_usuario_logado = $usuario_logado ? $_SESSION['id_usuario'] : null;
$is_admin = $usuario_logado && $_SESSION['role'] === 'admin';

// ============================================================
// FUNÇÃO: VERIFICAR PERMISSÃO
// ============================================================

function temPermissaoParaEditar($id_noticia, $id_usuario_logado, $is_admin, $con) {
    if (!$id_usuario_logado) return false;
    
    $sql = "SELECT usuario_id FROM noticias WHERE id_noticia = :id";
    $stmt = $con->prepare($sql);
    $stmt->execute([':id' => $id_noticia]);
    $noticia = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$noticia) return false;
    
    return $is_admin || ($noticia['usuario_id'] == $id_usuario_logado);
}

// ============================================================
// DEFINIR HEADERS PARA REQUISIÇÕES AJAX
// ============================================================

$acao = $_POST['acao'] ?? $_GET['acao'] ?? null;

// Se for uma requisição AJAX (POST ou GET com acao), retornar JSON
if ($acao) {
    header('Content-Type: application/json');
    
    switch ($acao) {
        case 'categorias':
            carregarCategorias($con);
            exit;
        
        case 'editar':
            editarNoticia($con, $id_usuario_logado, $is_admin);
            exit;
        
        case 'deletar':
            deletarNoticia($con, $id_usuario_logado, $is_admin);
            exit;
        
        default:
            http_response_code(400);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Ação não reconhecida'
            ]);
            exit;
    }
}

// ============================================================
// FUNÇÃO: CARREGAR CATEGORIAS (JSON)
// ============================================================

function carregarCategorias($con) {
    try {
        $sql = "SELECT id_categoria, nome_categoria FROM categorias ORDER BY nome_categoria";
        $stmt = $con->query($sql);
        $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'sucesso' => true,
            'categorias' => $categorias
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao carregar categorias'
        ]);
    }
}

// ============================================================
// FUNÇÃO: EDITAR NOTÍCIA (JSON)
// ============================================================

function editarNoticia($con, $id_usuario_logado, $is_admin) {
    try {
        // Validar autenticação
        if (!isset($id_usuario_logado)) {
            http_response_code(401);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Você precisa estar logado'
            ]);
            return;
        }

        // Receber dados
        $id_noticia = (int) ($_POST['id_noticia'] ?? 0);
        $titulo = $_POST['titulo'] ?? '';
        $conteudo = $_POST['conteudo'] ?? '';
        $categoria_id = (int) ($_POST['categoria_id'] ?? 0);

        // Validar dados
        if (!$id_noticia) {
            http_response_code(400);
            echo json_encode(['sucesso' => false, 'mensagem' => 'ID inválido']);
            return;
        }

        if (strlen($titulo) < 3) {
            http_response_code(400);
            echo json_encode(['sucesso' => false, 'mensagem' => 'Título mínimo 3 caracteres']);
            return;
        }

        if (strlen($conteudo) < 10) {
            http_response_code(400);
            echo json_encode(['sucesso' => false, 'mensagem' => 'Conteúdo mínimo 10 caracteres']);
            return;
        }

        if (!$categoria_id) {
            http_response_code(400);
            echo json_encode(['sucesso' => false, 'mensagem' => 'Categoria inválida']);
            return;
        }

        // VALIDAR PERMISSÃO
        if (!temPermissaoParaEditar($id_noticia, $id_usuario_logado, $is_admin, $con)) {
            http_response_code(403);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Você não tem permissão para editar esta notícia'
            ]);
            return;
        }

        // Executar UPDATE
        $sql = "UPDATE noticias 
                SET titulo_noticia = :titulo, 
                    texto_noticia = :conteudo, 
                    categoria_id = :categoria_id,
                    data_noticia = datetime('now')
                WHERE id_noticia = :id";
        
        $stmt = $con->prepare($sql);
        $result = $stmt->execute([
            ':titulo' => $titulo,
            ':conteudo' => $conteudo,
            ':categoria_id' => $categoria_id,
            ':id' => $id_noticia
        ]);

        if ($result) {
            echo json_encode([
                'sucesso' => true,
                'mensagem' => 'Notícia atualizada com sucesso!'
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao atualizar']);
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro: ' . $e->getMessage()
        ]);
    }
}

// ============================================================
// FUNÇÃO: DELETAR NOTÍCIA
// ============================================================

function deletarNoticia($con, $id_usuario_logado, $is_admin) {
    try {
        // Validar autenticação
        if (!isset($id_usuario_logado)) {
            http_response_code(401);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Você precisa estar logado'
            ]);
            return;
        }

        $id_noticia = (int) ($_POST['id_noticia'] ?? 0);

        if (!$id_noticia) {
            http_response_code(400);
            echo json_encode(['sucesso' => false, 'mensagem' => 'ID inválido']);
            return;
        }

        // VALIDAR PERMISSÃO
        if (!temPermissaoParaEditar($id_noticia, $id_usuario_logado, $is_admin, $con)) {
            http_response_code(403);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Você não tem permissão para deletar esta notícia'
            ]);
            return;
        }

        // Executar DELETE
        $sql = "DELETE FROM noticias WHERE id_noticia = :id";
        $stmt = $con->prepare($sql);
        $result = $stmt->execute([':id' => $id_noticia]);

        if ($result) {
            echo json_encode([
                'sucesso' => true,
                'mensagem' => 'Notícia deletada com sucesso!'
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao deletar']);
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro: ' . $e->getMessage()
        ]);
    }
}

// ============================================================
// LISTAR NOTÍCIAS (PARA RENDERIZAR HTML)
// ============================================================

$sql_noticia = "
SELECT 
    n.id_noticia,
    n.titulo_noticia, 
    n.texto_noticia, 
    n.imagem_noticia, 
    n.data_noticia,
    n.usuario_id,
    u.user AS autor,
    u.id_usuario,
    c.nome_categoria,
    c.id_categoria
FROM noticias n
JOIN usuarios u ON n.usuario_id = u.id_usuario
JOIN categorias c ON n.categoria_id = c.id_categoria
ORDER BY n.data_noticia DESC";

$noticias = $con->query($sql_noticia);

require "views/card-view.php";
?>