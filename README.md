# Cube³

> **[🚀 Live Demo — Try it now in your browser](https://iamthoufic.github.io/cube-3/)**

A 3×3 cube solver that runs entirely in your browser. Tell it what your scrambled cube looks like and it walks you back to solved, one turn at a time, with arrows on a live 3D cube.

You don't need to know any cube notation to use it. And if you do, you can switch the arrows off and read the moves like a cuber.

The interactive interface lives in [`index.html`](index.html) — open it locally or use the live demo above.

## What you can do with it

- **Solve your own cube.** Paint your cube's colors onto an unfolded net (or tap stickers straight on the 3D cube), press Solve, and follow along.
- **Practice on a random shuffle.** One click scrambles the cube with 25 random turns. The solution is worked out while the cube is still scrambling, so it's ready the moment it stops.
- **Choose how you're guided.** Arrows and plain words ("turn the right face clockwise") for beginners, standard notation (R, U′, F2) for cubers, or both at once.
- **Choose how it solves.**
  - *Fewest turns* uses Kociemba's two-phase algorithm. In our tests it averages about 21 moves.
  - *Layer by layer* follows the beginner method most people learn first: white cross, white corners, middle layer, then the top. It's much longer (usually 100 to 180 moves), but it names each stage as you go, so you can actually learn from it.
- **Go at your own pace.** Step forward and back, autoplay at up to 3× speed, orbit and zoom the cube, and keep an eye on your move count and time.
- **Keep going.** When a solve finishes, jump straight into entering the colors of the next cube you're holding, shuffle a new random one, or open your history.
- **Look back.** Finished solves land in a history panel where you can replay them.
- **Make it yours.** Light, dark or system theme, and custom sticker colors if your cube isn't the standard scheme.
- **Private by design.** No server, no account, no tracking. Nothing you enter leaves your device, and history lasts only for the current session.

## Quick start

There's no build step and nothing to install.

**Just open it.** Clone or download the repo and double-click `index.html`. Everything works straight from disk, including the background solver.

**Or run the little dev server** (needs Node 18 or newer):

```bash
git clone https://github.com/iamthoufic/cube-3.git
cd cube-3
npm start
```

Then open [http://localhost:8080](http://localhost:8080). Want another port? `PORT=3000 npm start`.

**Or make a single file.** `npm run build` writes `dist/cube3-solver.html`, one self-contained file with the font, three.js and all the code inlined. Handy for sharing or keeping offline.

## Putting it online with GitHub Pages

It's a static site, so there's nothing to build first.

1. Push the repo to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. A minute later it's live at `https://iamthoufic.github.io/cube-3/`.

The repo includes an empty `.nojekyll` file so Pages serves every file exactly as it is.

## License

MIT. See [LICENSE](LICENSE).

Rubik's Cube is a trademark of its respective owner. This project is not affiliated with or endorsed by them.
