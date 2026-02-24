// ========================================
// GERADOR-ABAS.JS — Gerador de abas do formulário de publicação
// Depende de: dados-categorias.js
// ========================================

// ── Geração de HTML por categoria ─────────────────────────────────────────
function criarAbaHTML(catKey) {
    const dados = DADOS_CATEGORIAS[catKey];
    if (!dados) return '';

    const checkCat = `
        <div class="grupo-tags grupo-categoria-aba">
            <span class="subtitulo-tag">Categoria:</span>
            <label class="checkbox-tag">
                <input type="checkbox" name="categoria" value="${catKey}" data-tipo="categoria">
                <span class="tag tag-preview categoria">${dados.label}</span>
            </label>
        </div>`;

    const checkEquipes = dados.equipes.length ? `
        <div class="collapsible-section">
            <h3 class="collapsible-header" data-target="equipes-${catKey}">
                Equipes <span class="tag-count" id="count-equipes-${catKey}">(0/4)</span>
            </h3>
            <div id="equipes-${catKey}" class="collapsible-content">
                <div class="grupo-tags">
                    ${dados.equipes.map(e => `
                        <label class="checkbox-tag">
                            <input type="checkbox" value="${e.value}" data-tipo="equipe" data-cat="${catKey}">
                            <span class="tag tag-preview ${e.classe || 'equipe'}">${e.label}</span>
                        </label>`).join('')}
                </div>
            </div>
        </div>` : '';

    const checkPilotos = dados.pilotos.length ? `
        <div class="collapsible-section">
            <h3 class="collapsible-header" data-target="pilotos-${catKey}">
                Pilotos <span class="tag-count" id="count-pilotos-${catKey}">(0/4)</span>
            </h3>
            <div id="pilotos-${catKey}" class="collapsible-content">
                <div class="grupo-tags">
                    ${dados.pilotos.map(p => `
                        <label class="checkbox-tag">
                            <input type="checkbox" value="${p.value}" data-tipo="piloto" data-cat="${catKey}">
                            <span class="tag tag-preview piloto">${p.label}</span>
                        </label>`).join('')}
                </div>
            </div>
        </div>` : '';

    const checkPistas = dados.pistas.length ? `
        <div class="collapsible-section">
            <h3 class="collapsible-header" data-target="pistas-${catKey}">
                Pistas <span class="tag-count" id="count-pistas-${catKey}">(0/4)</span>
            </h3>
            <div id="pistas-${catKey}" class="collapsible-content">
                <div class="grupo-tags">
                    ${dados.pistas.map(p => `
                        <label class="checkbox-tag">
                            <input type="checkbox" value="${p.value}" data-tipo="pista" data-cat="${catKey}">
                            <span class="tag tag-preview pista">${p.label}</span>
                        </label>`).join('')}
                </div>
            </div>
        </div>` : '';

    return `
        <div class="aba-painel" id="aba-${catKey}" style="display:none;" role="tabpanel">
            ${checkCat}
            ${checkEquipes}
            ${checkPilotos}
            ${checkPistas}
        </div>`;
}

function renderizarAbas() {
    const container = document.getElementById('abas-conteudo');
    if (!container) return;
    container.innerHTML = Object.keys(DADOS_CATEGORIAS).map(criarAbaHTML).join('');
    // Exibe a primeira aba por padrão
    const primeiraAba = container.querySelector('.aba-painel');
    if (primeiraAba) primeiraAba.style.display = 'block';
}

// ── Troca de aba (event delegation) ───────────────────────────────────────
document.addEventListener('click', e => {
    const btn = e.target.closest('.aba-btn');
    if (!btn) return;

    const catKey = btn.dataset.aba;

    document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('aba-ativa'));
    btn.classList.add('aba-ativa');

    document.querySelectorAll('.aba-painel').forEach(p => p.style.display = 'none');
    const painel = document.getElementById(`aba-${catKey}`);
    if (painel) painel.style.display = 'block';
});

// ── Collapsible sections ───────────────────────────────────────────────────
document.addEventListener('click', e => {
    if (!e.target.classList.contains('collapsible-header')) return;
    const targetId = e.target.getAttribute('data-target');
    const content  = document.getElementById(targetId);
    if (content) {
        content.classList.toggle('show');
        e.target.classList.toggle('active');
    }
});