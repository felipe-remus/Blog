// ============================================================
// ABAS DE LOGIN / REGISTRO
// ============================================================

document.addEventListener('click', e => {
    if (!e.target.matches('.aba')) return;
    e.preventDefault();

    const aba       = e.target;
    const container = aba.closest('[hx-get], body') || document.body;

    container.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
    aba.classList.add('ativa');

    const alvo = aba.getAttribute('data-aba');
    container.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
    container.querySelector(`#form-${alvo}`)?.classList.add('ativo');
});