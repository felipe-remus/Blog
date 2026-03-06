<main class="pagina-login">
    <div class="login-container">
        <!-- Abas -->
        <div class="abas-login">
            <button type="button" class="aba ativa" data-aba="login"><?=$botao_login[0]?></button>
            <button type="button" class="aba" data-aba="registro"><?= $botao_login[1]?></button>
        </div>

        <!-- Login -->
        <form id="form-login" class="formulario ativo">
            <div class="campo">
                <label for="email-login"><?= $label_email?></label>
                <input type="email" id="email-login" required>
            </div>
            <div class="campo">
                <label for="senha-login"><?= $label_senha?></label>
                <input type="password" id="senha-login" required>
            </div>
            <button type="submit" class="botao-de-login"><?=$botao_login[0]?></button>
        </form>

        <!-- Resgistro -->
        <template
            hx-get="template/registro.html"
            hx-target="#registro"
            hx-trigger="load"
            >
        </template>
        <div id="registro"></div>
</main>