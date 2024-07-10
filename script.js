let score = 0;
let timeLeft = 15;
let timer;
let moveFlyTimer;

function startGame() {
  score = 0;
  timeLeft = 15;
  document.getElementById("score-count").textContent = score;
  document.getElementById("time-left").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(moveFlyTimer);
      alert("ゲーム終了! あなたのスコアは " + score + " です。F5で再開");
    }
  }, 1000);

  generateFlies();
  moveFlyTimer = setInterval(moveFlies, 1000);
}

function generateFlies() {
  const gameArea = document.getElementById("game-area");
  const fliesToGenerate = Math.floor(Math.random() * 8) + 3; // 3～10のランダムな数

  for (let i = 0; i < fliesToGenerate; i++) {
    const fly = document.createElement("div");
    fly.classList.add("fly");
    const x = Math.random() * (gameArea.clientWidth - 40);
    const y = Math.random() * (gameArea.clientHeight - 40);
    fly.style.left = `${x}px`;
    fly.style.top = `${y}px`;

    fly.addEventListener("click", () => {
      score++;
      document.getElementById("score-count").textContent = score;
      gameArea.removeChild(fly);
      if (document.querySelectorAll(".fly").length === 0 && timeLeft > 0) {
        setTimeout(generateNewFlies, 500); // UFOが全て消えた後に新しいUFOを生成
      }
    });

    gameArea.appendChild(fly);
  }
}

function generateNewFlies() {
  const fliesToGenerate = Math.floor(Math.random() * 10) + 1; // 1～10のランダムな数
  generateFlies(fliesToGenerate);
}

function moveFlies() {
  const flies = document.querySelectorAll(".fly");
  const gameArea = document.getElementById("game-area");

  flies.forEach((fly) => {
    const x = Math.random() * (gameArea.clientWidth - 40);
    const y = Math.random() * (gameArea.clientHeight - 40);
    fly.style.left = `${x}px`;
    fly.style.top = `${y}px`;
  });
}

document.getElementById("game-area").addEventListener("click", (e) => {
  if (e.target.classList.contains("fly")) {
    document.getElementById("game-area").removeChild(e.target);
    if (document.querySelectorAll(".fly").length === 0 && timeLeft > 0) {
      setTimeout(generateNewFlies, 500); // UFOが全て消えた後に新しいUFOを生成
    }
  }
});

startGame();
