import { PokemonApi } from "./pokemonApi.js";

const backend = new PokemonApi();
const pokemonImgContainer = document.querySelector(".pokemon__img-container");
const score = document.querySelector(".pokemon__score-amt");
const countdownEl = document.querySelector(`.pokemon__timeAmt`);
let game = document.querySelector(".pokemon__game-container");

const pokemonForm = document.getElementById("pokeForm");
pokemonForm.addEventListener("submit", handleSubmit);

let pokemonArr = [];

async function getPokemonArray() {
  try {
    const res = await backend.getPokemon();
    for (let i of res) {
      pokemonArr.push(i.name);
    }
  } catch (e) {
    console.error(e);
  }
}

let randomNumber = Math.floor(Math.random() * pokemonArr.length);
async function displayRandom() {
  try {
    await getPokemonArray();
    randomNumber = Math.floor(Math.random() * pokemonArr.length);
    const randomPokemon = pokemonArr[randomNumber];
    console.log(randomPokemon);
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`
    );
    const spriteUrl = res.data.sprites.other.home.front_default;

    const pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("src", spriteUrl);
    pokemonImgContainer.innerHTML = "";
    pokemonImgContainer.appendChild(pokemonImage);
  } catch (e) {
    console.error(e);
  }
}
displayRandom();

let seconds = 15;

let timerStarted = false;

async function handleSubmit(e) {
  e.preventDefault();

  if (!timerStarted) {
    timerStart();
    timerStarted = true;
  }

  const answer = e.target.pokemon.value.toLowerCase();
  if (answer === pokemonArr[randomNumber]) {
    console.log("correct");
    seconds = 15;
    score.innerText = Number(score.innerText) + 1;
    await displayRandom();
  } else {
    console.log("false");
  }
  pokemonForm.reset();
}

function timerStart() {
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  if (seconds <= 0) {
    game.innerHTML = "";
    const youLostEle = document.createElement("h2");
    youLostEle.classList.add(".game__lost");
    youLostEle.innerText = "Times Up!";

    game.style.display = "flex";
    game.style.flexDirection = "column";
    game.style.justifyContent = "center";
    game.style.alignContent = "center";
    youLostEle.style.display = "flex";
    youLostEle.style.justifyContent = "center";
    youLostEle.style.fontSize = "3rem";

    score.innerText = Number(score.innerText);
    const yourScore = document.createElement("h3");
    yourScore.classList.add(`player-score`);
    yourScore.innerText = `Your Score: `;
    yourScore.style.display = "flex";
    yourScore.style.justifyContent = "center";
    yourScore.style.alignContent = "center";
    yourScore.style.marginTop = "2rem";
    yourScore.appendChild(score);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");

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

    buttonDiv.appendChild(playAgainBtn);

    game.appendChild(youLostEle);
    game.appendChild(yourScore);
    game.appendChild(buttonDiv);
  } else {
    seconds--;
    countdownEl.innerHTML = `${seconds}`;
  }
}
