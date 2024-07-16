const pokemon = [
    {
        'name': 'bulbasaur',
        'img': '001.png'
    },
    {
        'name': 'charmander',
        'img': '004.png'
    },
    {
        'name': 'squirtle',
        'img': '007.png'
    },
    {
        'name': 'ekans',
        'img': '023.png'
    },
    {
        'name': 'pikachu',
        'img': '025.png'
    },
    {
        'name': 'meowth',
        'img': '052.png'
    },
    {
        'name': 'psyduck',
        'img': '054.png'
    },
    {
        'name': 'haunter',
        'img': '093.png'
    },
    {
        'name': 'koffing',
        'img': '109.png'
    },
    {
        'name': 'rhydon',
        'img': '112.png'
    },
    {
        'name': 'gyarados',
        'img': '130.png'
    },
    {
        'name': 'ditto',
        'img': '132.png'
    },
    {
        'name': 'eevee',
        'img': '133.png'
    },
    {
        'name': 'mewtwo',
        'img': '150.png'
    },
    {
        'name': 'totodile',
        'img': '158.png'
    },
    {
        'name': 'marill',
        'img': '183.png'
    },
    {
        'name': 'sudowoodo',
        'img': '185.png'
    },
    {
        'name': 'wobbuffet',
        'img': '202.png'
    },
    {
        'name': 'shuckle',
        'img': '213.png'
    },
    {
        'name': 'heracross',
        'img': '214.png'
    },
    {
        'name': 'suicune',
        'img': '245.png'
    },
    {
        'name': 'pupitar',
        'img': '247.png'
    },
    {
        'name': 'kecleon',
        'img': '352.png'
    },
    {
        'name': 'shelgon',
        'img': '372.png'
    },
    {
        'name': 'latios',
        'img': '381.png'
    },
    {
        'name': 'luxray',
        'img': '404.png'
    },
    {
        'name': 'riolu',
        'img': '447.png'
    },
    {
        'name': 'gallade',
        'img': '475.png'
    },
    {
        'name': 'dusknoir',
        'img': '477.png'
    },
    {
        'name': 'archeops',
        'img': '567.png'
    },
    {
        'name': 'volcarona',
        'img': '637.png'
    },
    {
        'name': 'toucannon',
        'img': '733.png'
    },
    {
        'name': 'orbeetle',
        'img': '826.png'
    },
    {
        'name': 'sprigatito',
        'img': '906.png'
    }
];

// Funzione che fa partire il timer
let timer;

function startTimer() {
    // Resettare il timer precedente se esiste
    if (timer) {
        clearInterval(timer);
    }

    // Reset delle variabili di conteggio
    let seconds = 0;
    let minutes = 0;

    // recupero gli elementi del dom che devono contenere queste informazioni
    let m = document.getElementById('minutes');
    let s = document.getElementById('seconds');

    timer = setInterval(function () {
        seconds++;

        if (seconds < 10) {
            s.innerHTML = `0${seconds}`;
        } else {
            s.innerHTML = `${seconds}`;
        }

        if (seconds > 59) {
            minutes++;
            if (minutes < 10) {
                m.innerHTML = `0${minutes}`;
            } else {
                m.innerHTML = `${minutes}`;
            }
            seconds = 0;
            s.innerHTML = `00`;
        }

    }, 1000);

    return timer;
}

// Funzione che crea la grafica delle carte di gioco
function createGraphicCard(pokemon, num) {
    const card = document.createElement('div');

    let { name, img } = pokemon;

    card.classList.add('game-card');
    card.style.width = `calc(100% / ${num} - 20px)`;

    card.style.margin = '10px';
    // funzione che mi definisce il data attribute name da assegnare al div card
    card.dataset.name = name;
    card.innerHTML += `<img src="./img/Poké_Ball_icon.bg.png" class="card-face-back">`;
    card.innerHTML += `<img src="./img/${img}" class="card-face-front">`;

    return card;
}

// Funzione che crea la nuova partita
function createNewGame(pokemon) {
    // rimuovo la classe d-none dal timer per visualizzarlo
    document.getElementById('time').classList.remove('d-none');

    // ogni volta che premo il pulsante per avviare una nuova partita, imposto i minuti ed i secondi a 0
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';

    // RECUPERO LA GRIGLIA DAL DOM
    const grid = document.getElementById('grid');
    // RECUPERO IL VALORE SELEZIONATO CON LA SELECT
    const select_value = parseInt(document.getElementById('difficulty').value);

    // SVUOTO LA GRIGLIA ATTUALE PER INIZIARNE RIEMPIRLA NUOVAMENTE
    grid.innerHTML = '';

    // DICHIARO LA VARIABILE CHE CONTERRA' IL NUMERO TOTALE DI CARTE NONCHE' INDICATRICE DEL LIVELLO DI DIFFICOLTA'
    let difficulty;

    // DETERMINO CON UNO SWITCH IL LIVELLO DI DIFFICOLTA' DELLA PARTITA
    switch (select_value) {
        case 1:
            difficulty = 16;
            break;
        case 2:
            difficulty = 36;
            break;
        default:
            alert('Seleziona prima un livello di difficoltà');
            return;
    }

    // GENERARE L'ARRAY DELLE CARTE CHE DEVONO ESSERE RANDOM, IN BASE AL LIVELLO DI DIFFICOLTA' SELEZIONATO
    // variabile array contenente le carte
    let arrayCards = createArrayCards(pokemon, difficulty);

    // CREO L'ARRAY DELLE CARTE DA GIOCO (DA GIOCO) A PARTIRE DA QUELLO PRECEDENTE E RANDOMICIZZANDONE L'ORDINE
    let totalCards = [...arrayCards, ...arrayCards].sort(() => 0.5 - Math.random());

    // RICHIAMO LA FUNZIONE CHE MI GENERA LE CARTE DA GIOCO NELLA GRIGLIA E MI IDENTIFICA LA LOGICA DI GIOCO
    createCards(totalCards, difficulty);
}

// Funzione che genera un array di carte casuali
function createArrayCards(array_pokemon, difficulty) {
    return array_pokemon.sort(() => 0.5 - Math.random()).slice(0, difficulty / 2);
}

// Funzione che genera le carte da gioco sulla griglia e gestisce la logica del gioco
function createCards(arrayCards, total_cards) {
    // DEFINIRE QUANTE CARTE CI SONO PER RIGA
    let cardsPerRow = Math.sqrt(total_cards);

    let flipped = []; // ARRAY CHE CONTIENE LE CARTE GIRATE PER CONTROLLARE SE SONO UGUALI
    let guessed = []; // ARRAY CHE CONTIENE LE CARTE INDOVINATE

    // faccio partire il timer attraverso la funzione startTimer e lo restituisco in una variabile
    let timer = startTimer();

    // RECUPERO LA GRIGLIA
    const grid = document.getElementById('grid');

    // CICLO L'ARRAY DELLE CARTE PER GENERARLE GRAFICAMENTE UNA PER UNA
    arrayCards.forEach((elem) => {
        // RICHIAMO LA FUNZIONE CHE CREA VISIVAMENTE LE CARTE UNA PER UNA
        const card = createGraphicCard(elem, cardsPerRow);

        card.addEventListener('click', function () {
            this.classList.add('flipped'); // AGGIUNGO LA CLASSE FLIPPED ALL'ELEMENTO CLICCATO

            // RECUPERO TUTTI GLI ELEMENTI CON LA CLASSE FLIPPED
            const flippedCards = document.querySelectorAll('.flipped');

            flipped.push(this.dataset.name);

            // SE L'ARRAY FLIPPED CONTIENE DUE ELEMENTI, LI CONFRONTO
            if (flipped.length === 2) {
                // VERIFICO SE I DUE ELEMENTI SONO UGUALI
                if (flipped[0] == flipped[1]) {
                    // SE HO INDOVINATO VADO A PUSHARE IL NOME DEL POKEMON ALL'INTERNO DELL'ARRAY GUESSED
                    guessed.push(flipped[0]);

                    // L'ARRAY FLIPPED DEVE ESSERE SVUOTATO
                    flipped = [];

                    // VERIFICO SE LA LUNGHEZZA DELL'ARRAY GUESSED E' UGUALE ALLA LUNGHEZZA DELL'ARRAY CHE STO CICLANDO (CARTE TOTALI) DIVISO DUE, ALLORA HO VINTO
                    if (guessed.length === arrayCards.length / 2) {
                        setTimeout(() => {
                            alert('Hai vinto!');
                            clearInterval(timer);

                            // Ripristino il pulsante "Inizia"
                            const button = document.getElementById('startBtn');
                            button.innerText = 'Inizia';
                            button.classList.remove('disabled');
                            button.removeAttribute('disabled');
                        }, 2000);
                    }

                } else {
                    // Se non ho indovinato, rimuovo la classe flipped dopo un secondo
                    flippedCards.forEach((elem) => {
                        setTimeout(() => elem.classList.remove('flipped'), 1000);
                    });

                    flipped = [];
                    guessed = [];
                }
            }
        });

        grid.appendChild(card);
    });
}

// RECUPERO IL PULSANTE DI INIZIO PARTITA
const button = document.getElementById('startBtn');
button.addEventListener('click', function () {
    // Verifico se il pulsante è stato già cliccato e ha il testo "Reset"
    if (this.innerText.toLowerCase() === 'reset') {
        // Azioni da eseguire per il reset
        resetGame();
        return;
    }

    // Azioni da eseguire al primo click su "Inizia"
    createNewGame(pokemon);

    // Cambio il testo del pulsante da "Inizia" a "Reset"
    this.innerText = 'Reset';
    // this.classList.add('disabled');
    // this.setAttribute('disabled', true);
});

// Funzione per il reset del gioco
function resetGame() {
    // Resetto il timer
    clearInterval(timer);
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';

    // Ripristino il testo e lo stato del pulsante "Inizia"
    button.innerText = 'Inizia';
    button.classList.remove('disabled');
    button.removeAttribute('disabled');

    // Rimuovo tutte le carte dalla griglia
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
}