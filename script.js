// DOM Elements  
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOption = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

// Define the values
let score = 0;
let correctColor = "";
let correctShade = "";
const colors = ["blue", "green", "red", "brown", "pink", "gold"];
const colorShades = {
    blue: ["#0000ff", "#3a3ab0", "#4c4cb1", "#0b0b5b", "#37375d", "#737383"],
    green: ["#008000", "#148614", "#1bbd1b", "#4bbe4b", "#509050", "#8cd18c"],
    red: ["#ff0000", "#e52727", "#9b1a1a", "#731414", "#930404", "#f53434"],
    brown: ["#a52a2a23", "#8e31318d", "#a95555b2", "#922424c0", "#dd6d6dc0", "#3d0606c0"],
    pink: ["#ffc0cb", "#d5687a", "#e9a8b2", "#ca596a", "#a4356b", "#b44573"],
    gold: ["#ffd700", "#ac940e", "#f1e282", "#a0912c", "#645a1b", "#c6b01f"]
};

// Convert rgb to hex format
function rgbToHex(rgb) {
    let result = rgb.match(/^rgb\((\d+), (\d+), (\d+)\)$/);
    return result ? "#" + ((1 << 24) | (parseInt(result[1]) << 16) | (parseInt(result[2]) << 8) | parseInt(result[3])).toString(16).slice(1).toUpperCase() : rgb;
}

// Function to generate a random color and set up the game
function generateRandomColor() {
    // Pick the correct color randomly from predefined colors
    correctColor = colors[Math.floor(Math.random() * colors.length)];

    // Pick a random shade from the selected color
    correctShade = colorShades[correctColor][Math.floor(Math.random() * colorShades[correctColor].length)];

    // Set the color in the colorBox to the selected shade
    colorBox.style.backgroundColor = correctShade;

    // Get all the shades of the correct color
    let colorOptions = [...colorShades[correctColor]]; // Start with the shades of the correct color

    // Shuffle the color options to randomize their order
    colorOptions = colorOptions.sort(() => Math.random() - 0.5);

    // Set color options for buttons
    colorOption.forEach((btn, index) => {
        btn.style.backgroundColor = colorOptions[index]; // Apply shade to the button
        btn.disabled = false;  // Enable the button for clicking
        btn.classList.remove("correct", "wrong"); // Remove previous states
        btn.addEventListener("click", checkGuess); // Add event listener for checking the guess
    });

    // Display a message asking to guess the color
    gameStatus.textContent = "Guess the color!";
}

// Function to check if the guess is correct
function checkGuess(event) {
    const selectedColor = event.target.style.backgroundColor;

    // Convert the selectedColor to hex format
    const selectedColorHex = rgbToHex(selectedColor);

    // Show the correct color in the color box after the guess
    colorBox.style.backgroundColor = correctShade;

    // Compare selected color with the correct shade (exact match)
    if (selectedColorHex === correctShade.toUpperCase()) {
        score++;
        gameStatus.textContent = "Correct!";
        event.target.classList.add("correct");
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        event.target.classList.add("wrong");
    }

    // Update the score display
    scoreDisplay.textContent = score;

    // Disable all buttons after a guess
    disableButtons();
}

// Disable all color buttons after a guess
function disableButtons() {
    colorOption.forEach((btn) => {
        btn.disabled = true;
    });
}

// New game button functionality
newGameButton.addEventListener('click', () => {
    // score = 0;  // Reset the score
    scoreDisplay.textContent = score;
    generateRandomColor(); // Generate a new color and options
});

// Initialize the game
generateRandomColor();
