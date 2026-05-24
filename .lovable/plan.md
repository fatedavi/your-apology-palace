# Forgive Me — Interactive Apology Website

A romantic, playful, Gen-Z aesthetic single-page experience with three scenes, cinematic transitions, and lots of microinteractions.

## Scenes

1. **Loading screen** — cute pulsing heart + "Loading love…" text, ~1.5s.
2. **Scene 1 — Name input**
   - Soft animated background: floating hearts, sparkles, gradient glow particles.
   - Glassmorphism card, centered: "Masukin nama kamu dulu ya 🤍"
   - Input field + "Lanjut" button (glow on hover).
   - Saves name to state, smooth fade/scale transition to Scene 2.
3. **Scene 2 — The question**
   - Typing-effect text: `"{nama}, kamu mau maafin aku ga? 🥺"`
   - Subtitle: "Aku janji ga ngulangin lagi… mungkin 😔"
   - Two buttons: **Iya 🤍** (grows slightly on hover) and **Tidak 😈** (runs away).
   - Runaway logic:
     - Detects cursor proximity (desktop) and touch proximity (mobile) within ~120px.
     - Jumps to random position within viewport with spring easing.
     - Each dodge: shrinks slightly (min 0.6x), small rotation, swaps label from a pool: "Yakin nih? 😭", "Jangan dong 😔", "Kasian aku 🥺", "Plisss 😭".
     - Plays a soft "boop" sound on each dodge.
4. **Scene 3 — Final scene (after Iya)**
   - Cinematic transition: blur + scale + downward parallax + warm gradient shift.
   - Brighter pink/peach background.
   - Typing text: "Makasih udah mau maafin aku 🤍" then "Kamu emang paling baik sedunia 🥹"
   - Floating hearts, confetti burst, sparkles, glow.
   - Clickable gift box (bounces) → opens with animation, reveals a little letter card + heart emojis flying out.
   - Soft background music starts (autoplay after the Iya click, since that's a user gesture).

## Design system

- Palette (oklch tokens in `src/styles.css`):
  - `--background`: soft pink-cream
  - `--primary`: pastel pink
  - `--accent`: soft lavender
  - `--secondary`: peach
  - Gradient tokens: `--gradient-romantic`, `--gradient-warm` (for final scene)
  - Shadow token: `--shadow-glow` (pink glow for buttons)
- Typography: **Fredoka** (display) + **Nunito** (body) via Google Fonts in `__root.tsx` head.
- Glassmorphism utility class for cards (backdrop-blur + translucent bg + border).
- Custom heart-shaped cursor (SVG, hidden on touch devices).
- Button hover glow utility.

## Tech approach

- Stack: TanStack Start (existing), TailwindCSS v4, **Framer Motion** for transitions/scene changes, **canvas-confetti** for confetti, plain RAF + transforms for runaway button (lower overhead than Motion for that).
- All scenes live on `/` (`src/routes/index.tsx`) with `AnimatePresence` swapping scene components. This is a single immersive experience, not multi-page.
- Components under `src/components/forgive/`:
  - `LoadingScreen.tsx`
  - `BackgroundFX.tsx` (floating hearts/sparkles canvas)
  - `SceneName.tsx`
  - `SceneQuestion.tsx`
  - `RunawayButton.tsx`
  - `SceneFinal.tsx`
  - `GiftBox.tsx`
  - `HeartCursor.tsx`
  - `TypingText.tsx`
- Audio:
  - Soft ambient loop (royalty-free) for final scene.
  - Short "boop" SFX for runaway dodges.
  - Files placed in `src/assets/audio/` — will use small CC0 clips.
- SEO: route `head()` with title "Forgive Me 🤍", description, og tags.

## Technical details

- **Runaway button**: listens to `mousemove` / `touchmove` on window; computes distance to button center; if `< 120px`, picks new `(x, y)` with margins so button stays in viewport, applies via `translate3d` + spring transition. Tracks dodge count to shrink/rotate and rotate label pool.
- **Scene transitions**: `AnimatePresence mode="wait"` with variants `{ initial: { opacity: 0, scale: 0.95, filter: 'blur(20px)' }, animate: {...}, exit: {...} }`. Iya → final uses a heavier variant (scale 1.2, y: 100, blur 30px) for cinematic depth.
- **Typing effect**: custom hook stepping characters with `setTimeout`, supports chained lines.
- **Autoplay audio**: only triggered inside the Iya click handler so browsers allow it.
- **Easter egg**: typing "love" anywhere on Scene 2 triggers a heart explosion.
- **Mobile**: runaway button uses `touchmove` and also dodges on tap-down (`pointerdown` with proximity check) so it's hard to hit.
- **Perf**: background particles capped (~25), use `requestAnimationFrame`, `will-change: transform`, and pause when tab hidden.

## Dependencies to add

- `framer-motion`
- `canvas-confetti` + `@types/canvas-confetti`

## Files to create / edit

- `src/styles.css` — add romantic palette tokens, gradients, glow shadow, glass utility, heart cursor class, Google Fonts import.
- `src/routes/__root.tsx` — update title/meta, preconnect Google Fonts.
- `src/routes/index.tsx` — replace placeholder with `<ForgiveMeApp />`.
- `src/components/forgive/*` — all scene + effect components listed above.
- `src/assets/audio/ambient.mp3`, `boop.mp3` — small audio assets.

## Out of scope

- No backend / persistence (name lives in component state only).
- No multi-language switcher (Indonesian copy as specified).
