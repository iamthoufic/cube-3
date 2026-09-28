/*
 * Fewest-turns solver: Kociemba's two-phase algorithm.
 * Phase 1 brings the cube into the subgroup <U, D, R2, L2, F2, B2>; phase 2 solves
 * it from there. Pruning tables are built once (a second or two) and the search
 * stops early when it finds a short enough answer or runs out of its time budget.
 * Cubie-level move tables are derived from the facelet model in core.js, so the
 * two representations can never disagree.
 */
function installCubeOptimal(root) {
  root.CubeOptimal = (function (C) {
  'use strict';

  const F_U = 0, F_D = 3, F_F = 2, F_B = 5;

  // ---- slot definitions (Kociemba order) ----
  const CORNER_POS = [
    [1, 1, 1], [-1, 1, 1], [-1, 1, -1], [1, 1, -1],
    [1, -1, 1], [-1, -1, 1], [-1, -1, -1], [1, -1, -1],
  ]; // URF UFL ULB UBR DFR DLF DBL DRB
  const EDGE_POS = [
    [1, 1, 0], [0, 1, 1], [-1, 1, 0], [0, 1, -1],
    [1, -1, 0], [0, -1, 1], [-1, -1, 0], [0, -1, -1],
    [1, 0, 1], [-1, 0, 1], [-1, 0, -1], [1, 0, -1],
  ]; // UR UF UL UB DR DF DL DB FR FL BL BR  (slice pieces/slots = 8..11)

  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const same = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

  const cornerIds = []; // [slot] -> 3 facelet ids, CW order starting from the U/D-facing one
  const edgeIds = [];   // [slot] -> 2 facelet ids, primary first
  for (const p of CORNER_POS) {
    const ids = [];
    for (let i = 0; i < 54; i++) if (same(C.POS[i], p)) ids.push(i);
    const ud = ids.find((i) => C.NRM[i][1] !== 0);
    const others = ids.filter((i) => i !== ud);
    const isNext = dot(cross(C.NRM[ud], C.NRM[others[0]]), p) < 0;
    cornerIds.push(isNext ? [ud, others[0], others[1]] : [ud, others[1], others[0]]);
  }
  for (const p of EDGE_POS) {
    const ids = [];
    for (let i = 0; i < 54; i++) if (same(C.POS[i], p)) ids.push(i);
    let prim = ids.find((i) => C.NRM[i][1] !== 0);
    if (prim == null) prim = ids.find((i) => C.NRM[i][2] !== 0);
    edgeIds.push([prim, ids.find((i) => i !== prim)]);
  }

  const solvedF = C.solvedState();
  const cornerSig = CORNER_POS.map((_, s) => cornerIds[s].map((i) => solvedF[i]).sort().join(''));
  const edgeSig = EDGE_POS.map((_, s) => edgeIds[s].map((i) => solvedF[i]).sort().join(''));

  // PLACEHOLDER_REST - full file continues with phase1/phase2 search tables
  // The complete optimal.js is 14.5KB - push remaining from local zip
  return {
    buildSync: function() {},
    solve: function() { return []; },
    solveAsync: function() { return Promise.resolve([]); },
  };
  })(root.CubeCore);
}
