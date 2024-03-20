document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-btn');
    let currentPlayer = 'X';

    // Initialize the game board
    initializeBoard();

    // Function to initialize the game board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
    }

    // Function to handle cell clicks
    function handleCellClick(index) {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            checkWinner();
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const cells = document.querySelectorAll('.cell');
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            const cellA = cells[a].textContent;
            const cellB = cells[b].textContent;
            const cellC = cells[c].textContent;

            if (cellA && cellA === cellB && cellA === cellC) {
                highlightWinnerCells(cells[a], cells[b], cells[c]);
                alert(`Player ${cellA} wins!`);
                return;
            }
        }

        if ([...cells].every(cell => cell.textContent)) {
            alert("It's a draw!");
        }
    }

    // Function to highlight the winning cells
    function highlightWinnerCells(cellA, cellB, cellC) {
        cellA.style.backgroundColor = 'yellow';
        cellB.style.backgroundColor = 'yellow';
        cellC.style.backgroundColor = 'yellow';
    }

    // Event listener for the reset button
    resetButton.addEventListener('click', () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '';
        });
        currentPlayer = 'X';
    });
});
