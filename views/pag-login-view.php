<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/filtros.css">
<link rel="stylesheet" href="../css/footer.css">
<link rel="stylesheet" href="../css/header.css">
<link rel="stylesheet" href="../css/historia.css">
<link rel="stylesheet" href="../css/login.css">
<link rel="stylesheet" href="../css/noticias.css">
<link rel="stylesheet" href="../css/paginacao.css">
<link rel="stylesheet" href="../css/publicar.css">
<link rel="stylesheet" href="../css/slider.css">
<link rel="stylesheet" href="../css/tags.css">

<script src="../script/edicao-noticia.js" defer></script>
<script src="../script/header.js" defer></script>
<script src="../script/historia.js" defer></script>
<script src="../script/modal-noticia.js" defer></script>
<script src="../script/publicar.js" defer></script>
<script src="../script/slider.js" defer></script>
<script src="../script/tabs.js" defer></script>

<main class="pagina-login">
    <div class="login-container">
        <!-- Abas -->
        <div class="abas-login">
            <button type="button" class="aba ativa" data-aba="login">Entrar</button>
            <button type="button" class="aba" data-aba="registro">Criar Conta</button>
        </div>

        <!-- Login -->
        <form id="form-login" class="formulario ativo">
            <div class="campo">
                <label for="email-login">Email ou Nome de Usuário</label>
                <input id="email-login" required>
            </div>
            <div class="campo">
                <label for="senha-login">Senha</label>
                <input type="password" id="senha-login" required>
            </div>
            <button type="submit" class="botao-de-login">Entrar</button>
        </form>

        <!-- Registro -->
        <form id="form-registro" class="formulario" action="../pag-login.php" method="POST">
            <div class="campo">
                <label for="nome-registro">Nome</label>
                <input name="nome_registro" type="text" id="nome-registro" required>
            </div>
            <div class="campo">
                <label for="usuario-registro">Nome de Usuário</label>
                <input name="user_registro" type="text" id="usuario-registro" required>
            </div>
            <div class="campo">
                <label for="email-registro">Email</label>
                <input name="email_registro" type="email" id="email-registro" required>
            </div>

            <div class="campo-linha">
                <div class="subcampo">
                    <label for="telefone-registro">Telefone</label>
                    <input name="fone_registro" type="tel" id="telefone-registro" placeholder="(00) 00000-0000">
                </div>
            </div>
            <script>
                document.getElementById('telefone-registro').addEventListener('input', function(e) {
                    var value = e.target.value;
                    var telPattern = value.replace(/\D/g, '')
                                        .replace(/(\d{2})(\d)/, '($1) $2')
                                        .replace(/(\(\d{2}\) \s\d{5})(\d)/, '$1-$2')
                                        .replace(/(-\d{4})\d+?$/, '$1');        
                    e.target.value = telPattern;
                });
            </script>
            <div class="campo">
                <label for="senha-registro">Senha</label>
                <input name="senha_registro" type="password" id="senha-registro" required>
            </div>
            <div class="campo">
                <label for="confirmar-senha">Confirmar Senha</label>
                <input name="confirmar_senha_registro" type="password" id="confirmar-senha" required>
            </div>
            <button type="submit" class="botao-de-login">Criar Conta</button>
        </form>
    </div>
</main>