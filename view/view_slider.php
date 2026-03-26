<?php
// Inicia sessão para verificar se usuário está logado (Mesma lógica do header e card)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$usuarioLogado = isset($_SESSION['usuario']);
?>
<!-- Slider Hero -->
<div class="slider-hero">
    <div class="slider-container">
        <!-- Slide 1 -->
        <div class="slide active">
            <div class="slide-background" style="background-image: url('img/img-slider/1-Eua-Rouge.png');"></div>
            <div class="slide-content">
                <h1>Últimas Noticias do Motorsport</h1>
                <div class="botoes-slider">
                    <a href="../noticias.html" class="botao-slider">Explorar Notícias</a>
                </div>
                <div class="area-colaboradores">
                    <p>Deseja contribuir com nosso conteúdo?</p>
                    <div class="botoes-slider">
                        <?php if ($usuarioLogado): ?>
                            <a href="../login.html" class="botao-slider">Mudar seus Dados</a>
                            <!-- Mostra Publicar apenas se ESTIVER logado -->
                            <a href="../escrever-noticia.html" class="botao-slider">Publique seu Artigo</a>
                        <?php else: ?>
                            <a href="../login.html" class="botao-slider">Login/Criar Conta</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <!-- Slide 2 -->
        <div class="slide">
            <div class="slide-background" style="background-image: url('img/img-slider/1-Piloto.png');"></div>
            <div class="slide-content">
                <h1>Modalidades em Destaque</h1>
                <div class="botoes-slider">
                    <a href="../historia.html" class="botao-slider">Descubra a História das Modalidades</a>
                </div>
                <div class="area-colaboradores">
                    <p>Junte-se à nossa equipe de colaboradores</p>
                    <div class="botoes-slider">
                        <?php if ($usuarioLogado): ?>
                            <a href="../login.html" class="botao-slider">Mudar seus Dados</a>
                            <!-- Mostra Publicar apenas se ESTIVER logado -->
                            <a href="../escrever-noticia.html" class="botao-slider">Publique sua Análise</a>
                        <?php else: ?>
                            <a href="../login.html" class="botao-slider">Login/Criar Conta</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <!-- Slide 3 -->
        <div class="slide">
            <div class="slide-background" style="background-image: url('img/img-slider/1-Senna.png');"></div>
            <div class="slide-content">
                <h1>Ayrton Senna: O Legado de um Ícone</h1>
                <div class="botoes-slider">
                    <a href="../senna.html" class="botao-slider">Descubra a Trajetória de Senna</a>
                </div>
                <div class="area-colaboradores">
                    <p>Compartilhe sua memória sobre Senna</p>
                    <div class="botoes-slider">
                        <?php if ($usuarioLogado): ?>
                            <a href="../login.html" class="botao-slider">Mudar seus Dados</a>
                            <!-- Mostra Publicar apenas se ESTIVER logado -->
                            <a href="../escrever-noticia.html" class="botao-slider">Publique sua Homenagem</a>
                        <?php else: ?>
                            <a href="../login.html" class="botao-slider">Login/Criar Conta</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Botões de navegação -->
    <button class="slider-nav slider-prev" onclick="changeSlide(-1)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </button>
    <button class="slider-nav slider-next" onclick="changeSlide(1)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </button>
    <!-- Indicadores (bolinhas) -->
    <div class="slider-indicators">
        <span class="indicator active" onclick="goToSlide(0)"></span>
        <span class="indicator" onclick="goToSlide(1)"></span>
        <span class="indicator" onclick="goToSlide(2)"></span>
    </div>
</div>