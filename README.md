# Cube³ Solver

> **[Live Demo — Try it now in your browser](https://3x3-rubiks-cube-solver.vercel.app/)**

An interactive 3×3 Rubik's cube solver that runs entirely in the browser. Paint your cube's colors (or shuffle a random one), then follow a move-by-move solution on a live 3D cube with arrows and plain-language guidance.

No account, no server, no tracking. Everything stays on your device.

## Features

- **Solve your own cube** — paint colors on an unfolded net or tap stickers on the 3D cube
- **Random scramble** — 25 random turns; solution is computed while scrambling finishes
- **Two solvers**
  - *Fewest turns* — Kociemba two-phase algorithm (~21 moves average)
  - *Layer by layer* — beginner method with named stages (100–180 moves)
- **Guidance modes** — arrows + words, standard notation (R, U′, F2), or both
- **Playback controls** — step, autoplay (up to 3×), orbit/zoom the cube
- **History** — finished solves are kept for the session so you can replay
- **Themes & colors** — light / dark / system, plus custom sticker colors
- **Single-file build** — `npm run build` produces one self-contained HTML file

## Quick start

No install required for the basic experience.

```bash
# open index.html directly, or:
npm start          # serves at http://localhost:8080
npm test           # run solver tests
npm run build      # write dist/cube3-solver.html
```

Node 18+ is needed only for the scripts above.

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | App shell |
| `css/style.css` | Styles |
| `js/app.js` | UI, 3D scene, controls |
| `js/solver/` | Cube model + Kociemba / layer solvers |
| `vendor/three/` | three.js (vendored) |
| `assets/` | Font + grain texture |
| `scripts/` | Local server + single-file build |
| `tests/` | Solver unit tests |

## License

MIT — see [LICENSE](LICENSE).

Rubik's Cube is a trademark of its respective owner. This project is not affiliated with or endorsed by them.
