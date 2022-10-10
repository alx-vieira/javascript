// Initial Data
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let player = 'X';
let warning = '';
let is_playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});


// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(is_playing && board[item] === '') {
        board[item] = player;
        renderBoard();
        checkGame();
        changePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'X' : 'O';

    for(let i in board) {
        board[i] = ''; 
    }

    renderBoard();
    renderInfo();

    is_playing = true;
}

function renderBoard() {
    for(let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`);
        if(board[i] !== '') {
            item.innerHTML = board[i];
        } else {
            item.innerHTML = '';
        }
    }   
    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function changePlayer() {
    player = (player === 'X') ? 'O' : 'X';
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('X')) {
        warning = 'O "X" venceu!';
        is_playing = false;
    } else if(checkWinnerFor('O')) {
        warning = 'O "O" venceu!'
        is_playing= false;
    } else if(isFull()) {
        warning = 'O jogo empatou';
        is_playing = false;
    }
}

function checkWinnerFor(i) {
    let possibilits = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3.b3.c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in possibilits) {
        let pArray = possibilits[w].split(',');
        let hasWon = pArray.every(option => board[option] === i);
        if(hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in board) {
        if(board[i] === '') {
            return false;
        }
    }

    return true;
}
