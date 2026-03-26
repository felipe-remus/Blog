<?php
// Inicia sessão
session_start();

// Conectar ao banco
$pdo = new PDO("sqlite:../banco/blog_racing.db");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Verificar se usuário está logado
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Usuário não autenticado']);
    exit;
}

// Verificar se é requisição AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $id_usuario = $_SESSION['usuario']['id_usuario'];
    $nome = trim($_POST['nome'] ?? '');
    $user = trim($_POST['user'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $telefone = trim($_POST['telefone'] ?? '');
    $senha_atual = $_POST['senha_atual'] ?? '';
    $senha_nova = $_POST['senha_nova'] ?? '';
    $confirmar_senha_nova = $_POST['confirmar_senha_nova'] ?? '';
    
    // Validações básicas
    if (empty($nome)) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Nome é obrigatório']);
        exit;
    }
    
    if (empty($user)) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Nome de usuário é obrigatório']);
        exit;
    }
    
    if (empty($email)) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Email é obrigatório']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Email inválido']);
        exit;
    }
    
    // Verificar se quer alterar senha
    $alterar_senha = false;
    $senha_hash = null;
    
    if (!empty($senha_nova) || !empty($confirmar_senha_nova) || !empty($senha_atual)) {
        $alterar_senha = true;
        
        // Validar senha atual
        if (empty($senha_atual)) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Digite sua senha atual para alterar a senha']);
            exit;
        }
        
        // Buscar usuário para verificar senha
        $stmt_user = $pdo->prepare("SELECT senha FROM usuarios WHERE id_usuario = ?");
        $stmt_user->execute([$id_usuario]);
        $usuario_atual = $stmt_user->fetch(PDO::FETCH_ASSOC);
        
        if (!$usuario_atual || !password_verify($senha_atual, $usuario_atual['senha'])) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Senha atual incorreta']);
            exit;
        }
        
        // Validar senha nova
        if (strlen($senha_nova) < 6) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Senha deve ter no mínimo 6 caracteres']);
            exit;
        }
        
        if ($senha_nova !== $confirmar_senha_nova) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'As senhas não coincidem']);
            exit;
        }
        
        $senha_hash = password_hash($senha_nova, PASSWORD_DEFAULT);
    }
    
    try {
        // Verificar se username ou email já existem (com exceção do próprio usuário)
        $stmt_check = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE (user = ? OR email = ?) AND id_usuario != ?");
        $stmt_check->execute([$user, $email, $id_usuario]);
        
        if ($stmt_check->fetch()) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Usuário ou email já cadastrado por outro usuário']);
            exit;
        }
        
        // Atualizar dados
        if ($alterar_senha) {
            $sql = "UPDATE usuarios SET nome = ?, user = ?, email = ?, telefone = ?, senha = ? WHERE id_usuario = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$nome, $user, $email, $telefone, $senha_hash, $id_usuario]);
        } else {
            $sql = "UPDATE usuarios SET nome = ?, user = ?, email = ?, telefone = ? WHERE id_usuario = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$nome, $user, $email, $telefone, $id_usuario]);
        }
        
        // Atualizar sessão com novos dados
        $_SESSION['usuario']['nome'] = $nome;
        $_SESSION['usuario']['user'] = $user;
        $_SESSION['usuario']['email'] = $email;
        $_SESSION['usuario']['telefone'] = $telefone;
        
        if ($alterar_senha) {
            // Destruir sessão e redirecionar para login se senha foi alterada
            session_destroy();
            echo json_encode([
                'sucesso' => true, 
                'mensagem' => 'Perfil atualizado! Faça login novamente com sua nova senha.',
                'mudar_senha' => true
            ]);
        } else {
            echo json_encode([
                'sucesso' => true, 
                'mensagem' => 'Perfil atualizado com sucesso!',
                'mudar_senha' => false
            ]);
        }
        
    } catch (PDOException $e) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao atualizar perfil. Tente novamente.']);
    }
    exit;
}
?>