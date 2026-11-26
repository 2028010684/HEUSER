Stage: Core Logic
Architect model: Aleena Khurram (planning)
Builder model: Aleena Khurram (implementation)
Result: Built a playable Simon-style pattern-memory game with repeatable rounds, increasing sequence length, input validation, score tracking, and restart support. The core game works offline using only HTML, CSS, and JavaScript; no assets or external libraries are required.

# Stage 1 Plan — Core Logic

## Goal
Build a small, reliable Pattern Memory game. The game displays a sequence of four colored pads. The player watches the sequence, then repeats it in the same order. Each successful round adds one item to the sequence.

## Rules
- The board contains four pads: coral, blue, yellow, and green.
- A new game starts at level 1 with a one-item sequence.
- During playback, pads light up one at a time and the player cannot submit input.
- After playback, the game accepts clicks/taps in sequence.
- A correct complete answer advances the level and adds one random pad.
- A wrong answer ends the round and shows the final score.
- The player can restart at any time.
- No external images, fonts, sound files, libraries, APIs, or network access are used.

## State model
- `sequence`: array of pad IDs representing the full pattern.
- `playerIndex`: index of the next expected player answer.
- `level`: current sequence length / round.
- `score`: number of successful rounds completed.
- `isPlayingSequence`: true while the computer demonstrates the pattern.
- `acceptingInput`: true only while the player is allowed to answer.
- `gameOver`: true after an incorrect answer.
- `bestScore`: persisted locally where browser localStorage is available; gameplay still works if storage is unavailable.

## Core functions
- `startGame()`: resets round state and begins the first sequence.
- `addStep()`: appends a random pad to the sequence.
- `playSequence()`: disables input and demonstrates each sequence item.
- `flashPad(id)`: gives a pad a visible active state.
- `handlePadPress(id)`: checks the player's input and updates progress.
- `finishRound()`: updates score/level and starts the next longer sequence.
- `endGame()`: stops input, records best score, and shows a restart prompt.
- `resetGame()`: returns all state to a clean initial state.

## Acceptance tests
1. Start Game begins a one-pad pattern.
2. Pads cannot be clicked to affect the answer while the pattern is playing.
3. Correct input advances the level.
4. Incorrect input ends the game.
5. Restart clears the old sequence and score.
6. All gameplay works offline in a browser.
