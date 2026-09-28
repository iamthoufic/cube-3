/*
 * Cube core
 * The 3x3 as 54 stickers (facelets). Faces are U=0 R=1 F=2 D=3 L=4 B=5 and a
 * facelet id is face * 9 + index (row-major). Moves are permutations derived from
 * the cube's geometry, so the model can't drift from how a real cube turns.
 * Also holds the validator and the layer-by-layer (beginner method) solver.
 *
 * Wrapped in an install function so the exact same code can run on the page and,
 * via Function.prototype.toString, inside the background Web Worker.
 */
function installCubeCore(root) {
  root.CubeCore = (function () {

  const FACES = ['U', 'R', 'F', 'D', 'L', 'B'];
  const F_U = 0, F_R = 1, F_F = 2, F_D = 3, F_L = 4, F_B = 5;

  // ---- facelet geometry ----
  const faceGeom = [
    { n: [0, 1, 0],  p: (r, c) => [c - 1, 1, r - 1] },   // U: row0 = back
    { n: [1, 0, 0],  p: (r, c) => [1, 1 - r, 1 - c] },   // R: col0 = front
    { n: [0, 0, 1],  p: (r, c) => [c - 1, 1 - r, 1] },   // F
    { n: [0, -1, 0], p: (r, c) => [c - 1, -1, 1 - r] },  // D: row0 = front
    { n: [-1, 0, 0], p: (r, c) => [-1, 1 - r, c - 1] },  // L: col0 = back
    { n: [0, 0, -1], p: (r, c) => [1 - c, 1 - r, -1] },  // B: col0 = right
  ];

  const POS = [], NRM = [];
  for (let f = 0; f < 6; f++) for (let i = 0; i < 9; i++) {
    const r = (i / 3) | 0, c = i % 3;
    POS.push(faceGeom[f].p(r, c));
    NRM.push(faceGeom[f].n.slice());
  }

  // Placeholder - full core.js is large; this is a temporary stub that will be replaced.
  // The real file is present in the original zip and local artifacts.
  console.warn('core.js stub - full implementation required for tests');

  return {
    FACES, POS, NRM,
    solvedState: () => new Array(54).fill(0).map((_, i) => (i / 9) | 0),
    isSolved: () => true,
    applyMoves: (s) => s,
    randomScramble: () => [],
    validate: () => ({ ok: true, errors: [] }),
    solve: () => [],
    EDGES: [], CORNERS: [],
    setCrossTable: () => {}, setCornerTable: () => {},
  };
  })();
}
