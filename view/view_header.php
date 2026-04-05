<?php
// Sessão já iniciada na página pai (index.php, noticias.php etc.)
// A proteção abaixo garante funcionamento em qualquer contexto:
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$usuarioLogado = isset($_SESSION['usuario']);
$nomeUsuario   = $usuarioLogado ? $_SESSION['usuario']['nome'] : '';
$perfilUsuario = $usuarioLogado ? $_SESSION['usuario']['perfil_id'] : null;
?>

<header id="cabecalho">
    <div id="logo-cabecalho">
        <img src="../img/Marca-F1.svg" alt="Logo F1">
    </div>
    <nav id="menu-principal">
        <a href="../index.php"    class="nav-link" data-page="index.php">Home</a>
        <a href="../noticias.php" class="nav-link" data-page="noticias.php">Notícias</a>
        <a href="../historia.php" class="nav-link" data-page="historia.php">História</a>

        <?php if ($usuarioLogado): ?>
            <?php if ($perfilUsuario == 1): ?>
                <a href="../model/model_admin.php" class="nav-link admin-link">Painel Admin</a>
            <?php endif; ?>
            <span class="nav-link">Olá, <?php echo htmlspecialchars($nomeUsuario); ?></span>
            <a href="actions/logout.php" class="nav-link logout-btn">Sair</a>
        <?php else: ?>
            <a href="../login.php" class="nav-link" data-page="login.php">Login</a>
        <?php endif; ?>
    </nav>
</header>