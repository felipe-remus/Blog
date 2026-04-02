// ============================================================
// SLIDER HERO
// ============================================================

let currentSlide      = 0;
let slides            = [];
let indicators        = [];
let totalSlides       = 0;
let autoSlideInterval;
let sliderInitialized = false;

function initSlider() {
    if (sliderInitialized) stopAutoSlide();

    slides      = document.querySelectorAll('.slide');
    indicators  = document.querySelectorAll('.indicator');
    totalSlides = slides.length;

    if (totalSlides === 0) return;

    currentSlide      = 0;
    sliderInitialized = true;

    showSlide(0);
    startAutoSlide();

    const sliderHero = document.querySelector('.slider-hero');
    if (sliderHero) {
        sliderHero.addEventListener('mouseenter', stopAutoSlide);
        sliderHero.addEventListener('mouseleave', startAutoSlide);

        let touchStartX = 0;
        let touchEndX   = 0;

        sliderHero.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        sliderHero.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) changeSlide(1);
            if (touchEndX > touchStartX + 50) changeSlide(-1);
        });
    }
}

function showSlide(index) {
    if (slides.length === 0) return;

    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));

    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0)       currentSlide = totalSlides - 1;
    else                      currentSlide = index;

    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function startAutoSlide() {
    if (!sliderInitialized) return;
    stopAutoSlide();
    
    // Tempo de mudança das fotos em ms (10000 = 10 segundos)
    autoSlideInterval = setInterval(() => changeSlide(1), 10000); 
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Navegação por teclado
document.addEventListener('keydown', e => {
    if (!sliderInitialized) return;
    if (e.key === 'ArrowLeft')  changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
});

// Pausar quando página fica oculta
document.addEventListener('visibilitychange', () => {
    if (!sliderInitialized) return;
    document.hidden ? stopAutoSlide() : startAutoSlide();
});

// Reinicializar após HTMX swap
document.addEventListener('htmx:afterSwap', e => {
    if (
        e.detail.target.querySelector('.slider-hero') ||
        e.detail.target.classList.contains('slider-hero')
    ) {
        setTimeout(initSlider, 150);
    }
});