init()
document.getElementById('loader').style.display = 'block';
document.getElementById('webcam-container').style.visibility="hidden" //style.display = 'none';

setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('webcam-container').style.visibility="visible" //style.display = 'none';
}, 5000);

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
    return 'Tie!';
  }

  if (
    (playerSelection === ROCK && computerSelection === SCISSORS) ||
    (playerSelection === PAPER && computerSelection === ROCK) ||
    (playerSelection === SCISSORS && computerSelection === PAPER)
  ) {
    return `You win! ${playerSelection} beats ${computerSelection}.`;
  }

  return `You lose! ${computerSelection} beats ${playerSelection}.`;
}

function computerPlay() {
  
    const choices = [ROCK, PAPER, SCISSORS];
    compChoice = choices[Math.floor(Math.random() * choices.length)]
    const countdownElement = document.getElementById('countdown');
    countdownElement.innerText = "my choice is "+compChoice
  
    return compChoice ;
}

function game() {
  let computerSelection = computerPlay();
  const imgs = document.getElementById("imgs")
  imgs.style.display ="flex"
  const countdownElement = document.getElementById('countdown');
  countdownElement.innerText +="\n"+ playRound(choice.toUpperCase(), computerSelection)
  setActive(choice,"clrbg")
  console.log(playRound(choice.toUpperCase(), computerSelection));
}


function countdownAndCelebrate() {
    const elementsWithSameClass = document.getElementsByClassName("choice");
          for (let i = 0; i < elementsWithSameClass.length; i++) {
            elementsWithSameClass[i].classList.remove("clrbg");
          }
    const countdownElement = document.getElementById('countdown');
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
  