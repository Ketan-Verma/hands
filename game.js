init()
// Show the loader
document.getElementById('loader').style.display = 'block';
document.getElementById('webcam-container').style.visibility="hidden" //style.display = 'none';

// Hide the loader after a delay (in this case, 3 seconds)
setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('webcam-container').style.visibility="visible" //style.display = 'none';
}, 5000);

// Define the game choices as constants
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

// Define the game logic
function playRound(playerSelection, computerSelection) {
  // Make both inputs lowercase to standardize comparison
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  // Check for a tie
  if (playerSelection === computerSelection) {
    return 'Tie!';
  }

  // Check for player wins
  if (
    (playerSelection === ROCK && computerSelection === SCISSORS) ||
    (playerSelection === PAPER && computerSelection === ROCK) ||
    (playerSelection === SCISSORS && computerSelection === PAPER)
  ) {
    return `You win! ${playerSelection} beats ${computerSelection}.`;
  }

  // If it's not a tie and the player hasn't won, then the computer wins
  return `You lose! ${computerSelection} beats ${playerSelection}.`;
}

// Define a function to get the computer's choice
function computerPlay() {
  
    const choices = [ROCK, PAPER, SCISSORS];
    compChoice = choices[Math.floor(Math.random() * choices.length)]
    const countdownElement = document.getElementById('countdown');
    countdownElement.innerText = "my choice is "+compChoice
  
    return compChoice ;
}

// Define a function to handle a game round
function game() {
//   let playerSelection = prompt('Choose rock, paper, or scissors:');
  let computerSelection = computerPlay();
  const imgs = document.getElementById("imgs")
  imgs.style.display ="flex"
  const countdownElement = document.getElementById('countdown');
  countdownElement.innerText +="\n"+ playRound(choice.toUpperCase(), computerSelection)
  setActive(choice,"clrbg")
  console.log(playRound(choice.toUpperCase(), computerSelection));
}

// start event

// Start the game
function countdownAndCelebrate() {
    const elementsWithSameClass = document.getElementsByClassName("choice");
          for (let i = 0; i < elementsWithSameClass.length; i++) {
            elementsWithSameClass[i].classList.remove("clrbg");
          }
    // Get the element where the countdown and celebration message will be displayed
    const countdownElement = document.getElementById('countdown');
    // const imgs = document.getElementById("imgs")
    // imgs.style.display ="none"
    // Start the countdown
    let count = 3;
    countdownElement.innerText = count;
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.innerText = count;
            
      } else {
        clearInterval(countdownInterval);
        game();
      }
    }, 1000);
  }
  