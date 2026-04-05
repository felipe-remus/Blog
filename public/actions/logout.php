<?php
// Inicia sessão
session_start();

// Destrói a sessão
session_destroy();

// Redireciona para home ou login
header('Location: ../index.php');
exit;
?>