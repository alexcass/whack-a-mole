let score = 0,
  activeHole,
  holes,
  moles,
  time = 30,
  timeInterval,
  moleInterval,
  activeMole;
const hitReactions = [
    "wham",
    "bam",
    "boom",
    "pop",
    "splat",
    "whack",
    "smack",
    "blam",
    "bang"
  ],
  scoreBoard = document.querySelector("#game-score span:nth-child(2)"),
  timer = document.querySelector("#game-time span:nth-child(2)"),
  startBtn = document.getElementById("start-btn"),
  pauseBtn = document.getElementById("pause-btn"),
  resetBtn = document.getElementById("reset-btn"),
  moleHoles = document.getElementById("mole-holes");

document.addEventListener("DOMContentLoaded", () => {
  renderHoles();

  startBtn.addEventListener("click", start);
  pauseBtn.addEventListener("click", pause);
  resetBtn.addEventListener("click", reset, null, false);
});

const renderHoles = () => {
  const isMobile = window.matchMedia("(max-width:420px)").matches;
  const reactions = isMobile ? hitReactions.slice(3) : hitReactions;
  const holeContent = reactions
    .map(
      (reaction, i) => `
    <div class="hole" data-id="${i}">
      <div class="mole" data-id="${i}" data-reaction="${reaction}!"></div>
    </div>`
    )
    .join("");

  moleHoles.innerHTML = holeContent;

  holes = moleHoles.querySelectorAll(".hole");
  moles = moleHoles.querySelectorAll(".mole");
};

const showMole = id => {
  const totalTime = Math.floor(Math.random() * (1200 - 400)) + 400;

  holes[id].classList.toggle("active");
  setTimeout(() => holes[id].classList.toggle("active"), totalTime);

  setTimeout(() => moles[id].classList.toggle("up"), 300);
  setTimeout(() => moles[id].classList.toggle("up"), totalTime + 300);
};

const chooseMole = () => Math.floor(Math.random() * Math.floor(9));

const start = () => {
  startBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");

  timeInterval = setInterval(() => {
    if (time > 0) {
      time--;
      timer.textContent = `0${time}`.slice(-2);
    } else {
      reset(null, true);
    }
  }, 1000);

  moleInterval = setInterval(() => {
    if (time > 0) {
      activeMole = chooseMole();
      showMole(activeMole);
    }
  }, 900);

  [...holes].forEach(hole => hole.addEventListener("click", onWhack));
};

const reset = (e, gameOver) => {
  clearInterval(timeInterval);
  clearInterval(moleInterval);
  startBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");

  time = 30;

  if (!gameOver) {
    score = 0;
    timer.textContent = time;
    scoreBoard.textContent = score;
  }

  [...holes].forEach(mole => mole.removeEventListener("click", onWhack));
};

const pause = () => {
  clearInterval(timeInterval);
  clearInterval(moleInterval);
  startBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");

  [...holes].forEach(mole => mole.removeEventListener("click", onWhack));
};

const showReaction = moleID => {
  const mole = moles[moleID];

  mole.classList.toggle("whacked");
  setTimeout(() => mole.classList.toggle("whacked"), 1000);
};

const onWhack = e => {
  const moleId = parseInt(e.target.dataset.id);

  if (activeMole === moleId) {
    showReaction(moleId);
    incrementScore();
  }
};

const incrementScore = () => {
  score++;

  scoreBoard.textContent = score;
};
