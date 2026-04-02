<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ayrton Senna</title>

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/filtros.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/historia.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/noticias.css">
    <link rel="stylesheet" href="css/paginacao.css">
    <link rel="stylesheet" href="css/publicar.css">
    <link rel="stylesheet" href="css/slider.css">
    <link rel="stylesheet" href="css/tags.css">

    <script src="script/header.js" defer></script>
    <script src="script/historia.js" defer></script>
    <script src="script/login.js" defer></script>
    <script src="script/modal-noticia.js" defer></script>
    <script src="script/publicar.js" defer></script>
    <script src="script/slider.js" defer></script>

    <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js" integrity="sha384-/TgkGk7p307TH7EXJDuUlgG3Ce1UVolAOFopFekQkkXihi5u/6OCvVKyz1W+idaz" crossorigin="anonymous"></script>
</head>
<body>

    <div id="header">
        <?php require "../view/view_header.php"; ?>
    </div>

    <main>
        <div class="voltar-home">
            <a href="index.php" class="btn-voltar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Voltar para a Home</span>
            </a>
        </div>

        <!-- HERO COM FOTO SENNA (ESTÁTICO) -->
        <div class="slider-hero">
            <div class="slider-container">
                <div class="slide active">
                    <div class="slide-background" style="background-image: url('img/img-slider/1-Senna-2.png');"></div>
                </div>
            </div>
        </div>

        <div class="historia-container">
            <h1 class="titulo-principal">Ayrton Senna</h1>
            <p class="historia-subtitulo">A vida e o legado do maior piloto brasileiro de todos os tempos</p>

            <section class="historia-secao">
                <h2>Os Primeiros Anos e a Paixão pelos Karts</h2>
                <p>Ayrton Senna da Silva nasceu em 21 de março de 1960, em São Paulo, Brasil. Filho de Milton da Silva e Neyde Senna, cresceu em uma família de classe média alta no bairro do Santana. Desde muito cedo, o interesse pelos motores e pela velocidade era evidente — seu pai lhe presenteou com um kart aos quatro anos de idade, acendendo uma chama que jamais se apagaria.</p>
                <p>Aos 13 anos, Senna já competia em kartódromos locais com destaque, e aos 17 venceu o Campeonato Sul-Americano de Kart. Sua habilidade natural chamava atenção de todos que assistiam às corridas: uma combinação rara de suavidade no volante, leitura precisa da pista e uma competitividade fora do comum para a idade.</p>
                <div class="destaque">
                    <p><strong>O Início de Tudo:</strong> Em 1981, aos 21 anos, Senna deixou o Brasil e foi para a Inglaterra disputar a Fórmula Ford 1600. Na primeira temporada, venceu 12 das 20 corridas disputadas — um resultado extraordinário para um estreante.</p>
                </div>
                <p>Após consolidar sua reputação no kart, Senna traçou seu próprio caminho em direção à Europa. A decisão não foi fácil: ele chegou a cogitar abandonar o automobilismo para ajudar nos negócios da família, mas o apelo das pistas era irresistível.</p>
            </section>

            <section class="historia-secao">
                <h2>A Escalada pelas Categorias de Base</h2>
                <p>O percurso de Senna pelas categorias britânicas foi dominante e veloz. Após a Fórmula Ford 1600, ele competiu na Fórmula Ford 2000 em 1982, onde venceu os campeonatos britânico e europeu da modalidade. No ano seguinte, disputou a Fórmula 3 Britânica, em uma das temporadas mais dramáticas da categoria.</p>
                <p>A batalha pelo título da Fórmula 3 Britânica de 1983 com o britânico Martin Brundle é considerada uma das mais intensas da história das categorias de base.</p>
                <ul>
                    <li><strong>Fórmula Ford 1600 (1981):</strong> 12 vitórias em 20 corridas. Campeão no primeiro ano.</li>
                    <li><strong>Fórmula Ford 2000 (1982):</strong> Campeão Britânico e Campeão Europeu da categoria.</li>
                    <li><strong>Fórmula 3 Britânica (1983):</strong> Campeão em disputa histórica, com 12 vitórias em 20 etapas.</li>
                </ul>
                <p>O desempenho na F3 britânica colocou Senna no radar de todas as grandes equipes da Fórmula 1. Surpreendentemente, ele optou pela Toleman, equipe modesta mas que lhe ofereceu liberdade e oportunidade de crescimento.</p>
            </section>

            <section class="historia-secao">
                <h2>A Fórmula 1: Do Novato ao Tricampeão</h2>
                <p>Senna estreou na Fórmula 1 em 1984 pela equipe Toleman, num carro muito longe de ser competitivo para o título. Ainda assim, ele chamou a atenção do mundo inteiro no Grande Prêmio de Mônaco daquele ano, quando, em condições de chuva intensa, ameaçava roubar a vitória de Alain Prost quando a corrida foi encerrada prematuramente.</p>
                <p>Em 1985, Senna assinou com a Lotus, onde ficou por três temporadas. Ali conquistou suas primeiras vitórias na categoria, incluindo a memorável largada sob a chuva em Portugal em 1985 — primeira vitória de sua carreira na F1.</p>
                <div class="destaque">
                    <p><strong>Os Três Títulos Mundiais:</strong> Senna conquistou o Campeonato Mundial de Pilotos em 1988, 1990 e 1991, todos pela equipe McLaren-Honda. Em 1988, venceu 8 de 16 corridas, uma das temporadas mais dominantes da história da F1.</p>
                </div>
                <p>A rivalidade com o francês Alain Prost, seu companheiro de equipe na McLaren entre 1988 e 1989, é considerada a maior da história da Fórmula 1.</p>
                <h3>Recordes e Marcas Históricas</h3>
                <ul>
                    <li><strong>65 poles positions</strong> em 161 largadas — recorde que durou 16 anos até ser superado por Michael Schumacher.</li>
                    <li><strong>41 vitórias</strong> no total, com aproveitamento impressionante em circuitos de rua e condições de chuva.</li>
                    <li><strong>3 Campeonatos Mundiais</strong> (1988, 1990 e 1991), todos com a McLaren-Honda.</li>
                    <li>Recorde de vitórias no <strong>Grande Prêmio de Mônaco</strong>, com 6 triunfos.</li>
                </ul>
            </section>

            <section class="historia-secao">
                <h2>O Mágico das Pistas Molhadas</h2>
                <p>Se há uma marca que distingue Senna de qualquer outro piloto da história, é sua performance sob a chuva. Em condições adversas, quando a pista molhada tornava os carros imprevisíveis e perigosos, o brasileiro transformava o caos em arte.</p>
                <p>Senna explicava essas atuações com uma espiritualidade profunda. Em Donington Park, 1993, numa corrida sob chuva intensa, ele saiu da quinta posição na largada e ultrapassou quatro carros na primeira volta para assumir a liderança.</p>
                <div class="destaque">
                    <p><strong>A Volta de Donington (1993):</strong> Em uma única volta de abertura do GP da Europa, Senna ultrapassou Schumacher, Wendlinger, Hill e Prost, com o carro McLaren-Ford, apenas com maestria, intuição e coragem.</p>
                </div>
                <p>O próprio Senna descrevia entrar em um estado de transe durante suas melhores performances. Essa autoconsciência e profundidade psicológica tornavam Senna um fenômeno único no esporte.</p>
            </section>

            <section class="historia-secao">
                <h2>Imola, 1994: O Fim Prematuro</h2>
                <p>Em 1994, Senna havia assinado com a Williams, considerada o carro mais dominante do grid. Para muitos, era o início de uma nova era de conquistas para o brasileiro, que aos 34 anos ainda se encontrava em plena forma.</p>
                <p>No dia 1º de maio de 1994, durante o Grande Prêmio de San Marino em Imola, na Itália, na sétima volta da corrida, o Williams de Senna saiu da pista na curva Tamburello a mais de 300 km/h. O impacto foi fatal. Ayrton Senna morreu no Hospital Maggiore de Bolonha às 18h37 do mesmo dia, aos 34 anos.</p>
                <div class="destaque">
                    <p><strong>Um Luto Mundial:</strong> A morte de Senna abalou o Brasil de uma forma jamais vista antes ou depois. Seus funerais em São Paulo reuniram mais de três milhões de pessoas nas ruas. O governo decretou três dias de luto oficial.</p>
                </div>
                <p>O impacto da morte de Senna na Fórmula 1 foi profundo e duradouro. A FIA reformulou completamente os regulamentos de segurança do esporte, tornando o automobilismo moderno muito mais seguro.</p>
            </section>

            <section class="historia-secao">
                <h2>O Legado Imortal</h2>
                <p>Três décadas após sua morte, Ayrton Senna permanece vivo no coração dos brasileiros e de fãs ao redor do mundo. Pesquisas colocam-no consistentemente entre as figuras mais admiradas da história do Brasil.</p>
                <p>O Instituto Ayrton Senna, fundado por sua irmã Viviane Senna, já impactou a vida de mais de 26 milhões de crianças e jovens brasileiros por meio de programas de educação de qualidade.</p>
                <ul>
                    <li><strong>Instituto Ayrton Senna:</strong> Organização que promove a educação pública de qualidade no Brasil, tendo atingido milhões de estudantes desde 1994.</li>
                    <li><strong>Museu e Memorial:</strong> São Paulo abriga o museu dedicado à sua vida e carreira, visitado por fãs do mundo inteiro.</li>
                    <li><strong>Influência Cultural:</strong> Documentários, filmes, livros e obras de arte continuam sendo produzidos sobre sua vida, alcançando novas gerações de admiradores.</li>
                    <li><strong>Inspiração no Automobilismo:</strong> Pilotos como Felipe Massa, Rubens Barrichello e outros brasileiros citam Senna como inspiração direta para suas carreiras.</li>
                </ul>
                <p>Ayrton Senna foi muito mais que um piloto de Fórmula 1. Foi um artista que usava o carro como pincel, um filósofo que encontrava no limite da velocidade respostas para questões humanas profundas, e um símbolo nacional que representou o Brasil para o mundo com orgulho e excelência.</p>
            </section>
        </div>
    </main>

    <div id="footer">
        <?php require "../view/view_footer.php"; ?>
    </div>

</body>
</html>