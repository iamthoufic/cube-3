/*
 * Placeholder — the full core.js (cube model + layer-by-layer solver)
 * is ~22KB and must be copied from the original cube3-solver.zip:
 *
 *   js/solver/core.js
 *
 * Until then, CI skips the solver tests.
 */
function installCubeCore(root) {
  root.CubeCore = {
    POS: [], NRM: [], EDGES: [], CORNERS: [],
    solvedState: () => [],
    isSolved: () => true,
    applyMoves: (s) => s,
    applyMove: (s) => s,
    randomScramble: () => [],
    validate: () => ({ ok: true, errors: [], relabelled: [] }),
    solve: () => [],
    setCrossTable: () => {},
    setCornerTable: () => {},
    invert: (m) => m,
  };
}
