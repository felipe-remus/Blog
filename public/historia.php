<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>História</title>

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
        <div class="historia-container">
            <h1 class="titulo-principal">História das Categorias de Automobilismo</h1>
            <p class="historia-subtitulo">Conheça a trajetória das principais competições de corrida do mundo</p>

            <div class="sumario-categorias">
                <nav class="abas-sumario" role="tablist">
                    <button type="button" onclick="scrollToSecao('f1', this)">Fórmula 1</button>
                    <button type="button" onclick="scrollToSecao('fe', this)">Fórmula E</button>
                    <button type="button" onclick="scrollToSecao('indy', this)">IndyCar</button>
                    <button type="button" onclick="scrollToSecao('wec', this)">WEC</button>
                    <button type="button" onclick="scrollToSecao('wrc', this)">WRC</button>
                    <button type="button" onclick="scrollToSecao('nascar', this)">Nascar</button>
                    <button type="button" onclick="scrollToSecao('motogp', this)">MotoGP</button>
                </nav>
            </div>

            <section id="f1" class="historia-secao">
                <h2>Fórmula 1</h2>
                <p>A Fórmula 1 é a categoria mais prestigiada do automobilismo mundial, representando o ápice da velocidade, tecnologia e competição em circuitos. Fundada oficialmente em 1950, quando foi realizado o primeiro Campeonato Mundial de Pilotos no circuito de Silverstone, Inglaterra, a F1 nasceu com o objetivo de padronizar as regras das corridas de monopostos que já aconteciam na Europa desde os anos 1920 e 1930.</p>
                <p>A primeira corrida oficial foi vencida por Giuseppe Farina, piloto italiano da equipe Alfa Romeo, que também se tornou o primeiro campeão mundial da história. Desde então, a categoria evoluiu dramaticamente, passando por diversas eras marcadas por avanços tecnológicos, mudanças de regulamentos e o surgimento de lendas do esporte.</p>
                <div class="destaque">
                    <p><strong>Eras Marcantes:</strong> A era turbo dos anos 1980, a dominância da McLaren-Honda no final da década, a revolução tecnológica dos anos 1990 com Williams e Ferrari, e mais recentemente, a era híbrida iniciada em 2014 com a dominação da Mercedes.</p>
                </div>
                <h3>Categorias de Base da Fórmula 1</h3>
                <p>O caminho até a Fórmula 1 é pavimentado por diversas categorias de formação, conhecidas como a "escada do automobilismo". Estas categorias foram desenvolvidas para preparar jovens pilotos com as habilidades técnicas e mentais necessárias para competir no mais alto nível.</p>
                <ul>
                    <li><strong>Fórmula 4:</strong> Porta de entrada para o automobilismo de monopostos, onde pilotos geralmente entre 15 e 18 anos dão seus primeiros passos em carros de corrida profissionais.</li>
                    <li><strong>F1 Academy:</strong> Categoria de base exclusiva para mulheres, que utiliza as mesmas regras da Formula 4, com o objetivo de desenvolver jovens pilotas para categorias mais altas do automobilismo.</li>
                    <li><strong>Fórmula 3:</strong> Categoria intermediária que oferece carros mais potentes e competitivos. Inclui campeonatos regionais e o prestigiado Campeonato FIA de Fórmula 3.</li>
                    <li><strong>Fórmula 2:</strong> Última etapa antes da F1 e principal categoria de acesso ao topo do automobilismo.</li>
                </ul>
                <p>Muitos dos pilotos de F1 passaram por essas categorias. A Fórmula 2, em especial, serve como vitrine para os olheiros das equipes de F1.</p>
            </section>

            <section id="fe" class="historia-secao">
                <h2>Fórmula E</h2>
                <p>A Fórmula E representa o futuro do automobilismo, sendo a primeira categoria de corrida totalmente elétrica sancionada pela FIA. Fundada em 2014, a categoria nasceu com uma missão clara: promover a mobilidade elétrica sustentável e servir como laboratório de desenvolvimento para tecnologias que eventualmente chegarão aos carros de rua.</p>
                <p>A primeira temporada foi realizada em 2014-2015, com corridas disputadas em circuitos de rua localizados em grandes centros urbanos ao redor do mundo.</p>
                <div class="destaque">
                    <p><strong>Inovação Tecnológica:</strong> Nas primeiras temporadas, os pilotos precisavam trocar de carro durante a corrida devido à limitação das baterias. A partir da temporada 2018-2019 (Gen2), isso não foi mais necessário, demonstrando a rápida evolução da tecnologia.</p>
                </div>
                <p>A categoria se destaca por seu formato único e inovador. O "Attack Mode" permite que pilotos obtenham temporariamente mais potência ao passar por uma zona específica da pista, adicionando um elemento estratégico emocionante.</p>
                <p>Grandes montadoras automotivas participam do campeonato, utilizando-o como plataforma de desenvolvimento para suas tecnologias de veículos elétricos.</p>
            </section>

            <section id="indy" class="historia-secao">
                <h2>IndyCar Series</h2>
                <p>A IndyCar Series é a principal categoria de monopostos dos Estados Unidos e representa uma das mais tradicionais competições de automobilismo do mundo. Suas raízes remontam ao início do século XX, com uma história profundamente entrelaçada com a lendária Indy 500, disputada pela primeira vez em 1911 no Indianapolis Motor Speedway.</p>
                <p>A categoria moderna da IndyCar como conhecemos hoje foi formada em 1996 pela Indy Racing League (IRL). Em 2008, houve a reunificação com a rival CART/Champ Car, criando a IndyCar Series unificada que existe atualmente.</p>
                <div class="destaque">
                    <p><strong>A Lendária Indy 500:</strong> Conhecida como "The Greatest Spectacle in Racing", a corrida de 500 milhas de Indianapolis é um dos eventos esportivos mais assistidos do mundo, com capacidade para mais de 250.000 espectadores.</p>
                </div>
                <p>A IndyCar se diferencia por sua versatilidade de pistas. Enquanto a F1 corre predominantemente em circuitos permanentes, a IndyCar compete em três tipos diferentes:</p>
                <ul>
                    <li><strong>Óvais:</strong> Pistas de alta velocidade e oval, onde os carros podem ultrapassar velocidades gigantes.</li>
                    <li><strong>Circuitos de rua:</strong> Traçados temporários em cidades, proporcionando corridas cheias de ultrapassagens.</li>
                    <li><strong>Circuitos permanentes:</strong> Pistas fechadas tradicionais, com traçado único e muita técnica de pilotagem.</li>
                </ul>
                <p>A categoria também é conhecida por suas corridas intensamente competitivas, onde ultrapassagens são frequentes e qualquer piloto pode vencer em um bom dia.</p>
            </section>

            <section id="wec" class="historia-secao">
                <h2>FIA World Endurance Championship (WEC)</h2>
                <p>O Campeonato Mundial de Endurance da FIA, conhecido como WEC, é a principal competição de corridas de longa duração do mundo. Relançado em 2012 pela FIA e pelo Automobile Club de l'Ouest (ACO), o campeonato retomou o legado das grandes corridas de resistência que marcaram o automobilismo ao longo do século XX.</p>
                <p>A categoria tem suas raízes profundas no Campeonato Mundial de Fabricantes de Carros Esportivos, que existiu em diferentes formatos entre as décadas de 1950 e 1990.</p>
                <div class="destaque">
                    <p><strong>As 24 Horas de Le Mans:</strong> Joia da coroa do WEC, disputada anualmente no lendário Circuit de la Sarthe, na França, desde 1923. É a corrida de resistência mais famosa do mundo e um dos eventos mais icônicos do esporte a motor.</p>
                </div>
                <p>O WEC é composto por provas realizadas em circuitos ao redor do mundo, com duração que varia entre 6 e 24 horas.</p>
                <h3>As Classes do WEC</h3>
                <ul>
                    <li><strong>Hypercar:</strong> A classe rainha do campeonato desde 2021, reunindo os protótipos mais avançados do mundo com fabricantes como Toyota, Ferrari, Porsche e Peugeot.</li>
                    <li><strong>LMP2:</strong> Classe de protótipos acessível a equipes privadas, com chassi e motores padronizados.</li>
                    <li><strong>LMGT3:</strong> Introduzida em 2024, utiliza carros GT3 de série, tornando o WEC acessível a mais equipes privadas.</li>
                </ul>
            </section>

            <section id="wrc" class="historia-secao">
                <h2>FIA World Rally Championship (WRC)</h2>
                <p>O Campeonato Mundial de Rali da FIA, conhecido mundialmente pela sigla WRC, é a principal competição de automobilismo fora de pista do planeta. Disputado desde 1973, o WRC leva pilotos e co-pilotos a enfrentar as condições mais extremas e variadas que o automobilismo pode oferecer: estradas de terra, neve, gelo, asfalto, lama e areia.</p>
                <div class="destaque">
                    <p><strong>O Rally de Monte-Carlo:</strong> Uma das provas mais antigas e emblemáticas do automobilismo, realizada desde 1911 nas estradas sinuosas dos Alpes franceses. Abertura tradicional do calendário do WRC.</p>
                </div>
                <h3>As Categorias de Carros</h3>
                <ul>
                    <li><strong>Rally1:</strong> A classe principal desde 2022, com carros híbridos de alto desempenho com tração nas quatro rodas, desenvolvidos por Toyota, Hyundai e Ford.</li>
                    <li><strong>Rally2:</strong> Categoria acessível a equipes privadas e pilotos em desenvolvimento.</li>
                    <li><strong>WRC2 e WRC3:</strong> Subdivisões da classe Rally2 que concedem pontuação separada a pilotos júnior e equipes privadas.</li>
                </ul>
                <h3>As Superfícies do Rali</h3>
                <ul>
                    <li><strong>Terra:</strong> A superfície clássica do rali, presente em provas como o Safari Rally no Quênia e o Rally da Sardenha.</li>
                    <li><strong>Neve e Gelo:</strong> Presentes no Rally da Suécia e etapas escandinavas.</li>
                    <li><strong>Asfalto:</strong> Provas como o Rally de Monte-Carlo e o Rally de Portugal.</li>
                    <li><strong>Areia e Cascalho:</strong> O mítico Rally do Safari e etapas no Oriente Médio.</li>
                </ul>
            </section>

            <section id="nascar" class="historia-secao">
                <h2>NASCAR</h2>
                <p>A NASCAR (National Association for Stock Car Auto Racing) é a maior e mais popular categoria de automobilismo dos Estados Unidos. Fundada em 1948 por Bill France Sr. em Daytona Beach, Flórida, a NASCAR nasceu da cultura popular americana das corridas de stock cars.</p>
                <p>O campeonato principal, hoje chamado de NASCAR Cup Series, reúne dezenas de corridas por temporada, percorrendo óvais icônicos, circuitos mistos e pistas de rua por todo o território americano.</p>
                <div class="destaque">
                    <p><strong>A Daytona 500:</strong> Conhecida como "The Great American Race", a corrida de abertura da temporada disputada no Daytona International Speedway é o evento mais prestigiado da NASCAR, realizada desde 1959.</p>
                </div>
                <h3>Estrutura da Competição</h3>
                <ul>
                    <li><strong>NASCAR Cup Series:</strong> O nível mais alto da competição, com os melhores pilotos e as maiores equipes.</li>
                    <li><strong>NASCAR Xfinity Series:</strong> Categoria intermediária que serve como trampolim para jovens pilotos.</li>
                    <li><strong>NASCAR Craftsman Truck Series:</strong> Categoria que utiliza picapes de corrida modificadas, considerada ponto de entrada de muitos pilotos.</li>
                </ul>
            </section>

            <section id="motogp" class="historia-secao">
                <h2>MotoGP</h2>
                <p>O MotoGP é o mais alto nível do motociclismo de velocidade no mundo, reunindo as motos mais rápidas e tecnologicamente avançadas já construídas para competição. Com raízes que remontam ao Campeonato Mundial de Motociclismo criado pela FIM em 1949, a categoria assumiu sua identidade atual em 2002.</p>
                <p>As motos da classe principal são protótipos fabricados exclusivamente para a competição, com motores de até 1000cc, capazes de superar os 350 km/h nas retas mais longas.</p>
                <div class="destaque">
                    <p><strong>O Circuito de Mugello e o GP da Itália:</strong> Uma das provas mais aguardadas do calendário, disputada no coração da Toscana italiana, onde dezenas de milhares de tifosi transformam cada corrida em um espetáculo único.</p>
                </div>
                <h3>A Estrutura do Campeonato</h3>
                <ul>
                    <li><strong>MotoGP:</strong> A classe rainha, com protótipos de 1000cc e participação de Honda, Yamaha, Ducati, Aprilia e KTM.</li>
                    <li><strong>Moto2:</strong> Categoria intermediária com motos de 765cc, principal porta de entrada para o MotoGP.</li>
                    <li><strong>Moto3:</strong> Categoria de base com motos de 250cc, voltada para jovens pilotos em início de carreira.</li>
                </ul>
                <p>O calendário do MotoGP percorre mais de quinze países por temporada, levando as corridas para circuitos na Europa, Ásia, Américas e Oceania.</p>
            </section>
        </div>
    </main>

    <div id="footer">
        <?php require "../view/view_footer.php"; ?>
    </div>

</body>
</html>