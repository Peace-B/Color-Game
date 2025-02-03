// DOM Elements 
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOption = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

// Define the values
let score = 0;
let correctColor = "";
const colors = ["blue", "green", "red", "brown", "pink", "gold"];

// Function to generate a random color
function generateRandomColor() {
    // Hide the color box initially (empty or transparent)
    colorBox.style.backgroundColor = 'transparent'; 

    // Pick the correct color randomly
    correctColor = colors[Math.floor(Math.random() * colors.length)];

    // Create a copy of the colors array and shuffle it to ensure uniqueness
    let shuffledColors = [...colors];
    shuffledColors = shuffledColors.sort(() => Math.random() - 0.5);

    // Ensure the correct color is in the options and that no duplicates occur
    let colorOptions = shuffledColors.slice(0, 5); // Get 5 random colors
    if (!colorOptions.includes(correctColor)) {
        colorOptions.push(correctColor); // Add the correct color if it's not already included
    }
    colorOptions = colorOptions.sort(() => Math.random() - 0.5); // Shuffle again

    // Set color options for buttons
    colorOption.forEach((btn, index) => {
        btn.style.backgroundColor = colorOptions[index];
        btn.classList.remove("correct", "wrong");
        btn.disabled = false;
        btn.addEventListener("click", checkGuess);
    });

    // Reset game status
    gameStatus.textContent = "Guess The Color!";
}

function checkGuess(event) {
    const selectedColor = event.target.style.backgroundColor;

    // Reveal the correct color in the color box after the guess
    colorBox.style.backgroundColor = correctColor;

    if (selectedColor === correctColor) {
        score++;
        gameStatus.textContent = "Correct!";
        event.target.classList.add("correct");
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        event.target.classList.add("wrong");
    }

    // Update score
    scoreDisplay.textContent = score;
    disableButtons();
}

function disableButtons() {
    colorOption.forEach((btn) => {
        btn.disabled = true;
    });
}

// New game button functionality
newGameButton.addEventListener('click', generateRandomColor);

// Initialize the game
generateRandomColor();
