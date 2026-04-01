/**
 * not-found.js
 * Partículas flutuantes no canvas de fundo da página 404.
 * Leve, sem dependências externas.
 */

(function () {
    "use strict";

    const canvas  = document.getElementById("nf-canvas");
    if (!canvas) return;

    const ctx     = canvas.getContext("2d");
    const COLORS  = ["#26011C", "#e10600", "#888888"];
    const COUNT   = 55;

    let W, H, particles, raf;

    /* ── Inicialização ─────────────────────────────────────── */
    function init() {
        resize();
        particles = Array.from({ length: COUNT }, createParticle);
        cancelAnimationFrame(raf);
        loop();
    }

    /* ── Redimensionamento ─────────────────────────────────── */
    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    /* ── Cria uma partícula aleatória ──────────────────────── */
    function createParticle(_, forceY) {
        const radius = Math.random() * 3 + 1;
        return {
            x:      Math.random() * W,
            y:      forceY !== undefined ? forceY : Math.random() * H,
            vx:     (Math.random() - 0.5) * 0.4,
            vy:     -(Math.random() * 0.5 + 0.2),   /* sobe suavemente */
            radius,
            alpha:  Math.random() * 0.5 + 0.15,
            color:  COLORS[Math.floor(Math.random() * COLORS.length)],
            /* leve oscilação horizontal */
            swing:  Math.random() * Math.PI * 2,
            swingSpeed: Math.random() * 0.012 + 0.004,
            swingAmp:   Math.random() * 0.6 + 0.2,
        };
    }

    /* ── Loop de animação ──────────────────────────────────── */
    function loop() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach((p, i) => {
            /* Movimento */
            p.swing += p.swingSpeed;
            p.x += p.vx + Math.sin(p.swing) * p.swingAmp;
            p.y += p.vy;

            /* Reinicia partícula quando sai pelo topo */
            if (p.y + p.radius < 0) {
                particles[i] = createParticle(null, H + p.radius);
                return;
            }
            /* Wraparound horizontal */
            if (p.x < -p.radius)       p.x = W + p.radius;
            else if (p.x > W + p.radius) p.x = -p.radius;

            /* Desenho */
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle   = p.color;
            ctx.fill();
        });

        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(loop);
    }

    /* ── Eventos ───────────────────────────────────────────── */
    window.addEventListener("resize", () => {
        resize();
        /* Mantém partículas dentro dos novos limites */
        particles.forEach(p => {
            if (p.x > W) p.x = Math.random() * W;
            if (p.y > H) p.y = Math.random() * H;
        });
    });

    /* Pausa quando a aba fica invisível (economia de CPU) */
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(raf);
        } else {
            loop();
        }
    });

    /* ── Kick-off ──────────────────────────────────────────── */
    init();

}());