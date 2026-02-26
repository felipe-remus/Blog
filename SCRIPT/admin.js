// ========================================
// ADMIN.JS — Gerenciamento de Dados (Frontend)
// ========================================

// =============================================
// BASE DE DADOS (cópia em memória)
// Quando o backend estiver pronto, substituir
// pelo retorno das chamadas à API.
// =============================================
const dados = {
    f1: {
        label: 'Fórmula 1',
        equipes: [
            { value: 'alpine',       label: 'Alpine' },
            { value: 'astonmartin',  label: 'Aston Martin' },
            { value: 'audi',         label: 'Audi' },
            { value: 'cadillac',     label: 'Cadillac' },
            { value: 'ferrari',      label: 'Ferrari' },
            { value: 'haas',         label: 'Haas' },
            { value: 'mclaren',      label: 'McLaren' },
            { value: 'mercedes',     label: 'Mercedes' },
            { value: 'redbull',      label: 'Red Bull' },
            { value: 'racing-bulls', label: 'Racing Bulls' },
            { value: 'williams',     label: 'Williams' },
        ],
        pilotos: [
            { value: 'alex-albon',         label: 'Alex Albon' },
            { value: 'arvid-lindblad',     label: 'Arvid Lindblad' },
            { value: 'carlos-sainz',       label: 'Carlos Sainz' },
            { value: 'charles-leclerc',    label: 'Charles Leclerc' },
            { value: 'esteban-ocon',       label: 'Esteban Ocon' },
            { value: 'fernando-alonso',    label: 'Fernando Alonso' },
            { value: 'franco-colapinto',   label: 'Franco Colapinto' },
            { value: 'george-russell',     label: 'George Russell' },
            { value: 'gabriel-bortoleto',  label: 'Gabriel Bortoleto' },
            { value: 'isaac-hadjar',       label: 'Isaac Hadjar' },
            { value: 'kimi-antonelli',     label: 'Kimi Antonelli' },
            { value: 'lando-norris',       label: 'Lando Norris' },
            { value: 'lewis-hamilton',     label: 'Lewis Hamilton' },
            { value: 'liam-lawson',        label: 'Liam Lawson' },
            { value: 'lance-stroll',       label: 'Lance Stroll' },
            { value: 'max-verstappen',     label: 'Max Verstappen' },
            { value: 'nico-hulkenberg',    label: 'Nico Hülkenberg' },
            { value: 'oliver-bearman',     label: 'Oliver Bearman' },
            { value: 'oscar-piastri',      label: 'Oscar Piastri' },
            { value: 'pierre-gasly',       label: 'Pierre Gasly' },
            { value: 'sergio-perez',       label: 'Sergio Pérez' },
            { value: 'valtteri-bottas',    label: 'Valtteri Bottas' },
        ],
        pistas: [
            { value: 'australia',      label: 'Austrália' },
            { value: 'china',          label: 'China' },
            { value: 'japao',          label: 'Japão' },
            { value: 'barein',         label: 'Barein' },
            { value: 'arabia-saudita', label: 'Arábia Saudita' },
            { value: 'miami',          label: 'Miami' },
            { value: 'canada',         label: 'Canadá' },
            { value: 'monaco',         label: 'Mônaco' },
            { value: 'barcelona',      label: 'Barcelona' },
            { value: 'austria',        label: 'Áustria' },
            { value: 'inglaterra',     label: 'Inglaterra' },
            { value: 'belgica',        label: 'Bélgica' },
            { value: 'hungria',        label: 'Hungria' },
            { value: 'holanda',        label: 'Holanda' },
            { value: 'monza',          label: 'Monza' },
            { value: 'madrid',         label: 'Madri' },
            { value: 'azerbaijao',     label: 'Azerbaijão' },
            { value: 'singapura',      label: 'Singapura' },
            { value: 'austin',         label: 'Austin' },
            { value: 'mexico',         label: 'México' },
            { value: 'brasil',         label: 'Brasil' },
            { value: 'las-vegas',      label: 'Las Vegas' },
            { value: 'qatar',          label: 'Catar' },
            { value: 'abu-dhabi',      label: 'Abu Dhabi' },
        ],
    },

    f2: {
        label: 'Fórmula 2',
        equipes: [],
        pilotos: [],
        pistas: [
            { value: 'barein',         label: 'Barein' },
            { value: 'arabia-saudita', label: 'Arábia Saudita' },
            { value: 'australia',      label: 'Austrália' },
            { value: 'miami',          label: 'Miami' },
            { value: 'monaco',         label: 'Mônaco' },
            { value: 'barcelona',      label: 'Barcelona' },
            { value: 'austria',        label: 'Áustria' },
            { value: 'inglaterra',     label: 'Inglaterra' },
            { value: 'hungria',        label: 'Hungria' },
            { value: 'belgica',        label: 'Bélgica' },
            { value: 'monza',          label: 'Monza' },
            { value: 'azerbaijao',     label: 'Azerbaijão' },
            { value: 'singapura',      label: 'Singapura' },
            { value: 'austin',         label: 'Austin' },
            { value: 'abu-dhabi',      label: 'Abu Dhabi' },
        ],
    },

    f3: {
        label: 'Fórmula 3',
        equipes: [],
        pilotos: [],
        pistas: [
            { value: 'barein',     label: 'Barein' },
            { value: 'australia',  label: 'Austrália' },
            { value: 'monaco',     label: 'Mônaco' },
            { value: 'barcelona',  label: 'Barcelona' },
            { value: 'austria',    label: 'Áustria' },
            { value: 'inglaterra', label: 'Inglaterra' },
            { value: 'hungria',    label: 'Hungria' },
            { value: 'belgica',    label: 'Bélgica' },
            { value: 'monza',      label: 'Monza' },
            { value: 'abu-dhabi',  label: 'Abu Dhabi' },
        ],
    },

    f4: {
        label: 'Fórmula 4',
        equipes: [],
        pilotos: [],
        pistas: [],
    },

    f1academy: {
        label: 'F1 Academy',
        equipes: [],
        pilotos: [],
        pistas: [
            { value: 'barein',     label: 'Barein' },
            { value: 'miami',      label: 'Miami' },
            { value: 'monaco',     label: 'Mônaco' },
            { value: 'austria',    label: 'Áustria' },
            { value: 'inglaterra', label: 'Inglaterra' },
            { value: 'holanda',    label: 'Holanda' },
            { value: 'singapura',  label: 'Singapura' },
            { value: 'austin',     label: 'Austin' },
            { value: 'abu-dhabi',  label: 'Abu Dhabi' },
        ],
    },

    fe: {
        label: 'Fórmula E',
        equipes: [
            { value: 'andretti-fe',        label: 'Andretti Formula E' },
            { value: 'citroen-racing',     label: 'Citroën Racing' },
            { value: 'ds-penske',          label: 'DS Penske' },
            { value: 'envision-racing',    label: 'Envision Racing' },
            { value: 'jaguar-tcs-racing',  label: 'Jaguar TCS Racing' },
            { value: 'lola-yamaha-abt-fe', label: 'Lola Yamaha ABT FE' },
            { value: 'mahindra-racing',    label: 'Mahindra Racing' },
            { value: 'nissan-formula-e',   label: 'Nissan Formula E' },
            { value: 'porsche-formula-e',  label: 'Porsche Formula E' },
        ],
        pilotos: [
            { value: 'antonio-felix-da-costa', label: 'António Felix da Costa' },
            { value: 'dan-ticktum',            label: 'Dan Ticktum' },
            { value: 'edoardo-mortara',        label: 'Edoardo Mortara' },
            { value: 'felipe-drugovich',       label: 'Felipe Drugovich' },
            { value: 'jake-dennis',            label: 'Jake Dennis' },
            { value: 'jean-eric-vergne',       label: 'Jean-Éric Vergne' },
            { value: 'joel-eriksson',          label: 'Joel Eriksson' },
            { value: 'lucas-di-grassi',        label: 'Lucas Di Grassi' },
            { value: 'maximilian-gunther',     label: 'Maximilian Günther' },
            { value: 'mitch-evans',            label: 'Mitch Evans' },
            { value: 'nico-muller',            label: 'Nico Müller' },
            { value: 'nick-cassidy',           label: 'Nick Cassidy' },
            { value: 'norman-nato',            label: 'Norman Nato' },
            { value: 'nyck-de-vries',          label: 'Nyck de Vries' },
            { value: 'oliver-rowland',         label: 'Oliver Rowland' },
            { value: 'pascal-wehrlein',        label: 'Pascal Wehrlein' },
            { value: 'pepe-marti',             label: 'Pepe Martí' },
            { value: 'sebastien-buemi',        label: 'Sébastien Buemi' },
            { value: 'taylor-barnard',         label: 'Taylor Barnard' },
            { value: 'zane-maloney',           label: 'Zane Maloney' },
        ],
        pistas: [
            { value: 'sao-paulo',   label: 'São Paulo' },
            { value: 'mexico-city', label: 'Mexico City' },
            { value: 'miami',       label: 'Miami' },
            { value: 'diriyah',     label: 'Diriyah' },
            { value: 'madrid',      label: 'Madrid' },
            { value: 'berlin',      label: 'Berlin' },
            { value: 'monaco',      label: 'Monaco' },
            { value: 'shanghai',    label: 'Shanghai' },
            { value: 'tokyo',       label: 'Tokyo' },
            { value: 'london',      label: 'London' },
        ],
    },

    indy: {
        label: 'IndyCar Series',
        equipes: [
            { value: 'aj-foyt-enterprises',           label: 'A.J. Foyt Enterprises' },
            { value: 'andretti-global',               label: 'Andretti Global' },
            { value: 'arrow-mclaren',                 label: 'Arrow McLaren' },
            { value: 'chip-ganassi-racing',           label: 'Chip Ganassi Racing' },
            { value: 'dale-coyne-racing',             label: 'Dale Coyne Racing' },
            { value: 'dreyer-reinbold-racing',        label: 'Dreyer & Reinbold Racing' },
            { value: 'ed-carpenter-racing',           label: 'Ed Carpenter Racing' },
            { value: 'juncos-hollinger-racing',       label: 'Juncos Hollinger Racing' },
            { value: 'meyer-shank-racing',            label: 'Meyer Shank Racing' },
            { value: 'rahal-letterman-lanigan-racing',label: 'Rahal Letterman Lanigan Racing' },
            { value: 'team-penske',                   label: 'Team Penske' },
        ],
        pilotos: [
            { value: 'alex-palou',          label: 'Alex Palou' },
            { value: 'alexander-rossi',     label: 'Alexander Rossi' },
            { value: 'caio-collet',         label: 'Caio Collet' },
            { value: 'christian-lundgaard', label: 'Christian Lundgaard' },
            { value: 'david-malukas',       label: 'David Malukas' },
            { value: 'dennis-hauger',       label: 'Dennis Hauger' },
            { value: 'ed-carpenter',        label: 'Ed Carpenter' },
            { value: 'josef-newgarden',     label: 'Josef Newgarden' },
            { value: 'kyle-kirkwood',       label: 'Kyle Kirkwood' },
            { value: 'marcus-ericsson',     label: 'Marcus Ericsson' },
            { value: 'mick-schumacher',     label: 'Mick Schumacher' },
            { value: 'nolan-siegel',        label: 'Nolan Siegel' },
            { value: 'pato-oward',          label: "Pato O'Ward" },
            { value: 'romain-grosjean',     label: 'Romain Grosjean' },
            { value: 'ryan-hunter-reay',    label: 'Ryan Hunter-Reay' },
            { value: 'santino-ferrucci',    label: 'Santino Ferrucci' },
            { value: 'scott-dixon',         label: 'Scott Dixon' },
            { value: 'scott-mclaughlin',    label: 'Scott McLaughlin' },
            { value: 'will-power',          label: 'Will Power' },
        ],
        pistas: [
            { value: 'st-petersburg',                  label: 'St. Petersburg' },
            { value: 'phoenix-raceway',                label: 'Phoenix Raceway' },
            { value: 'texas-motor-speedway',           label: 'Texas Motor Speedway' },
            { value: 'barber-motorsports-park',        label: 'Barber Motorsports Park' },
            { value: 'long-beach',                     label: 'Long Beach' },
            { value: 'indianapolis-motor-speedway',    label: 'Indianapolis Motor Speedway' },
            { value: 'detroit',                        label: 'Detroit' },
            { value: 'chicago-street-course',          label: 'Chicago Street Course' },
            { value: 'road-america',                   label: 'Road America' },
            { value: 'mid-ohio-sports-car-course',     label: 'Mid-Ohio Sports Car Course' },
            { value: 'nashville-superspeedway',        label: 'Nashville Superspeedway' },
            { value: 'portland-international-raceway', label: 'Portland International Raceway' },
            { value: 'exhibition-place',               label: 'Exhibition Place (Toronto)' },
            { value: 'milwaukee-mile',                 label: 'Milwaukee Mile' },
            { value: 'weathertech-raceway-laguna-seca',label: 'WeatherTech Raceway Laguna Seca' },
        ],
    },
};

// =============================================
// CONSTANTES
// =============================================
const SECOES = [
    { key: 'equipes', label: 'Equipes',  singular: 'equipe' },
    { key: 'pilotos', label: 'Pilotos',  singular: 'piloto' },
    { key: 'pistas',  label: 'Pistas',   singular: 'pista'  },
];

// =============================================
// UTILS
// =============================================

/** Gera um slug a partir de um texto */
function slugify(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

/** Normaliza texto para comparação (sem acento, minúsculo) */
function normalizar(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

/** Envolve trechos que batem com o filtro em <mark> */
function destacar(label, termo) {
    if (!termo) return label;
    const re = new RegExp(`(${termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return label.replace(re, '<mark>$1</mark>');
}

/** Exibe toast de notificação */
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

// =============================================
// FILTRO
// =============================================

/**
 * Filtra a lista visualmente conforme o texto digitado.
 * Itens que batem ficam visíveis e com destaque; os demais são ocultados.
 */
function filtrarLista(catKey, secKey) {
    const input = document.getElementById(`input-label-${catKey}-${secKey}`);
    const hint  = document.getElementById(`hint-${catKey}-${secKey}`);
    const termo = normalizar(input.value.trim());

    const listEl = document.getElementById(`list-${catKey}-${secKey}`);
    const rows   = listEl.querySelectorAll('.item-row');

    if (!termo) {
        // Sem filtro: mostra tudo, sem destaque
        input.classList.remove('filtrando');
        hint.textContent = '';
        hint.classList.remove('visivel');
        rows.forEach(row => {
            row.classList.remove('oculto', 'destaque');
            // Restaura label original (sem <mark>)
            const labelEl = row.querySelector('.item-label');
            if (labelEl) labelEl.innerHTML = labelEl.textContent;
        });
        return;
    }

    input.classList.add('filtrando');

    let visiveis = 0;
    rows.forEach(row => {
        const labelEl  = row.querySelector('.item-label');
        const labelTxt = labelEl ? labelEl.textContent : '';
        const bate     = normalizar(labelTxt).includes(termo);

        if (bate) {
            row.classList.remove('oculto');
            row.classList.add('destaque');
            if (labelEl) labelEl.innerHTML = destacar(labelTxt, input.value.trim());
            visiveis++;
        } else {
            row.classList.add('oculto');
            row.classList.remove('destaque');
        }
    });

    // Atualiza dica de resultado
    if (visiveis === 0) {
        hint.textContent = `Nenhum resultado — pressione Enter ou "+" para adicionar`;
        hint.classList.add('visivel');
    } else {
        hint.textContent = `${visiveis} resultado${visiveis > 1 ? 's' : ''} encontrado${visiveis > 1 ? 's' : ''}`;
        hint.classList.add('visivel');
    }
}

// =============================================
// RENDER LISTA
// =============================================
function renderList(catKey, secKey) {
    const items   = dados[catKey][secKey];
    const listEl  = document.getElementById(`list-${catKey}-${secKey}`);
    const countEl = document.getElementById(`count-${catKey}-${secKey}`);

    countEl.textContent = items.length;

    if (items.length === 0) {
        listEl.innerHTML = `<li class="empty-msg">Nenhum item cadastrado</li>`;
        return;
    }

    listEl.innerHTML = items.map((item, i) => `
        <li class="item-row" data-label="${item.label}">
            <div class="item-info">
                <span class="item-label">${item.label}</span>
                <span class="item-value">${item.value}</span>
            </div>
            <button class="btn-remove" title="Remover"
                onclick="removeItem('${catKey}','${secKey}',${i})">✕</button>
        </li>
    `).join('');

    // Re-aplica o filtro ativo após re-render
    filtrarLista(catKey, secKey);
}

// =============================================
// AÇÕES
// =============================================
function removeItem(catKey, secKey, index) {
    const item = dados[catKey][secKey][index];
    dados[catKey][secKey].splice(index, 1);
    renderList(catKey, secKey);
    showToast(`"${item.label}" removido`);
}

function addItem(catKey, secKey) {
    const input = document.getElementById(`input-label-${catKey}-${secKey}`);
    const label = input.value.trim();

    if (!label) {
        input.focus();
        return;
    }

    const value  = slugify(label);
    const existe = dados[catKey][secKey].some(i => i.value === value);

    if (existe) {
        showToast(`"${label}" já existe nessa lista`);
        return;
    }

    dados[catKey][secKey].push({ value, label });
    input.value = '';
    input.classList.remove('filtrando');

    const hint = document.getElementById(`hint-${catKey}-${secKey}`);
    hint.textContent = '';
    hint.classList.remove('visivel');

    renderList(catKey, secKey);
    showToast(`"${label}" adicionado ✓`);
}

// =============================================
// GERAÇÃO DO HTML DAS ABAS
// =============================================
function renderAba(catKey) {
    const isAtiva = catKey === 'f1' ? 'ativa' : '';
    return `
        <div class="aba-conteudo ${isAtiva}" id="aba-${catKey}">
            <div class="categoria-grid">
                ${SECOES.map(sec => `
                    <div class="admin-card">
                        <div class="card-header">
                            <h3>${sec.label}</h3>
                            <span class="card-count" id="count-${catKey}-${sec.key}">0</span>
                        </div>
                        <div class="card-body">
                            <div class="form-add">
                                <input
                                    type="text"
                                    id="input-label-${catKey}-${sec.key}"
                                    placeholder="Buscar ou adicionar ${sec.singular}..."
                                    oninput="filtrarLista('${catKey}','${sec.key}')"
                                    onkeydown="if(event.key==='Enter') addItem('${catKey}','${sec.key}')"
                                    autocomplete="off"
                                >
                                <button class="btn-add" title="Adicionar"
                                    onclick="addItem('${catKey}','${sec.key}')">+</button>
                            </div>
                            <p class="filter-hint" id="hint-${catKey}-${sec.key}"></p>
                            <ul class="items-list" id="list-${catKey}-${sec.key}"></ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// =============================================
// INIT
// =============================================
function init() {
    // Gera o HTML de todas as abas
    const container = document.getElementById('abas-conteudo');
    container.innerHTML = Object.keys(dados).map(renderAba).join('');

    // Popula todas as listas
    Object.keys(dados).forEach(catKey => {
        SECOES.forEach(sec => renderList(catKey, sec.key));
    });

    // Troca de abas
    document.querySelectorAll('.aba-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('aba-ativa'));
            document.querySelectorAll('.aba-conteudo').forEach(c => c.classList.remove('ativa'));
            btn.classList.add('aba-ativa');
            document.getElementById(`aba-${btn.dataset.aba}`).classList.add('ativa');
        });
    });
}

init();