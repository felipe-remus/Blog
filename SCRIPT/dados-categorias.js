// ========================================
// DADOS-CATEGORIAS.JS — Base de dados por categoria
// Depende de: globals.js
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
            { value: 'alex-albon',         label: 'Alex Albon' },
            { value: 'arvid-lindblad',     label: 'Arvid Lindblad' },
            { value: 'carlos-sainz',       label: 'Carlos Sainz' },
            { value: 'charles-leclerc',    label: 'Charles Leclerc' },
            { value: 'esteban-ocon',       label: 'Esteban Ocon' },
            { value: 'fernando-alonso',    label: 'Fernando Alonso' },
            { value: 'franco-colapinto',   label: 'Franco Colapinto' },
            { value: 'george-russell',     label: 'George Russell' },
            { value: 'gabriel-bortoleto',  label: 'Gabriel Bortoleto' },
            { value: 'isaac-hadjar',       label: 'Isaac Hadjar' },
            { value: 'kimi-antonelli',     label: 'Kimi Antonelli' },
            { value: 'lando-norris',       label: 'Lando Norris' },
            { value: 'lewis-hamilton',     label: 'Lewis Hamilton' },
            { value: 'liam-lawson',        label: 'Liam Lawson' },
            { value: 'lance-stroll',       label: 'Lance Stroll' },
            { value: 'max-verstappen',     label: 'Max Verstappen' },
            { value: 'nico-hulkenberg',    label: 'Nico Hülkenberg' },
            { value: 'oliver-bearman',     label: 'Oliver Bearman' },
            { value: 'oscar-piastri',      label: 'Oscar Piastri' },
            { value: 'pierre-gasly',       label: 'Pierre Gasly' },
            { value: 'sergio-perez',       label: 'Sergio Pérez' },
            { value: 'valtteri-bottas',    label: 'Valtteri Bottas' },
        ],
        pistas: [
            { value: 'australia',      label: 'Austrália' },
            { value: 'china',          label: 'China' },
            { value: 'japao',          label: 'Japão' },
            { value: 'barein',         label: 'Barein' },
            { value: 'arabia-saudita', label: 'Arábia Saudita' },
            { value: 'miami',          label: 'Miami' },
            { value: 'canada',         label: 'Canadá' },
            { value: 'monaco',         label: 'Mônaco' },
            { value: 'barcelona',      label: 'Barcelona' },
            { value: 'austria',        label: 'Áustria' },
            { value: 'inglaterra',     label: 'Inglaterra' },
            { value: 'belgica',        label: 'Bélgica' },
            { value: 'hungria',        label: 'Hungria' },
            { value: 'holanda',        label: 'Holanda' },
            { value: 'monza',          label: 'Monza' },
            { value: 'madrid',         label: 'Madri' },
            { value: 'azerbaijao',     label: 'Azerbaijão' },
            { value: 'singapura',      label: 'Singapura' },
            { value: 'austin',         label: 'Austin' },
            { value: 'mexico',         label: 'México' },
            { value: 'brasil',         label: 'Brasil' },
            { value: 'las-vegas',      label: 'Las Vegas' },
            { value: 'qatar',          label: 'Catar' },
            { value: 'abu-dhabi',      label: 'Abu Dhabi' },
        ],
    },

    f2: {
        label: 'Fórmula 2',
        equipes: [],
        pilotos: [],
        pistas: [
            { value: 'barein',         label: 'Barein' },
            { value: 'arabia-saudita', label: 'Arábia Saudita' },
            { value: 'australia',      label: 'Austrália' },
            { value: 'miami',          label: 'Miami' },
            { value: 'monaco',         label: 'Mônaco' },
            { value: 'barcelona',      label: 'Barcelona' },
            { value: 'austria',        label: 'Áustria' },
            { value: 'inglaterra',     label: 'Inglaterra' },
            { value: 'hungria',        label: 'Hungria' },
            { value: 'belgica',        label: 'Bélgica' },
            { value: 'monza',          label: 'Monza' },
            { value: 'azerbaijao',     label: 'Azerbaijão' },
            { value: 'singapura',      label: 'Singapura' },
            { value: 'austin',         label: 'Austin' },
            { value: 'abu-dhabi',      label: 'Abu Dhabi' },
        ],
    },

    f3: {
        label: 'Fórmula 3',
        equipes: [],
        pilotos: [],
        pistas: [
            { value: 'barein',    label: 'Barein' },
            { value: 'australia', label: 'Austrália' },
            { value: 'monaco',    label: 'Mônaco' },
            { value: 'barcelona', label: 'Barcelona' },
            { value: 'austria',   label: 'Áustria' },
            { value: 'inglaterra',label: 'Inglaterra' },
            { value: 'hungria',   label: 'Hungria' },
            { value: 'belgica',   label: 'Bélgica' },
            { value: 'monza',     label: 'Monza' },
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
            { value: 'barein',    label: 'Barein' },
            { value: 'miami',     label: 'Miami' },
            { value: 'monaco',    label: 'Mônaco' },
            { value: 'austria',   label: 'Áustria' },
            { value: 'inglaterra',label: 'Inglaterra' },
            { value: 'holanda',   label: 'Holanda' },
            { value: 'singapura', label: 'Singapura' },
            { value: 'austin',    label: 'Austin' },
            { value: 'abu-dhabi', label: 'Abu Dhabi' },
        ],
    },

    fe: {
        label: 'Fórmula E',
        equipes: [
            { value: 'andretti-fe', label: 'Andretti Formula E' },
            { value: 'citroen-racing', label: 'Citroëin Racing' },
            { value: 'ds-penske', label: 'DS Penske' },
            { value: 'envision-racing', label: 'Envision Racing' },
            { value: 'jaguar-tcs-racing', label: 'Jaguar TCS Racing' },
            { value: 'lola-yamaha-abt-fe', label: 'Lola Yamaha ABT FE' },
            { value: 'mahindra-racing', label: 'Mahindra Racing' },
            { value: 'nissan-formula-e', label: 'Nissan Formula E' },
            { value: 'porsche-formula-e', label: 'Porsche Formula E' },
        ],
        pilotos: [
            { value: 'antonio-felix-da-costa', label: 'António Felix da Costa' },
            { value: 'dan-ticktum', label: 'Dan Ticktum' },
            { value: 'edoardo-mortara', label: 'Edoardo Mortara' },
            { value: 'felipe-drugovich', label: 'Felipe Drugovich' },
            { value: 'jake-dennis', label: 'Jake Dennis' },
            { value: 'jean-eric-vergne', label: 'Jean-Éric Vergne' },
            { value: 'joel-eriksson', label: 'Joel Eriksson' },
            { value: 'lucas-di-grassi', label: 'Lucas Di Grassi' },
            { value: 'maximilian-gunther', label: 'Maximilian Günther' },
            { value: 'mitch-evans', label: 'Mitch Evans' },
            { value: 'nico-muller', label: 'Nico Müller' },
            { value: 'nick-cassidy', label: 'Nick Cassidy' },
            { value: 'norman-nato', label: 'Norman Nato' },
            { value: 'nyck-de-vries', label: 'Nyck de Vries' },
            { value: 'oliver-rowland', label: 'Oliver Rowland' },
            { value: 'pascal-wehrlein', label: 'Pascal Wehrlein' },
            { value: 'pepe-marti', label: 'Pepe Martí' },
            { value: 'sebastien-buemi', label: 'Sébastien Buemi' },
            { value: 'taylor-barnard', label: 'Taylor Barnard' },
            { value: 'zane-maloney', label: 'Zane Maloney' },
        ],
        pistas: [
            { value: 'sao-paulo', label: 'São Paulo' },
            { value: 'mexico-city', label: 'Mexico City' },
            { value: 'miami', label: 'Miami' },
            { value: 'diriyah', label: 'Diriyah' },
            { value: 'madrid', label: 'Madrid' },
            { value: 'berlin', label: 'Berlin' },
            { value: 'monaco', label: 'Monaco' },
            { value: 'shanghai', label: 'Shanghai' },
            { value: 'tokyo', label: 'Tokyo' },
            { value: 'london', label: 'London' }
        ],
    },

    indy: {
        label: 'IndyCar Series',
        equipes: [
            { value: 'aj-foyt-enterprises', label: 'A.J. Foyt Enterprises' },
            { value: 'andretti-global', label: 'Andretti Global' },
            { value: 'arrow-mclaren', label: 'Arrow McLaren' },
            { value: 'chip-ganassi-racing', label: 'Chip Ganassi Racing' },
            { value: 'dale-coyne-racing', label: 'Dale Coyne Racing' },
            { value: 'dreyer-reinbold-racing', label: 'Dreyer & Reinbold Racing' },
            { value: 'ed-carpenter-racing', label: 'Ed Carpenter Racing' },
            { value: 'juncos-hollinger-racing', label: 'Juncos Hollinger Racing' },
            { value: 'meyer-shank-racing', label: 'Meyer Shank Racing w/ Curb-Agajanian' },
            { value: 'rahal-letterman-lanigan-racing', label: 'Rahal Letterman Lanigan Racing' },
            { value: 'team-penske', label: 'Team Penske' }
        ],
        pilotos: [
            { value: 'alex-palou', label: 'Alex Palou' },
            { value: 'alexander-rossi', label: 'Alexander Rossi' },
            { value: 'caio-collet', label: 'Caio Collet' },
            { value: 'christian-lundgaard', label: 'Christian Lundgaard' },
            { value: 'christian-rasmussen', label: 'Christian Rasmussen' },
            { value: 'david-malukas', label: 'David Malukas' },
            { value: 'dennis-hauger', label: 'Dennis Hauger' },
            { value: 'ed-carpenter', label: 'Ed Carpenter' },
            { value: 'jack-harvey', label: 'Jack Harvey' },
            { value: 'josef-newgarden', label: 'Josef Newgarden' },
            { value: 'kyle-kirkwood', label: 'Kyle Kirkwood' },
            { value: 'kyffin-simpson', label: 'Kyffin Simpson' },
            { value: 'louis-foster', label: 'Louis Foster' },
            { value: 'marcus-ericsson', label: 'Marcus Ericsson' },
            { value: 'mick-schumacher', label: 'Mick Schumacher' },
            { value: 'nolan-siegel', label: 'Nolan Siegel' },
            { value: 'pato-oward', label: 'Pato O\'Ward' },
            { value: 'romain-grosjean', label: 'Romain Grosjean' },
            { value: 'ryan-hunter-reay', label: 'Ryan Hunter-Reay' },
            { value: 'santino-ferrucci', label: 'Santino Ferrucci' },
            { value: 'scott-dixon', label: 'Scott Dixon' },
            { value: 'scott-mclaughlin', label: 'Scott McLaughlin' },
            { value: 'will-power', label: 'Will Power' }
        ],
        pistas: [
            { value: 'st-petersburg', label: 'St. Petersburg' }, // Florida
            { value: 'phoenix-raceway', label: 'Phoenix Raceway' }, // Arizona
            { value: 'texas-motor-speedway', label: 'Texas Motor Speedway' }, // Texas
            { value: 'barber-motorsports-park', label: 'Barber Motorsports Park' }, // Alabama
            { value: 'long-beach', label: 'Long Beach' }, // California (Long Beach)
            { value: 'indianapolis-motor-speedway', label: 'Indianapolis Motor Speedway' }, // Indiana
            { value: 'detroit', label: 'Detroit' }, // Michigan (A corrida é em Detroit, não há mais no Michigan Intl Speedway)
            { value: 'chicago-street-course', label: 'Chicago Street Course' }, // Illinois
            { value: 'road-america', label: 'Road America' }, // Elkhart Lake, Wisconsin
            { value: 'mid-ohio-sports-car-course', label: 'Mid-Ohio Sports Car Course' }, // Ohio
            { value: 'nashville-superspeedway', label: 'Nashville Superspeedway' }, // Tennessee
            { value: 'portland-international-raceway', label: 'Portland International Raceway' }, // Oregon
            { value: 'exhibition-place', label: 'Exhibition Place' }, // Ontario, Canada (Toronto)
            { value: 'milwaukee-mile', label: 'Milwaukee Mile' }, // West Allis, Wisconsin
            { value: 'weathertech-raceway-laguna-seca', label: 'WeatherTech Raceway Laguna Seca' } // Monterey, California
        ],
    },
};