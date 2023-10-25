Here's a code example that demonstrates a simple web-based game called "Memory Game". This game challenges the user to test their memory by remembering the sequence of colors displayed and repeating it correctly.

/* memoryGame.js */

// Define an array of colors
const colors = ["red", "blue", "green", "yellow"];

// Define the main game object
const memoryGame = {
  sequence: [],
  userSequence: [],
  level: 1,
  score: 0,
  gameStarted: false,
  
  // Function to start/restart the game
  startGame() {
    this.sequence = [];
    this.userSequence = [];
    this.level = 1;
    this.score = 0;
    this.gameStarted = true;
    this.nextLevel();
  },
  
  // Function to generate random color sequence
  generateSequence() {
    for (let i = 0; i < this.level; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      this.sequence.push(colors[randomIndex]);
    }
  },
  
  // Function to show the color sequence to the player
  showSequence() {
    this.gameStarted = false;
    let i = 0;
    const interval = setInterval(() => {
      this.highlightColor(this.sequence[i]);
      i++;
      
      if (i >= this.sequence.length) {
        clearInterval(interval);
        this.gameStarted = true;
      }
    }, 1000);
  },
  
  // Function to highlight a color by flashing it
  highlightColor(color) {
    const element = document.querySelector(`[data-color="${color}"]`);
    element.classList.add("highlight");
    setTimeout(() => {
      element.classList.remove("highlight");
    }, 500);
  },
  
  // Function to handle user input
  handleInput(event) {
    if (!this.gameStarted) return;
    
    const selectedColor = event.target.dataset.color;
    this.highlightColor(selectedColor);
    this.userSequence.push(selectedColor);
    
    // Check if user input is correct
    if (this.userSequence.length === this.sequence.length) {
      if (this.checkUserSequence()) {
        this.score += this.level * 10;
        this.nextLevel();
      } else {
        this.gameOver();
      }
    }
  },
  
  // Function to check if user's sequence matches the computer sequence
  checkUserSequence() {
    for (let i = 0; i < this.sequence.length; i++) {
      if (this.sequence[i] !== this.userSequence[i]) {
        return false;
      }
    }
    return true;
  },
  
  // Function to move to the next level
  nextLevel() {
    this.level++;
    this.userSequence = [];
    this.generateSequence();
    this.updateScore();
    this.showSequence();
  },
  
  // Function to update the score on the UI
  updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `Score: ${this.score}`;
  },
  
  // Function to handle game over
  gameOver() {
    alert("Game Over! Please try again.");
    this.sequence = [];
    this.userSequence = [];
    this.level = 1;
    this.score = 0;
    this.updateScore();
    this.showSequence();
  }
};

// Add event listeners
const squares = document.querySelectorAll(".square");
squares.forEach(square => {
  square.addEventListener("click", event => {
    memoryGame.handleInput(event);
  });
});

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  memoryGame.startGame();
});