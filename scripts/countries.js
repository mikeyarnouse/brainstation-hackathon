import { CountryApi } from "./countryApi.js";

const countryAPI = new CountryApi();

let countryArr = [];

const getCountries = async () => {
  let countries = await countryAPI.getCountries();
  for (let i of countries) {
    countryArr.push(i.name.common.toLowerCase());
  }
  console.log(countryArr);
};

getCountries();
console.log(countryArr);

let game = document.querySelector(".game");
const countryForm = document.getElementById("countryForm");
console.log(countryForm);
const countryInput = document.getElementById("countryInput");
const countryArea = document.querySelector(".game-countries-listed");
let score = document.querySelector(".game-content-score__amt");
let lives = document.querySelector(".game-content-lives__amt");
let startBtn = document.querySelector(".game-head__start");
let lost = false;

countryForm.addEventListener("submit", handleSubmit);

const countdownEl = document.querySelector(`.game-head__timeAmt`); //test
let seconds = 15;
function updateCountdown() {
  if (!lost) {
    if (seconds <= 0) {
      game.innerHTML = "";
      const youLostEle = document.createElement("h2");
      youLostEle.classList.add(".game__lost");
      youLostEle.innerText = "Times Up!";
      game.style.backgroundColor = "red";
      game.style.display = "flex";
      game.style.justifyContent = "center";
      game.style.alignContent = "center";
      youLostEle.style.display = "flex";
      youLostEle.style.justifyContent = "center";
      youLostEle.style.fontSize = "3rem";
      youLostEle.style.color = "red";

      score.innerText = Number(score.innerText);
      const yourScore = document.createElement("h3");
      yourScore.classList.add(`player-score`);
      yourScore.innerText = `Your Score: `;
      yourScore.style.display = "flex";
      yourScore.style.justifyContent = "center";
      yourScore.style.alignContent = "center";
      yourScore.appendChild(score);

      const btnDiv = document.createElement("div");
      btnDiv.classList.add("button-div");

      const playAgainBtn = document.createElement("button");
      playAgainBtn.classList.add("play-again__btn");
      playAgainBtn.textContent = `Play Again`;
      playAgainBtn.addEventListener("click", () => {
        handleClick();
        function handleClick() {
          location.reload();
        }
      });
      playAgainBtn.style.display = "flex";
      playAgainBtn.style.justifyContent = "center";
      playAgainBtn.style.alignContent = "center";

      btnDiv.appendChild(playAgainBtn);

      game.appendChild(youLostEle);
      game.appendChild(yourScore);
      game.appendChild(btnDiv);
    } else {
      seconds--;
      countdownEl.innerHTML = `${seconds}`;
    }
  }
}

function timerStart() {
  setInterval(updateCountdown, 1000);
}
let timerStarted = false;

function handleSubmit(e) {
  e.preventDefault();
  console.log(e.target.countries.value);

  if (!timerStarted) {
    timerStart();
    timerStarted = true;
  }

  if (Number(lives.innerText) > 0) {
    if (countryArr.includes(e.target.countries.value)) {
      seconds = 15;
      score.innerText = Number(score.innerText) + 1;

      let answer = document.createElement("p");
      answer.classList.add("game-countries-listed__correct");
      answer.innerText = e.target.countries.value + " ";

      let indexToRemove = countryArr.indexOf(e.target.countries.value);
      countryArr.splice(indexToRemove, 1);
      console.log(countryArr);

      countryArea.appendChild(answer);
    } else {
      lives.innerText = Number(lives.innerText) - 1;

      let answer = document.createElement("p");
      answer.classList.add("game-countries-listed__incorrect");
      answer.innerText = e.target.countries.value + " ";
      countryArea.appendChild(answer);
    }
  }

  if (Number(lives.innerText) === 0) {
    lost = true;
    game.innerHTML = "";
    const youLostEle = document.createElement("h2");
    youLostEle.classList.add(".game__lost");
    youLostEle.innerText = "You Lost!";
    game.style.backgroundColor = "red";
    game.style.display = "flex";
    game.style.justifyContent = "center";
    game.style.alignContent = "center";
    youLostEle.style.display = "flex";
    youLostEle.style.justifyContent = "center";
    youLostEle.style.fontSize = "3rem";
    youLostEle.style.color = "red";

    score.innerText = Number(score.innerText);

    const yourScore = document.createElement("h3");
    yourScore.innerText = `Your Score: `;
    yourScore.style.display = "flex";
    yourScore.style.justifyContent = "center";
    yourScore.style.alignContent = "center";

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("button-div");

    const playAgainBtn = document.createElement("button");
    playAgainBtn.classList.add("play-again__btn");
    playAgainBtn.textContent = `Play Again`;
    playAgainBtn.addEventListener("click", () => {
      handleClick();
      function handleClick() {
        location.reload();
      }
    });
    playAgainBtn.style.display = "flex";
    playAgainBtn.style.justifyContent = "center";
    playAgainBtn.style.alignContent = "center";

    btnDiv.appendChild(playAgainBtn);

    yourScore.appendChild(score);
    yourScore.appendChild(score);

    game.appendChild(youLostEle);
    game.appendChild(yourScore);
    game.appendChild(btnDiv);
  }

  countryForm.reset();
}
