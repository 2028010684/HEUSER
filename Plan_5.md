Stage: Debugging
Architect model: Aleena Khurram (planning)
Builder model: Aleena Khurram (implementation)
Result: Reviewed edge cases around rapid clicking, restarting during playback, audio restrictions, and browser storage. Fixed stale playback callbacks, blocked input during computer turns, guarded storage/audio APIs, and ensured the final project contains only the three required code files.

# Stage 5 Plan — Debugging

## Bug list: at least three real bugs and fixes

### Bug 1 — Rapid clicks could answer while the sequence was still playing
**Cause:** Pad buttons could receive input during the computer's demonstration, allowing the player to skip or corrupt the intended turn.
**Fix:** A single `acceptingInput` state gates all pad input. It remains false for the entire playback animation and becomes true only after the final step finishes.
**Verification:** Click every pad repeatedly during playback. No progress or score changes until the player's turn begins.

### Bug 2 — Restarting during playback could let an old timer continue flashing pads
**Cause:** Scheduled callbacks from the previous game could run after a restart and interfere with the new sequence.
**Fix:** Track timeout IDs, clear them during reset, and use a playback token so callbacks from an obsolete sequence stop immediately.
**Verification:** Start a game, restart while pads are flashing, and confirm only the new pattern plays.

### Bug 3 — localStorage could throw in restricted browser contexts
**Cause:** Private browsing or browser policies may block storage access.
**Fix:** Wrap all reads and writes in `try/catch`, validate stored values, and use in-memory defaults if access fails.
**Verification:** Disable storage or open the file in a restricted context; the game remains playable.

### Bug 4 — AudioContext may be unavailable or require a user gesture
**Cause:** Some browsers block audio initialization until the user interacts, and some environments do not expose Web Audio.
**Fix:** Create/resume audio only after a user action and guard the API. Audio failures never stop gameplay.
**Verification:** Play with sound enabled and disabled, and in a browser without Web Audio support.

### Bug 5 — A stale double click could submit an extra answer after a round ended
**Cause:** A second rapid click could arrive near the transition between rounds.
**Fix:** Check `acceptingInput` and `gameOver` at the start of every pad handler; turn input off immediately when a sequence is completed.
**Verification:** Double-click the final correct pad and confirm the next round starts with clean progress.

## Final checks
- [x] Exactly three code files in the ZIP: `index.html`, `style.css`, `script.js`.
- [x] No image files, sound files, downloaded fonts, libraries, or folders in the ZIP.
- [x] No network calls or external dependencies.
- [x] Works by opening `index.html` in a modern browser.
- [x] At least three real bugs are documented with fixes.
