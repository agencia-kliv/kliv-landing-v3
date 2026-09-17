import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../lib/visibleText.js", import.meta.url), "utf8");
const { withoutDashes, withoutDashesInHtml } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);

const cases = [
  ["<p>formatos como <b>Spark Ads</b> en TikTok</p>", "<p>formatos como <b>Spark Ads</b> en TikTok</p>"],
  ["<p>de <b>3:1</b> suele, debajo de <b>1:1</b> el canal</p>", "<p>de <b>3:1</b> suele, debajo de <b>1:1</b> el canal</p>"],
  ["<p><b>Ejemplo ilustrativo:</b> dos tiendas</p>", "<p><b>Ejemplo ilustrativo:</b> dos tiendas</p>"],
  ['<p>en <a href="../tik-tok/">TikTok Ads</a> y <a href="../linkedin-ads/">LinkedIn Ads</a>.</p>', '<p>en <a href="../tik-tok/">TikTok Ads</a> y <a href="../linkedin-ads/">LinkedIn Ads</a>.</p>'],
  ["<p><b>Uno</b> <b>Dos</b></p>", "<p><b>Uno</b> <b>Dos</b></p>"],
  ["<p>2–3 semanas — e-commerce</p>", "<p>2 a 3 semanas, e commerce</p>"],
];

for (const [input, expected] of cases) {
  assert.equal(withoutDashesInHtml(input), expected);
}
assert.equal(withoutDashes("  e-commerce  "), "e commerce");
console.log(`Correcto: ${cases.length + 1} pruebas de texto y espacios.`);
