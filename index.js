let player1, player2;
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let winningCombination = [];
let player1Score = 0;
let player2Score = 0;
const winningLines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal 1
    [2, 4, 6], // diagonal 2
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const startButton = document.getElementById('startGame');
const resetButton = document.getElementById('resetButton');
const boardElement = document.getElementById('board');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function startGame() {
    player1 = player1Input.value || 'Player 1';
    player2 = player2Input.value || 'Player 2';
    currentPlayer = 'X';
    gameActive = true;
    board.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
    message.textContent = `${player1}'s turn`;
    startButton.style.display = 'none';
    document.querySelector('.player-info').style.display = 'none';
    boardElement.style.display = 'grid';
    resetButton.style.display = 'inline-block';
    updateScores();
}

function resetGame() {
    gameActive = false;
    board.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
    message.textContent = '';
    startButton.style.display = 'inline-block';
    document.querySelector('.player-info').style.display = 'block';
    boardElement.style.display = 'none';
    resetButton.style.display = 'none';
    updateScores();
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const index = event.target.getAttribute('data-cell');
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        displayWinner();
    } else if (board.every(cell => cell !== '')) {
        displayTie();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer === 'X' ? player1 : player2}'s turn`;
    }
}

function checkWinner() {
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
            winningCombination = [a, b, c];
            drawWinningLine();
            return true;
        }
    }
    return false;
}

function displayWinner() {
    gameActive = false;
    const winner = currentPlayer === 'X' ? player1 : player2;
    message.textContent = `${winner} wins! Congratulations!`;
    if (currentPlayer === 'X') {
        player1Score += 10;
    } else {
        player2Score += 10;
    }
    updateScores();
}

function displayTie() {
    message.innerHTML = `<span class="tie-message">It's a tie!</span>`;
    gameActive = false;
}

function updateScores() {
    score1.textContent = `Player 1: ${player1Score}`;
    score2.textContent = `Player 2: ${player2Score}`;
}

function drawWinningLine() {
    const line = winningCombination;
    const winningLineDiv = document.createElement('div');
    const [start, end] = line;

    const startCell = cells[start];
    const endCell = cells[end];

    const top = startCell.offsetTop + startCell.offsetHeight / 2;
    const left = startCell.offsetLeft + startCell.offsetWidth / 2;
    const endTop = endCell.offsetTop + endCell.offsetHeight / 2;
    const endLeft = endCell.offsetLeft + endCell.offsetWidth / 2;

    winningLineDiv.classList.add('winner-line');
    document.body.appendChild(winningLineDiv);

    const deltaX = endLeft - left;
    const deltaY = endTop - top;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);


}
