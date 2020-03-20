"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var score = 0,
    activeHole,
    holes,
    moles,
    time = 30,
    timeInterval,
    moleInterval,
    activeMole;
var hitReactions = ["wham", "bam", "boom", "pop", "splat", "whack", "smack", "blam", "bang"],
    scoreBoard = document.querySelector("#game-score span:nth-child(2)"),
    timer = document.querySelector("#game-time span:nth-child(2)"),
    startBtn = document.getElementById("start-btn"),
    pauseBtn = document.getElementById("pause-btn"),
    resetBtn = document.getElementById("reset-btn"),
    moleHoles = document.getElementById("mole-holes");
document.addEventListener("DOMContentLoaded", function () {
  renderHoles();
  startBtn.addEventListener("click", start);
  pauseBtn.addEventListener("click", pause);
  resetBtn.addEventListener("click", reset, null, false);
});

var renderHoles = function renderHoles() {
  var isMobile = window.matchMedia("(max-width:420px)").matches;
  var reactions = isMobile ? hitReactions.slice(3) : hitReactions;
  var holeContent = reactions.map(function (reaction, i) {
    return "\n    <div class=\"hole\" data-id=\"".concat(i, "\">\n      <div class=\"mole\" data-id=\"").concat(i, "\" data-reaction=\"").concat(reaction, "!\"></div>\n    </div>");
  }).join("");
  moleHoles.innerHTML = holeContent;
  holes = moleHoles.querySelectorAll(".hole");
  moles = moleHoles.querySelectorAll(".mole");
};

var showMole = function showMole(id) {
  var totalTime = Math.floor(Math.random() * (1200 - 400)) + 400;
  holes[id].classList.toggle("active");
  setTimeout(function () {
    return holes[id].classList.toggle("active");
  }, totalTime);
  setTimeout(function () {
    return moles[id].classList.toggle("up");
  }, 300);
  setTimeout(function () {
    return moles[id].classList.toggle("up");
  }, totalTime + 300);
};

var chooseMole = function chooseMole() {
  return Math.floor(Math.random() * Math.floor(9));
};

var start = function start() {
  startBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
  timeInterval = setInterval(function () {
    if (time > 0) {
      time--;
      timer.textContent = "0".concat(time).slice(-2);
    } else {
      reset(null, true);
    }
  }, 1000);
  moleInterval = setInterval(function () {
    if (time > 0) {
      activeMole = chooseMole();
      showMole(activeMole);
    }
  }, 900);

  _toConsumableArray(holes).forEach(function (hole) {
    return hole.addEventListener("click", onWhack);
  });
};

var reset = function reset(e, gameOver) {
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

  _toConsumableArray(holes).forEach(function (mole) {
    return mole.removeEventListener("click", onWhack);
  });
};

var pause = function pause() {
  clearInterval(timeInterval);
  clearInterval(moleInterval);
  startBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");

  _toConsumableArray(holes).forEach(function (mole) {
    return mole.removeEventListener("click", onWhack);
  });
};

var showReaction = function showReaction(moleID) {
  var mole = moles[moleID];
  mole.classList.toggle("whacked");
  setTimeout(function () {
    return mole.classList.toggle("whacked");
  }, 1000);
};

var onWhack = function onWhack(e) {
  var moleId = parseInt(e.target.dataset.id);

  if (activeMole === moleId) {
    showReaction(moleId);
    incrementScore();
  }
};

var incrementScore = function incrementScore() {
  score++;
  scoreBoard.textContent = score;
};