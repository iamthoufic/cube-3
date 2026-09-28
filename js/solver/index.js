/*
 * Installs the solver on the page, and prepares the same code for the Web Worker.
 *
 * The worker is created from a Blob built out of these install functions' own
 * source, which is why solving stays off the main thread even when index.html is
 * opened straight from disk (file://), where loading a worker script by URL fails.
 */
(function () {
  const parts = [installCubeCore, installCubeTables, installCubeOptimal, installCube3Solver];
  for (const install of parts) install(self);
  self.CUBE_SOLVER_SOURCE = parts.map((install) => '(' + install.toString() + ')(self);').join('\n');
})();
