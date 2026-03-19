<?php
//Conectar 
$pdo = new PDO("sqlite:banco/blog_racing.db");

$nome = $_POST['nome_registro'];
$user = $_POST['user_registro'];
$email = $_POST['email_registro'];
$telefone = $_POST['fone_registro'];
$senha = $_POST['senha_registro'];
$confirmar_senha = $_POST['confirmar_senha_registro'];

$sql_registro = "
INSERT INTO usuarios (nome, user, email, telefone, senha, perfil_id)
VALUES (:nome_registro, :user_registro, :email_registro, :fone_registro, :senha_registro, 2);";

// Prepared Statement
$stmt = $pdo->prepare($sql_registro);

// Passando os valores
$stmt->bindValue(':nome_registro', $nome);
$stmt->bindValue(':user_registro', $user);
$stmt->bindValue(':email_registro', $email);
$stmt->bindValue(':fone_registro', $telefone);
$stmt->bindValue(':senha_registro', $senha);

// Executa o comando
$stmt->execute();

// Pega o ID
$id = $pdo->lastInsertId();

require "login.html";
?>