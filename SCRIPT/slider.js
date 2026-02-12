// ========================================
// MÓDULO SLIDER HERO
// ========================================

import { aoCarregarDOM, aoCarregarHTMX } from './utils.js';

// Estado do slider
let currentSlide = 0;
let slides = [];
let indicators = [];
let totalSlides = 0;
let autoSlideInterval;
let sliderInitialized = false;

/**
 * Mostra um slide específico
 */
function showSlide(index) {
    if (slides.length === 0) return;

    // Remove a classe active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Ajusta o índice se for maior que o total ou menor que zero
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Adiciona a classe active ao slide e indicador atual
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

/**
 * Muda para próximo ou anterior slide
 */
function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

/**
 * Vai para um slide específico
 * EXPORTADA para uso no HTML (onclick)
 */
export function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

/**
 * Avança automaticamente
 */
function autoSlide() {
    changeSlide(1);
}

/**
 * Inicia o slider automático
 */
function startAutoSlide() {
    if (!sliderInitialized) return;
    stopAutoSlide(); // Para qualquer timer existente
    autoSlideInterval = setInterval(autoSlide, 10000);
}

/**
 * Para o slider automático
 */
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

/**
 * Reinicia o slider automático
 */
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

/**
 * Gerencia eventos de toque/swipe
 */
function configurarEventosTouch(sliderHero) {
    let touchStartX = 0;
    let touchEndX = 0;

    sliderHero.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderHero.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            changeSlide(1);
        }
        if (touchEndX > touchStartX + 50) {
            changeSlide(-1);
        }
    }
}

/**
 * Configura navegação por teclado
 */
function configurarNavegacaoTeclado() {
    document.addEventListener('keydown', (e) => {
        if (!sliderInitialized) return;
        
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
}

/**
 * Para o slider quando a aba não está visível
 */
function configurarVisibilidade() {
    document.addEventListener('visibilitychange', () => {
        if (!sliderInitialized) return;
        
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}

/**
 * Inicializa o slider
 */
function initSlider() {
    // Evita inicializar múltiplas vezes
    if (sliderInitialized) {
        stopAutoSlide();
    }

    // Seleciona os elementos do slider
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
    totalSlides = slides.length;
    
    if (totalSlides === 0) {
        return;
    }

    currentSlide = 0;
    sliderInitialized = true;

    // Mostra o primeiro slide
    showSlide(0);
    
    // Inicia transição automática
    startAutoSlide();

    // Configura eventos de mouse
    const sliderHero = document.querySelector('.slider-hero');
    if (sliderHero) {
        sliderHero.addEventListener('mouseenter', stopAutoSlide);
        sliderHero.addEventListener('mouseleave', startAutoSlide);
        configurarEventosTouch(sliderHero);
    }
}

/**
 * Verifica se o slider está presente e inicializa
 */
function verificarEInicializar() {
    setTimeout(function() {
        if (document.querySelector('.slider-hero')) {
            initSlider();
        }
    }, 200);
}

/**
 * Inicialização do módulo
 */
export function iniciar() {
    // Configura navegação por teclado (uma vez só)
    configurarNavegacaoTeclado();
    configurarVisibilidade();

    // Listener para quando o HTMX carregar conteúdo
    aoCarregarHTMX(function(event) {
        // Verifica se o conteúdo carregado contém o slider
        if (event.detail.target.querySelector('.slider-hero') || 
            event.detail.target.classList.contains('slider-hero')) {
            setTimeout(initSlider, 150);
        }
    });

    // Também tenta inicializar quando a página carrega
    aoCarregarDOM(verificarEInicializar);
    
    // Se o DOM já está pronto
    if (document.readyState !== 'loading') {
        verificarEInicializar();
    }
}

// Exporta funções que podem ser chamadas do HTML
export { changeSlide };