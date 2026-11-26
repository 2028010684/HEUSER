Stage: State & Storage
Architect model: Aleena Khurram (planning)
Builder model: Aleena Khurram (implementation)
Result: Added durable best-score tracking with a safe localStorage fallback, live score/level/progress display, sound preference handling, and complete reset behavior. Refreshing the page preserves the best score when the browser permits local storage.

# Stage 4 Plan — State & Storage

## Persistent data
- `pattern-memory-best-score`: the highest number of completed rounds.
- `pattern-memory-sound`: whether generated sound is enabled.

## Storage strategy
- Read stored values inside `try/catch` so privacy settings or restricted browser contexts do not break the game.
- Use safe defaults if storage is unavailable or contains invalid values.
- Update the best score only when the current score exceeds it.
- Gameplay must not depend on storage working.
- Keep the implementation entirely client-side and offline.

## State consistency
- Starting a game clears the old sequence, progress, level, and game-over state.
- During playback, player input is disabled.
- Once playback finishes, input is enabled and progress begins at zero.
- On each correct answer, progress increments exactly once.
- On a completed pattern, score and level update before the next sequence is demonstrated.
- Game over freezes the current round and prevents further pad input.
- Restart clears timers and stale playback callbacks before starting a new game.

## Reset behavior
- Start / Play Again resets gameplay state.
- Sound toggle changes only the sound preference.
- Best score remains until browser storage is cleared.
- Reloading the page initializes a fresh game view and restores saved preferences.

## Acceptance tests
1. Best score updates after a new personal best.
2. Best score remains after refresh when localStorage is available.
3. Storage failures do not prevent gameplay.
4. Restart resets score and sequence but preserves best score.
5. Sound preference is restored safely.
6. No input is accepted during playback or after game over.
