// ========================================
// TAGS.JS — Gerenciador de tags de publicação
// Depende de: globals.js  (selecoes, limites, limpezaEmAndamento)
// ========================================

// ── Helpers ────────────────────────────────────────────────────────────────
function getTipoTag(checkbox) {
    return checkbox.dataset.tipo || null;
}

function encontrarCheckbox(valor, tipo) {
    return document.querySelector(
        `.checkbox-tag input[type="checkbox"][value="${valor}"][data-tipo="${tipo}"]`
    );
}

// ── Contadores por aba ─────────────────────────────────────────────────────
function atualizarContadores() {
    Object.keys(DADOS_CATEGORIAS).forEach(catKey => {
        [
            { grupo: 'equipes', tipo: 'equipe' },
            { grupo: 'pilotos', tipo: 'piloto' },
            { grupo: 'pistas',  tipo: 'pista'  },
        ].forEach(({ grupo, tipo }) => {
            const el = document.getElementById(`count-${grupo}-${catKey}`);
            if (!el) return;
            const count = document.querySelectorAll(
                `#aba-${catKey} input[data-tipo="${tipo}"]:checked`
            ).length;
            el.textContent = `(${count}/${limites[tipo]})`;
        });
    });
}

// ── Botão "Limpar todas" ───────────────────────────────────────────────────
function atualizarBotaoLimpar() {
    const btn = document.getElementById('btn-limpar-todas');
    if (!btn) return;
    btn.style.display = Object.values(selecoes).some(s => s.size > 0) ? 'block' : 'none';
}

function limparTodasTags() {
    limpezaEmAndamento = true;

    document.querySelectorAll('.checkbox-tag input[type="checkbox"]:checked')
        .forEach(cb => { cb.checked = false; });

    Object.keys(selecoes).forEach(tipo => selecoes[tipo].clear());

    const tagsSel = document.querySelector('.tags-selecionadas');
    if (tagsSel) tagsSel.innerHTML = '';

    document.querySelectorAll('.tag-selecionado-visual')
        .forEach(el => el.classList.remove('tag-selecionado-visual'));

    atualizarContadores();
    atualizarBotaoLimpar();

    const aviso = document.getElementById('aviso-tags');
    if (aviso) aviso.style.display = 'none';

    setTimeout(() => { limpezaEmAndamento = false; }, 50);
}

// ── Clique no botão limpar ─────────────────────────────────────────────────
document.addEventListener('click', e => {
    if (e.target.id === 'btn-limpar-todas' || e.target.closest('#btn-limpar-todas')) {
        limparTodasTags();
    }
});

// ── Seleção / deseleção de tags ────────────────────────────────────────────
document.addEventListener('change', e => {
    if (e.target.type !== 'checkbox' || !e.target.closest('.checkbox-tag')) return;
    if (limpezaEmAndamento) return;

    const checkbox   = e.target;
    const label      = checkbox.closest('.checkbox-tag');
    const tipo       = getTipoTag(checkbox);
    const valor      = checkbox.value;
    const tagPreview = label.querySelector('.tag-preview');
    const tagsSel    = document.querySelector('.tags-selecionadas');
    const aviso      = document.getElementById('aviso-tags');

    if (!tipo || !tagsSel) return;

    if (checkbox.checked) {
        // Já selecionado — desfaz
        if (selecoes[tipo].has(valor)) { checkbox.checked = false; return; }

        // Limite atingido
        if (selecoes[tipo].size >= limites[tipo]) {
            checkbox.checked = false;
            if (aviso) {
                const msgs = {
                    categoria: '⚠️ Só 1 categoria permitida.',
                    equipe:    `⚠️ Máximo de ${limites.equipe} equipes atingido.`,
                    piloto:    `⚠️ Máximo de ${limites.piloto} pilotos atingido.`,
                    pista:     `⚠️ Máximo de ${limites.pista} pistas atingido.`,
                };
                aviso.textContent = msgs[tipo];
                aviso.style.cssText = 'display:block;color:#d32f2f;background:#ffebee;padding:0.5rem;border-radius:4px;border-left:3px solid #d32f2f;font-size:0.9rem';
                setTimeout(() => { aviso.style.display = 'none'; }, 3500);
            }
            return;
        }

        selecoes[tipo].add(valor);

        // Cria o clone da tag na área de selecionadas
        const clone = tagPreview.cloneNode(true);
        clone.classList.add('tag-selecionada');
        clone.classList.remove('tag-preview');
        clone.dataset.tagValue = valor;
        clone.dataset.tagTipo  = tipo;
        clone.style.cursor     = 'pointer';

        const _deselecionar = () => {
            const cb = encontrarCheckbox(valor, tipo);
            if (cb?.checked) {
                cb.checked = false;
                cb.dispatchEvent(new Event('change', { bubbles: true }));
            }
        };

        clone.onclick = ev => {
            if (ev.target.classList.contains('remove-tag')) return;
            ev.stopPropagation();
            _deselecionar();
        };

        const btnRemover = document.createElement('span');
        btnRemover.className = 'remove-tag';
        btnRemover.innerHTML = '&times;';
        btnRemover.style.cssText = 'margin-left:0.4rem;font-weight:bold;cursor:pointer;opacity:0.7';
        btnRemover.onclick = ev => { ev.stopPropagation(); _deselecionar(); };

        clone.appendChild(btnRemover);
        tagsSel.appendChild(clone);
        label.classList.add('tag-selecionado-visual');

    } else {
        selecoes[tipo].delete(valor);
        tagsSel.querySelectorAll('.tag-selecionada').forEach(tag => {
            if (tag.dataset.tagValue === valor && tag.dataset.tagTipo === tipo) tag.remove();
        });
        label.classList.remove('tag-selecionado-visual');
    }

    atualizarContadores();
    atualizarBotaoLimpar();
    if (aviso) aviso.style.display = 'none';
});