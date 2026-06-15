#!/usr/bin/env node
// Recreates the next/config shim removed in Next.js 16 that @storybook/nextjs still requires.
const fs = require("fs");
const path = require("path");

const shim = `module.exports = function getConfig() {
  return { serverRuntimeConfig: {}, publicRuntimeConfig: {} };
};\n`;

const candidates = [
  path.resolve(__dirname, "../apps/web/node_modules/next/config.js"),
];

// Also resolve via the pnpm virtual store symlink
try {
  const real = fs.realpathSync(path.resolve(__dirname, "../apps/web/node_modules/next"));
  candidates.push(path.join(real, "config.js"));
} catch {}

let patched = false;
for (const target of candidates) {
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, shim);
    console.log("patched:", target);
    patched = true;
  }
}
if (!patched) console.log("next/config shim already in place");
