<!-- Slider Hero -->
<div class="slider-hero">
    <div class="slider-container">
        
        <!-- Slide 1 -->
        <div class="slide active">
            <div class="slide-background" style="background-image: url('img/img-Slider/1-Eua-Rouge.png');"></div>
            <div class="slide-content">
                <h1><?= $titulo_slider[0]?></h1>
                <div class="botoes-slider">
                    <a href="noticias.html" class="botao-slider"><?=$botao1[0]?></a>
                </div>
                <div class="area-colaboradores">
                    <p><?=$sub_titulo[0]?></p>
                    <div class="botoes-slider">
                        <a href="login.html" class="botao-slider"><?=$botao2[0]?></a>
                        <a href="escrever-noticia.html" class="botao-slider"><?=$botao3[0]?></a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 2 -->
        <div class="slide">
            <div class="slide-background" style="background-image: url('img/img-Slider/1-Piloto.png');"></div>
            <div class="slide-content">
                <h1><?= $titulo_slider[1]?></h1>
                <div class="botoes-slider">
                    <a href="historia.html" class="botao-slider"><?=$botao1[1]?></a>
                </div>
                <div class="area-colaboradores">
                    <p><?=$sub_titulo[1]?></p>
                    <div class="botoes-slider">
                        <a href="login.html" class="botao-slider"><?=$botao2[1]?></a>
                        <a href="escrever-noticia.html" class="botao-slider"><?=$botao3[1]?></a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 3 -->
        <div class="slide">
            <div class="slide-background" style="background-image: url('img/img-Slider/1-Senna.png');"></div>
            <div class="slide-content">
                <h1><?= $titulo_slider[2]?></h1>
                <div class="botoes-slider">
                    <a href="senna.html" class="botao-slider"><?=$botao1[2]?></a>
                </div>
                <div class="area-colaboradores">
                    <p><?=$sub_titulo[2]?></p>
                    <div class="botoes-slider">
                        <a href="login.html" class="botao-slider"><?=$botao2[2]?></a>
                        <a href="escrever-noticia.html" class="botao-slider"><?=$botao3[2]?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Botões de navegação -->
    <button class="slider-nav slider-prev" onclick="changeSlide(-1)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    <button class="slider-nav slider-next" onclick="changeSlide(1)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>

    <!-- Indicadores (bolinhas) -->
    <div class="slider-indicators">
        <span class="indicator active" onclick="goToSlide(0)"></span>
        <span class="indicator" onclick="goToSlide(1)"></span>
        <span class="indicator" onclick="goToSlide(2)"></span>
    </div>
</div>