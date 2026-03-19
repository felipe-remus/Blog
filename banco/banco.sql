.open banco/blog_racing.db
.mode table
.output banco/verificacao.txt;

DROP TABLE IF EXISTS noticias;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS perfis;
DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
	id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
	nome_categoria TEXT,
	sigla_categoria TEXT
);

INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('Formula 1','f1');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('Formula 2','f2');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('Formula 3','f3');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('Formula 4','f4');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('F1 Academy','f1academy');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('Formula E','fe');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('IndyCar','indy');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('World Endurance Championship','wec');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('World Rally Championship','wrc');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('Nascar','nascar');
INSERT INTO categorias (nome_categoria, sigla_categoria) VALUES ('MotoGP','moto');

CREATE TABLE perfis (
	id_perfil INTEGER PRIMARY KEY AUTOINCREMENT,
	nome_perfil TEXT
);

INSERT INTO perfis (nome_perfil) VALUES ('Admin');
INSERT INTO perfis (nome_perfil) VALUES ('Usuario');

CREATE TABLE usuarios (
	id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
	nome TEXT,
	user TEXT UNIQUE,
	email TEXT UNIQUE,
	telefone TEXT,
	senha TEXT,
	perfil_id INTEGER NOT NULL,
	FOREIGN KEY (perfil_id) REFERENCES perfis(id_perfil)
	ON DELETE RESTRICT
);

INSERT INTO usuarios (nome, user, email, telefone, senha, perfil_id) VALUES
('Lewis Hamilton', 'lewis_hamilton', 'lewishamilton44@gmail.com', '(51) 3227-7663', '12345', 2);

INSERT INTO usuarios (nome, user, email, telefone, senha, perfil_id) VALUES
('Carlos Mendes Silva', 'carlos.msilva99', 'carlos.msilva.ficticio@emailteste.com', '(21) 97654-3210', 'simulacao123', 2);

CREATE TABLE noticias (
	id_noticia INTEGER PRIMARY KEY AUTOINCREMENT,
	titulo_noticia TEXT,
	texto_noticia TEXT,
	imagem_noticia TEXT,
	data_noticia DATE,
	categoria_id INTEGER NOT NULL,
	usuario_id INTEGER NOT NULL,
	FOREIGN KEY (categoria_id) REFERENCES categorias(id_categoria)
	ON DELETE RESTRICT,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
	ON DELETE CASCADE
);

INSERT INTO noticias (titulo_noticia, texto_noticia, imagem_noticia, data_noticia, categoria_id, usuario_id) VALUES
('Max Verstappen acabou.', 'Verstappen tá um bagre nesse regulamento. kkkkkkkkkkkkk', 'img-noticia/1max-sid.jpg', '2026-03-16', 1, 1);

INSERT INTO noticias (titulo_noticia, texto_noticia, imagem_noticia, data_noticia, categoria_id, usuario_id) VALUES
('Rumores: BYD estuda entrada na F1 como fornecedora de motores?', 'Especulações no paddock indicam que a gigante chinesa BYD estaria avaliando uma possível incursão na Fórmula 1. Com o novo regulamento de motores sustentáveis previsto para 2026, a marca líder em veículos elétricos vê uma oportunidade de alinhar sua tecnologia de baterias ao esporte. Embora não haja confirmação oficial, fontes próximas à diretoria sugerem que um estudo de viabilidade está em andamento para decidir se a empresa entrará como construtora completa ou apenas como fornecedora de power units.', 'img-noticia/2byd-f1.jpg', '2026-03-18', 1, 2);

INSERT INTO noticias (titulo_noticia, texto_noticia, imagem_noticia, data_noticia, categoria_id, usuario_id) VALUES
(
    'Sébastien Ogier é confirmado como piloto principal do WRC em 2026',
    'Sébastien Ogier, oito vezes campeão mundial, foi oficialmente confirmado como piloto principal para a temporada de 2026. O francês continuará sua parceria com a equipe M-Sport Ford, buscando conquistar seu nono título mundial e consolidar sua posição como o piloto mais vitoriante da história do WRC. Com a mudança de regulamento técnico prevista para este ano, Ogier expressa entusiasmo em trabalhar com os novos protótipos Rally1, que prometem maior eficiência de combustível e desempenho aprimorado. Seu copiloto Julien Ingrassia permanecerá ao seu lado, mantendo uma das parcerias mais bem-sucedidas do motorsport contemporâneo. A dupla francêsa terá como adversários principais Elfyn Evans, também da M-Sport, e pilotos de outras fabricantes como Hyundai e Toyota. Ogier já venceu 57 eventos mundiais em sua carreira e continua demonstrando competitividade de alto nível. A temporada de 2026 promete ser emocionante, com diversas mudanças técnicas e novas frentes de competição entre as fabricantes. Especialistas apontam que a experiência de Ogier será crucial para o desenvolvimento do novo carro M-Sport Rally1, que sofreu significativas atualizações para se adequar às novas especificações do campeonato.',
    'img-noticia/3rally.jpg',
    '2026-03-17',
    9,
    1
);

PRAGMA table_info(categorias);
PRAGMA table_info(perfis);
PRAGMA table_info(usuarios);
PRAGMA table_info(noticias);