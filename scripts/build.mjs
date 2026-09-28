// Single-file build: inlines CSS (with fonts/images as data URLs) and all scripts
// into one self-contained HTML file under dist/.
// fonts and images become data URLs and every script is inlined, so the result
// works offline and can be shared as a single file.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFile(join(root, p), 'utf8');
const dataUrl = async (p, type) =>
  `data:${type};base64,${(await readFile(join(root, p))).toString('base64')}`;

let css = await read('css/style.css');
const assets = [
  ["url('../assets/fonts/Archivo-Variable.woff2')", 'assets/fonts/Archivo-Variable.woff2', 'font/woff2'],
  ["url('../assets/images/grain.png')", 'assets/images/grain.png', 'image/png'],
];
for (const [ref, file, type] of assets) {
  if (!css.includes(ref)) throw new Error(`style.css no longer references ${file}`);
  const url = await dataUrl(file, type);
  css = css.replace(ref, () => `url(${url})`);
}

let html = await read('index.html');
const link = '<link rel="stylesheet" href="css/style.css">';
if (!html.includes(link)) throw new Error('index.html no longer links css/style.css');
html = html.replace(link, () => `<style>\n${css}</style>`);

// inline every local script in order; functions as replacers so "$" in code stays literal
for (const [tag, src] of [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]) {
  const code = (await read(src)).replace(/<\/script/gi, '<\\/script');
  html = html.replace(tag, () => `<script>\n${code}\n</script>`);
}

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist', 'cube3-solver.html'), html);
console.log(`Built dist/cube3-solver.html (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);
