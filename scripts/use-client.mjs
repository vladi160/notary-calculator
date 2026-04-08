// Post-build script: prepends "use client"; to all JS bundle outputs.
// Required for Next.js App Router — the directive is stripped by esbuild during bundling.
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const DIST = "dist";
const DIRECTIVE = '"use client";\n';

for (const file of readdirSync(DIST)) {
  if (!file.endsWith(".js") && !file.endsWith(".mjs")) continue;
  const filePath = join(DIST, file);
  const content = readFileSync(filePath, "utf8");
  if (!content.startsWith(DIRECTIVE)) {
    writeFileSync(filePath, DIRECTIVE + content, "utf8");
    console.log(`✓ prepended "use client" → dist/${file}`);
  }
}
