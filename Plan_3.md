Stage: Sensory Feedback
Architect model: Aleena Khurram (planning)
Builder model: Aleena Khurram (implementation)
Result: Added visual pad flashes, progress/status messages, button press feedback, and optional code-generated tones using the Web Audio API. Every player action has a visible response; sound can be toggled and does not require audio files.

# Stage 3 Plan — Sensory Feedback

## Feedback goals
Every important action should produce visible or audible feedback. Sound is generated in the browser at runtime, so there are no audio assets to download.

## Visual feedback
- Computer playback briefly brightens and enlarges each pad.
- Player presses animate the selected pad.
- Status copy changes between ready, watch carefully, your turn, correct, and game over.
- A progress indicator displays how many sequence items have been entered.
- The game-over state shows the final level and score.
- Buttons include hover, active, disabled, and keyboard-focus states.

## Audio feedback
- Use `AudioContext` and oscillator nodes to synthesize short notes.
- Give each pad a different pitch.
- Add a short lower error tone for a wrong selection.
- Include a Sound On / Sound Off toggle.
- If audio is unavailable or blocked by browser policy, the game continues without it.
- Audio is only initialized in response to a user gesture.

## Accessibility
- Pads are real buttons with accessible names.
- Keyboard users can tab to the pads and activate them with Enter or Space.
- Status updates use an `aria-live` region.
- Sound preference is reflected in the toggle's label.
- Respect `prefers-reduced-motion`.

## Acceptance tests
1. Every sequence step has a visible flash.
2. Each pad press responds visually.
3. Optional sound is generated without audio files.
4. Sound can be disabled.
5. Status and progress communicate whose turn it is.
6. Keyboard users can operate all controls.
