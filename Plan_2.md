Stage: Visual Vibe
Architect model: Aleena Khurram (planning)
Builder model: Aleena Khurram (implementation)
Result: Designed a self-contained, responsive arcade-style interface with a dark midnight background, bright four-color pads, clear hierarchy, and visible game-state feedback. Styling is implemented entirely in CSS with no downloaded assets.

# Stage 2 Plan — Visual Vibe

## Theme
A modern, playful memory arcade: deep navy background, subtle radial glows, glass-like panels, rounded corners, and bold neon pad colors. The visual system should feel polished without relying on images or imported fonts.

## Layout
- Centered game shell with a compact header and a large title.
- Main card with game status, level, score, and best-score indicators.
- Four large colored pads in a 2×2 grid.
- A primary Start / Play Again button.
- A short instruction area and a small status line.
- Layout collapses gracefully on narrow screens and remains usable with touch.

## Color palette
- Page background: deep navy / indigo.
- Primary text: near-white.
- Secondary text: muted blue-gray.
- Pad colors: coral-red, sky-blue, warm yellow, and mint-green.
- Active pads: brighter color plus a glow and slight scale change.
- Focus states: visible high-contrast outline for keyboard accessibility.

## Interaction styling
- Hover and pressed states make pads feel tactile.
- Playback uses a bright active state that is visually distinct from the idle pad.
- Correct answer feedback updates the status text.
- Wrong answer feedback shows a clear game-over panel and final score.
- Reduced-motion preference is respected.

## Responsive requirements
- Use CSS Grid for the pads.
- Keep controls comfortably large for touch screens.
- Avoid horizontal scrolling at 320px viewport width.
- Ensure text contrast and visible keyboard focus.

## Acceptance tests
1. The four pads are immediately distinguishable.
2. Active sequence steps are obvious.
3. Start and restart controls are easy to find.
4. Score, level, and best score are readable.
5. The page remains usable on desktop and mobile.
6. No external asset or stylesheet request is needed.
