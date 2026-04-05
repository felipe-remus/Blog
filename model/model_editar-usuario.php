<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Usuário deve estar logado
if (!isset($_SESSION['usuario'])) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Faça login para acessar esta página'];
    header('Location: ../login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../login.php');
    exit;
}

// Conexão
$pdo = new PDO("sqlite:../banco/blog_racing.db");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$id_usuario          = $_SESSION['usuario']['id_usuario'];
$nome                = trim($_POST['nome']                 ?? '');
$user                = trim($_POST['user']                 ?? '');
$email               = trim($_POST['email']                ?? '');
$telefone            = trim($_POST['telefone']             ?? '');
$senha_atual         =      $_POST['senha_atual']          ?? '';
$senha_nova          =      $_POST['senha_nova']           ?? '';
$confirmar_senha_nova =     $_POST['confirmar_senha_nova'] ?? '';

// Validações básicas
if (empty($nome)) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Nome é obrigatório'];
    header('Location: login.php');
    exit;
}

if (empty($user)) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Nome de usuário é obrigatório'];
    header('Location: login.php');
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Email inválido'];
    header('Location: login.php');
    exit;
}

// Verificar alteração de senha
$alterar_senha = !empty($senha_atual) || !empty($senha_nova) || !empty($confirmar_senha_nova);
$senha_hash    = null;

if ($alterar_senha) {
    if (empty($senha_atual)) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Digite sua senha atual para alterar a senha'];
        header('Location: login.php');
        exit;
    }

    // Verifica senha atual no banco
    $stmt_user = $pdo->prepare("SELECT senha FROM usuarios WHERE id_usuario = ?");
    $stmt_user->execute([$id_usuario]);
    $usuario_atual = $stmt_user->fetch(PDO::FETCH_ASSOC);

    if (!$usuario_atual || !password_verify($senha_atual, $usuario_atual['senha'])) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Senha atual incorreta'];
        header('Location: login.php');
        exit;
    }

    if (strlen($senha_nova) < 6) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Nova senha deve ter no mínimo 6 caracteres'];
        header('Location: login.php');
        exit;
    }

    if ($senha_nova !== $confirmar_senha_nova) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'As senhas não coincidem'];
        header('Location: login.php');
        exit;
    }

    $senha_hash = password_hash($senha_nova, PASSWORD_DEFAULT);
}

try {
    // Verifica duplicidade (excluindo o próprio usuário)
    $stmt_check = $pdo->prepare(
        "SELECT id_usuario FROM usuarios
            WHERE (user = ? OR email = ?) AND id_usuario != ?"
    );
    $stmt_check->execute([$user, $email, $id_usuario]);

    if ($stmt_check->fetch()) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Usuário ou email já cadastrado por outro usuário'];
        header('Location: login.php');
        exit;
    }

    // Atualiza no banco
    if ($alterar_senha) {
        $stmt = $pdo->prepare(
            "UPDATE usuarios SET nome = ?, user = ?, email = ?, telefone = ?, senha = ?
                WHERE id_usuario = ?"
        );
        $stmt->execute([$nome, $user, $email, $telefone, $senha_hash, $id_usuario]);
    } else {
        $stmt = $pdo->prepare(
            "UPDATE usuarios SET nome = ?, user = ?, email = ?, telefone = ?
                WHERE id_usuario = ?"
        );
        $stmt->execute([$nome, $user, $email, $telefone, $id_usuario]);
    }

    if ($alterar_senha) {
        // Destrói sessão atual e abre uma nova para guardar o flash
        session_destroy();
        session_start();
        $_SESSION['flash'] = [
            'tipo'     => 'sucesso',
            'mensagem' => 'Perfil atualizado! Faça login novamente com sua nova senha.',
        ];
        header('Location: login.php');
        exit;
    }

    // Atualiza sessão com novos dados
    $_SESSION['usuario']['nome']     = $nome;
    $_SESSION['usuario']['user']     = $user;
    $_SESSION['usuario']['email']    = $email;
    $_SESSION['usuario']['telefone'] = $telefone;

    $_SESSION['flash'] = ['tipo' => 'sucesso', 'mensagem' => 'Perfil atualizado com sucesso!'];
    header('Location: index.php');
    exit;

} catch (PDOException $e) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Erro ao atualizar perfil. Tente novamente.'];
    header('Location: login.php');
    exit;
}