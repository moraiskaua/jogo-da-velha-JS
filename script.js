// Início

let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let playable = false;
let turn = 'x';
let warning = '';

reset();

// Eventos

document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('click', (e) => {
        let loc = e.target.getAttribute('data-item');
        
        if(playable && board[loc] === '') {
            board[loc] = turn;
            renderBoard();
            togglePlayer();
        }
    });
});

// Funções

function reset() {
    warning = '';

    // definir de quem é a vez
    let random = Math.floor(Math.random() * 2);
    turn = random === 0 ? 'X' : 'O';

    // resetar o "tabuleiro"
    for(let i in board) {
        board[i] = '';
    }

    // renderizar tudo
    renderBoard();
    renderInfo();

    playable = true;
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
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    turn = turn === 'X' ? 'O' : 'X';
    renderInfo();
}

function checkGame() {
    if(checkWinner('X')) {
        warning = 'X';
        playable = false;
    } else if(checkWinner('O')) {
        warning = 'O';
        playable = false;
    } else if(isFull()) {
        warning = 'Deu Velha';
        playable = false;
    }
}

function checkWinner(i) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option=>board[option] === i);
        if(hasWon) return true;
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