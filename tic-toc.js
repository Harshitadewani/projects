const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Click event for each cell
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        // Check if the cell is empty and the game is active
        if (board[index] === "" && isGameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            
            if (isGameActive) { // Switch turn only if the game is still active
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    });
});

// Check for winner
function checkWinner() {
    for (let combo of winningCombinations) {
        let [a, b, c] = combo;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `🎉 Player ${board[a]} Wins!`;
            isGameActive = false;

            // Highlight winning cells in green
            cells[a].style.backgroundColor = "#90EE90";
            cells[b].style.backgroundColor = "#90EE90";
            cells[c].style.backgroundColor = "#90EE90";
            return;
        }
    }

    // Check for a tie
    if (!board.includes("")) {
        statusText.textContent = "😔 It's a Tie!";
        isGameActive = false;
    }
}

// Reset game
resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = ""; // Reset colors
    });
});
