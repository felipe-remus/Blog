// ========================================
// MÓDULO DE GERENCIAMENTO DE TAGS
// ========================================

import { estadoGlobal, aoCarregarDOM, aoCarregarHTMX } from './utils.js';

// Estado local do módulo
const selecoes = {
    categoria: new Set(),
    equipe: new Set(),
    piloto: new Set(),
    pista: new Set()
};

const limites = { 
    categoria: 1, 
    equipe: 4, 
    piloto: 4, 
    pista: 4 
};

/**
 * Identifica o tipo de tag baseado nas classes do elemento
 */
function getTipoTag(elemento) {
    if (elemento.classList.contains('categoria')) return 'categoria';
    if (elemento.classList.contains('piloto')) return 'piloto';
    if (elemento.classList.contains('pista')) return 'pista';
    if ([...elemento.classList].some(c => c.startsWith('equipe-'))) return 'equipe';
    return null;
}

/**
 * Busca checkbox de forma robusta
 */
function encontrarCheckbox(valor, tipo) {
    const candidates = document.querySelectorAll('.checkbox-tag input[type="checkbox"]');
    for (const cb of candidates) {
        const label = cb.closest('.checkbox-tag');
        if (!label) continue;
        
        const tagPreview = label.querySelector('.tag-preview');
        if (!tagPreview) continue;
        
        const cbTipo = getTipoTag(tagPreview);
        
        if (cb.value === valor && cbTipo === tipo) {
            return cb;
        }
    }
    return null;
}

/**
 * Atualiza os contadores de tags selecionadas
 * EXPORTADA para ser usada externamente se necessário
 */
export function atualizarContadores() {
    // Contador de Equipes
    const countEquipes = document.getElementById('count-equipes');
    if (countEquipes) {
        countEquipes.textContent = `(${selecoes.equipe.size}/${limites.equipe})`;
    }
    
    // Contador de Pilotos
    const countPilotos = document.getElementById('count-pilotos');
    if (countPilotos) {
        countPilotos.textContent = `(${selecoes.piloto.size}/${limites.piloto})`;
    }
    
    // Contador de Pistas
    const countPistas = document.getElementById('count-pistas');
    if (countPistas) {
        countPistas.textContent = `(${selecoes.pista.size}/${limites.pista})`;
    }
}

/**
 * Controla visibilidade do botão limpar
 */
function atualizarBotaoLimpar() {
    const btnLimpar = document.getElementById('btn-limpar-todas');
    if (!btnLimpar) return;
    
    // Verifica se há alguma tag selecionada em qualquer categoria
    const temTags = Object.values(selecoes).some(set => set.size > 0);
    
    if (temTags) {
        btnLimpar.style.display = 'block';
    } else {
        btnLimpar.style.display = 'none';
    }
}

/**
 * Limpa todas as tags selecionadas
 */
function limparTodasTags() {
    // ATIVA FLAG ANTES DE COMEÇAR
    estadoGlobal.limpezaEmAndamento = true;
    
    // Desmarca todos os checkboxes
    document.querySelectorAll('.checkbox-tag input[type="checkbox"]:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Limpa todas as seleções
    Object.keys(selecoes).forEach(tipo => {
        selecoes[tipo].clear();
    });
    
    // Limpa a área visual
    const tagsSel = document.querySelector('.tags-selecionadas');
    if (tagsSel) {
        tagsSel.innerHTML = '';
    }
    
    // Remove classe de selecionado visual
    document.querySelectorAll('.tag-selecionado-visual').forEach(el => {
        el.classList.remove('tag-selecionado-visual');
    });
    
    // Atualiza contadores e botão
    atualizarContadores();
    atualizarBotaoLimpar();
    
    // Esconde aviso
    const aviso = document.getElementById('aviso-tags');
    if (aviso) {
        aviso.style.display = 'none';
    }
    
    // DESATIVA FLAG APÓS CONCLUSÃO
    setTimeout(() => { 
        estadoGlobal.limpezaEmAndamento = false; 
    }, 50);
}

/**
 * Gerencia a seleção/deseleção de tags
 */
function gerenciarSelecaoTag(checkbox) {
    // IGNORA EVENTOS DURANTE LIMPEZA TOTAL
    if (estadoGlobal.limpezaEmAndamento) return;

    const label = checkbox.closest('.checkbox-tag');
    const tagPreview = label.querySelector('.tag-preview');
    const tipo = getTipoTag(tagPreview);
    const valor = checkbox.value;
    
    if (!tipo) return;

    const tagsSel = document.querySelector('.tags-selecionadas');
    const aviso = document.getElementById('aviso-tags');

    if (!tagsSel) return;

    // Verifica estado atual
    const jaSelecionado = selecoes[tipo].has(valor);

    if (checkbox.checked) {
        // Impede duplicação
        if (jaSelecionado) {
            checkbox.checked = false;
            return;
        }

        // Verifica limite
        if (selecoes[tipo].size >= limites[tipo]) {
            checkbox.checked = false;
            const msg = tipo === 'categoria' 
                ? '⚠️ Só 1 categoria permitida.' 
                : `⚠️ Máximo de ${limites[tipo]} ${tipo === 'equipe' ? 'equipes' : tipo === 'piloto' ? 'pilotos' : 'pistas'} atingido.`;
            
            if (aviso) {
                aviso.textContent = msg;
                aviso.style.cssText = 'display:block;color:#d32f2f;background:#ffebee;padding:0.5rem;border-radius:4px;border-left:3px solid #d32f2f;font-size:0.9rem';
                setTimeout(() => { if (aviso.textContent === msg) aviso.style.display = 'none'; }, 3500);
            }
            return;
        }

        // Adiciona à seleção
        selecoes[tipo].add(valor);

        // Adiciona tag visual
        const clone = tagPreview.cloneNode(true);
        clone.classList.add('tag-selecionada');
        clone.classList.remove('tag-preview');

        // Armazena o valor e o tipo para busca segura
        clone.dataset.tagValue = valor;
        clone.dataset.tagTipo = tipo;

        // Clique na tag inteira → desmarca
        clone.style.cursor = 'pointer';
        clone.onclick = function(e) {
            // Se clicar no X, deixa o X lidar
            if (e.target.classList.contains('remove-tag')) return;
            e.stopPropagation();

            const cb = encontrarCheckbox(valor, tipo);
            if (cb && cb.checked) {
                cb.checked = false;
                cb.dispatchEvent(new Event('change', { bubbles: true }));
            }
        };

        // Botão X
        const btn = document.createElement('span');
        btn.className = 'remove-tag';
        btn.innerHTML = '&times;';
        btn.style.cssText = 'margin-left:0.4rem;font-weight:bold;cursor:pointer;opacity:0.7';
        btn.onclick = function(e) {
            e.stopPropagation();
            const cb = encontrarCheckbox(valor, tipo);
            if (cb && cb.checked) {
                cb.checked = false;
                cb.dispatchEvent(new Event('change', { bubbles: true }));
            }
        };
        clone.appendChild(btn);

        tagsSel.appendChild(clone);
        label.classList.add('tag-selecionado-visual');

    } else {
        // Remove da seleção
        selecoes[tipo].delete(valor);

        // Remove tag visual usando dataset
        tagsSel.querySelectorAll('.tag-selecionada').forEach(tag => {
            if (tag.dataset.tagValue === valor && tag.dataset.tagTipo === tipo) {
                tag.remove();
            }
        });
        
        label.classList.remove('tag-selecionado-visual');
    }

    // ATUALIZA CONTADORES E BOTÃO
    atualizarContadores();
    atualizarBotaoLimpar();

    // Limpa aviso se tudo estiver ok
    if (aviso && Object.values(selecoes).every(set => set.size <= limites[set.tipo || 'equipe'])) {
        aviso.style.display = 'none';
    }
}

/**
 * Configura event listeners para tags
 */
function configurarEventListeners() {
    // Event Delegation para headers colapsáveis
    document.addEventListener('click', function(e) {
        // Verifica se clicou em um header colapsável
        if (e.target.classList.contains('collapsible-header')) {
            const targetId = e.target.getAttribute('data-target');
            const content = document.getElementById(targetId);
            
            if (content) {
                content.classList.toggle('show');
                e.target.classList.toggle('active');
            }
        }
        
        // Detecta clique no botão limpar por EVENT DELEGATION
        if (e.target.id === 'btn-limpar-todas' || e.target.closest('#btn-limpar-todas')) {
            limparTodasTags();
        }
    });

    // Event listener de change para checkboxes
    document.addEventListener('change', e => {
        if (e.target.type !== 'checkbox' || !e.target.closest('.checkbox-tag')) return;
        gerenciarSelecaoTag(e.target);
    });
}

/**
 * Inicializa as tags já marcadas no HTML
 */
function inicializarTags() {
    document.querySelectorAll('.checkbox-tag input[type="checkbox"]:checked').forEach(checkbox => {
        const tagPreview = checkbox.closest('.checkbox-tag')?.querySelector('.tag-preview');
        if (!tagPreview) return;
        const tipo = getTipoTag(tagPreview);
        if (tipo) selecoes[tipo].add(checkbox.value);
    });
    atualizarContadores();
    atualizarBotaoLimpar();
}

/**
 * Inicialização do módulo
 */
export function iniciar() {
    configurarEventListeners();
    
    // Executa na carga inicial
    aoCarregarDOM(inicializarTags);
    
    // Se usa HTMX, executa após updates
    aoCarregarHTMX(inicializarTags);
    
    // Fallback com timeout
    setTimeout(inicializarTags, 100);
}

/**
 * Retorna as seleções atuais (para uso externo)
 */
export function obterSelecoes() {
    return {
        categoria: Array.from(selecoes.categoria),
        equipe: Array.from(selecoes.equipe),
        piloto: Array.from(selecoes.piloto),
        pista: Array.from(selecoes.pista)
    };
}