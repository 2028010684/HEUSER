(() => {
  "use strict";

  const pads = Array.from(document.querySelectorAll(".magic-pad"));
  const startButton = document.getElementById("start-button");
  const soundButton = document.getElementById("sound-button");
  const statusText = document.getElementById("status");
  const progressText = document.getElementById("progress");
  const levelText = document.getElementById("level");
  const scoreText = document.getElementById("score");
  const bestText = document.getElementById("best-score");

  const BEST_KEY = "pattern-memory-best-score";
  const SOUND_KEY = "pattern-memory-sound";
  const padNames = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];
  const frequencies = {
    gryffindor: 392,
    slytherin: 494,
    ravenclaw: 587,
    hufflepuff: 659
  };

  let sequence = [];
  let playerIndex = 0;
  let level = 0;
  let score = 0;
  let bestScore = readNumber(BEST_KEY, 0);
  let acceptingInput = false;
  let gameOver = false;
  let soundOn = readBoolean(SOUND_KEY, true);
  let audioContext = null;
  let timers = [];
  let playbackToken = 0;

  function readNumber(key, fallback) {
    try {
      const value = Number(localStorage.getItem(key));
      return Number.isFinite(value) && value >= 0 ? value : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function readBoolean(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value === "true";
    } catch (_) {
      return fallback;
    }
  }

  function safeStore(key, value) {
    try {
      localStorage.setItem(key, String(value));
    } catch (_) {
      // The game still works if storage is unavailable.
    }
  }

  function setStatus(message) {
    statusText.textContent = message;
  }

  function updateDisplay() {
    levelText.textContent = level ? String(level) : "—";
    scoreText.textContent = String(score);
    bestText.textContent = String(bestScore);
    progressText.textContent = `Sequence: ${playerIndex} / ${sequence.length}`;
  }

  function updateSoundButton() {
    soundButton.textContent = soundOn ? "♫ Sound: On" : "♫ Sound: Off";
    soundButton.setAttribute("aria-pressed", String(soundOn));
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
    playbackToken++;
    pads.forEach(pad => pad.classList.remove("active"));
  }

  function schedule(callback, delay) {
    const id = setTimeout(callback, delay);
    timers.push(id);
  }

  function playTone(padId, duration = 180) {
    if (!soundOn) return;

    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return;

      if (!audioContext) audioContext = new AudioCtor();
      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequencies[padId] || 440;
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + duration / 1000
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000 + 0.03);
    } catch (_) {
      // Audio is optional.
    }
  }

  function flashPad(padId, duration = 360) {
    const pad = pads.find(item => item.dataset.pad === padId);
    if (!pad) return;

    pad.classList.add("active");
    playTone(padId, duration);
    schedule(() => pad.classList.remove("active"), duration);
  }

  function addStep() {
    sequence.push(padNames[Math.floor(Math.random() * padNames.length)]);
  }

  function playSequence() {
    clearTimers();
    acceptingInput = false;
    playerIndex = 0;
    updateDisplay();
    setStatus("Watch closely... the magic is beginning!");

    const token = playbackToken;
    const gap = 650;

    sequence.forEach((padId, index) => {
      schedule(() => {
        if (token !== playbackToken || gameOver) return;
        flashPad(padId, 360);
      }, 650 + index * gap);
    });

    schedule(() => {
      if (token !== playbackToken || gameOver) return;
      acceptingInput = true;
      playerIndex = 0;
      updateDisplay();
      setStatus("Your turn! Repeat the pattern.");
    }, 650 + sequence.length * gap);
  }

  function startGame() {
    clearTimers();
    sequence = [];
    playerIndex = 0;
    level = 1;
    score = 0;
    gameOver = false;
    acceptingInput = false;
    addStep();
    startButton.textContent = "↻ Restart Lesson";
    updateDisplay();
    playSequence();
  }

  function finishRound() {
    acceptingInput = false;
    score++;
    level++;
    addStep();
    updateDisplay();
    setStatus("Brilliant! You remembered the whole pattern.");
    schedule(() => playSequence(), 900);
  }

  function endGame() {
    acceptingInput = false;
    gameOver = true;

    if (score > bestScore) {
      bestScore = score;
      safeStore(BEST_KEY, bestScore);
    }

    updateDisplay();
    setStatus(`The pattern was broken! Your score: ${score}. Try again?`);
    startButton.textContent = "✦ Play Again";
    playTone("gryffindor", 260);
  }

  function handlePadPress(padId) {
    if (!acceptingInput || gameOver) return;

    flashPad(padId, 150);

    if (sequence[playerIndex] !== padId) {
      endGame();
      return;
    }

    playerIndex++;
    updateDisplay();

    if (playerIndex === sequence.length) {
      finishRound();
    } else {
      setStatus("Correct! Keep going...");
    }
  }

  pads.forEach(pad => {
    pad.addEventListener("click", () => handlePadPress(pad.dataset.pad));
  });

  startButton.addEventListener("click", startGame);

  soundButton.addEventListener("click", () => {
    soundOn = !soundOn;
    safeStore(SOUND_KEY, soundOn);
    updateSoundButton();
    if (soundOn) playTone("ravenclaw", 150);
  });

  updateSoundButton();
  updateDisplay();
})();
