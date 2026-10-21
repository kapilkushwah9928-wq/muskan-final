# Muskaans Scrapbook Surprise

Build a polished, fully interactive birthday surprise microsite for Muskaan, whose birthday is October 22. This is for a close friend, not a girlfriend, so keep the tone warm, playful, heartfelt, with subtle hints that she is special, never a direct confession or overly possessive romance. The user explicitly wants an ACTION-BASED experience, not a static greeting page.

Visual direction: premium soft blush-pink / rose / cream palette, dreamy editorial scrapbook style, elegant serif + handwritten accent typography, tiny floating hearts/petals, subtle parallax, smooth transitions, responsive mobile-first because the link will be sent on WhatsApp. Avoid generic template look, use layered details, tactile buttons, delightful micro-interactions, tasteful motion, accessible reduced-motion support. Use custom CSS/React animations; do not require external API keys.

Create a multi-step experience with real stateful interactions:
1) Intro/landing screen with “A little birthday world for Muskaan”, a sealed envelope / gift box, button “Open your surprise” and an animated unlock transition.
2) An interactive cake scene: user taps candles to extinguish/light them, then taps “Make a wish” to trigger sparkles/confetti and reveal a wish. Provide fallback accessible buttons.
3) A playful mini-game: tap floating hearts/stars or pop balloons to collect 5 tokens; display live score/progress and unlock the next section at 5. Must actually work on touch and desktop.
4) A “choose your birthday vibe” interaction with 3 choices; each choice reveals a personalized short birthday wish (sweet/funny/peaceful).
5) A memory/photo scrapbook section with attractive placeholder cards; make it easy to replace images later. Do not invent real shared memories or pretend placeholder photos are real. Use gentle illustrative visuals if no photos are provided.
6) A “little things that make you you” section with flip/reveal cards (smile, kindness, positive energy, etc.) that reveal one at a time.
7) A letter interaction: animated envelope opens on click, letter text appears with line-by-line or soft fade animation. Suggested tone: “Dear Muskaan, happy birthday! I hope this year brings you beautiful surprises, lots of laughter, peace, and all the little things that make you happy. You have a way of making ordinary days feel a little brighter, and I hope today gives some of that brightness back to you. Stay exactly as wonderfully you as you are. Have the loveliest birthday ❤️ — Kapil”. This is a friend-appropriate message with a subtle hint.
8) Final surprise: a “One last thing…” button opens a heartfelt but subtle line, then a celebratory confetti/fireworks animation and “Happy Birthday, Muskaan ❤️”. Avoid saying “I love you”, “my girl”, or implying they are a couple.
9) Music toggle with no autoplay (browser-safe), provide a visual music control; if no audio asset available, implement a pleasant UI toggle without claiming actual music is playing, or use a generated simple Web Audio melody only after user interaction.
10) Progress indicator / chapter navigation so she can revisit sections, reset/replay button, sound toggle, skip/accessibility controls.

Make every button actually function. No inert links or fake loading. Persist progress only for the current session (no backend needed). Ensure all sections are connected in a clear journey and can be completed from a phone. Use a single-page app with React, TypeScript, Tailwind, and polished custom CSS. Use lucide icons if available. Build the full working site, not just a design mockup. After implementing, check mobile layout, button states, animation timing, and all interactions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c34ee231-586d-408c-95a3-3f55758f6979).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
