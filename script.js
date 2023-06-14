let boxes = document.getElementsByClassName("box"); //we access the element collection which represents the game board
let players = ['X', 'O'];
let activePlayer = 0;
let moves = 0;
let gameFinished = false;

function messageDisplay(status) { //we display the corresponding message
    let message = document.getElementById("message");
    message.innerText = "";
    if (status === "win") {
        message.innerText = `Player ${players[activePlayer]} win!`;
    } else if (status === "equal") {
        message.innerHTML = "You are both equally good!";
    } else {
        message.innerText = `Player ${players[activePlayer]} to move.`;
    }
}

function findWinner() { // search the winning player
    const winningCombinations = [ //all winning combinations
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; ++i) {
        const [a, b, c] = winningCombinations[i];
        if (boxes[a].innerText === players[activePlayer] &&
            boxes[b].innerText === players[activePlayer] &&
            boxes[c].innerText === players[activePlayer]) {
            messageDisplay('win');
            gameFinished = true;
            return;
        }
    }

    if (moves === 9) { //we check if it is equal
        messageDisplay('equal');
        gameFinished = true;
        return;
    }
    changeTurn();
}


function changeTurn() { //change the player
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    messageDisplay('move');
}

function makeMove() { //we make the move
    if (gameFinished || this.innerText !== '') {
        return;
    }
    this.innerText = players[activePlayer];
    moves++;
    findWinner();
}

window.onload = function() { //when loading the page, we add the click move event for each square.
    for (let i = 0; i < boxes.length; ++i) { 
        boxes[i].addEventListener('click', makeMove);
    }
}

function reload() { //start new game
    location.reload();
}