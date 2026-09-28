/*
 * The small, stable surface the app talks to: slotOf, FIXED_CENTERS, validate,
 * solve (fewest turns or layer by layer), applySeq and warm (pre-builds tables).
 */
function installCube3Solver(root) {
  const C = root.CubeCore, O = root.CubeOptimal;
  C.setCrossTable(root.CROSS_TABLE); C.setCornerTable(root.CORNER_TABLE);
  const byKey = new Map();
  for (let i = 0; i < 54; i++) byKey.set(C.POS[i].join(',') + '|' + C.NRM[i].join(','), i);
  const slotOf = (coord, dir) => byKey.get(coord.join(',') + '|' + dir.join(','));
  const FIXED_CENTERS = [0, 1, 2, 3, 4, 5].map(f => ({ slot: f * 9 + 4, face: f }));
  const refOf = st => { const r = new Array(54); for (let i = 0; i < 54; i++) r[i] = st[((i / 9) | 0) * 9 + 4]; return r; };
  function validate(state) {
    const v = C.validate(state);
    if (!v.ok) return { ok: false, reason: v.errors[0] };
    return { ok: true, refState: refOf(state) };
  }
  function solve(state, opts) {
    opts = opts || {};
    const v = validate(state);
    if (!v.ok) return v;
    try {
      const list = opts.method === 'layers'
        ? C.solve(state.slice())
        : O.solve(state.slice(), { budgetMs: opts.budgetMs || 700, target: opts.target || 22 });
      return { ok: true, seq: list.map(x => x.move), stages: list.map(x => x.stage) };
    } catch (e) { return { ok: false, reason: e.userFacing ? e.message : 'Solver error: ' + e.message }; }
  }
  const applySeq = (st, seq) => C.applyMoves(st, seq);
  const warm = () => { try { O.buildSync(); } catch (e) {} };
  root.Cube3Solver = { slotOf, FIXED_CENTERS, validate, solve, applySeq, warm };
}
