/* ========================================
SLIDER HERO 
======================================== */

let currentSlide = 0;
let slides = [];
let indicators = [];
let totalSlides = 0;
let autoSlideInterval;
let sliderInitialized = false;

// Função para inicializar o slider (chamada após HTMX carregar)
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
        console.warn('Nenhum slide encontrado. O slider não foi inicializado.');
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

        // Suporte para touch/swipe em dispositivos móveis
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

    console.log('✅ Slider inicializado com sucesso!', totalSlides, 'slides');
}

// Função para mostrar um slide específico
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

// Função para mudar de slide (próximo ou anterior)
function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

// Função para ir para um slide específico
function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// Função para avançar automaticamente
function autoSlide() {
    changeSlide(1);
}

// Inicia o slider automático
function startAutoSlide() {
    if (!sliderInitialized) return;
    stopAutoSlide(); // Para qualquer timer existente
    autoSlideInterval = setInterval(autoSlide, 5000); // 5 segundos
}

// Para o slider automático
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Reinicia o slider automático
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (!sliderInitialized) return;
    
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Para o slider quando a aba não está visível
document.addEventListener('visibilitychange', () => {
    if (!sliderInitialized) return;
    
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

// Listener para quando o HTMX carregar conteúdo
document.addEventListener('htmx:afterSwap', function(event) {
    // Verifica se o conteúdo carregado contém o slider
    if (event.detail.target.querySelector('.slider-hero') || 
        event.detail.target.classList.contains('slider-hero')) {
        console.log('🔄 Slider detectado via HTMX, inicializando...');
        setTimeout(initSlider, 150);
    }
});

// Também tenta inicializar quando a página carrega (caso o slider já esteja no HTML)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            if (document.querySelector('.slider-hero')) {
                initSlider();
            }
        }, 200);
    });
} else {
    // DOM já está pronto
    setTimeout(function() {
        if (document.querySelector('.slider-hero')) {
            initSlider();
        }
    }, 200);
}