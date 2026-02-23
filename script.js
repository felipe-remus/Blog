// ========================================
// UTILITÁRIOS GLOBAIS
// ========================================
const tagsSelecionadasAtivas = new Set();

// ========================================
// INICIALIZAÇÃO PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa filtros
    if (document.querySelector('.card-noticia')) inicializarFiltros();
});

// HTMX: re-inicializa componentes 
document.body.addEventListener('htmx:afterOnLoad', (event) => {
    const container = event.detail.elt;

    if (container.querySelector('.aba')) inicializarAbas(container);
    if (container.querySelector('.card-noticia') || container.querySelector('#busca-texto')) inicializarFiltros();
    if (container.querySelector('#form-noticia')) inicializarFormNoticia(container.querySelector('#form-noticia'));
});

// ========================================
// ABAS (LOGIN / REGISTRO)
// ========================================
document.addEventListener('click', (e) => {
    if (!e.target.matches('.aba')) return;
    e.preventDefault();

    const aba = e.target;
    const container = aba.closest('[hx-get], body') || document.body;

    // Atualiza aba
    container.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
    aba.classList.add('ativa');

    // Mostra formulário 
    const alvo = aba.getAttribute('data-aba');
    container.querySelectorAll('.formulario').forEach(f => f.classList.remove('ativo'));
    container.querySelector(`#form-${alvo}`)?.classList.add('ativo');
});

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
    autoSlideInterval = setInterval(autoSlide, 10000);
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

// ========================================
// Header
// ========================================
document.body.addEventListener('htmx:afterSwap', function(event) {
    // Quando qualquer conteúdo for carregado, atualiza o menu
    if (event.target.id === 'xcabecalho' || event.detail.target.id === 'xcabecalho') {
        highlightCurrentPage();
    }
});

function highlightCurrentPage() {
    // Aguarda o DOM estar pronto
    requestAnimationFrame(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#menu-principal .nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page') || link.getAttribute('href');
            link.classList.toggle('active', linkPage === currentPage);
        });
    });
}

// ========================================
// SISTEMA DE PAGINAÇÃO
// ========================================

// Configuração
const NOTICIAS_POR_PAGINA = 10;
let paginaAtual = 1;
let totalPaginas = 1;

// Função para aplicar paginação
function aplicarPaginacao() {
    const cards = document.querySelectorAll('.card-noticia');
    
    // Filtra apenas cards visíveis (não escondidos por filtros)
    const cardsVisiveis = Array.from(cards).filter(card => {
        const computedStyle = window.getComputedStyle(card);
        return computedStyle.display !== 'none' || card.style.display !== 'none';
    });

    const totalNoticias = cardsVisiveis.length;
    totalPaginas = Math.ceil(totalNoticias / NOTICIAS_POR_PAGINA);
    
    // Se não houver notícias, totalPaginas = 1 (para sempre mostrar a paginação)
    if (totalPaginas === 0) {
        totalPaginas = 1;
    }

    // Ajusta página atual se necessário
    if (paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }
    if (paginaAtual < 1) {
        paginaAtual = 1;
    }

    // Esconde todos os cards visíveis primeiro
    cardsVisiveis.forEach(card => {
        card.classList.add('paginacao-oculto');
    });

    // Mostra apenas os cards da página atual
    const inicio = (paginaAtual - 1) * NOTICIAS_POR_PAGINA;
    const fim = inicio + NOTICIAS_POR_PAGINA;
    
    cardsVisiveis.slice(inicio, fim).forEach(card => {
        card.classList.remove('paginacao-oculto');
    });

    // Atualiza controles
    atualizarControlesPaginacao(totalNoticias, inicio, fim);
}

function atualizarControlesPaginacao(totalNoticias, inicio, fim) {
    // Atualiza informações de quantidade
    const infoInicio = document.getElementById('info-inicio');
    const infoFim = document.getElementById('info-fim');
    const infoTotal = document.getElementById('info-total');
    
    if (infoInicio) infoInicio.textContent = totalNoticias > 0 ? inicio + 1 : 0;
    if (infoFim) infoFim.textContent = Math.min(fim, totalNoticias);
    if (infoTotal) infoTotal.textContent = totalNoticias;

    // Atualiza estado dos botões
    const btnPrimeira = document.getElementById('btn-primeira');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProxima = document.getElementById('btn-proxima');
    const btnUltima = document.getElementById('btn-ultima');
    
    if (btnPrimeira) btnPrimeira.disabled = paginaAtual === 1;
    if (btnAnterior) btnAnterior.disabled = paginaAtual === 1;
    if (btnProxima) btnProxima.disabled = paginaAtual === totalPaginas;
    if (btnUltima) btnUltima.disabled = paginaAtual === totalPaginas;

    // Gera números das páginas
    gerarNumerosPaginas();

    // REMOVIDO: A lógica de esconder/mostrar paginação
    // Agora a paginação fica sempre visível
}

function gerarNumerosPaginas() {
    const container = document.getElementById('numeros-paginas');
    if (!container) return;
    
    container.innerHTML = '';

    const maxBotoes = 7;
    let paginas = [];

    if (totalPaginas <= maxBotoes) {
        paginas = Array.from({length: totalPaginas}, (_, i) => i + 1);
    } else {
        if (paginaAtual <= 3) {
            paginas = [1, 2, 3, 4, '...', totalPaginas];
        } else if (paginaAtual >= totalPaginas - 2) {
            paginas = [1, '...', totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas];
        } else {
            paginas = [1, '...', paginaAtual - 1, paginaAtual, paginaAtual + 1, '...', totalPaginas];
        }
    }

    paginas.forEach(num => {
        if (num === '...') {
            const reticencias = document.createElement('span');
            reticencias.className = 'pagina-reticencias';
            reticencias.textContent = '...';
            container.appendChild(reticencias);
        } else {
            const botao = document.createElement('button');
            botao.className = 'pagina-numero';
            if (num === paginaAtual) {
                botao.classList.add('ativa');
            }
            botao.textContent = num;
            botao.onclick = () => irParaPagina(num);
            container.appendChild(botao);
        }
    });
}

function irParaPagina(numeroPagina) {
    paginaAtual = numeroPagina;
    aplicarPaginacao();
    
    // Scroll suave para o topo
    const container = document.querySelector('.noticias-container');
    if (container) {
        const offset = 100;
        const elementPosition = container.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Inicializa os event listeners
function inicializarPaginacao() {
    console.log('Inicializando paginação...');
    
    const btnPrimeira = document.getElementById('btn-primeira');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProxima = document.getElementById('btn-proxima');
    const btnUltima = document.getElementById('btn-ultima');
    
    if (btnPrimeira) {
        btnPrimeira.addEventListener('click', () => {
            console.log('Clicou em primeira');
            irParaPagina(1);
        });
    }
    
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            console.log('Clicou em anterior');
            irParaPagina(Math.max(1, paginaAtual - 1));
        });
    }
    
    if (btnProxima) {
        btnProxima.addEventListener('click', () => {
            console.log('Clicou em próxima');
            irParaPagina(Math.min(totalPaginas, paginaAtual + 1));
        });
    }
    
    if (btnUltima) {
        btnUltima.addEventListener('click', () => {
            console.log('Clicou em última');
            irParaPagina(totalPaginas);
        });
    }
    
    // Aplica paginação inicial
    aplicarPaginacao();
}

// Quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarPaginacao);
} else {
    inicializarPaginacao();
}

// Para HTMX - reaplica após carregar conteúdo
document.body.addEventListener('htmx:afterSwap', function(event) {
    console.log('HTMX afterSwap detectado');
    setTimeout(() => {
        paginaAtual = 1;
        inicializarPaginacao();
    }, 100);
});

// ========================================
// SISTEMA DE ORDENAÇÃO DE NOTICIAS
// ========================================

// Ordena quando o conteúdo HTMX é carregado
document.body.addEventListener('htmx:afterSwap', function(evt) {
    ordenarNoticias();
});

// Ordena no carregamento inicial
document.addEventListener('DOMContentLoaded', ordenarNoticias);

function ordenarNoticias() {
    const containers = document.querySelectorAll('.noticias-container');
    if (containers.length === 0) return;
    
    const parent = containers[0].parentElement;
    
    const noticiasOrdenadas = Array.from(containers).sort((a, b) => {
        const dataA = a.querySelector('.card-noticia').getAttribute('data-data');
        const dataB = b.querySelector('.card-noticia').getAttribute('data-data');
        
        const parsarData = (str) => {
            if (!str) return new Date(0);
            const [dia, mes, ano] = str.split('/');
            return new Date(ano, mes - 1, dia);
        };
        
        return parsarData(dataB) - parsarData(dataA);
    });
    
    noticiasOrdenadas.forEach(noticia => parent.appendChild(noticia));
}

// ========================================
// BASE DE DADOS POR CATEGORIA
// ========================================
const DADOS_CATEGORIAS = {
    f1: {

        label: 'Fórmula 1',
        equipes: [
            { value: 'alpine',       label: 'Alpine',       classe: 'equipe-alpine' },
            { value: 'astonmartin',  label: 'Aston Martin',  classe: 'equipe-astonmartin' },
            { value: 'audi',         label: 'Audi',          classe: 'equipe-audi' },
            { value: 'cadillac',     label: 'Cadillac',      classe: 'equipe-cadillac' },
            { value: 'ferrari',      label: 'Ferrari',       classe: 'equipe-ferrari' },
            { value: 'haas',         label: 'Haas',          classe: 'equipe-haas' },
            { value: 'mclaren',      label: 'McLaren',       classe: 'equipe-mclaren' },
            { value: 'mercedes',     label: 'Mercedes',      classe: 'equipe-mercedes' },
            { value: 'redbull',      label: 'Red Bull',      classe: 'equipe-redbull' },
            { value: 'racing-bulls', label: 'Racing Bulls',  classe: 'equipe-racingbulls' },
            { value: 'williams',     label: 'Williams',      classe: 'equipe-williams' },
        ],
        pilotos: [
            { value: 'alex-albon', label: 'Alex Albon' },
            { value: 'arvid-lindblad', label: 'Arvid Lindblad' },
            { value: 'carlos-sainz', label: 'Carlos Sainz' },
            { value: 'charles-leclerc', label: 'Charles Leclerc' },
            { value: 'esteban-ocon', label: 'Esteban Ocon' },
            { value: 'fernando-alonso', label: 'Fernando Alonso' },
            { value: 'franco-colapinto', label: 'Franco Colapinto' },
            { value: 'george-russell', label: 'George Russell' },
            { value: 'gabriel-bortoleto', label: 'Gabriel Bortoleto' },
            { value: 'isaac-hadjar', label: 'Isaac Hadjar' },
            { value: 'kimi-antonelli', label: 'Kimi Antonelli' },
            { value: 'lando-norris', label: 'Lando Norris' },
            { value: 'lewis-hamilton', label: 'Lewis Hamilton' },
            { value: 'liam-lawson', label: 'Liam Lawson' },
            { value: 'lance-stroll', label: 'Lance Stroll' },
            { value: 'max-verstappen', label: 'Max Verstappen' },
            { value: 'nico-hulkenberg', label: 'Nico Hülkenberg' },
            { value: 'oliver-bearman', label: 'Oliver Bearman' },
            { value: 'oscar-piastri', label: 'Oscar Piastri' },
            { value: 'pierre-gasly', label: 'Pierre Gasly' },
            { value: 'sergio-perez', label: 'Sergio Pérez' },
            { value: 'valtteri-bottas', label: 'Valtteri Bottas' },
        ],
        pistas: [
            { value: 'australia', label: 'Austrália' },
            { value: 'china', label: 'China' },
            { value: 'japao', label: 'Japão' },
            { value: 'barein', label: 'Barein' },
            { value: 'arabia-saudita', label: 'Arábia Saudita' },
            { value: 'miami', label: 'Miami' },
            { value: 'canada', label: 'Canadá' },
            { value: 'monaco', label: 'Mônaco' },
            { value: 'barcelona', label: 'Barcelona' },
            { value: 'austria', label: 'Áustria' },
            { value: 'inglaterra', label: 'Inglaterra' },
            { value: 'belgica', label: 'Bélgica' },
            { value: 'hungria', label: 'Hungria' },
            { value: 'holanda', label: 'Holanda' },
            { value: 'monza', label: 'Monza' },
            { value: 'madrid', label: 'Madri' },
            { value: 'azerbaijao', label: 'Azerbaijão' },
            { value: 'singapura', label: 'Singapura' },
            { value: 'austin', label: 'Austin' },
            { value: 'mexico', label: 'México' },
            { value: 'brasil', label: 'Brasil' },
            { value: 'las-vegas', label: 'Las Vegas' },
            { value: 'qatar', label: 'Catar' },
            { value: 'abu-dhabi', label: 'Abu Dhabi' },
        ],
    },
  
    // F2, F3, F4 e F1 Academy usam os mesmos circuitos da F1
    // mas sem filtros de piloto/equipe (ou adicione conforme precisar)
    f2: {
        label: 'Fórmula 2',
        equipes: [],
        pilotos: [],
        pistas: [
            { value: 'barein', label: 'Barein' },
            { value: 'arabia-saudita', label: 'Arábia Saudita' },
            { value: 'australia', label: 'Austrália' },
            { value: 'miami', label: 'Miami' },
            { value: 'monaco', label: 'Mônaco' },
            { value: 'barcelona', label: 'Barcelona' },
            { value: 'austria', label: 'Áustria' },
            { value: 'inglaterra', label: 'Inglaterra' },
            { value: 'hungria', label: 'Hungria' },
            { value: 'belgica', label: 'Bélgica' },
            { value: 'monza', label: 'Monza' },
            { value: 'azerbaijao', label: 'Azerbaijão' },
            { value: 'singapura', label: 'Singapura' },
            { value: 'austin', label: 'Austin' },
            { value: 'abu-dhabi', label: 'Abu Dhabi' },
        ],
    },
  
    f3: {
        label: 'Fórmula 3',
        equipes: [],
        pilotos: [],
        pistas: [
            { value: 'barein', label: 'Barein' },
            { value: 'australia', label: 'Austrália' },
            { value: 'monaco', label: 'Mônaco' },
            { value: 'barcelona', label: 'Barcelona' },
            { value: 'austria', label: 'Áustria' },
            { value: 'inglaterra', label: 'Inglaterra' },
            { value: 'hungria', label: 'Hungria' },
            { value: 'belgica', label: 'Bélgica' },
            { value: 'monza', label: 'Monza' },
            { value: 'abu-dhabi', label: 'Abu Dhabi' },
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
            { value: 'barein', label: 'Barein' },
            { value: 'miami', label: 'Miami' },
            { value: 'monaco', label: 'Mônaco' },
            { value: 'austria', label: 'Áustria' },
            { value: 'inglaterra', label: 'Inglaterra' },
            { value: 'holanda', label: 'Holanda' },
            { value: 'singapura', label: 'Singapura' },
            { value: 'austin', label: 'Austin' },
            { value: 'abu-dhabi', label: 'Abu Dhabi' },
        ],
    },
  
    fe: {
        label: 'Fórmula E',
        equipes: [
            { value: 'andretti-fe', label: 'Andretti Formula E' },
            { value: 'ds-penske', label: 'DS Penske' },
            { value: 'envision', label: 'Envision Racing' },
            { value: 'ert-fe', label: 'ERT Formula E' },
            { value: 'jaguar', label: 'Jaguar TCS Racing' },
            { value: 'mahindra', label: 'Mahindra Racing' },
            { value: 'maserati', label: 'Maserati MSG Racing' },
            { value: 'mclaren-fe', label: 'McLaren Formula E' },
            { value: 'nissan-fe', label: 'Nissan Formula E' },
            { value: 'porsche-fe', label: 'Porsche TAG Heuer' },
        ],
        pilotos: [
            { value: 'antonio-felix-da-costa', label: 'António Félix da Costa' },
            { value: 'dan-ticktum', label: 'Dan Ticktum' },
            { value: 'jake-dennis', label: 'Jake Dennis' },
            { value: 'jean-eric-vergne', label: 'Jean-Éric Vergne' },
            { value: 'lucas-di-grassi', label: 'Lucas di Grassi' },
            { value: 'max-gunther', label: 'Maximilian Günther' },
            { value: 'mitch-evans', label: 'Mitch Evans' },
            { value: 'nick-cassidy', label: 'Nick Cassidy' },
            { value: 'norman-nato', label: 'Norman Nato' },
            { value: 'nyck-de-vries', label: 'Nyck de Vries' },
            { value: 'oliver-rowland', label: 'Oliver Rowland' },
            { value: 'pascal-wehrlein', label: 'Pascal Wehrlein' },
            { value: 'sacha-fenestraz', label: 'Sacha Fenestraz' },
            { value: 'sebastien-buemi', label: 'Sébastien Buemi' },
            { value: 'stoffel-vandoorne', label: 'Stoffel Vandoorne' },
            { value: 'taylor-barnard', label: 'Taylor Barnard' },
            { value: 'jake-hughes', label: 'Jake Hughes' },
            { value: 'robin-frijns', label: 'Robin Frijns' },
        ],
        pistas: [
            { value: 'diriyah', label: 'Diriyah (Arábia Saudita)' },
            { value: 'cidade-do-mexico-fe', label: 'Cidade do México' },
            { value: 'tóquio-fe', label: 'Tóquio' },
            { value: 'misano-fe', label: 'Misano' },
            { value: 'monaco-fe', label: 'Mônaco' },
            { value: 'berlin-fe', label: 'Berlim' },
            { value: 'jakarta-fe', label: 'Jacarta' },
            { value: 'portland-fe', label: 'Portland' },
            { value: 'londres-fe', label: 'Londres' },
            { value: 'cape-town-fe', label: 'Cidade do Cabo' },
            { value: 'sao-paulo-fe', label: 'São Paulo' },
            { value: 'shanghai-fe', label: 'Xangai' },
        ],
        },
    
        indy: {
        label: 'IndyCar Series',
        equipes: [
            { value: 'andretti-global', label: 'Andretti Global' },
            { value: 'arrow-mclaren', label: 'Arrow McLaren' },
            { value: 'chip-ganassi', label: 'Chip Ganassi Racing' },
            { value: 'dale-coyne', label: 'Dale Coyne Racing' },
            { value: 'ed-carpenter', label: 'Ed Carpenter Racing' },
            { value: 'juncos-hollinger', label: 'Juncos Hollinger Racing' },
            { value: 'meyer-shank', label: 'Meyer Shank Racing' },
            { value: 'penske', label: 'Team Penske' },
            { value: 'rahal', label: 'Rahal Letterman Lanigan' },
            { value: 'foyt', label: 'AJ Foyt Racing' },
        ],
        pilotos: [
            { value: 'alex-palou', label: 'Álex Palou' },
            { value: 'agustin-canapino', label: 'Agustín Canapino' },
            { value: 'callum-ilott', label: 'Callum Ilott' },
            { value: 'christian-lundgaard', label: 'Christian Lundgaard' },
            { value: 'colton-herta', label: 'Colton Herta' },
            { value: 'devlin-defrancesco', label: 'Devlin DeFrancesco' },
            { value: 'felix-rosenqvist', label: 'Felix Rosenqvist' },
            { value: 'graham-rahal', label: 'Graham Rahal' },
            { value: 'helio-castroneves', label: 'Hélio Castroneves' },
            { value: 'josef-newgarden', label: 'Josef Newgarden' },
            { value: 'kyle-kirkwood', label: 'Kyle Kirkwood' },
            { value: 'marcus-ericsson', label: 'Marcus Ericsson' },
            { value: 'pato-oward', label: "Pato O'Ward" },
            { value: 'pietro-fittipaldi', label: 'Pietro Fittipaldi' },
            { value: 'rinus-veekay', label: 'Rinus VeeKay' },
            { value: 'santino-ferrucci', label: 'Santino Ferrucci' },
            { value: 'scott-dixon', label: 'Scott Dixon' },
            { value: 'scott-mclaughlin', label: 'Scott McLaughlin' },
            { value: 'will-power', label: 'Will Power' },
            { value: 'takuma-sato', label: 'Takuma Sato' },
        ],
        pistas: [
            { value: 'st-petersburg', label: 'St. Petersburg' },
            { value: 'texas', label: 'Texas Motor Speedway' },
            { value: 'long-beach', label: 'Long Beach' },
            { value: 'barber', label: 'Barber Motorsports Park' },
            { value: 'indianapolis-oval', label: 'Indianapolis (Oval)' },
            { value: 'indianapolis-road', label: 'Indianapolis (Road Course)' },
            { value: 'detroit-indy', label: 'Detroit' },
            { value: 'road-america', label: 'Road America' },
            { value: 'mid-ohio', label: 'Mid-Ohio' },
            { value: 'toronto-indy', label: 'Toronto' },
            { value: 'iowa', label: 'Iowa Speedway' },
            { value: 'nashville', label: 'Nashville' },
            { value: 'gateway', label: 'Gateway' },
            { value: 'portland-indy', label: 'Portland' },
            { value: 'laguna-seca', label: 'Laguna Seca' },
        ],
    },
};

// ========================================
// FILTROS DINÂMICOS POR CATEGORIA
// ========================================

function popularSelect(selectId, itens, placeholder) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    itens.forEach(({ value, label }) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      select.appendChild(opt);
    });
  }
  
  function atualizarFiltrosDinamicos(categoria) {
    const dados = DADOS_CATEGORIAS[categoria];
  
    const containerEquipe = document.getElementById('container-equipe');
    const containerPiloto = document.getElementById('container-piloto');
    const containerPista  = document.getElementById('container-pista');
  
    // Reseta os selects dinâmicos
    popularSelect('filtro-equipe', [], 'Selecione a Equipe');
    popularSelect('filtro-piloto', [], 'Selecione o Piloto');
    popularSelect('filtro-pista',  [], 'Selecione a Pista');
  
    if (!dados) {
      // Nenhuma categoria selecionada → esconde tudo
      containerEquipe.style.display = 'none';
      containerPiloto.style.display = 'none';
      containerPista.style.display  = 'none';
      return;
    }
  
    // Equipes
    if (dados.equipes.length > 0) {
      popularSelect('filtro-equipe', dados.equipes, 'Selecione a Equipe');
      containerEquipe.style.display = 'block';
    } else {
      containerEquipe.style.display = 'none';
    }
  
    // Pilotos
    if (dados.pilotos.length > 0) {
      popularSelect('filtro-piloto', dados.pilotos, 'Selecione o Piloto');
      containerPiloto.style.display = 'block';
    } else {
      containerPiloto.style.display = 'none';
    }
  
    // Pistas
    if (dados.pistas.length > 0) {
      popularSelect('filtro-pista', dados.pistas, 'Selecione a Pista');
      containerPista.style.display = 'block';
    } else {
      containerPista.style.display = 'none';
    }
  }
  
  // -------- lógica de filtragem (mantida igual) --------
  let timeoutBusca;
  
  function aplicarFiltros() {
    const termo     = (document.getElementById('busca-texto')?.value || '').trim().toLowerCase();
    const categoria = document.getElementById('filtro-categoria')?.value || '';
    const equipe    = document.getElementById('filtro-equipe')?.value || '';
    const piloto    = document.getElementById('filtro-piloto')?.value || '';
    const pista     = document.getElementById('filtro-pista')?.value || '';
    const cards     = document.querySelectorAll('.card-noticia');
  
    if (cards.length === 0) return;
  
    cards.forEach(card => {
      const texto      = card.textContent.toLowerCase();
      const categorias = (card.getAttribute('data-categoria') || '').split(' ').filter(Boolean);
      const equipes    = (card.getAttribute('data-equipe')    || '').split(' ').filter(Boolean);
      const pilotos    = (card.getAttribute('data-piloto')    || '').split(' ').filter(Boolean);
      const pistas     = (card.getAttribute('data-pista')     || '').split(' ').filter(Boolean);
  
      const passaBusca    = !termo     || texto.includes(termo);
      const passaCategoria = !categoria || categorias.includes(categoria);
      const passaEquipe   = !equipe    || equipes.includes(equipe);
      const passaPiloto   = !piloto    || pilotos.includes(piloto);
      const passaPista    = !pista     || pistas.includes(pista);
  
      card.style.display = (passaBusca && passaCategoria && passaEquipe && passaPiloto && passaPista)
        ? 'block' : 'none';
    });
  
    paginaAtual = 1;
    aplicarPaginacao();
  }
  
  // Event listeners
  document.addEventListener('input', e => {
    if (e.target.id === 'busca-texto') {
      clearTimeout(timeoutBusca);
      timeoutBusca = setTimeout(aplicarFiltros, 300);
    }
  });
  
  document.addEventListener('change', e => {
    if (e.target.id === 'filtro-categoria') {
      atualizarFiltrosDinamicos(e.target.value);
      aplicarFiltros();
      return;
    }
    if (['filtro-equipe', 'filtro-piloto', 'filtro-pista'].includes(e.target.id)) {
      aplicarFiltros();
    }
  });
  
  function inicializarFiltros() {
    setTimeout(() => {
      const catAtual = document.getElementById('filtro-categoria')?.value || '';
      atualizarFiltrosDinamicos(catAtual);
      aplicarFiltros();
    }, 100);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFiltros);
  } else {
    inicializarFiltros();
  }
  
  document.addEventListener('DOMContentLoaded', inicializarFiltros);
  document.body.addEventListener('htmx:afterSwap', function(event) {
    if (event.detail.target.classList?.contains('noticias-container') ||
        event.detail.target.id === 'noticias-container') {
      setTimeout(inicializarFiltros, 100);
    }
  });

// ========================================
// GERADOR DE ABAS (usa DADOS_CATEGORIAS)
// ========================================

function criarAbaHTML(catKey) {
    const dados = DADOS_CATEGORIAS[catKey];
    if (!dados) return '';
  
    // Checkbox de categoria
    const checkCat = `
      <div class="grupo-tags grupo-categoria-aba">
        <span class="subtitulo-tag">Categoria:</span>
        <label class="checkbox-tag">
          <input type="checkbox" name="categoria" value="${catKey}" data-tipo="categoria">
          <span class="tag tag-preview categoria">${dados.label}</span>
        </label>
      </div>`;
  
    // Equipes
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
  
    // Pilotos
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
  
    // Pistas
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
    // Mostra a primeira aba
    const primeiraAba = container.querySelector('.aba-painel');
    if (primeiraAba) primeiraAba.style.display = 'block';
  }
  
  // Troca de aba
  document.addEventListener('click', e => {
    const btn = e.target.closest('.aba-btn');
    if (!btn) return;
  
    const catKey = btn.dataset.aba;
  
    // Atualiza botões
    document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('aba-ativa'));
    btn.classList.add('aba-ativa');
  
    // Mostra painel correto
    document.querySelectorAll('.aba-painel').forEach(p => p.style.display = 'none');
    const painel = document.getElementById(`aba-${catKey}`);
    if (painel) painel.style.display = 'block';
  });
  
  // ========================================
  // GERENCIADOR DE TAGS (adaptado para abas)
  // ========================================
  
  let limpezaEmAndamento = false;
  
  const selecoes = {
    categoria: new Set(),
    equipe: new Set(),
    piloto: new Set(),
    pista: new Set(),
  };
  const limites = { categoria: 1, equipe: 4, piloto: 4, pista: 4 };
  
  function getTipoTag(checkbox) {
    return checkbox.dataset.tipo || null;
  }
  
  function encontrarCheckbox(valor, tipo) {
    return document.querySelector(
      `.checkbox-tag input[type="checkbox"][value="${valor}"][data-tipo="${tipo}"]`
    );
  }
  
  function atualizarContadores() {
    // Contadores por aba
    Object.keys(DADOS_CATEGORIAS).forEach(catKey => {
      ['equipes', 'pilotos', 'pistas'].forEach(grupo => {
        const el = document.getElementById(`count-${grupo}-${catKey}`);
        if (!el) return;
        const tipo = grupo === 'equipes' ? 'equipe' : grupo === 'pilotos' ? 'piloto' : 'pista';
        // Conta só os checkboxes desta categoria
        const selecionadosNaCat = document.querySelectorAll(
          `#aba-${catKey} input[data-tipo="${tipo}"]:checked`
        ).length;
        const limite = limites[tipo];
        el.textContent = `(${selecionadosNaCat}/${limite})`;
      });
    });
  }
  
  function atualizarBotaoLimpar() {
    const btn = document.getElementById('btn-limpar-todas');
    if (!btn) return;
    const temTags = Object.values(selecoes).some(set => set.size > 0);
    btn.style.display = temTags ? 'block' : 'none';
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
  
  // Collapsible + Limpar (event delegation)
  document.addEventListener('click', e => {
    if (e.target.classList.contains('collapsible-header')) {
      const targetId = e.target.getAttribute('data-target');
      const content  = document.getElementById(targetId);
      if (content) {
        content.classList.toggle('show');
        e.target.classList.toggle('active');
      }
    }
    if (e.target.id === 'btn-limpar-todas' || e.target.closest('#btn-limpar-todas')) {
      limparTodasTags();
    }
  });
  
  // Change de checkboxes
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
  
    const jaSelecionado = selecoes[tipo].has(valor);
  
    if (checkbox.checked) {
      if (jaSelecionado) { checkbox.checked = false; return; }
  
      if (selecoes[tipo].size >= limites[tipo]) {
        checkbox.checked = false;
        const msgs = {
          categoria: '⚠️ Só 1 categoria permitida.',
          equipe:    `⚠️ Máximo de ${limites.equipe} equipes atingido.`,
          piloto:    `⚠️ Máximo de ${limites.piloto} pilotos atingido.`,
          pista:     `⚠️ Máximo de ${limites.pista} pistas atingido.`,
        };
        if (aviso) {
          aviso.textContent = msgs[tipo];
          aviso.style.cssText = 'display:block;color:#d32f2f;background:#ffebee;padding:0.5rem;border-radius:4px;border-left:3px solid #d32f2f;font-size:0.9rem';
          setTimeout(() => { aviso.style.display = 'none'; }, 3500);
        }
        return;
      }
  
      selecoes[tipo].add(valor);
  
      const clone = tagPreview.cloneNode(true);
      clone.classList.add('tag-selecionada');
      clone.classList.remove('tag-preview');
      clone.dataset.tagValue = valor;
      clone.dataset.tagTipo  = tipo;
      clone.style.cursor = 'pointer';
  
      clone.onclick = function(ev) {
        if (ev.target.classList.contains('remove-tag')) return;
        ev.stopPropagation();
        const cb = encontrarCheckbox(valor, tipo);
        if (cb && cb.checked) {
          cb.checked = false;
          cb.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
  
      const btn = document.createElement('span');
      btn.className  = 'remove-tag';
      btn.innerHTML  = '&times;';
      btn.style.cssText = 'margin-left:0.4rem;font-weight:bold;cursor:pointer;opacity:0.7';
      btn.onclick = function(ev) {
        ev.stopPropagation();
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
  
  // ========================================
  // INICIALIZAÇÃO
  // ========================================
  function inicializarPublicar() {
    renderizarAbas();
    atualizarContadores();
    atualizarBotaoLimpar();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarPublicar);
  } else {
    inicializarPublicar();
  }
  document.addEventListener('htmx:afterSwap', inicializarPublicar);