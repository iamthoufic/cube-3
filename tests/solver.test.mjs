// Solver tests: run with `npm test` (Node 18+, no dependencies).
// Loads the browser solver files into a sandbox exactly as the page does.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const solverDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'js', 'solver');
const FILES = ['core.js', 'tables.js', 'optimal.js', 'cube3.js', 'index.js'];

function loadSolver() {
  const sandbox = vm.createContext({});
  sandbox.self = sandbox;
  for (const f of FILES) vm.runInContext(readFileSync(join(solverDir, f), 'utf8'), sandbox, { filename: f });
  return sandbox;
}

// small seeded generator so every run tests the same scrambles
function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const page = loadSolver();
const { CubeCore: C, Cube3Solver: S } = page;
const scrambled = (seed) => C.applyMoves(C.solvedState(), C.randomScramble(25, rng(seed)));

test('every facelet maps to its own slot', () => {
  const seen = new Set();
  for (let i = 0; i < 54; i++) {
    const slot = S.slotOf(C.POS[i], C.NRM[i]);
    assert.equal(slot, i);
    seen.add(slot);
  }
  assert.equal(seen.size, 54);
});

test('a solved cube needs no moves', () => {
  const r = S.solve(C.solvedState());
  assert.equal(r.ok, true);
  assert.deepEqual([...r.seq], []);
});

test('fewest turns solves random scrambles, every answer verified', () => {
  const lengths = [];
  for (let seed = 1; seed <= 40; seed++) {
    const state = scrambled(seed);
    const r = S.solve(state);
    assert.equal(r.ok, true, r.reason);
    assert.equal(C.isSolved(S.applySeq(state, r.seq)), true, `seed ${seed} did not end solved`);
    lengths.push(r.seq.length);
  }
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  console.log(`  fewest turns: avg ${avg.toFixed(1)} moves, max ${Math.max(...lengths)}`);
  assert.ok(Math.max(...lengths) <= 30);
});

test('layer by layer solves random scrambles and names its stages', () => {
  const known = new Set(['cross', 'corners', 'middle', 'topcross', 'topedges', 'topcorners', 'finish']);
  const lengths = [];
  for (let seed = 101; seed <= 115; seed++) {
    const state = scrambled(seed);
    const r = S.solve(state, { method: 'layers' });
    assert.equal(r.ok, true, r.reason);
    assert.equal(C.isSolved(S.applySeq(state, r.seq)), true, `seed ${seed} did not end solved`);
    for (const st of r.stages) assert.ok(known.has(st), `unexpected stage ${st}`);
    lengths.push(r.seq.length);
  }
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  console.log(`  layer by layer: avg ${avg.toFixed(0)} moves, max ${Math.max(...lengths)}`);
});

test('impossible cubes are rejected with a reason', () => {
  const base = scrambled(7);
  const cases = {
    'wrong color counts': (s) => { s[0] = s[0] === 1 ? 2 : 1; },
    'flipped edge': (s) => { const [a, b] = C.EDGES[0].ids; [s[a], s[b]] = [s[b], s[a]]; },
    'twisted corner': (s) => { const [a, b, c] = C.CORNERS[0].ids; [s[a], s[b], s[c]] = [s[b], s[c], s[a]]; },
    'two pieces swapped': (s) => {
      const [a0, a1] = C.EDGES[0].ids, [b0, b1] = C.EDGES[1].ids;
      [s[a0], s[b0]] = [s[b0], s[a0]]; [s[a1], s[b1]] = [s[b1], s[a1]];
    },
  };
  for (const [name, spoil] of Object.entries(cases)) {
    const s = base.slice();
    spoil(s);
    const v = S.validate(s);
    assert.equal(v.ok, false, `${name} should be rejected`);
    assert.ok(typeof v.reason === 'string' && v.reason.length > 0, `${name} needs a readable reason`);
  }
});

test('the worker copy of the solver runs on its own', () => {
  // the page builds its Web Worker from CUBE_SOLVER_SOURCE; prove that source is self-contained
  const worker = vm.createContext({});
  worker.self = worker;
  vm.runInContext(page.CUBE_SOLVER_SOURCE, worker, { filename: 'worker-source.js' });
  const state = scrambled(3);
  const r = worker.Cube3Solver.solve(state);
  assert.equal(r.ok, true, r.reason);
  assert.equal(C.isSolved(C.applyMoves(state, r.seq)), true);
});
