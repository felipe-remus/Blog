<!-- Resgistro -->
<form id="form-registro" class="formulario">
    <div class="campo">
        <label for="nome-registro"><?= $label_nome?></label>
        <input type="text" id="nome-registro" required>
    </div>
    <div class="campo">
        <label for="usuario-registro"><?= $label_usuario?></label>
        <input type="text" id="usuario-registro" required>
    </div>
    <div class="campo">
        <label for="email-registro"><?= $label_email?></label>
        <input type="email" id="email-registro" required>
    </div>

    <!-- Linha com CPF e Telefone -->
    <div class="campo-linha">
        <div class="subcampo">
            <label for="cpf-registro"><?= $label_cpf?></label>
            <input type="text" id="cpf-registro" placeholder="000.000.000.00">
        </div>
        <div class="subcampo">
            <label for="telefone-registro"><?= $label_telefone?></label>
            <input type="tel" id="telefone-registro" placeholder="(00) 00000-0000">
        </div>
    </div>
    <script>
        // Formatação CPF
        document.getElementById('cpf-registro').addEventListener('input', function(e) {
            var value = e.target.value;
            var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                                .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                                .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                                .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                                .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
            e.target.value = cpfPattern;
        });

        //Formatação Numero
        document.getElementById('telefone-registro').addEventListener('input', function(e) {
            var value = e.target.value;
            var telPattern = value.replace(/\D/g, '')
                                .replace(/(\d{2})(\d)/, '($1) $2')
                                .replace(/(\(\d{2}\)\s\d{5})(\d)/, '$1-$2')
                                .replace(/(-\d{4})\d+?$/, '$1');        
            e.target.value = telPattern;
            });
    </script>

    <div class="campo">
        <label for="senha-registro"><?= $label_senha?></label>
        <input type="password" id="senha-registro" required>
    </div>
    <div class="campo">
        <label for="confirmar-senha"><?= $label_confirmar_senha?></label>
        <input type="password" id="confirmar-senha" required>
    </div>
    <button type="submit" class="botao-de-login"><?= $label_criar_conta?></button>
</form>