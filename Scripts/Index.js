if (window.innerWidth >= 1000) {
  let moveBackgroundInterval;
  let moveRocketY = 30;
  let createMonsterInterval;
  let removePreviosMonster;
  let resetLeft;
  let idMonster;
  let scoreInterval;
  let score = 0;
  let recordScore = 0;
  const startGameBtn = document.querySelector(".start-game button");

  const moveBackground = () => {
    document.body.style.backgroundPositionY = `${moveRocketY}px`;
    moveRocketY += 30;
  };

  const removeMonster = (id) => {
    const monster = document.getElementById(id);
    monster.remove();
  };

  const checkGame = (el1, el2) => {
    const monster = el1.getBoundingClientRect();
    const rocket = el2.getBoundingClientRect();

    return !(
      monster.top > rocket.bottom ||
      monster.right < rocket.left ||
      monster.bottom < rocket.top ||
      monster.left > rocket.right
    );
  };

  const createMonster = () => {
    let randomLeft = Math.floor(Math.random() * 90);
    const random = Math.floor(Math.random() * 300);

    document.body.innerHTML += `
        <div class="monster" id="${idMonster}" style="top: 30px;left: ${randomLeft}%;">
          <img src="Images/Monster.svg" alt="Monster">
        </div>
      `;
    idMonster++;

    resetLeft = setTimeout(() => {
      randomLeft = 100;
    }, 3000);

    removePreviosMonster = setTimeout(() => {
      removeMonster(idMonster);
    }, 3000);
  };

  startGameBtn.addEventListener("click", () => {
    startGameBtn.parentElement.classList.add("hidden");
    document.addEventListener("mousemove", (e) => {
      const startAgainBtn = document.querySelector("#start-game-btn");
      // const scoreEl = document.querySelector(".scores");
      const soundGameOver = document.querySelector("#sound-game-over");
      const gameoverModal = document.querySelector(".game-over");
      const scoreNow = document.querySelector("#score-now");
      const record = document.querySelector("#record");
      const rocket = document.querySelector(".rocket");
      const monsters = document.querySelectorAll(".monster");

      rocket.style.top = `${e.pageY}px`;
      rocket.style.left = `${e.pageX}px`;

      monsters.forEach((m) => {
        const checkGameOver = checkGame(m, rocket);
        if (checkGameOver) {
          if (score > recordScore) {
            recordScore = score;
          }
          soundGameOver.play();
          gameoverModal.classList.remove("hidden");
          clearTimeout(removePreviosMonster);
          clearInterval(createMonsterInterval);
          clearInterval(moveBackgroundInterval);
          clearInterval(scoreInterval);
          scoreNow.textContent = score;
          record.textContent = recordScore;
          rocket.classList.add("hidden");
          monsters.forEach((mons) => {
            mons.remove();
          });
          startAgainBtn.addEventListener("click", () => {
            if (soundGameOver.played) {
              soundGameOver.pause();
            }
            moveBackgroundInterval = setInterval(moveBackground, 100);
            createMonsterInterval = setInterval(createMonster, 1500);
            scoreInterval = setInterval(plusScore, 200);
            rocket.classList.remove("hidden");
            gameoverModal.classList.add("hidden");
            moveRocketY = 30;
            score = 0;
          });
        }
      });
    });

    const plusScore = () => {
      const scoreEl = document.querySelector(".scores");
      score++;
      scoreEl.textContent = score;
    };

    moveBackgroundInterval = setInterval(moveBackground, 100);
    createMonsterInterval = setInterval(createMonster, 1000);
    scoreInterval = setInterval(plusScore, 200);
  });
} else {
  document.body.style.background = "#fff";
  document.body.innerHTML =
    "This game is made for devices larger than 1000 pixels!";
}
