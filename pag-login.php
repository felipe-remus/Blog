<?php
session_start();

// Conexão
$string_conexao = 'sqlite:banco/blog_racing.db';
$con = new PDO($string_conexao);

$erro = '';
$sucesso = '';

// ========================================
// PROCESSAR LOGIN
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao_login'])) {
    $usuario = trim($_POST['usuario_login'] ?? '');
    $senha = trim($_POST['senha_login'] ?? '');

    if (empty($usuario) || empty($senha)) {
        $erro = 'Preencha todos os campos!';
    } else {
        try {
            // Buscar usuário por email ou username
            $sql = "
                SELECT u.id_usuario, u.nome, u.user, u.email, u.senha, p.nome_perfil
                FROM usuarios u
                JOIN perfis p ON u.perfil_id = p.id_perfil
                WHERE u.user = ? OR u.email = ?
                LIMIT 1";
            
            $stmt = $con->prepare($sql);
            $stmt->execute([$usuario, $usuario]);
            $dados = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$dados) {
                $erro = 'Usuário ou senha incorretos!';
            } elseif ($dados['senha'] !== $senha) {
                // TODO: Usar password_hash() e password_verify() em produção
                $erro = 'Usuário ou senha incorretos!';
            } else {
                // Login bem-sucedido
                $_SESSION['id_usuario'] = $dados['id_usuario'];
                $_SESSION['usuario'] = $dados['user'];
                $_SESSION['nome'] = $dados['nome'];
                $_SESSION['email'] = $dados['email'];
                $_SESSION['perfil'] = $dados['nome_perfil'];

                // Redirecionar para admin se for admin
                if ($dados['nome_perfil'] === 'Admin') {
                    header('Location: admin.php');
                } else {
                    header('Location: index.php');
                }
                exit;
            }
        } catch (PDOException $e) {
            $erro = 'Erro ao processar login. Tente novamente.';
        }
    }
}

// ========================================
// PROCESSAR REGISTRO
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao_registro'])) {
    $nome = trim($_POST['nome_registro'] ?? '');
    $user = trim($_POST['user_registro'] ?? '');
    $email = trim($_POST['email_registro'] ?? '');
    $telefone = trim($_POST['fone_registro'] ?? '');
    $senha = trim($_POST['senha_registro'] ?? '');
    $confirmar_senha = trim($_POST['confirmar_senha_registro'] ?? '');

    // Validações básicas
    if (empty($nome) || empty($user) || empty($email) || empty($telefone) || empty($senha)) {
        $erro = 'Preencha todos os campos obrigatórios!';
    } elseif (strlen($user) < 3) {
        $erro = 'O nome de usuário deve ter no mínimo 3 caracteres!';
    } elseif (strlen($senha) < 6) {
        $erro = 'A senha deve ter no mínimo 6 caracteres!';
    } elseif ($senha !== $confirmar_senha) {
        $erro = 'As senhas não conferem!';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erro = 'Email inválido!';
    } else {
        try {
            // Verificar se usuário já existe
            $sql_check = "SELECT COUNT(*) as total FROM usuarios WHERE user = ? OR email = ?";
            $stmt_check = $con->prepare($sql_check);
            $stmt_check->execute([$user, $email, $cpf]);
            $resultado = $stmt_check->fetch(PDO::FETCH_ASSOC);

            if ($resultado['total'] > 0) {
                $erro = 'Este usuário, email ou CPF já está registrado!';
            } else {
                // Inserir novo usuário
                $sql_registro = "
                    INSERT INTO usuarios (nome, user, email, cpf, telefone, senha, perfil_id)
                    VALUES (?, ?, ?, ?, ?, ?, 2)";

                $stmt = $con->prepare($sql_registro);
                $stmt->execute([$nome, $user, $email, $cpf, $telefone, $senha]);

                $sucesso = 'Conta criada com sucesso! Faça login para continuar.';
                
                // Limpar formulário
                $nome = $user = $email = $telefone = $senha = $confirmar_senha = '';
            }
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'UNIQUE constraint failed') !== false) {
                $erro = 'Este usuário ou email já está registrado!';
            } else {
                $erro = 'Erro ao criar conta. Tente novamente mais tarde.';
            }
        }
    }
}

require "views/pag-login-view.php";
?>