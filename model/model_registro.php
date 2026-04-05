<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Conexão
$pdo = new PDO("sqlite:../banco/blog_racing.db");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../login.php?aba=registro');
    exit;
}

$nome            = trim($_POST['nome_registro']            ?? '');
$user            = trim($_POST['user_registro']            ?? '');
$email           = trim($_POST['email_registro']           ?? '');
$telefone        = trim($_POST['fone_registro']            ?? '');
$senha           =      $_POST['senha_registro']           ?? '';
$confirmar_senha =      $_POST['confirmar_senha_registro'] ?? '';

// Validações
if (empty($nome)) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Nome é obrigatório'];
    header('Location: ../login.php?aba=registro');
    exit;
}

if (empty($user)) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Nome de usuário é obrigatório'];
    header('Location: ../login.php?aba=registro');
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Email inválido'];
    header('Location: ../login.php?aba=registro');
    exit;
}

if (strlen($senha) < 6) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Senha deve ter no mínimo 6 caracteres'];
    header('Location: ../login.php?aba=registro');
    exit;
}

if ($senha !== $confirmar_senha) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'As senhas não coincidem'];
    header('Location: ../login.php?aba=registro');
    exit;
}

try {
    // Verifica duplicidade
    $stmt_check = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE user = ? OR email = ?");
    $stmt_check->execute([$user, $email]);
    if ($stmt_check->fetch()) {
        $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Usuário ou email já cadastrado'];
        header('Location: ../login.php?aba=registro');
        exit;
    }

    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare(
        "INSERT INTO usuarios (nome, user, email, telefone, senha, perfil_id)
        VALUES (?, ?, ?, ?, ?, 2)"
    );
    $stmt->execute([$nome, $user, $email, $telefone, $senha_hash]);

    $_SESSION['flash'] = ['tipo' => 'sucesso', 'mensagem' => 'Conta criada com sucesso! Faça login.'];
    header('Location: ../login.php');
    exit;

} catch (PDOException $e) {
    $_SESSION['flash'] = ['tipo' => 'erro', 'mensagem' => 'Erro ao criar conta. Tente novamente.'];
    header('Location: ../login.php?aba=registro');
    exit;
}