<div class="filtros-wrapper"
    hx-get="/proxy.php?p=model_noticia"
    hx-target="#noticia"
    hx-swap="innerHTML"
    hx-trigger="input delay:400ms from:#busca-texto,
                change from:#filtro-categoria,
                change from:#filtro-data-inicio,
                change from:#filtro-data-fim"
    hx-include="#busca-texto, #filtro-categoria, #filtro-data-inicio, #filtro-data-fim">

    <div class="busca-container">
        <input type="text"
            id="busca-texto"
            name="busca-texto"
            placeholder="Pesquisar Noticias..."
            value="<?= htmlspecialchars($_GET['busca-texto'] ?? '') ?>">
    </div>

    <!-- Filtro por categoria -->
    <div class="filtro-container">
        <select id="filtro-categoria" name="filtro-categoria" class="filtro-select">
            <option value="">Selecione a Categoria</option>
            <?php foreach ($categorias as $chave => $valor): ?>
                <option value="<?= htmlspecialchars($valor) ?>"
                    <?= (isset($_GET['filtro-categoria']) && $_GET['filtro-categoria'] === $valor) ? 'selected' : '' ?>>
                    <?= $valor ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <!-- Filtro por data -->
    <div class="filtro-data-container">
        <label>Filtrar por Data</label>
        <div class="filtro-data-inputs">
            <div class="filtro-data-grupo">
                <span>De</span>
                <input type="date"
                    id="filtro-data-inicio"
                    name="filtro-data-inicio"
                    class="filtro-data"
                    value="<?= htmlspecialchars($_GET['filtro-data-inicio'] ?? '') ?>">
            </div>
            <div class="filtro-data-grupo">
                <span>Até</span>
                <input type="date"
                    id="filtro-data-fim"
                    name="filtro-data-fim"
                    class="filtro-data"
                    value="<?= htmlspecialchars($_GET['filtro-data-fim'] ?? '') ?>">
            </div>
        </div>
    </div>
</div>